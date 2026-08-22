# สายพานข้อมูล Dashboard PID-903(R1) — มาตรฐานปฏิบัติงาน (SOP)

> **หลักการเดียวที่ต้องจำ:** *ห้ามอ่าน `data.js` ออกมาเป็นข้อความทั้งไฟล์*
> ทุกการแก้ไขทำผ่าน `tools/pid903_patch.py` ซึ่งพิมพ์เฉพาะ **digest** เท่านั้น
> ต้นทุนต่อรอบ "อัพเดท 903" จึงคงที่ ไม่ว่าไฟล์จะโตแค่ไหน
>
> สัญญาที่เกี่ยวข้อง: **PID-903(R1) เท่านั้น** (ห้ามสับสน/อ้างอิงข้าม รทป.182(R1) หรือสัญญาอื่นใดเด็ดขาด)

---

## 1. โครงสร้างไฟล์ใน repo (`PID-903-R1--Dashboard`, public)

```
PID-903-R1--Dashboard/
├── index.html
├── data.js                      ← ผลลัพธ์ (สร้างโดยสคริปต์เท่านั้น ห้ามแก้ด้วยมือ)
└── tools/
    ├── pid903_patch.py          ← เครื่องมือหลัก (pull / inspect / patch / verify / audit)
    ├── WORKFLOW.md               ← เอกสารนี้
    └── delta/
        └── delta-2569-08-21.json ← สมุดบันทึกรายรอบ (audit trail, เก็บทุกรอบ)
```

---

## 2. รอบการทำงาน "อัพเดท 903" — 5 ขั้น

| ขั้น | การกระทำ | ต้นทุน |
|---|---|---|
| 1 | `python3 tools/pid903_patch.py pull` ดึง `data.js` ล่าสุดจาก GitHub raw | 0 (ไม่เข้า context เต็มไฟล์) |
| 2 | ค้น Drive Inbox (`parentId=1lWbm_HhRkF7smMUWCy9n5EQ1j2z6w3SB`) เฉพาะวันที่ยังไม่มีใน `data.js` → อ่านใบแจ้งฯ | ~1-1.5 KB/ใบ |
| 3 | เขียน `tools/delta/delta-YYYY-MM-DD.json` (เฉพาะ pipes ที่เปลี่ยน + daily entries ใหม่/แก้) | ~1 KB |
| 4 | `python3 tools/pid903_patch.py patch --file data.js --delta tools/delta/delta-....json --out data.new.js` | 0 |
| 5 | `python3 tools/pid903_patch.py verify --file data.new.js` → อ่าน digest → QA → อัปขึ้น GitHub | ~0.5 KB |

**ข้อ 1 คือหัวใจ:** ไม่ต้องให้ผู้ใช้อัปโหลด `data.js` เข้าแชตอีกต่อไป เพราะดึงตรงจาก
`raw.githubusercontent.com/tinnapoptaweesam-dev/PID-903-R1--Dashboard/main/data.js` ได้ (repo เป็น public แล้ว)

---

## 3. คำสั่งอ้างอิง

```bash
python3 tools/pid903_patch.py pull                                        # ดึงไฟล์ล่าสุด + digest
python3 tools/pid903_patch.py inspect --file data.js                      # ดู digest เฉยๆ
python3 tools/pid903_patch.py audit   --file data.js                      # ตรวจซ้ำซ้อน/ช่องว่าง
python3 tools/pid903_patch.py patch --file data.js \
        --delta tools/delta/delta-2569-08-22.json \
        --out data.new.js                                                 # ผสาน (upsert ตาม date)
python3 tools/pid903_patch.py verify --file data.new.js                   # ตรวจซ้ำก่อนอัป
```

---

## 4. รูปแบบ `delta.json` (ตรงตาม schema `data.js` จริงของ PID-903(R1))

```json
{
  "asof": "22 ส.ค. 2569",
  "pipes": {
    "PVC": { "laidM": 558 },
    "AC":  { "pileCount": 594, "supportCount": 350 }
  },
  "dailyEntries": [
    {
      "date": "21 ส.ค. 2569",
      "month": 8,
      "segs": ["STA.0+235–0+300 (เสาเข็ม/แท่นรับโค้ง 45°)"],
      "text": "กดเสาเข็มสี่เหลี่ยม 29 ต้น (สะสม 594 ต้น) ...",
      "meters": 5,
      "unconfirmed": false,
      "reportUrl": "https://drive.google.com/file/d/.../view"
    }
  ]
}
```

- `pipes` = ใส่เฉพาะคีย์ที่เปลี่ยน (merge เข้ากับของเดิม ไม่ต้องใส่ ST เพราะไม่ผูกกับ data.js)
- `dailyEntries` = **upsert ตาม `date`** — ส่ง record วันเดิมซ้ำได้ ระบบจะทับของเก่า
  (ใช้ตอนตัวเลข `unconfirmed: true` ได้รับการยืนยันจาก C7 แล้ว → ส่ง record เดิมพร้อม `unconfirmed: false`)
- ฟิลด์ที่ไม่ใส่ = ไม่แตะต้อง (`asof` และ `pipes` เป็น optional)

---

## 5. ระบบตรวจสอบอัตโนมัติ (`verify` / `audit`)

- คำนวณ fingerprint (sha256 ย่อ 12 ตัว) ฝังใน comment header ของ `data.new.js`
- ตรวจ `date` ซ้ำใน `PID903_DAILY`
- ตรวจ record ที่ไม่มี `reportUrl`
- นับ `unconfirmed` records ที่ค้างอยู่ (ต้องพา C7 ไล่ปิดให้หมดก่อนประชุมกรรมการ)
- `node -e eval` ยืนยัน syntax ของไฟล์จริงก่อนส่งมอบ

---

## 6. กฎเหล็ก (Non-negotiable)

1. `data.js` แก้ด้วย `patch` เท่านั้น — ห้ามแก้มือ ห้าม copy-paste ทั้งไฟล์เข้าแชต
2. เก็บ `delta-*.json` ทุกรอบไว้ใน `tools/delta/` เป็นหลักฐานย้อนกลับ (replay ได้ถ้าไฟล์เสียหาย)
3. `unconfirmed: true` สำหรับตัวเลขที่ chain-validation ไม่สอดคล้อง — ปลดเป็น `false` เมื่อ C7 ยืนยันเท่านั้น
   (ห้าม Claude ปลดธงเองโดยไม่มีการยืนยันจากผู้ใช้)
4. วันที่ที่ลงในระบบ = **วันที่ทำงานจริงตามชื่อไฟล์รายงาน** (`Report DD-M-69.pdf`) ไม่ใช่วันที่หัวจดหมายที่มักเป็นแผนวันถัดไป
5. สัญญานี้คือ PID-903(R1) เท่านั้น — ห้ามอ้างอิงข้าม project อื่นใดในการคำนวณ/ราคา/ปริมาณงาน
6. อัปขึ้น GitHub โดยผู้รับผิดชอบ (นายช่างฯ) เท่านั้น — ตรวจ fingerprint ก่อน commit ทุกครั้ง
7. repo เป็น public — **ห้าม commit token/credential ใดๆ ลงในไฟล์ใน repo นี้เด็ดขาด**
