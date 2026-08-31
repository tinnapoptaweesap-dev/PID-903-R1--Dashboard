// PID903_DATA — Dashboard data layer (PID-903(R1) เท่านั้น)
// อัพเดทล่าสุด: 28 ส.ค. 2569 (ใบรายงานผลงานประจำวันผู้รับจ้าง 28 ก.ค.–28 ส.ค. 2569, Google Drive inbox)
// buildInfo: rebuilt 31 ส.ค. 2569 (อัพเดต 903 cycle)
//   - Records 1-28 (28 ก.ค.-24 ส.ค.): คัดลอกจาก data.js เดิมบน GitHub ไม่มีการแก้ไข
//   - Records 29-32 (25-28 ส.ค.): เพิ่มใหม่รอบนี้ จาก Report 25-8-69.pdf, 26-8-69.pdf, 27-8-69.pdf(รายงานวันที่27), 28-8-69.pdf(รายงานวันที่28)
//     chain-validate: เสาเข็ม 632→636→636→670→677 | PVC 558→558→558→558→570 | AC 455→455→625→710→755
//   - Record 25 ส.ค.: chain สอดคล้องทุกจุด ไม่มี unconfirmed ใหม่
//   - Record 26 ส.ค.: ติดตั้ง Support สะสมกระโดด 350→355 ขณะตัวเลข "วันนี้" รายงาน 0 หัว (ผลต่าง +5 ไม่สอดคล้อง) → unconfirmed
//   - Record 27 ส.ค.: ท่อ AC สะสมรายงาน 710 ม. ขณะคาดจากฐาน 625+75=700 ม. (ผลต่าง +10 ม. ไม่สอดคล้อง) → unconfirmed
//   - Record 28 ส.ค.: ผลิตหัว Support สะสมรายงาน 544 หัว ขณะคาดจากฐาน 510+0=510 หัว (ผลต่าง +34 หัว ไม่สอดคล้อง) → unconfirmed
//     (ติดตั้ง Support วันที่ 28 ส.ค. สอดคล้อง chain: 370+34=404 ✓ ไม่มีปัญหา)
// FIX 22 ส.ค. 2569 (รอบตรวจพบบั๊ก): PID903_PIPES.AC ขาด field "laidM" — งานวางท่อ AC ที่บันทึกใน
//   PID903_DAILY ตั้งแต่ 17 ส.ค. ไม่เคยถูกดึงขึ้น dashboard เลยเพราะไม่มีที่เก็บค่า เพิ่ม laidM เข้าไปแล้ว
// ⚠ ประเด็นเฝ้าระวัง ณ 28 ส.ค. 2569: การติดตั้ง Support ที่นิ่งที่ 350 หัวต่อเนื่อง 19-25 ส.ค. (7 วัน) เริ่มขยับอีกครั้ง
//   ตั้งแต่ 26 ส.ค. (350→355, unconfirmed) และเดินหน้าชัดเจนใน 27-28 ส.ค. (355→370→404) — บ่งชี้ว่าคอขวดเริ่มคลี่คลาย
//   แต่ยังมีตัวเลข "วันนี้" ไม่สอดคล้องกับผลต่างสะสมใน 3 รายงานล่าสุด (26, 27, 28 ส.ค.) ต้องยืนยัน C7 ก่อนสรุปเป็นทางการ
//   ยังไม่มี recovery plan เป็นลายลักษณ์อักษรจากผู้จัดการสนาม (นายสมเกียรติ) เข้ามาในระบบ

const PID903_ASOF = "28 ส.ค. 2569";

