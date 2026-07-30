#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
pid903.py — เครื่องมือสายพานข้อมูล Dashboard สัญญา PID-903(R1)
--------------------------------------------------------------
หลักการเดียวกับ รทป.186 : "ห้ามอ่าน data.js ออกมาเป็นข้อความ"
ทุกคำสั่งพิมพ์เฉพาะ digest สรุปผล ต้นทุนต่อรอบคงที่ (O(1))

ต่างจาก รทป.186 :
  * ใช้ "ช่วงงาน (segs, S1..S5)" แทน "บ่อพัก (wells)"
  * daily มีฟิลด์ "meters" = ระยะท่อที่วางได้ในวันนั้น (ใช้คำนวณ KPI)
  * ไม่มี network/บ่อพัก — ใช้ alignment.bands เป็นแนวสาย

คำสั่ง
  inspect  --file data.js                 พิมพ์ digest
  patch    --file data.js --delta d.json  ผสาน delta -> เขียนผล + ตรวจอัตโนมัติ
  verify   --file data.new.js             ตรวจไฟล์ผลลัพธ์ + node syntax

รูปแบบ delta.json (ดู tools/delta_template.json)
{
  "confirmDate": "30/07/2569",
  "note": "confirm 29/07; add 30/07 plan",
  "records": [
    {"iso":"2569-07-30","text":"1. วางท่อ AC ϕ300 ช่วง กม.0+300–0+345",
     "segs":["S2"],"meters":45,"unconfirmed":false,"holiday":false,
     "reportUrl":"https://drive.google.com/file/d/.../view"}
  ],
  "curated":       {"S2":[{"date":"30/07/2569","text":"...","stage":"วางท่อในคูน้ำ"}]},
  "segmentStatus": {"S2":"progress"},
  "actualMonthly": [0.5],
  "actualAsOf":    "2569-07-31"
}
"""
import argparse, datetime, json, os, subprocess

TH_MON  = ["","ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]
TH_FULL = ["","มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน",
           "กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"]


# ---------------------------------------------------------------- io layer
def load(path):
    """อ่าน data.js -> dict. ใช้ node ประเมิน (รองรับคอมเมนต์/ไฟล์ seed ที่เขียนมือ);
       ถ้าไม่มี node ค่อย fallback เป็น json.loads (ใช้ได้กับไฟล์ที่สคริปต์เขียนเอง)"""
    try:
        js = ("const fs=require('fs');let c=fs.readFileSync(process.argv[1],'utf8');"
              "eval(c.replace('const DATA','global.DATA').replace(/console\\.log[\\s\\S]*$/,''));"
              "process.stdout.write(JSON.stringify(global.DATA));")
        r = subprocess.run(["node", "-e", js, path], capture_output=True, text=True)
        if r.returncode == 0 and r.stdout.strip():
            return json.loads(r.stdout)
    except FileNotFoundError:
        pass
    s = open(path, encoding="utf-8").read()
    i = s.index("const DATA = {")
    j = s.rfind("};")
    return json.loads(s[i + len("const DATA = "):j + 1])


def dump(d, path, gen, rev, note):
    n = len(d["daily"])
    laid = sum(int(r.get("meters", 0) or 0) for r in d["daily"] if not r.get("unconfirmed"))
    hdr = ("/* ============================================================\n"
           "   PID-903(R1) — data.js\n"
           f"   Generated : {gen} rev{rev}\n"
           f"   Records   : {n}  (last: {d['meta']['lastDataDate']})\n"
           f"   Confirmed : {d['meta']['lastConfirmed']}\n"
           f"   Laid (confirmed): {laid:,} / {d['alignment']['chainEnd']:,} m\n"
           f"   Note      : rev{rev} — {note}\n"
           "   ============================================================ */\n")
    body = "const DATA = " + json.dumps(d, ensure_ascii=False) + ";\n"
    tail = (f'console.log("[PID-903(R1)] build {gen} rev{rev} '
            f'| records: {n} | laid: {laid} m | last: {d["meta"]["lastDataDate"]}");\n')
    open(path, "w", encoding="utf-8").write(hdr + body + tail)
    return os.path.getsize(path)


# ------------------------------------------------------------- date helper
def iso_parts(iso): return (int(x) for x in iso.split("-"))
def th_short(iso):
    y, m, dd = iso_parts(iso); return f"{dd} {TH_MON[m]} {y}"
def th_full(iso):
    y, m, dd = iso_parts(iso); return f"{dd} {TH_FULL[m]} {y}"
def toord(iso):
    y, m, dd = iso_parts(iso); return datetime.date(y - 543, m, dd).toordinal()


# ------------------------------------------------------------------ digest
def digest(d, tag="DIGEST"):
    daily = d["daily"]
    out = [f"===== {tag} =====",
           f"contract           : {d['meta']['contract']}",
           f"records            : {len(daily)}"]
    if daily:
        iso = [r["iso"] for r in daily]
        out += [f"range              : {iso[0]} -> {iso[-1]}",
                f"reportUrl coverage : {sum(1 for r in daily if r.get('reportUrl'))}/{len(daily)}",
                f"unconfirmed rows   : {[r['iso'] for r in daily if r.get('unconfirmed')]}",
                f"duplicate iso      : {[x for x in set(iso) if iso.count(x)>1] or 'none'}",
                f"sorted             : {iso == sorted(iso)}"]
        # ช่องว่างปฏิทิน
        gaps, prev, prev_iso = [], None, None
        for r in daily:
            cur = toord(r["iso"])
            if prev is not None and cur - prev > 1:
                gaps.append(f"{prev_iso}->{r['iso']} ({cur-prev-1}d)")
            prev, prev_iso = cur, r["iso"]
        out.append(f"calendar gaps      : {gaps or 'none'}")
    out += [f"meta.lastConfirmed : {d['meta']['lastConfirmed']}",
            f"meta.lastDataDate  : {d['meta']['lastDataDate']}"]
    # ระยะท่อที่วาง
    laid = sum(int(r.get("meters", 0) or 0) for r in daily if not r.get("unconfirmed"))
    tot = d["alignment"]["chainEnd"] - d["alignment"]["chainStart"]
    out.append(f"laid (confirmed)   : {laid:,} / {tot:,} m ({laid/tot*100:.1f}%)")
    # สถานะรายช่วง
    st = {}
    for k, v in d.get("segmentStatus", {}).items():
        st.setdefault(v, []).append(k)
    for k in sorted(st):
        out.append(f"segmentStatus {k:<8}: {', '.join(st[k])}")
    out.append(f"curated segs       : " +
               (", ".join(f"{k}({len(v)})" for k, v in d["curated"].items()) or "none"))
    # S-curve
    sc = d["scurve"]; pm, am = sc.get("planMonthly", []), sc.get("actualMonthly", [])
    if pm:
        cp = round(sum(pm[:max(len(am), 1)]), 2); ca = round(sum(am), 2)
        out += [f"plan cum (to now)  : {cp}%", f"actual cum         : {ca}%",
                f"variance           : {round(ca-cp,2)}%",
                f"actual as-of       : {d['meta'].get('actualAsOf') or '** ยังไม่ระบุ **'}"]
    else:
        out.append("S-curve            : ** ยังไม่ป้อนแผนงานหลัก (planMonthly ว่าง) **")
    return "\n".join(out)


# ------------------------------------------------------------------- patch
def cmd_patch(a):
    d = load(a.file)
    delta = json.load(open(a.delta, encoding="utf-8"))
    log = []

    # ---- daily : upsert by iso
    idx = {r["iso"]: k for k, r in enumerate(d["daily"])}
    for rec in delta.get("records", []):
        y, m, dd = iso_parts(rec["iso"])
        row = {"date": rec.get("date") or th_short(rec["iso"]), "iso": rec["iso"],
               "day": rec.get("day", dd), "dayEnd": rec.get("dayEnd", dd),
               "month": m, "year": y, "text": rec["text"],
               "segs": rec.get("segs", []), "meters": rec.get("meters", 0),
               "holiday": bool(rec.get("holiday", False)),
               "unconfirmed": bool(rec.get("unconfirmed", False))}
        if rec.get("reportUrl"): row["reportUrl"] = rec["reportUrl"]
        if rec["iso"] in idx:
            old = d["daily"][idx[rec["iso"]]]
            row.setdefault("reportUrl", old.get("reportUrl"))
            if row.get("reportUrl") is None: row.pop("reportUrl", None)
            d["daily"][idx[rec["iso"]]] = row
            log.append(f"  UPDATE {rec['iso']}  {'(confirm)' if not row['unconfirmed'] else '(plan)'}")
        else:
            d["daily"].append(row)
            log.append(f"  INSERT {rec['iso']}  {'(confirm)' if not row['unconfirmed'] else '(plan)'}")
    d["daily"].sort(key=lambda r: r["iso"])

    # ---- curated : prepend + dedup (date,text)
    for s, items in delta.get("curated", {}).items():
        cur = d["curated"].setdefault(s, [])
        seen = {(c["date"], c["text"]) for c in cur}
        add = [c for c in items if (c["date"], c["text"]) not in seen]
        d["curated"][s] = add + cur
        if add: log.append(f"  CURATED {s} += {len(add)}")

    # ---- segmentStatus / scurve / actualAsOf
    for s, v in delta.get("segmentStatus", {}).items():
        if d["segmentStatus"].get(s) != v:
            log.append(f"  STATUS {s}: {d['segmentStatus'].get(s)} -> {v}")
            d["segmentStatus"][s] = v
    if delta.get("actualMonthly") is not None:
        d["scurve"]["actualMonthly"] = delta["actualMonthly"]
        log.append("  SCURVE actualMonthly updated")
    if delta.get("actualAsOf"):
        d["meta"]["actualAsOf"] = delta["actualAsOf"]
        log.append(f"  META actualAsOf -> {delta['actualAsOf']}")

    # ---- meta
    if d["daily"]:
        last = d["daily"][-1]["iso"]
        conf = delta.get("confirmed") or th_full(
            max((r["iso"] for r in d["daily"] if not r.get("unconfirmed")), default=last))
        d["meta"]["lastConfirmed"] = conf
        d["meta"]["lastDataDate"] = th_full(last)

    gen = a.gen or datetime.date.today().strftime("%Y-%m-%d")
    note = delta.get("note", "routine daily merge")
    size = dump(d, a.out, gen, a.rev, note)
    print("===== PATCH LOG =====")
    print("\n".join(log) if log else "  (no change)")
    print(f"\nwritten            : {a.out}  ({size:,} bytes)")
    print(digest(d, "POST-PATCH DIGEST"))
    _node_check(a.out)


def _node_check(path):
    js = ("const fs=require('fs');let c=fs.readFileSync(process.argv[1],'utf8');"
          "eval(c.replace('const DATA','global.DATA').replace(/console\\.log[\\s\\S]*$/,''));"
          "if(!Array.isArray(DATA.daily))throw new Error('daily missing');"
          "if(!DATA.alignment||!DATA.alignment.bands.length)throw new Error('alignment missing');"
          "console.log('js syntax        : OK');")
    r = subprocess.run(["node", "-e", js, path], capture_output=True, text=True)
    print(r.stdout.strip() or "js syntax        : FAIL\n" + r.stderr.strip())


def cmd_inspect(a): print(digest(load(a.file), "DIGEST"))
def cmd_verify(a):
    print(digest(load(a.file), "VERIFY")); _node_check(a.file)


def main():
    p = argparse.ArgumentParser(prog="pid903")
    sub = p.add_subparsers(dest="cmd", required=True)
    q = sub.add_parser("inspect"); q.add_argument("--file", default="data.js"); q.set_defaults(f=cmd_inspect)
    q = sub.add_parser("verify");  q.add_argument("--file", default="data.js"); q.set_defaults(f=cmd_verify)
    q = sub.add_parser("patch")
    q.add_argument("--file", default="data.js"); q.add_argument("--delta", required=True)
    q.add_argument("--out", default="data.new.js"); q.add_argument("--rev", default="1")
    q.add_argument("--gen", default=None); q.set_defaults(f=cmd_patch)
    a = p.parse_args(); a.f(a)


if __name__ == "__main__":
    main()
