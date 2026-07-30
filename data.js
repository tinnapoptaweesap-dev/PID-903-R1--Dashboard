/* ============================================================
   PID-903(R1) — data.js  (Single Source of Truth)
   Generated : 2569-07-30 rev1  (โครงร่างเริ่มต้น — daily ยังว่าง)
   หลักการ   : Data First / Verify Before Use / No Guessing
   หมายเหตุ  : ค่าที่มี "verified:false" หรืออยู่ใน provenance.pending
              คือข้อมูลที่ได้จากการอ่านแบบ/OCR/BOQ ในรอบก่อน
              ต้อง cross-check กับต้นฉบับก่อนใช้เป็นมติหรือเอกสารทางการ
   ============================================================ */
const DATA = {

  /* ---------- หัวสัญญา ---------- */
  meta: {
    contract:       "PID-903(R1)",
    projectName:    "งานวางท่อจ่ายน้ำและงานที่เกี่ยวข้อง ถนนปานวิถี",
    route:          "จากคลองท้องคุ้ง ถึง ซอยเก้าแสน (หมู่บ้านอุ่น บางนา กม.26)",
    province:       "จังหวัดสมุทรปราการ",
    owner:          "การประปานครหลวง (กปน.)",
    contractor:     "บริษัท ไทคูนวณิชย์ จำกัด",

    /* ยืนยันแล้ว — จากหนังสือแจ้งเริ่มงาน (NTP) และการนับอายุสัญญา */
    startDate:      "2569-07-27",   // NTP 27 ก.ค. 2569
    durationDays:   210,
    plannedEndDate: "2570-02-22",   // 210 วันนับจาก NTP

    /* รอยืนยันกับต้นฉบับ (ดู provenance.pending) */
    value:          19520000,       // มูลค่าสัญญา (บาท) — รอยืนยันกับคู่ฉบับสัญญา
    valueVerified:  false,
    perfSecurity:   971000,         // หลักประกันสัญญา (บาท) — พบข้อคลาดเคลื่อน รอยืนยัน
    perfSecurityVerified: false,

    lastConfirmed:  "—",
    lastDataDate:   "—",
    actualAsOf:     null
  },

  /* ---------- บันทึกที่มา + สิ่งที่ต้องยืนยัน (แสดงบนแบนเนอร์ "ตรวจสอบก่อนใช้") ---------- */
  provenance: {
    verifiedNote: "อายุสัญญา 210 วัน · NTP 27 ก.ค. 2569 · สิ้นสุด 22 ก.พ. 2570 — ยืนยันแล้ว",
    pending: [
      "มูลค่าสัญญา 19,520,000 บาท และหลักประกันสัญญา 971,000 บาท — cross-check กับคู่ฉบับสัญญา (04 คู่ฉบับสัญญาจ้าง)",
      "ปริมาณท่อรายชนิด (Pipe Schedule) — cross-check กับ BOQ ต้นฉบับ",
      "จุดแบ่งช่วง Chainage (breakpoints) — ได้จากการอ่านแบบแปลนรวมความละเอียดต่ำ ต้องยืนยันภาคสนาม/แบบ 600 DPI",
      "ผลต่างความยาวแนวสาย 3,665 ม. กับผลรวม Pipe Schedule 4,146 ม. — ยังไม่ resolve",
      "แผนงานหลัก (Master Schedule) S-Curve รายเดือน — รอป้อนจากตารางแผนงาน/งวดงานที่อนุมัติ"
    ]
  },

  /* ---------- แนวสาย (signature visual: Chainage Route Strip) ----------
     แกนอ้างอิง = ความยาวแนวสาย 0+000 ถึง 3+665 (3,665 ม.)
     bands = ช่วงงานแบ่งตามวิธี/ตำแหน่งก่อสร้าง (สี)
       canal    = วางท่อในคูน้ำ (คลองระบายน้ำ)      — ฟ้า
       crossing = ท่อลอด/ข้ามคลอง (Critical Path)   — ชมพู
       shoulder = วางใต้ไหล่ทาง ถนนปานวิถี          — ส้ม
       road     = ต้น/ปลายแนว บนผิวจราจร            — เทา
     *ทุก breakpoint ยัง verified:false — รอยืนยันแบบ 600 DPI/ภาคสนาม* */
  alignment: {
    chainStart: 0,
    chainEnd:   3665,
    bands: [
      { id:"S1", name:"ต้นแนว (คลองท้องคุ้ง)",              from:0,    to:168,  method:"road",     verified:false },
      { id:"S2", name:"วางท่อในคูน้ำ (คลองระบายน้ำ)",        from:168,  to:2912, method:"canal",    verified:false },
      { id:"S3", name:"ท่อลอด/ข้ามคลอง (คลองกันยา)",         from:2912, to:2950, method:"crossing", verified:false, critical:true, permit:"ได้รับอนุญาตแล้ว (อบต.คลองด่าน เลขที่ 2/2569)" },
      { id:"S4", name:"ไหล่ทาง ถนนปานวิถี (ทล.3117)",        from:2950, to:3572, method:"shoulder", verified:false, permit:"ได้รับอนุญาตแล้ว (แขวงทางหลวงสมุทรปราการ ลว.12 พ.ย. 2568)" },
      { id:"S5", name:"ปลายแนว (ซอยเก้าแสน)",               from:3572, to:3665, method:"road",     verified:false }
    ]
  },

  /* ---------- บัญชีท่อ (Pipe Schedule) — จาก BOQ, รอยืนยัน ----------
     ตำแหน่งตาม chainage ของท่อแต่ละชนิดยังไม่ทราบแน่ชัด จึงแสดงเป็น "ยอดรวม" เท่านั้น
     (ไม่วางบนแกน chainage เพื่อไม่ให้เข้าใจผิดว่าทราบตำแหน่งจริง) */
  pipeSchedule: [
    { type:"PVC",  dia:150, len:12,   note:"" },
    { type:"PVC",  dia:300, len:925,  note:"" },
    { type:"AC",   dia:300, len:2233, note:"" },
    { type:"ST",   dia:300, len:543,  note:"" },
    { type:"HDPE", dia:315, len:353,  note:"" },
    { type:"ST",   dia:600, len:80,   note:"ปลอกท่อ (casing)" }
  ],
  pipeScheduleVerified: false,

  /* ---------- S-Curve รายเดือน (ร้อยละของมูลค่างานทั้งสัญญา) ----------
     ช่วงสัญญา ก.ค. 2569 – ก.พ. 2570 (~8 เดือนปฏิทิน)
     planMonthly / actualMonthly = [] จนกว่าจะป้อนจากแผนงานหลัก/งวดงานที่อนุมัติ
     (ห้ามใส่ตัวเลขสมมุติ — Verify Before Use) */
  scurve: {
    labels:       ["ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค.","ม.ค.","ก.พ."],
    planMonthly:  [],
    actualMonthly:[]
  },

  /* ---------- สถานะรายช่วง (override) / ไทม์ไลน์รายช่วง / รายงานประจำวัน ----------
     เริ่มต้นว่าง — เติมผ่านสคริปต์ tools/pid903.py จากรายงานประจำวันที่จะอัปโหลด */
  segmentStatus: {},   // เช่น { "S2":"progress", "S3":"complete" }
  curated:       {},   // เช่น { "S2":[{date:"..",text:"..",stage:".."}] }
  daily:         []    // เช่น { date, iso, day, dayEnd, month, year, text, segs:[], meters, holiday, unconfirmed, reportUrl }
};
