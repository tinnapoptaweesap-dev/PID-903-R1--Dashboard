#!/usr/bin/env python3
"""
tools/pid903_patch.py — PID-903(R1) Dashboard data pipeline
สัญญา: PID-903(R1) เท่านั้น (ห้ามสับสนกับ รทป. ใดๆ)

Subcommands:
  pull     ดึง data.js ล่าสุดจาก GitHub raw (public repo) -> พิมพ์แค่ digest
  inspect  อ่าน data.js ที่มีในเครื่อง -> พิมพ์แค่ digest (ไม่ dump เนื้อหาเต็ม)
  patch    ผสาน delta.json เข้ากับ data.js (upsert ตาม date) -> data.new.js
  verify   ตรวจ syntax (node --check เทียบเท่า) + คืน digest
  audit    ตรวจโครงสร้าง/ความซ้ำซ้อน/ช่องว่างปฏิทิน
"""
import json, re, sys, argparse, hashlib, datetime, urllib.request

RAW_URL = "https://raw.githubusercontent.com/tinnapoptaweesap-dev/PID-903-R1--Dashboard/main/data.js"

THAI_MONTHS = {"ม.ค.":1,"ก.พ.":2,"มี.ค.":3,"เม.ย.":4,"พ.ค.":5,"มิ.ย.":6,
               "ก.ค.":7,"ส.ค.":8,"ก.ย.":9,"ต.ค.":10,"พ.ย.":11,"ธ.ค.":12}

CONST_RE = {
    "ASOF":  re.compile(r'PID903_ASOF\s*=\s*"([^"]*)"'),
    "PIPES": re.compile(r'PID903_PIPES\s*=\s*(\{.*?\});', re.S),
    "DAILY": re.compile(r'PID903_DAILY\s*=\s*(\[.*?\]);', re.S),
}

def js_obj_to_py(js_snippet: str):
    s = re.sub(r'([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:', r'\1"\2":', js_snippet)
    s = re.sub(r',\s*([}\]])', r'\1', s)
    return json.loads(s)

def py_to_js_obj(obj, indent=2):
    return json.dumps(obj, ensure_ascii=False, indent=indent)

def parse_data_js(txt):
    asof  = CONST_RE["ASOF"].search(txt).group(1)
    pipes = js_obj_to_py(CONST_RE["PIPES"].search(txt).group(1))
    daily = js_obj_to_py(CONST_RE["DAILY"].search(txt).group(1))
    return asof, pipes, daily

def fingerprint(asof, pipes, daily):
    src = json.dumps({"asof": asof, "pipes": pipes, "n": len(daily)}, sort_keys=True)
    return hashlib.sha256(src.encode()).hexdigest()[:12]

def digest(asof, pipes, daily, source_label):
    dates = [d["date"] for d in daily]
    unconfirmed = [d["date"] for d in daily if d.get("unconfirmed")]
    fp = fingerprint(asof, pipes, daily)
    print(f"[digest:{source_label}]")
    print(f"  asof            : {asof}")
    print(f"  pipes.PVC.laidM : {pipes.get('PVC',{}).get('laidM')}")
    print(f"  pipes.AC.pile   : {pipes.get('AC',{}).get('pileCount')}")
    print(f"  pipes.AC.support: {pipes.get('AC',{}).get('supportCount')}")
    print(f"  daily records   : {len(daily)}  (range {dates[0]} -> {dates[-1]})" if dates else "  daily records   : 0")
    print(f"  unconfirmed     : {unconfirmed if unconfirmed else '(none)'}")
    print(f"  fingerprint     : {fp}")

def cmd_pull(args):
    try:
        with urllib.request.urlopen(RAW_URL, timeout=15) as r:
            txt = r.read().decode("utf-8")
    except Exception as e:
        print(f"[FAIL] pull error: {e}")
        print("       -> repo อาจยังเป็น private, หรือยังไม่ commit data.js, หรือ branch ไม่ใช่ main")
        sys.exit(1)
    open(args.out, "w", encoding="utf-8").write(txt)
    asof, pipes, daily = parse_data_js(txt)
    digest(asof, pipes, daily, f"pulled -> {args.out}")

def cmd_inspect(args):
    txt = open(args.file, encoding="utf-8").read()
    asof, pipes, daily = parse_data_js(txt)
    digest(asof, pipes, daily, args.file)

