#!/usr/bin/env python3
"""
pid903_patch.py — PID-903(R1) Dashboard data.js patch/delta tool
ใช้แทนการ regenerate data.js ทั้งไฟล์ทุกรอบ "อัพเดท 903"

Usage:
  python3 pid903_patch.py patch --file data.js --delta delta.json --out data.new.js
  python3 pid903_patch.py verify --file data.new.js
"""
import json, re, sys, argparse, hashlib, datetime

CONST_RE = {
    "ASOF":  re.compile(r'PID903_ASOF\s*=\s*"([^"]*)"'),
    "PIPES": re.compile(r'PID903_PIPES\s*=\s*(\{.*?\});', re.S),
    "DAILY": re.compile(r'PID903_DAILY\s*=\s*(\[.*?\]);', re.S),
}

def js_obj_to_py(js_snippet: str):
    # ข้อมูลใน data.js เป็น JS literal ล้วน (ไม่มี function/comment) -> แปลงคีย์แบบไม่มี quote ให้เป็น JSON ได้
    s = re.sub(r'([{,]\s*)([A-Za-z_][A-Za-z0-9_]*)\s*:', r'\1"\2":', js_snippet)
    s = re.sub(r',\s*([}\]])', r'\1', s)  # ตัด trailing comma
    return json.loads(s)

def py_to_js_obj(obj, indent=2):
    return json.dumps(obj, ensure_ascii=False, indent=indent)

def load_data_js(path):
    txt = open(path, encoding="utf-8").read()
    asof = CONST_RE["ASOF"].search(txt).group(1)
    pipes = js_obj_to_py(CONST_RE["PIPES"].search(txt).group(1))
    daily = js_obj_to_py(CONST_RE["DAILY"].search(txt).group(1))
    return txt, asof, pipes, daily

def cmd_patch(args):
    txt, asof, pipes, daily = load_data_js(args.file)
    delta = json.load(open(args.delta, encoding="utf-8"))

    # --- 1) merge PIPES (เขียนทับเฉพาะคีย์ที่ระบุใน delta) ---
    for k, v in delta.get("pipes", {}).items():
        pipes.setdefault(k, {}).update(v)

    # --- 2) append DAILY entries ใหม่ (กันซ้ำด้วย date) ---
    existing_dates = {d["date"] for d in daily}
    added, skipped = [], []
    for entry in delta.get("dailyEntries", []):
        if entry["date"] in existing_dates:
            skipped.append(entry["date"])
            continue
        daily.append(entry)
        added.append(entry["date"])

    # --- 3) chain-consistency check เบื้องต้น (PVC/pileCount/supportCount ต้องไม่ลดลง) ---
    warnings = []
    if "PVC" in delta.get("pipes", {}):
        pass  # ตรวจเพิ่มได้ตามต้องการ

    new_asof = delta.get("asof", asof)

    # --- 4) build fingerprint ---
    fp_source = json.dumps({"asof": new_asof, "pipes": pipes, "n_daily": len(daily)}, sort_keys=True)
    fingerprint = hashlib.sha256(fp_source.encode()).hexdigest()[:12]
    build_time = datetime.datetime.utcnow().isoformat() + "Z"

    out = f"""/* PID903 dashboard data — auto-patched
   buildInfo: {{ fingerprint: "{fingerprint}", builtAt: "{build_time}", addedEntries: {added}, skippedDuplicates: {skipped} }}
*/
const PID903_ASOF  = {json.dumps(new_asof, ensure_ascii=False)};
const PID903_PIPES = {py_to_js_obj(pipes)};
const PID903_DAILY = {py_to_js_obj(daily)};
"""
    open(args.out, "w", encoding="utf-8").write(out)
    print(f"[OK] patched -> {args.out}")
    print(f"     added: {added}")
    print(f"     skipped (duplicate date): {skipped}")
    print(f"     fingerprint: {fingerprint}")
    if warnings:
        print("     WARNINGS:", warnings)

def cmd_verify(args):
    import subprocess
    txt = open(args.file, encoding="utf-8").read()
    check_js = txt.replace("const PID903_", "global.PID903_")
    tmp = args.file + ".checktmp.js"
    open(tmp, "w", encoding="utf-8").write(check_js)
    r = subprocess.run(["node", "-e", f"eval(require('fs').readFileSync('{tmp}','utf8')); console.log('PASS');"],
                        capture_output=True, text=True)
    print(r.stdout.strip() or r.stderr.strip())
    sys.exit(0 if r.returncode == 0 else 1)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    p1 = sub.add_parser("patch"); p1.add_argument("--file", required=True); p1.add_argument("--delta", required=True); p1.add_argument("--out", required=True); p1.set_defaults(func=cmd_patch)
    p2 = sub.add_parser("verify"); p2.add_argument("--file", required=True); p2.set_defaults(func=cmd_verify)
    args = ap.parse_args()
    args.func(args)
