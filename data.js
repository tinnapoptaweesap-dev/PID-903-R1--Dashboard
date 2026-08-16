// PID903_DATA — Dashboard data layer
// อัพเดทล่าสุด: 14 ส.ค. 2569 (จากใบรายงานผลงานประจำวันผู้รับจ้าง 28 ก.ค.–14 ส.ค. 2569, Google Drive inbox)
// หมายเหตุ: สร้างใหม่ทั้งไฟล์ (reconstruct) เนื่องจากไม่มี data.js ฉบับก่อนหน้าอยู่ใน session นี้
// ตัวเลขสะสม (cumulative) ไขว้ตรวจสอบข้ามวันแล้วทุกจุด (chain-consistency check) ยกเว้นที่ระบุ unconfirmed

const PID903_ASOF = "14 ส.ค. 2569";

const PID903_PIPES = {
  PVC: { laidM: 534 },
  AC:  { pileCount: 519, supportCount: 275 }
};

const PID903_DAILY = [
  { date: "28 ก.ค. 2569", month: 7,
    segs: ["1+702-1+750", "3+490-3+550", "1+500-1+600", "1+900-2+000", "1+900-1+975"],
    text: "เริ่มบันทึกผลงานวันแรกหลัง NTP: วางท่อ PVC Ø300 มม. STA.1+702-1+750 และ STA.3+490-3+550 (รวม 108 ม.) · กดเสาเข็มสี่เหลี่ยม 0.22×0.22×6.00 ม. STA.1+500-1+600, STA.1+900-2+000 · หล่อหัว Support รับท่อ AC STA.1+900-1+975",
    meters: 108, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1TS69WEoUGcjozv8SVoFXIZnYri98pVwy/view?usp=drivesdk" },

  { date: "29 ก.ค. 2569", month: 7,
    segs: ["1+850-1+898", "3+430-3+490", "1+400-1+500", "2+000-2+250", "1+980-2+155", "1+900-1+970"],
    text: "วางท่อ PVC Ø300 มม. STA.1+850-1+898 และ STA.3+430-3+490 (รวม 108 ม., สะสม 216 ม.) · กดเสาเข็ม STA.1+400-1+500, STA.2+000-2+250 · หล่อหัว Support STA.1+980-2+155 · ติดตั้ง Support STA.1+900-1+970",
    meters: 108, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1XOqCm4J5VRceNkcW-zlKOITAS91mQ99W/view?usp=drivesdk" },

  { date: "30 ก.ค. 2569", month: 7,
    segs: ["1+672-1+702", "3+370-3+430", "2+250-2+450", "1+300-1+400", "2+160-2+230", "1+970-2+040"],
    text: "วางท่อ PVC Ø300 มม. STA.1+672-1+702 และ STA.3+370-3+430 (สะสม 306 ม.) — อยู่ในช่วงที่พบส่วนต่างปริมาณ PVC 66 ม. รอยืนยัน C7 · กดเสาเข็ม STA.2+250-2+450, STA.1+300-1+400 · หล่อหัว Support STA.2+160-2+230 · ติดตั้ง Support STA.1+970-2+040",
    meters: 90, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1aN32_PfPTJ6iRopwnJew8uwQrXNJnjCP/view?usp=drivesdk" },

  { date: "31 ก.ค. 2569", month: 7,
    segs: ["1+600-1+630", "3+300-3+360", "2+700-2+800", "2+230-2+305", "2+040-2+100"],
    text: "วางท่อ PVC Ø300 มม. STA.1+600-1+630 และ STA.3+300-3+360 (สะสม 396 ม.) — อยู่ในช่วงที่พบส่วนต่างปริมาณ PVC 66 ม. รอยืนยัน C7 · กดเสาเข็ม STA.2+700-2+800 · หล่อหัว Support STA.2+230-2+305 · ติดตั้ง Support STA.2+040-2+100",
    meters: 90, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1KYHlz-BHXrx4M3pA9z4UBXNT9Gq7RqiV/view?usp=drivesdk" },

  { date: "1 ส.ค. 2569", month: 8,
    segs: ["3+250-3+300", "2+305-2+405", "2+100-2+175"],
    text: "วางท่อ PVC Ø300 มม. STA.3+250-3+300 (สะสม 438 ม.) — อยู่ในช่วงที่พบส่วนต่างปริมาณ PVC 66 ม. รอยืนยัน C7 · หล่อหัว Support STA.2+305-2+405 · ติดตั้ง Support STA.2+100-2+175",
    meters: 42, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1jpJyT1_lYoZF-yrxOb4ysz2YgtoWLLEE/view?usp=drivesdk" },

  { date: "2 ส.ค. 2569", month: 8,
    segs: ["3+208-3+250", "2+405-2+480", "2+100-2+175"],
    text: "วางท่อ PVC Ø300 มม. STA.3+208-3+250 (สะสม 480 ม.) · หล่อหัว Support STA.2+405-2+480 · ติดตั้ง Support STA.2+100-2+175 · งานเคลียร์ถางปากทาง",
    meters: 42, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1xd8LscDrHU9LoNEXFKWiMdTO8PRI5QTq/view?usp=drivesdk" },

  { date: "3 ส.ค. 2569", month: 8,
    segs: ["1+510-1+600", "2+485-2+560", "2+200-2+300"],
    text: "กดเสาเข็ม STA.1+510-1+600 (สะสม 391 ต้น) · หล่อหัว Support STA.2+485-2+560 · ติดตั้ง Support STA.2+200-2+300",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1G_lqW82JyP1orbguMqb2eQA_6XN9l7Cq/view?usp=drivesdk" },

  { date: "4 ส.ค. 2569", month: 8,
    segs: ["1+510-1+600", "2+600-2+850"],
    text: "กดเสาเข็ม STA.1+510-1+600 (สะสม 406 ต้น) · หล่อหัว Support รับท่อ AC STA.2+600-2+850",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1GdcbXxqXPRVbWmV7gKqPj9cq9GxtzCMF/view?usp=drivesdk" },

  { date: "5 ส.ค. 2569", month: 8,
    segs: ["1+050-1+120", "2+600-2+850"],
    text: "กดเสาเข็ม STA.1+050-1+120 (สะสม 421 ต้น) · หล่อหัว Support รับท่อ AC STA.2+600-2+850",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1pGQjovxhf6GM8IbRamgfdSuQbrhwNuJJ/view?usp=drivesdk" },

  { date: "6 ส.ค. 2569", month: 8,
    segs: ["1+050-1+120", "2+600-2+850"],
    text: "กดเสาเข็ม STA.1+050-1+120 (สะสม 442 ต้น) · หล่อหัว Support รับท่อ AC STA.2+600-2+850",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1SiubJFTiNHK2-4EqpVKn2Emihc8db1Sp/view?usp=drivesdk" },

  { date: "7 ส.ค. 2569", month: 8,
    segs: ["0+700-0+800", "1+500-1+575"],
    text: "เคลียร์ถางปากกแนวท่อ AC STA.0+700-0+800 · หล่อหัว Support รับท่อ AC STA.1+500-1+575",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1qf9LYgNFjVER_X_EUC5vgJeMZOGH9utx/view?usp=drivesdk" },

  { date: "8 ส.ค. 2569", month: 8,
    segs: ["2+300-2+425", "1+050-1+225"],
    text: "ติดตั้งหัว Support รับท่อ AC STA.2+300-2+425 (สะสม 240 หัว) · หล่อหัว Support STA.1+050-1+225",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1LJ3SpC8rYK5RbFByMLZ_H7sL_DNRo79L/view?usp=drivesdk" },

  { date: "9 ส.ค. 2569", month: 8,
    segs: ["3+000-3+036"],
    text: "วางท่อ PVC Ø300 มม. STA.3+000-3+036 (สะสม 516 ม.)",
    meters: 36, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1ADH0Kbz8P2-9DNy-ryZSZ9lzE2VXTeWi/view?usp=drivesdk" },

  { date: "10 ส.ค. 2569", month: 8,
    segs: ["0+720-0+795"],
    text: "กดเสาเข็ม STA.0+720-0+795 (สะสม 472 ต้น) · ติดตั้งหัว Support รับท่อ AC 15 หัว (สะสม 255 หัว)",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1HLvLyOViiMDjcrnjpkwdhM7dQDBG_kwa/view?usp=drivesdk" },

  { date: "11 ส.ค. 2569", month: 8,
    segs: ["0+683-0+700", "1+548-1+600"],
    text: "กดเสาเข็ม STA.0+683-0+700 (สะสม 479 ต้น) · ติดตั้งหัว Support รับท่อ AC STA.1+548-1+600 (สะสม 271 หัว)",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1Xf884csYLZGKrlIqTGrUu1a6BikewlMd/view?usp=drivesdk" },

  { date: "12 ส.ค. 2569", month: 8,
    segs: ["0+665-0+680", "0+500-0+580"],
    text: "กดเสาเข็ม STA.0+665-0+680 (สะสม 485 ต้น) · เคลียร์ถางปากกเตรียมงานกดเสาเข็ม STA.0+500-0+580",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/10EWl4vH2yTScA3Bm2gJrmNrqgm3uN-GO/view?usp=drivesdk" },

  { date: "13 ส.ค. 2569", month: 8,
    segs: ["0+555-0+600"],
    text: "กดเสาเข็ม STA.0+555-0+600 (สะสม 503 ต้น)",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1iL6SdaF3nmgDAY_O2t7MVHVRBBmxnM0b/view?usp=drivesdk" },

  { date: "14 ส.ค. 2569", month: 8,
    segs: ["0+555-0+600", "3+036-3+054"],
    text: "กดเสาเข็ม STA.0+555-0+600 (สะสม 519 ต้น) · วางท่อ PVC Ø300 มม. STA.3+036-3+054 (สะสม 534 ม.) · หล่อหัว Support +10 (สะสม 360) · ติดตั้ง Support +4 (สะสม 275)",
    meters: 18, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1oYRsMlGHOxgY3guY4M6hzwE5NUEXyu_7/view?usp=drivesdk" }
];
