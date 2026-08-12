/* ============================================================================
   PID-903(R1) DASHBOARD DATA — rev3-fix
   Generated: 12 สิงหาคม 2569 (คำสั่ง "อัพเดท 903" — แก้ schema ตาม index.html จริง)
   As-of ข้อมูลภาคสนาม: 10 สิงหาคม 2569

   แก้ไขจาก rev3: โครงสร้างคีย์ทั้งหมดตรวจสอบจริงจากไฟล์ index.html ที่ผู้ใช้แนบมา
   (เดิม rev3 เดาโครงสร้างผิด ทำให้หน้า "รายงานรายวัน" และ "ภาพรวมความก้าวหน้า" ว่างเปล่า)
   ตัวเลขสะสมทั้งหมดคงเดิมจาก rev3 ไม่มีการเปลี่ยนแปลงค่า — แก้เฉพาะ schema
   ============================================================================ */

/* PID903_ASOF: ใช้เป็น el.textContent ตรงๆ ใน index.html บรรทัด 424 — ต้องเป็น string เปล่า */
const PID903_ASOF = "10 ส.ค. 2569";

/* PID903_PIPES: index.html อ่านเฉพาะ PVC.laidM, AC.pileCount, AC.supportCount (ค่าสะสมล่าสุด) */
const PID903_PIPES = {
  PVC: { laidM: 516 },
  AC:  { pileCount: 472, supportCount: 255 }
};

