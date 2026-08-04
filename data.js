/* ============================================================
   PID-903(R1) — data.js  (Single Source of Truth)
   Generated : 2569-07-31 rev9
   Records   : 4  (last: 31 กรกฎาคม 2569)
   Note      : rev9 — ยืนยันฐานงวด 30% ของงานเตรียมการ = (AC+PVC+ST)/19,420,000
               ยืนยันส่งมอบสำนักงานสนาม+ป้ายจราจรครบถ้วนแล้ว (งวด 70% confirmed)
               ตัวเลขยังเท่าเดิม (ST=0 ขณะนี้): prep earned 447,515.41 | รวม 1,974,987.25 = 10.17%
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
    "actualAsOf": null,
    "contractBaseValue": 19420000,
    "contractBaseValueBasis": "ยืนยัน 2 ทางตรงกัน: (ก) ผลรวมราคา BOQ ทั้ง 25 หมวด (ผนวก 3) = 19,420,004.15 บาท (ข) หลักประกันสัญญา 971,000 / 5% = 19,420,000 บาท — ใช้เป็นฐานคำนวณ % ความก้าวหน้าเชิงมูลค่า",
    "contractTotalInclVat": 19520000,
    "contractTotalInclVatNote": "ข้อ 4(ก) ของสัญญา: ค่าจ้างรวม VAT 19,520,000.00 บาท (VAT 1,278,167.29) -> ฐานก่อน VAT ตามข้อสัญญา = 18,241,832.71 ซึ่งไม่เท่ากับฐาน BOQ 19,420,000 พอดี (ต่าง ~1.18 ล้านบาท) — ยังไม่ resolve กลไก VAT/Factor F ที่แท้จริง แต่ฐาน 19,420,000 ยืนยันแล้วว่าถูกต้องสำหรับใช้คำนวณ % เพราะตรงกับหลักประกันสัญญาโดยตรง"
  },
  "provenance": {
    "verifiedNote": "อายุสัญญา 210 วัน · NTP 27 ก.ค. 2569 · สิ้นสุด 22 ก.พ. 2570 — ยืนยันแล้ว · ปริมาณ Pipe Schedule ทุกชนิด ยืนยันตรงกับผนวก 3 (ใบแจ้งปริมาณงานและราคา) แล้ว · ฐานคำนวณ % มูลค่างาน = 19,420,000 บาท ยืนยัน 2 ทางตรงกัน (ผลรวม BOQ + หลักประกันสัญญา)",
    "pending": [
      "ส่วนต่าง 19,520,000 (ข้อ4(ก) รวม VAT) กับฐาน BOQ 19,420,000 (~1.18 ล้านบาท หลัง หัก VAT ตามสัญญา) — กลไก Factor F/VAT ยังไม่ resolve",
      "จุดแบ่งช่วง Chainage (breakpoints) — ยังต้องยืนยันภาคสนาม/แบบ 600 DPI และทิศทางที่ถูกต้อง",
      "ผลต่างความยาวแนวสาย 3,665 ม. กับผลรวม Pipe Schedule 4,146 ม. — ยังไม่ resolve (ปกติสำหรับงานที่มีท่อหลายชนิดซ้อนแนวเดียวกัน)",
      "แผนงานหลัก (Master Schedule) S-Curve รายเดือน — รอป้อนจากตารางแผนงาน/งวดงานที่อนุมัติ",
      "STA. ของงานวางท่อในรายงานประจำวัน — ยังไม่ระบุ ทำให้ต้องใช้ราคาเฉลี่ยถ่วงน้ำหนักแทนราคาตามรูปแบบจริง"
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
      "note": "ใต้ไหล่ทาง (ราชการ) — item 3.1.1(1)"
    },
    {
      "type": "PVC",
      "dia": 300,
      "len": 925,
      "note": "item 3 รวม 3 รูปแบบ (ไหล่ทาง/ถนน/ทางเท้า) — ตรงกับ BOQ"
    },
    {
      "type": "AC",
      "dia": 300,
      "len": 2233,
      "note": "item 9 วางในคูน้ำ เสาเข็มเดี่ยว 5/6/7ม. — ตรงกับ BOQ (PVC ไม่มีรายการในคูน้ำ)"
    },
    {
      "type": "ST",
      "dia": 300,
      "len": 543,
      "note": "item 10 รวม 10 รูปแบบการวาง — ตรงกับ BOQ"
    },
    {
      "type": "HDPE",
      "dia": 315,
      "len": 353,
      "note": "item 2 ท่อชั่วคราว — ตรงกับ BOQ"
    },
    {
      "type": "ST",
      "dia": 600,
      "len": 80,
      "note": "item 11.1 ท่อปลอก (ดันท่อลอด) — ตรงกับ BOQ"
    }
  ],
  "pipeScheduleVerified": true,
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
    "note": "น้ำหนักงวด/ขั้นตอนเป็นตัวเลขภายในที่ผู้ใช้กำหนดสำหรับประเมินผลงาน ไม่ใช่รายการแยกใน BOQ (BOQ มีราคาต่อเมตรของ \"ท่อที่วางเสร็จ\" เพียงรายการเดียวต่อรูปแบบ ไม่ได้แยกราคากดเข็ม/support ต่างหาก) กดเข็ม/ติดตั้ง support แปลงจากจำนวนต้น/หัว x 2.5 ม. — ทุกค่ายัง verified:false",
    "types": [
      {
        "id": "PVC300",
        "type": "PVC",
        "dia": 300,
        "targetLen": 925,
        "targetNote": "BOQ item 3 (ยืนยันแล้ว)",
        "avgPrice": 2556.9903,
        "contractValue": 2365216.05,
        "stages": [
          {
            "key": "lay",
            "order": 1,
            "name": "วางท่อ PVC",
            "len": 480,
            "weight": 70,
            "basis": "ยอดสะสมช่อง PVC ในใบรายงาน ถึง 31 ก.ค. 2569"
          },
          {
            "key": "test",
            "order": 2,
            "name": "ทดสอบท่อ",
            "len": 0,
            "weight": 10,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          },
          {
            "key": "wash",
            "order": 3,
            "name": "ล้างท่อฆ่าเชื้อโรค",
            "len": 0,
            "weight": 10,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          },
          {
            "key": "tiein",
            "order": 4,
            "name": "ตัดบรรจบท่อ",
            "len": 0,
            "weight": 10,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          }
        ],
        "actualUnitPrice": 2647.68,
        "actualUnitPriceBasis": "ยืนยันโดยผู้ใช้: งาน PVC ที่วางไปแล้วทั้งหมด (480 ม.) อยู่ใต้ไหล่ทาง (BOQ item 3.1.1(2)) — ใช้ราคานี้คำนวณมูลค่างานที่ทำได้จริง"
      },
      {
        "id": "AC300",
        "type": "AC",
        "dia": 300,
        "targetLen": 2233,
        "targetNote": "BOQ item 9 — เฉพาะ AC (ไม่มีรายการ PVC ในคูน้ำใน BOQ)",
        "avgPrice": 2843.0311,
        "contractValue": 6348488.36,
        "stages": [
          {
            "key": "pile",
            "order": 1,
            "name": "กดเสาเข็ม",
            "len": 890,
            "count": 356,
            "unitName": "ต้น",
            "pitch": 2.5,
            "weight": 20,
            "basis": "356 ต้น x 2.5 ม."
          },
          {
            "key": "support",
            "order": 2,
            "name": "ติดตั้ง Support",
            "len": 300,
            "count": 120,
            "unitName": "หัว",
            "pitch": 2.5,
            "weight": 15,
            "basis": "120 หัว x 2.5 ม."
          },
          {
            "key": "lay",
            "order": 3,
            "name": "วางท่อประปา (AC)",
            "len": 0,
            "weight": 35,
            "basis": "ช่อง AC ในใบรายงานยังเป็น 0"
          },
          {
            "key": "test",
            "order": 4,
            "name": "ทดสอบท่อ",
            "len": 0,
            "weight": 10,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          },
          {
            "key": "wash",
            "order": 5,
            "name": "ล้างท่อฆ่าเชื้อโรค",
            "len": 0,
            "weight": 10,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          },
          {
            "key": "tiein",
            "order": 6,
            "name": "ตัดบรรจบท่อ",
            "len": 0,
            "weight": 10,
            "basis": "ยังไม่พบรายงานกิจกรรมนี้"
          }
        ],
        "actualUnitPrice": 2860.32,
        "actualUnitPriceBasis": "ยืนยันโดยผู้ใช้: งานหน้างานปัจจุบันใช้เสาเข็มยาว 6 ม. ทั้งหมด (BOQ item 9.2) — ใช้ราคานี้คำนวณมูลค่างานที่ทำได้จริง แทนราคาเฉลี่ยถ่วงน้ำหนักซึ่งใช้เฉพาะเป็นฐานมูลค่าเป้าหมายรวม (target value)"
      },
      {
        "id": "ST300",
        "type": "ST",
        "dia": 300,
        "targetLen": 543,
        "targetNote": "BOQ item 10 (ยืนยันแล้ว) — งานวางหลายรูปแบบ",
        "avgPrice": 5668.668,
        "contractValue": 3078086.71,
        "stagesPending": true,
        "stages": [
          {
            "key": "lay",
            "order": 1,
            "name": "วางท่อ ST (ขั้นตอนเดียวก่อน)",
            "len": 0,
            "basis": "ช่อง ST ในใบรายงานยังเป็น 0 · ยังไม่คำนวณ % มูลค่า ตามคำสั่งผู้ใช้"
          }
        ]
      }
    ],
    "prep": {
      "id": "PREP",
      "name": "งานเตรียมการ",
      "boqItem": "1.1 ค่าสำนักงานสนามและเครื่องใช้",
      "unit": "เหมาจ่าย",
      "qty": 1,
      "value": 618460,
      "paymentTerms": {
        "source": "เอกสารประกวดราคา ชุดที่ 3/4 ใบแจ้งปริมาณงานและราคาฯ (ปกสีชมพู) เอกสารแนบท้าย \"ข\" ข้อ 4.1",
        "text": "จ่ายร้อยละ 70 เมื่อส่งมอบสำนักงานสนามและเครื่องใช้ต่างๆ และจัดทำป้ายสัญญาณจราจรครบถ้วน · ส่วนที่เหลือร้อยละ 30 จ่ายเป็นงวดเดือนตามร้อยละของผลงานที่ทำได้",
        "pct1": 70,
        "pct2": 30,
        "confirmed": true
      },
      "milestone1Met": true,
      "milestone1Basis": "ผู้รับจ้างส่งมอบสำนักงานสนามและเครื่องใช้ และจัดทำป้ายสัญญาณจราจรครบถ้วนแล้ว (ยืนยันโดยผู้ใช้)",
      "progressBasisNote": "ยืนยันโดยผู้ใช้: ร้อยละของผลงานที่ทำได้ = (มูลค่างาน AC + มูลค่างาน PVC + มูลค่างาน ST) / 19,420,000 — คำนวณจากมูลค่างานวางท่อทั้ง 3 ชนิดรวมกัน หารด้วยฐานสัญญา (ไม่รวมมูลค่างานเตรียมการเอง)",
      "earned": 447515.41,
      "earned70": 432922,
      "earned30": 14593.41,
      "pctOfOwnValue": 72.36
    },
    "summaryOrder": [
      "PREP",
      "AC300",
      "PVC300",
      "ST300"
    ],
    "overall": {
      "contractBase": 19420000,
      "totalEarned": 1974987.25,
      "pctOfContract": 10.17,
      "breakdown": [
        {
          "id": "PREP",
          "name": "งานเตรียมการ",
          "earned": 447515.41,
          "pctOfContract": 2.3
        },
        {
          "id": "AC300",
          "name": "งานวางท่อ AC",
          "earned": 637851.36,
          "pctOfContract": 3.28
        },
        {
          "id": "PVC300",
          "name": "งานวางท่อ PVC",
          "earned": 889620.48,
          "pctOfContract": 4.58
        },
        {
          "id": "ST300",
          "name": "งานวางท่อ ST",
          "earned": 0,
          "pctOfContract": 0
        }
      ]
    }
  },
  "boqPricing": {
    "asOf": "ผนวก 3 ใบแจ้งปริมาณงานและราคา (แนบท้ายสัญญา PID-903(R1))",
    "PVC300": {
      "len": 925,
      "value": 2365216.05,
      "avgPrice": 2556.9903,
      "subItems": [
        {
          "name": "ใต้ไหล่ทาง (ราชการ)",
          "len": 316,
          "price": 2647.68
        },
        {
          "name": "ใต้ถนนคอนกรีต/ปูทับแอสฟัลต์ (ราชการ)",
          "len": 12,
          "price": 2860.32
        },
        {
          "name": "ใต้ทางเท้า",
          "len": 597,
          "price": 2502.89
        }
      ]
    },
    "AC300": {
      "len": 2233,
      "value": 6348488.36,
      "avgPrice": 2843.0311,
      "subItems": [
        {
          "name": "ในคูน้ำ เสาเข็มยาว 5 ม.",
          "len": 420,
          "price": 2758.55
        },
        {
          "name": "ในคูน้ำ เสาเข็มยาว 6 ม.",
          "len": 1773,
          "price": 2860.32
        },
        {
          "name": "ในคูน้ำ เสาเข็มยาว 7 ม.",
          "len": 40,
          "price": 2963.75
        }
      ]
    },
    "ST300": {
      "len": 543,
      "value": 3078086.71,
      "avgPrice": 5668.668,
      "subItems": [
        {
          "name": "ข้ามคลอง โครงสร้างคอนกรีตรับท่อ",
          "len": 46,
          "price": 8993.01
        },
        {
          "name": "ใต้ไหล่ทาง (ราชการ)",
          "len": 137,
          "price": 4870.9
        },
        {
          "name": "ใต้ถนนคอนกรีต (ราชการ)",
          "len": 177,
          "price": 5083.55
        },
        {
          "name": "ใต้ถนนแอสฟัลต์ (ราชการ)",
          "len": 12,
          "price": 5182.83
        },
        {
          "name": "ใต้ถนนคอนกรีต (เอกชน)",
          "len": 13,
          "price": 4598.69
        },
        {
          "name": "ใต้ทางเท้า",
          "len": 1,
          "price": 4726.11
        },
        {
          "name": "ลอดถนน/ทางรถไฟ ท่อปลอกเหล็กเหนียว",
          "len": 80,
          "price": 6136
        },
        {
          "name": "ในคูน้ำ เสาเข็ม 5 ม.",
          "len": 30,
          "price": 4816.3
        },
        {
          "name": "ในบ่อดินหรือบ่อรับ",
          "len": 24,
          "price": 5726.44
        },
        {
          "name": "ในคูน้ำ รูปแบบ A (PID-903(R1)-D1/68)",
          "len": 23,
          "price": 8600
        }
      ]
    },
    "note": "ราคาต่อเมตรแยกตามรูปแบบ/ตำแหน่งวาง — avgPrice เป็นราคาเฉลี่ยถ่วงน้ำหนักทั้งชนิดท่อ ใช้เมื่อยังไม่ทราบว่าเมตรที่ทำได้อยู่ในรูปแบบใด (ยังต้องยืนยัน STA ของงานจริงเพื่อเลือกราคาตรงรูปแบบ)"
  }
};
console.log("[PID-903(R1)] build 2569-07-31 rev9 | overall: "+DATA.pipelineProgress.overall.pctOfContract+"%");