const PID903_PIPES = {
  PVC: { laidM: 570 },
  AC:  { pileCount: 677, supportCount: 404, laidM: 755 }
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
    meters: 5, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1nmtt1j9lxKgMl81QXvus_Is4gN3Gia9X/view?usp=drivesdk" },
  { date: "22 ส.ค. 2569", month: 8,
    segs: ["STA.0+200-0+300 (เสาเข็ม/แท่นรับโค้ง 45°)", "STA.1+455-1+470 (ท่อ AC)", "STA.2+390-2+530 (ท่อ AC)", "STA.1+694-1+700 (ท่อ ST)"],
    text: "กดเสาเข็มสี่เหลี่ยม STA.0+200-0+300 ทำแท่นรับโค้ง 45° (4 ต้น) รวม 38 ต้น (สะสม 632 ต้น) · วางท่อ AC Ø300 STA.1+455-1+470 และ STA.2+390-2+530 รวม 145 ม. (สะสม 455 ม.) — วันที่ก้าวกระโดดสูงสุดของ AC laidM · วางท่อ ST Ø300 STA.1+694-1+700 6 ม. (สะสม 18 ม.) · ผลิตหัว Support +15 (สะสม 465) · ติดตั้ง Support นิ่งต่อเนื่องวันที่ 4 ที่ 350 หัว",
    meters: 145, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1WstFLWJ0YPHIyPqTXv0pVtoeeYPLl2DO/view?usp=drivesdk" },

  { date: "23 ส.ค. 2569", month: 8,
    segs: ["STA.3+268-3+280 (ท่อ ST)"],
    text: "วางท่อ ST Ø300 STA.3+268-3+280 12 ม. (สะสม 30 ม.) · เสาเข็ม/PVC/AC/Support นิ่งทุกรายการ (632 ต้น / 558 ม. / 455 ม. / ผลิต 465 / ติดตั้ง 350) · ติดตั้ง Support นิ่งต่อเนื่องวันที่ 5 ที่ 350 หัว",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1bK6jRASmBg8257oFfNGPunz2FVU-KZT0/view?usp=drivesdk" },

  { date: "24 ส.ค. 2569", month: 8,
    segs: ["STA.2+800-2+900 (เตรียมวางท่อบายพาส HDPE)"],
    text: "เชื่อมท่อ HDPE Ø300 เตรียมงานวางท่อบายพาส STA.2+800-2+900 (งานชั่วคราว ไม่นับปริมาณสะสมท่อถาวร) · ท่อ AC เข้าหน่วยงานเพิ่มเติม 18 ท่อน (ของเข้าไซต์ ไม่ใช่ท่อที่วางแล้ว) · ผลิตหัว Support +15 (สะสม 480) · ติดตั้ง Support นิ่งต่อเนื่องวันที่ 6 ที่ 350 หัว — เสาเข็ม/PVC/AC/ST นิ่งทุกรายการ (632/558/455/30)",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1A0i8sHNi8KZeJ5fROAcXcJiTWYuqA0V_/view?usp=drivesdk" },

  { date: "25 ส.ค. 2569", month: 8,
    segs: ["STA.2+800-2+900 (เชื่อมท่อบายพาส HDPE)", "STA.3+380 (สกัดผิวถนนทางเข้าคอนโดฯ ชั้นที่ 2)", "STA.0+220-0+230 (เสาเข็ม)"],
    text: "เชื่อมท่อ HDPE Ø300 มม. เตรียมงานวางท่อบายพาส STA.2+800-2+900 (งานชั่วคราว ไม่นับปริมาณสะสมท่อถาวร) · สกัดพื้นถนนทางเข้าคอนโดฯ STA.3+380 ชั้นที่ 2 (งานเตรียม) · กดเสาเข็มสี่เหลี่ยม STA.0+220-0+230 4 ต้น (สะสม 636 ต้น) · ย้ายโป๊ะไป STA.0+190 · ผลิตหัว Support +15 (สะสม 495) · ติดตั้ง Support นิ่งต่อเนื่องวันที่ 7 ที่ 350 หัว — PVC/AC/ST อื่นนิ่งทุกรายการ (558/455/30)",
    meters: 0, unconfirmed: false, reportUrl: "https://drive.google.com/file/d/1_v3w4rpKs8wwdJIW0b6R1AOZAKNgXCQX/view?usp=drivesdk" },

  { date: "26 ส.ค. 2569", month: 8,
    segs: ["STA.1+365-1+455 (ท่อ AC)", "STA.2+530-2+640 (ท่อ AC)", "STA.3+380-3+386 (ท่อ ST)", "STA.0+020-0+200 (เคลียร์พื้นที่กดเสาเข็ม)"],
    text: "วางท่อ AC Ø300 มม. STA.1+365-1+455 90 ม. และ STA.2+530-2+640 80 ม. (รวม 170 ม., สะสม 625 ม.) · วางท่อ ST Ø300 มม. STA.3+380-3+386 10 ม. (สะสม 40 ม.) · เคลียร์พื้นที่กดเสาเข็ม STA.0+020-0+200 (เสาเข็มคงที่ 636 ต้น) · ติดตั้ง Support สะสมรายงานกระโดดเป็น 355 หัว จากฐาน 350 — ตัวเลข \"วันนี้\" รายงาน 0 หัว ไม่สอดคล้องกับผลต่างสะสม +5 หัว ต้องยืนยัน C7",
    meters: 170, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1t-tqemLN0pv_kShaCAe2S82AatLdfCAB/view?usp=drivesdk" },

  { date: "27 ส.ค. 2569", month: 8,
    segs: ["STA.0+010-0+093 (เสาเข็ม)", "STA.1+340-1+375 (ท่อ AC)", "STA.2+530-2+640 (ท่อ AC เก่า)"],
    text: "กดเสาเข็มสี่เหลี่ยม STA.0+010-0+093 34 ต้น (สะสม 670 ต้น) · วางท่อ AC Ø300 มม. STA.1+340-1+375 35 ม. และ STA.2+530-2+640 (เก่า) 40 ม. (รวมวันนี้ 75 ม., สะสมรายงาน 710 ม. — คาดจากฐาน 625+75=700 ม. พบผลต่าง +10 ม. ต้องยืนยัน C7) · ผลิตหัว Support +15 (สะสม 510) · ติดตั้ง Support +15 (สะสม 370, ฐาน 355 ยังไม่ยืนยัน)",
    meters: 75, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1r1gYBW2QB2QB6u3T06sFGEOrC7dR6LXw/view?usp=drivesdk" },

  { date: "28 ส.ค. 2569", month: 8,
    segs: ["STA.0+093-0+108 (เสาเข็ม)", "STA.1+295-1+340 (ท่อ AC)", "STA.2+800-2+812 (ท่อ PVC)", "STA.1+305+1+340 (ติดตั้งหัว Support)", "หน้าโรงเรียนวัดท้องคุ้ง (ประตูน้ำ Ø300)"],
    text: "กดเสาเข็มสี่เหลี่ยม STA.0+093-0+108 7 ต้น (สะสม 677 ต้น) · วางท่อ AC Ø300 มม. STA.1+295-1+340 45 ม. (สะสม 755 ม.) · วางท่อ PVC Ø300 มม. STA.2+800-2+812 12 ม. (สะสม 570 ม.) · ติดตั้งหัว Support รับท่อ AC STA.1+305+1+340 34 หัว (สะสม 404 หัว — สอดคล้อง chain จากฐาน 370) · ติดตั้งประตูน้ำ Ø300 มม. หน้าโรงเรียนวัดท้องคุ้ง 2 ชุด · ผลิตหัว Support สะสมรายงาน 544 หัว — คาดจากฐาน 510+0=510 หัว พบผลต่าง +34 หัว ไม่สอดคล้อง ต้องยืนยัน C7",
    meters: 57, unconfirmed: true, reportUrl: "https://drive.google.com/file/d/1k03Q9Lvw5VjF3wvIzu9PFM61fZch40s7/view?usp=drivesdk" }

];
