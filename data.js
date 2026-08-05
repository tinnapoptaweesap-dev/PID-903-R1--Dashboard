/**
 * data.js — Single Source of Truth สำหรับ Dashboard สัญญา PID-903(R1)
 * ไฟล์นี้เป็นไฟล์เดียวที่ต้องอัปเดตทุกครั้งที่สั่ง "อัพเดท 903"
 * ห้ามแก้ index.html ซ้ำ เว้นแต่โครงสร้างหน้าเว็บเปลี่ยน
 *
 * อัปเดตล่าสุด: 5 ส.ค. 2569 · ข้อมูลถึงวันที่ 3 ส.ค. 2569
 * แหล่งข้อมูล: ใบรายงานประจำวันผู้รับจ้าง (Drive: 01_Reports_Inbox) — vision-read จากต้นฉบับ
 * สถานะ: unconfirmed ทั้งหมด รอยืนยันภาคสนามอย่างเป็นทางการ
 */

const PID903_ASOF = "3 ส.ค. 2569";

// ---- ผลงานสะสมเชิงกายภาพ ณ วันที่ล่าสุด (ตัวเลขดิบ — index.html คำนวณ % และมูลค่าเอง) ----
const PID903_PIPES = {
  PVC: { laidM: 480 },                    // วางท่อ PVC สะสม (ม.)
  AC:  { pileCount: 391, supportCount: 190 } // กดเสาเข็ม (ต้น) / ติดตั้ง Support (หัว) — ×2.5 ม. ในหน้าเว็บ
};

// ---- ใบรายงานประจำวัน (แท็บ "รายงานรายวัน") — เรียงเก่า→ใหม่ ----
const PID903_DAILY = [
  { iso:"2569-07-28", date:"28 ก.ค. 2569", month:7,
    text:"1. วางท่อ PVC ϕ300 มม. 18 ท่อน (~108 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22×0.22×6.00 ม. 80 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว — บริเวณ STA.1+600–3+500 (โดยประมาณ)",
    segs:["S2"], meters:108, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1wGTxO67wDUcodj6zt8BF6Q7Bllf7wzdg/view" },
  { iso:"2569-07-29", date:"29 ก.ค. 2569", month:7,
    text:"1. วางท่อ PVC ϕ300 มม. 18 ท่อน (~108 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22×0.22×6.00 ม. 80 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว, ติดตั้ง Support 30 หัว — บริเวณ STA.2+150–3+300 (โดยประมาณ)",
    segs:["S2"], meters:108, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1dfeysGIbr5DdXbq4mKNbd_QYGQj7K9nA/view" },
  { iso:"2569-07-30", date:"30 ก.ค. 2569", month:7,
    text:"1. วางท่อ PVC ϕ300 มม. 13 ท่อน (~78 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22×0.22×6.00 ม. 80 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว, ติดตั้ง Support 30 หัว — บริเวณ STA.1+300–3+200 (โดยประมาณ) — หมายเหตุ: ยอดสะสมในรายงานฉบับนี้กระโดดผิดปกติเทียบวันก่อนหน้า ต้องตรวจสอบกับต้นฉบับ",
    segs:["S2"], meters:78, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1bqTb98_2-g6LOP7bwzabEWWjP90RF_ql/view" },
  { iso:"2569-07-31", date:"31 ก.ค. 2569", month:7,
    text:"1. วางท่อ PVC ϕ300 มม. 13 ท่อน (~78 ม.) 2. กดเสาเข็มสี่เหลี่ยม 0.22×0.22×6.00 ม. 36 ต้น 3. หล่อหัว Support รับท่อ AC 30 หัว, ติดตั้ง Support 30 หัว — บริเวณ STA.1+100–3+100 (โดยประมาณ)",
    segs:["S2"], meters:78, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1pvu4xpB-aybkZzV7UcaagAIpzxMTOWAq/view" },
  { iso:"2569-08-01", date:"1 ส.ค. 2569", month:8,
    text:"1. หล่อหัว Support รับท่อ AC 30 หัว 2. ติดตั้งหัว Support รับท่อ AC 30 หัว (STA.2+100) 3. งานเคลียร์ถางป่า — ไม่มีงานกดเสาเข็ม/วางท่อ PVC เพิ่มเติมวันนี้",
    segs:["S2"], meters:0, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1W8JFOlvSiG1w7yjU0Gfde5zdf8sLZiep/view" },
  { iso:"2569-08-03", date:"3 ส.ค. 2569", month:8,
    text:"1. กดเสาเข็มสี่เหลี่ยม 0.22×0.22×6.00 ม. 35 ต้น (STA.1+100–1+200) 2. หล่อหัว Support รับท่อ AC 30 หัว 3. ติดตั้งหัว Support รับท่อ AC 40 หัว (STA.2+200) — หมายเหตุ: 2 ส.ค. (วันอาทิตย์) ไม่มีรายงาน; ไม่มีงานวางท่อ PVC เพิ่มเติมตั้งแต่ 31 ก.ค.",
    segs:["S2"], meters:0, unconfirmed:true,
    reportUrl:"https://drive.google.com/file/d/1Wc3J_7L8HYovy-7Ib8hjuAkZL5JN_dvC/view" },
];
