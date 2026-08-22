// PID903_DATA — Dashboard data layer (PID-903(R1) เท่านั้น)
// อัพเดทล่าสุด: 21 ส.ค. 2569 (ใบรายงานผลงานประจำวันผู้รับจ้าง 28 ก.ค.–21 ส.ค. 2569, Google Drive inbox)
// buildInfo: rebuilt 22 ส.ค. 2569
//   - Records 1-18 (28 ก.ค.-14 ส.ค.): คัดลอกจาก data.js ต้นฉบับที่ นายช่างฯ ยืนยัน ไม่มีการแก้ไข
//   - Records 19-20 (15-16 ส.ค.): เพิ่มใหม่ ตรวจสอบตรงกับ Report 15-8-69.pdf, Report 16-8-69.pdf
//   - Records 21-25 (17-21 ส.ค.): เพิ่มใหม่ มี 3 จุด unconfirmed รอ C7 ยืนยัน (ดู text แต่ละ record)
// FIX 22 ส.ค. 2569 (รอบตรวจพบบั๊ก): PID903_PIPES.AC ขาด field "laidM" — งานวางท่อ AC ที่บันทึกใน
//   PID903_DAILY ตั้งแต่ 17 ส.ค. (สะสมถึง 310 ม. ณ 21 ส.ค., chain-validate ผ่านทุกจุด) ไม่เคยถูกดึงขึ้น
//   dashboard เลยเพราะไม่มีที่เก็บค่า เพิ่ม laidM: 310 เข้าไปแล้ว — ตัวเลขนี้ยังอยู่ในกลุ่ม record ที่ unconfirmed
//   บางส่วน (17, 19 ส.ค.) จากปัญหาจำนวนเสาเข็ม/support ไม่ใช่จากความยาวท่อ AC เอง แต่ยังต้องรอ C7 ยืนยันทางการ

const PID903_ASOF = "21 ส.ค. 2569";