/* PID903_DAILY: แต่ละแถว = { date, month, segs[], text, meters, unconfirmed, reportUrl } */
const PID903_DAILY = [
  { date:"28 ก.ค. 2569", month:7, segs:["วางท่อ PVC","กดเสาเข็ม","ผลิตหัว Support"],
    text:"วางท่อ PVC 80 ม. (กม.1+702–1+750, 3+490–3+550) · กดเสาเข็ม 108 ต้น (กม.1+500–1+600, 1+900–2+000) · ผลิตหัว Support รับท่อ AC 30 หัว (กม.1+900–1+975)",
    meters:350, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1TS69WEoUGcjozv8SVoFXIZnYri98pVwy/view" },

  { date:"29 ก.ค. 2569", month:7, segs:["วางท่อ PVC","กดเสาเข็ม","ผลิตหัว Support","ติดตั้ง Support"],
    text:"วางท่อ PVC 80 ม. (กม.1+850–1+898, 3+430–3+490) · กดเสาเข็ม 108 ต้น (กม.1+400–1+500, 2+000–2+250) · ผลิตหัว Support 30 หัว (กม.1+980–2+155) · ติดตั้งหัว Support 30 หัว (กม.1+900–1+970)",
    meters:425, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1XOqCm4J5VRceNkcW-zlKOITAS91mQ99W/view" },

  { date:"30 ก.ค. 2569", month:7, segs:["กดเสาเข็ม","ผลิตหัว Support","ติดตั้ง Support","วางท่อ PVC"],
    text:"กดเสาเข็ม 90 ต้น (กม.2+250–2+450, 1+300–1+400) · ผลิตหัว Support 30 หัว (กม.2+160–2+230) · ติดตั้งหัว Support 40 หัว (กม.1+970–2+040) · ท่อ PVC: มีรายงานวางท่อแต่ปริมาณวันนี้ยังไม่ยืนยัน (ยอดรวม 3 วัน 30/7–1/8 คลาดเคลื่อน 66 ม. จากยอดสะสมหัวรายงาน — รอ C7 ตรวจสอบ)",
    meters:325, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1aN32_PfPTJ6iRopwnJew8uwQrXNJnjCP/view" },

  { date:"31 ก.ค. 2569", month:7, segs:["กดเสาเข็ม","ผลิตหัว Support","ติดตั้ง Support","วางท่อ PVC"],
    text:"กดเสาเข็ม 90 ต้น (กม.2+700–2+800) · ผลิตหัว Support 30 หัว (กม.2+230–2+305) · ติดตั้งหัว Support 30 หัว (กม.2+040–2+100) · ท่อ PVC: ปริมาณวันนี้ยังไม่ยืนยัน (ดูหมายเหตุ 30 ก.ค.)",
    meters:300, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1KYHlz-BHXrx4M3pA9z4UBXNT9Gq7RqiV/view" },

  { date:"1 ส.ค. 2569", month:8, segs:["กดเสาเข็ม","ผลิตหัว Support","ติดตั้ง Support","วางท่อ PVC"],
    text:"กดเสาเข็ม 42 ต้น · ผลิตหัว Support 30 หัว (กม.2+305–2+405) · ติดตั้งหัว Support 30 หัว (กม.2+100–2+175) · ท่อ PVC: ปริมาณวันนี้ยังไม่ยืนยัน (ดูหมายเหตุ 30 ก.ค.)",
    meters:180, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1jpJyT1_lYoZF-yrxOb4ysz2YgtoWLLEE/view" },

  { date:"2 ส.ค. 2569", month:8, segs:["วางท่อ PVC","ผลิตหัว Support","ติดตั้ง Support"],
    text:"วางท่อ PVC 42 ม. (กม.3+208–3+250) — ยอดสะสมท่อ PVC ยืนยันชัดเจนที่ 480 ม. ณ วันนี้ · ผลิตหัว Support 30 หัว (กม.2+405–2+480) · ติดตั้งหัว Support 30 หัว (กม.2+100–2+175)",
    meters:117, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1xd8LscDrHU9LoNEXFKWiMdTO8PRI5QTq/view" },

  { date:"3 ส.ค. 2569", month:8, segs:["กดเสาเข็ม","ผลิตหัว Support","ติดตั้ง Support"],
    text:"กดเสาเข็ม 35 ต้น (กม.1+200, 1+510–1+600) · ผลิตหัว Support 30 หัว (กม.2+485–2+560) · ติดตั้งหัว Support 40 หัว (กม.2+200–2+300)",
    meters:187.5, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1G_lqW82JyP1orbguMqb2eQA_6XN9l7Cq/view" },

  { date:"4 ส.ค. 2569", month:8, segs:["กดเสาเข็ม","ผลิตหัว Support"],
    text:"กดเสาเข็ม 15 ต้น (กม.1+200, 1+510–1+600) · ผลิตหัว Support 30 หัว (กม.2+600–2+850)",
    meters:37.5, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1GdcbXxqXPRVbWmV7gKqPj9cq9GxtzCMF/view" },

  { date:"5 ส.ค. 2569", month:8, segs:["กดเสาเข็ม","ผลิตหัว Support"],
    text:"กดเสาเข็ม 15 ต้น (กม.1+200, 1+050–1+120) · ผลิตหัว Support 30 หัว (กม.2+600–2+850)",
    meters:37.5, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1pGQjovxhf6GM8IbRamgfdSuQbrhwNuJJ/view" },

  { date:"6 ส.ค. 2569", month:8, segs:["กดเสาเข็ม","ผลิตหัว Support"],
    text:"กดเสาเข็ม 21 ต้น (กม.1+200, 1+050–1+120) · ผลิตหัว Support 30 หัว (กม.2+600–2+850)",
    meters:52.5, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1SiubJFTiNHK2-4EqpVKn2Emihc8db1Sp/view" },

  { date:"7 ส.ค. 2569", month:8, segs:["เคลียร์พื้นที่","ผลิตหัว Support"],
    text:"เคลียร์ถางป่ากันแนววางท่อ AC (กม.0+700–0+800) · ผลิตหัว Support รับท่อ AC 30 หัว (กม.1+500–1+575)",
    meters:0, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1qf9LYgNFjVER_X_EUC5vgJeMZOGH9utx/view" },

  { date:"8 ส.ค. 2569", month:8, segs:["ผลิตหัว Support","ติดตั้ง Support"],
    text:"ติดตั้งหัว Support รับท่อ AC 50 หัว (กม.2+300–2+425) · ผลิตหัว Support 30 หัว (กม.1+050–1+225)",
    meters:125, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1LJ3SpC8rYK5RbFByMLZ_H7sL_DNRo79L/view" },

  { date:"9 ส.ค. 2569", month:8, segs:["วางท่อ PVC"],
    text:"วางท่อ PVC ϕ300 มม. 36 ม. 6 ท่อน (กม.3+000–3+036) — ยอดสะสมท่อ PVC ขยับเป็น 516 ม. หลังหยุดนิ่ง 5 วัน",
    meters:36, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1ADH0Kbz8P2-9DNy-ryZSZ9lzE2VXTeWi/view" },

  { date:"10 ส.ค. 2569", month:8, segs:["กดเสาเข็ม","ผลิตหัว Support","ติดตั้ง Support"],
    text:"กดเสาเข็ม 30 ต้น (กม.0+720–0+795 — เปิดหน้างานใหม่ฝั่งซอยเก้าแสน) · ผลิตหัว Support 10 หัว · ติดตั้งหัว Support รับท่อ AC 15 หัว",
    meters:112.5, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1HLvLyOViiMDjcrnjpkwdhM7dQDBG_kwa/view" }
];
