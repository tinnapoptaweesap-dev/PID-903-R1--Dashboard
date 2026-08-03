/* ============================================================
   PID-903(R1) — data.js  (Single Source of Truth)
   Generated : 2569-07-31 rev3
   Records   : 4  (last: 31 กรกฎาคม 2569)
   Note      : rev3 — เพิ่ม pipelineProgress (โมเดลความก้าวหน้าราย "ชนิดท่อ x ขั้นตอน")
               ตามที่ผู้ใช้ชี้แจง: 3 ชนิดท่อ 300 ST / 300 PVC / 300 AC
               กดเข็ม & ติดตั้ง support = จำนวน x 2.5 ม. · PVC วางท่อสะสม 480 ม.
               ทุกค่ายัง verified:false — Verify Before Use
   ============================================================ */
const DATA = {
  "meta": {
    "contract": "PID-903(R1)",
    "projectName": "งานวางท่อจ่ายน้ำและงานที่เกี่ยวข้อง ถนนปานวิถี",
    "route": "จากคลองท้องคุ้ง ถึง ซอยเก้าแสน (หมู่บ้านอุ่น บางนา กม.26)",
    "province": "จังหวัดสมุทรปราการ",
    "owner": "การประปานครหลวง (กปน.)",
    "contractor": "บริษัท ไทคูนวณิชย์ จำกัด",
    "startDate": "2569-07-27",
    "durationDays": 210,
    "plannedEndDate": "2570-02-22",
    "value": 19520000,
    "valueVerified": false,
    "perfSecurity": 971000,
    "perfSecurityVerified": false,
    "lastConfirmed": "31 กรกฎาคม 2569",
    "lastDataDate": "31 กรกฎาคม 2569",
    "actualAsOf": null
  },
  "provenance": {
    "verifiedNote": "อายุสัญญา 210 วัน · NTP 27 ก.ค. 2569 · สิ้นสุด 22 ก.พ. 2570 — ยืนยันแล้ว",
    "pending": [
      "มูลค่าสัญญา 19,520,000 บาท และหลักประกันสัญญา 971,000 บาท — cross-check กับคู่ฉบับสัญญา (04 คู่ฉบับสัญญาจ้าง)",
      "ปริมาณท่อรายชนิด (Pipe Schedule) — cross-check กับ BOQ ต้นฉบับ",
      "จุดแบ่งช่วง Chainage (breakpoints) — ได้จากการอ่านแบบแปลนรวมความละเอียดต่ำ ต้องยืนยันภาคสนาม/แบบ 600 DPI",
      "ผลต่างความยาวแนวสาย 3,665 ม. กับผลรวม Pipe Schedule 4,146 ม. — ยังไม่ resolve",
      "แผนงานหลัก (Master Schedule) S-Curve รายเดือน — รอป้อนจากตารางแผนงาน/งวดงานที่อนุมัติ"
    ]
  },
  "alignment": {
    "chainStart": 0,
    "chainEnd": 3665,
    "bands": [
      {
        "id": "S1",
        "name": "ต้นแนว (คลองท้องคุ้ง)",
        "from": 0,
        "to": 168,
        "method": "road",
        "verified": false
      },
      {
        "id": "S2",
        "name": "วางท่อในคูน้ำ (คลองระบายน้ำ)",
        "from": 168,
        "to": 2912,
        "method": "canal",
        "verified": false
      },
      {
        "id": "S3",
        "name": "ท่อลอด/ข้ามคลอง (คลองกันยา)",
        "from": 2912,
        "to": 2950,
        "method": "crossing",
        "verified": false,
        "critical": true,
        "permit": "ได้รับอนุญาตแล้ว (อบต.คลองด่าน เลขที่ 2/2569)"
      },
      {
        "id": "S4",
        "name": "ไหล่ทาง ถนนปานวิถี (ทล.3117)",
        "from": 2950,
        "to": 3572,
        "method": "shoulder",
        "verified": false,
        "permit": "ได้รับอนุญาตแล้ว (แขวงทางหลวงสมุทรปราการ ลว.12 พ.ย. 2568)"
      },
      {
        "id": "S5",
        "name": "ปลายแนว (ซอยเก้าแสน)",
        "from": 3572,
        "to": 3665,
        "method": "road",
        "verified": false
      }
    ]
  },
  "pipeSchedule": [
    {
      "type": "PVC",
      "dia": 150,
      "len": 12,
      "note": ""
    },
    {
      "type": "PVC",
      "dia": 300,
      "len": 925,
      "note": ""
    },
    {
      "type": "AC",
      "dia": 300,
      "len": 2233,
      "note": ""
    },
    {
      "type": "ST",
      "dia": 300,
      "len": 543,
      "note": ""
    },
    {
      "type": "HDPE",
      "dia": 315,
      "len": 353,
      "note": ""
    },
    {
      "type": "ST",
      "dia": 600,
      "len": 80,
      "note": "ปลอกท่อ (casing)"
    }
  ],
  "pipeScheduleVerified": false,
  "scurve": {
    "labels": [
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
      "ม.ค.",
      "ก.พ."
    ],
    "planMonthly": [],
    "actualMonthly": []
  },
  "segmentStatus": {
    "S2": "progress"
  },
  "curated": {},
  "daily": [
    {
      "date": "28 ก.ค. 2569",
      "iso": "2569-07-28",
      "day": 28,
      "dayEnd": 28,
      "month": 7,
      "year": 2569,
      "text": "1. วางท่อ PVC ϕ300 มม. 18 ท่อน (~108 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22x0.22x6.00 ม. 80 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว — บริเวณ STA.1+600-3+500 (โดยประมาณ, รอยืนยันทิศทาง chainage)",
      "segs": [
        "S2"
      ],
      "meters": 108,
      "holiday": false,
      "unconfirmed": true,
      "reportUrl": "https://drive.google.com/file/d/1wGTxO67wDUcodj6zt8BF6Q7Bllf7wzdg/view?usp=drivesdk"
    },
    {
      "date": "29 ก.ค. 2569",
      "iso": "2569-07-29",
      "day": 29,
      "dayEnd": 29,
      "month": 7,
      "year": 2569,
      "text": "1. วางท่อ PVC ϕ300 มม. 18 ท่อน (~108 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22x0.22x6.00 ม. 80 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว, ติดตั้ง Support 30 หัว — บริเวณ STA.2+150-3+300 (โดยประมาณ, รอยืนยันทิศทาง chainage)",
      "segs": [
        "S2"
      ],
      "meters": 108,
      "holiday": false,
      "unconfirmed": true,
      "reportUrl": "https://drive.google.com/file/d/1dfeysGIbr5DdXbq4mKNbd_QYGQj7K9nA/view?usp=drivesdk"
    },
    {
      "date": "30 ก.ค. 2569",
      "iso": "2569-07-30",
      "day": 30,
      "dayEnd": 30,
      "month": 7,
      "year": 2569,
      "text": "1. วางท่อ PVC ϕ300 มม. 13 ท่อน (~78 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22x0.22x6.00 ม. 80 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว, ติดตั้ง Support 30 หัว — บริเวณ STA.1+300-3+200 (โดยประมาณ, รอยืนยันทิศทาง chainage) — หมายเหตุ: ยอดสะสมในรายงานฉบับนี้กระโดดผิดปกติเทียบวันก่อนหน้า ต้องตรวจสอบกับต้นฉบับ",
      "segs": [
        "S2"
      ],
      "meters": 78,
      "holiday": false,
      "unconfirmed": true,
      "reportUrl": "https://drive.google.com/file/d/1bqTb98_2-g6LOP7bwzabEWWjP90RF_ql/view?usp=drivesdk"
    },
    {
      "date": "31 ก.ค. 2569",
      "iso": "2569-07-31",
      "day": 31,
      "dayEnd": 31,
      "month": 7,
      "year": 2569,
      "text": "1. วางท่อ PVC ϕ300 มม. 13 ท่อน (~78 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22x0.22x6.00 ม. 36 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว, ติดตั้ง Support 30 หัว — บริเวณ STA.1+100-3+100 (โดยประมาณ, รอยืนยันทิศทาง chainage)",
      "segs": [
        "S2"
      ],
      "meters": 78,
      "holiday": false,
      "unconfirmed": true,
      "reportUrl": "https://drive.google.com/file/d/1pvu4xpB-aybkZzV7UcaagAIpzxMTOWAq/view?usp=drivesdk"
    }
  ],
  "pipelineProgress": {
    "asOf": "2569-07-31",
    "verified": false,
    "note": "ความยาวแต่ละขั้นตอน (สะสมถึงวันที่กำกับ asOf) — กดเข็ม/ติดตั้ง support แปลงจากจำนวนต้น/หัว × 2.5 ม. (ระยะติดตั้งทุก 2.5 ม.) · วางท่อ PVC = ยอดสะสมช่อง PVC ในใบรายงาน · ขั้นตอนที่ยังไม่เริ่มระบุ 0 · targetLen อ้าง BOQ ซึ่งยังรอยืนยัน — ทุกค่า Verify Before Use",
    "types": [
      {
        "id": "PVC300",
        "type": "PVC",
        "dia": 300,
        "targetLen": 925,
        "targetNote": "BOQ PVC ϕ300 (รอยืนยัน)",
        "stages": [
          {
            "key": "lay",
            "order": 1,
            "name": "วางท่อ PVC",
            "len": 480,
            "basis": "ยอดสะสมช่อง PVC ในใบรายงาน ถึง 31 ก.ค. 2569"
          },
          {
            "key": "test",
            "order": 2,
            "name": "ทดสอบท่อและล้างท่อฆ่าเชื้อโรค",
            "len": 0,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          },
          {
            "key": "tiein",
            "order": 3,
            "name": "ตัดบรรจบท่อ",
            "len": 0,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          }
        ]
      },
      {
        "id": "AC300",
        "type": "AC",
        "dia": 300,
        "targetLen": 2233,
        "targetNote": "BOQ AC ϕ300 (รอยืนยัน)",
        "stages": [
          {
            "key": "pile",
            "order": 1,
            "name": "กดเสาเข็ม",
            "len": 890,
            "count": 356,
            "unitName": "ต้น",
            "pitch": 2.5,
            "basis": "356 ต้น × 2.5 ม."
          },
          {
            "key": "support",
            "order": 2,
            "name": "ติดตั้ง Support",
            "len": 300,
            "count": 120,
            "unitName": "หัว",
            "pitch": 2.5,
            "basis": "120 หัว × 2.5 ม."
          },
          {
            "key": "lay",
            "order": 3,
            "name": "วางท่อประปา (AC)",
            "len": 0,
            "basis": "ช่อง AC ในใบรายงานยังเป็น 0"
          },
          {
            "key": "test",
            "order": 4,
            "name": "ทดสอบท่อและล้างท่อฆ่าเชื้อโรค",
            "len": 0,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          },
          {
            "key": "tiein",
            "order": 5,
            "name": "ตัดบรรจบท่อ",
            "len": 0,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          }
        ]
      },
      {
        "id": "ST300",
        "type": "ST",
        "dia": 300,
        "targetLen": 543,
        "targetNote": "BOQ ST ϕ300 (รอยืนยัน)",
        "stagesPending": true,
        "stages": [
          {
            "key": "lay",
            "order": 1,
            "name": "วางท่อเหล็กเหนียว (ST)",
            "len": 0,
            "basis": "ช่อง ST ในใบรายงานยังเป็น 0 · ลำดับขั้นตอน ST ยังรอผู้ใช้ยืนยัน"
          },
          {
            "key": "test",
            "order": 2,
            "name": "ทดสอบท่อและล้างท่อฆ่าเชื้อโรค",
            "len": 0,
            "basis": "—"
          },
          {
            "key": "tiein",
            "order": 3,
            "name": "ตัดบรรจบท่อ",
            "len": 0,
            "basis": "—"
          }
        ]
      }
    ]
  }
};
console.log("[PID-903(R1)] build 2569-07-31 rev3 | pipelineProgress: "+DATA.pipelineProgress.types.length+" types | PVC laid: 480 m");