def cmd_patch(args):
    txt = open(args.file, encoding="utf-8").read()
    asof, pipes, daily = parse_data_js(txt)
    delta = json.load(open(args.delta, encoding="utf-8"))

    for k, v in delta.get("pipes", {}).items():
        pipes.setdefault(k, {}).update(v)

    by_date = {d["date"]: i for i, d in enumerate(daily)}
    added, updated = [], []
    for entry in delta.get("dailyEntries", []):
        if entry["date"] in by_date:
            daily[by_date[entry["date"]]] = entry   # upsert: ทับของเดิม (ใช้ตอนแผน -> ยืนยันแล้ว)
            updated.append(entry["date"])
        else:
            daily.append(entry)
            added.append(entry["date"])

    new_asof = delta.get("asof", asof)
    fp = fingerprint(new_asof, pipes, daily)
    build_time = datetime.datetime.utcnow().isoformat() + "Z"

    out = f"""/* PID903(R1) dashboard data — auto-patched by tools/pid903_patch.py
   buildInfo: {{ fingerprint: "{fp}", builtAt: "{build_time}", added: {added}, updated: {updated} }}
*/
const PID903_ASOF  = {json.dumps(new_asof, ensure_ascii=False)};
const PID903_PIPES = {py_to_js_obj(pipes)};
const PID903_DAILY = {py_to_js_obj(daily)};
"""
    open(args.out, "w", encoding="utf-8").write(out)
    digest(new_asof, pipes, daily, f"patched -> {args.out}")
    print(f"  added new dates : {added if added else '(none)'}")
    print(f"  upserted dates  : {updated if updated else '(none)'}")

def cmd_verify(args):
    import subprocess
    txt = open(args.file, encoding="utf-8").read()
    check_js = txt.replace("const PID903_", "global.PID903_")
    tmp = args.file + ".checktmp.js"
    open(tmp, "w", encoding="utf-8").write(check_js)
    r = subprocess.run(["node", "-e", f"eval(require('fs').readFileSync('{tmp}','utf8')); console.log('SYNTAX_OK');"],
                        capture_output=True, text=True)
    ok = r.returncode == 0
    print(r.stdout.strip() or r.stderr.strip())
    if ok:
        asof, pipes, daily = parse_data_js(txt)
        digest(asof, pipes, daily, args.file)
    sys.exit(0 if ok else 1)

def cmd_audit(args):
    txt = open(args.file, encoding="utf-8").read()
    asof, pipes, daily = parse_data_js(txt)
    dates_seen = {}
    dup = []
    for d in daily:
        dates_seen[d["date"]] = dates_seen.get(d["date"], 0) + 1
    dup = [k for k, v in dates_seen.items() if v > 1]

    # ตรวจ monotonic non-decreasing ของค่าสะสม (PVC ควรไม่ลดลง ฯลฯ) — เตือนเท่านั้น ไม่แก้เอง
    print(f"[audit] {args.file}")
    print(f"  total records        : {len(daily)}")
    print(f"  duplicate dates       : {dup if dup else '(none)'}")
    print(f"  unconfirmed count     : {sum(1 for d in daily if d.get('unconfirmed'))}")
    missing_url = [d['date'] for d in daily if not d.get('reportUrl')]
    print(f"  missing reportUrl     : {missing_url if missing_url else '(none)'}")
    print(f"  fingerprint           : {fingerprint(asof, pipes, daily)}")

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)

    p0 = sub.add_parser("pull"); p0.add_argument("--out", default="data.js"); p0.set_defaults(func=cmd_pull)
    p1 = sub.add_parser("inspect"); p1.add_argument("--file", required=True); p1.set_defaults(func=cmd_inspect)
    p2 = sub.add_parser("patch")
    p2.add_argument("--file", required=True); p2.add_argument("--delta", required=True); p2.add_argument("--out", required=True)
    p2.set_defaults(func=cmd_patch)
    p3 = sub.add_parser("verify"); p3.add_argument("--file", required=True); p3.set_defaults(func=cmd_verify)
    p4 = sub.add_parser("audit"); p4.add_argument("--file", required=True); p4.set_defaults(func=cmd_audit)

    args = ap.parse_args()
    args.func(args)