const PID903_PIPES = {
  PVC: { laidM: 558 },
  AC:  { pileCount: 594, supportCount: 350, laidM: 310 }
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
    meters: 18, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1oYRsMlGHOxgY3guY4M6hzwE5NUEXyu_7/view?usp=drivesdk" },

  { date: "15 ส.ค. 2569", month: 8,
    segs: ["STA.3+050-3+075 (สกัดพื้นเตรียมวาง PVC)"],
    text: "สกัดพื้นปูนแนววางท่อ PVC STA.3+050-3+075 (งานเตรียม ยังไม่นับปริมาณสะสม) · ขนย้ายท่อ AC ลงหน้างาน · ปริมาณสะสมทุกรายการนิ่ง (PVC 534 ม., เสาเข็ม 519 ต้น, Support ผลิต 360/ติดตั้ง 275) — เริ่มช่วงหยุดชะงักงานเสาเข็ม/Support",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1JGgUFqN4fU84qd6-V-w-Q6wVzXCAcEyi/view?usp=drivesdk" },

  { date: "16 ส.ค. 2569", month: 8,
    segs: ["STA.3+050-3+075 (ท่อ PVC)"],
    text: "วางท่อ PVC Ø300 มม. STA.3+050-3+075 24 ม. (สะสม 558 ม.) · เสาเข็มและ Support ยังนิ่ง (เสาเข็ม 519 ต้น, Support ผลิต 360/ติดตั้ง 275) — วันที่ 3 ของช่วงหยุดชะงักงานเสาเข็ม/Support",
    meters: 24, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1jc0rQR06SbjwXqxTKRyOwgP69OucYNdU/view?usp=drivesdk" },

  { date: "17 ส.ค. 2569", month: 8,
    segs: ["STA.0+400-0+440 (เสาเข็ม)", "STA.1+670 (ท่อ AC ข้ามถนน)", "STA.2+150-3+240 (สกัดผิวถนนเตรียมวาง AC)"],
    text: "กดเสาเข็มสี่เหลี่ยม STA.0+400-0+440 (สะสมรายงาน 525 ต้น — พบผลต่างจากฐาน 519 ต้น ไม่สอดคล้องกับตัวเลข \"วันนี้\" ที่ระบุ ต้องยืนยัน C7) · เริ่มวางท่อ AC Ø300 ข้ามถนน STA.1+670 90 ม. (สะสมครั้งแรก 90 ม.) · ผลิตหัว Support 15 หัว (สะสม 375), ติดตั้ง 20 หัว (สะสม 295 — สอดคล้อง chain จากฐาน 275)",
    meters: 90, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1G8gRhh3fokvQ9a1RjvntabUrEtykEZR9/view?usp=drivesdk" },

  { date: "18 ส.ค. 2569", month: 8,
    segs: ["STA.0+440-0+498 (เสาเข็ม)", "STA.1+450-1+537 (หัว Support รับท่อ AC)"],
    text: "กดเสาเข็มสี่เหลี่ยม STA.0+440-0+498 (สะสม 548 ต้น, chain สอดคล้องกับ 525+23) · ท่อ AC เข้าหน่วยงาน · ติดตั้งหัว Support รับท่อ AC STA.1+450-1+537 (สะสมกระโดดเป็น 350 หัว จาก 295 — ผลต่าง +55 ไม่ตรงกับตัวเลข \"วันนี้\" ที่รายงาน 35 หัว ต้องยืนยัน C7)",
    meters: 0, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1P08AwgNr7zhdRBZvxLJWkrJ9BpWB9dBP/view?usp=drivesdk" },

  { date: "19 ส.ค. 2569", month: 8,
    segs: ["STA.0+440 (ฐานรับโค้ง)", "STA.2+240-2+310 (ท่อ AC)"],
    text: "กดเสาเข็มสี่เหลี่ยม STA.0+440 ฐานรับโค้ง 7 ต้น (สะสม 565 ต้น) · วางท่อ AC Ø300 STA.2+240-2+310 70 ม. (สะสม 160 ม.) · ผลิตหัว Support สะสมกระโดดเป็น 420 หัว (จาก 375 ผลต่าง +45 ไม่ตรงกับตัวเลข \"วันนี้\" ที่รายงาน 15 หัว ต้องยืนยัน C7) · ติดตั้ง Support นิ่งที่ 350 หัว",
    meters: 70, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1nmtt1j9lxKgMl81QXvus_Is4gN3Gia9X/view?usp=drivesdk" },

  { date: "20 ส.ค. 2569", month: 8,
    segs: ["STA.0+200-0+390 (เคลียร์ถาง)", "STA.1+475-1+550 (ท่อ AC)", "STA.2+310-2+390 (ท่อ AC)"],
    text: "เคลียร์ถางปากกาแนววาง AC STA.0+200-0+390 · วางท่อ AC Ø300 รวม 145 ม. (STA.1+475-1+550 65ม. + STA.2+310-2+390 80ม.) สะสม 305 ม. · งานเสาเข็มหยุด (0 ต้น) สะสมคงที่ 565 ต้น · ติดตั้ง Support นิ่งต่อเนื่องวันที่ 2 ที่ 350 หัว — เริ่มธงคอขวดขั้นตอนติดตั้งหน้างาน",
    meters: 145, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1HVpu-bYP_JOsLPwN3MJiusLiBBi64fb6/view?usp=drivesdk" },

  { date: "21 ส.ค. 2569", month: 8,
    segs: ["STA.0+235-0+300 (เสาเข็ม/แท่นรับโค้ง 45°)", "STA.1+470-1+475 (ท่อ AC)", "STA.3+169-3+182 (ท่อ ST)", "กม.2+450 (ท่อ AC เข้าหน่วยงาน)"],
    text: "กดเสาเข็มสี่เหลี่ยม STA.0+235-0+300 ทำแท่นรับโค้ง 45° (6 ต้น) รวม 29 ต้น (สะสม 594 ต้น) · วางท่อ AC STA.1+470-1+475 5 ม. (สะสม 310 ม.) · วางท่อ ST STA.3+169-3+182 12 ม. · ท่อ AC เข้าหน่วยงานเพิ่มเติม กม.2+450 30 ม. · ติดตั้ง Support นิ่งต่อเนื่องวันที่ 3 ที่ 350 หัว",
    meters: 5, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1nmtt1j9lxKgMl81QXvus_Is4gN3Gia9X/view?usp=drivesdk" }
];
