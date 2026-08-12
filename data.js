/* ============================================================================
   PID-903(R1) DASHBOARD DATA — rev3
   Generated: 12 สิงหาคม 2569 (คำสั่ง "อัพเดท 903")
   As-of ข้อมูลภาคสนาม: 10 สิงหาคม 2569 (รายงานล่าสุดที่ได้รับ)

   ⚠️ หมายเหตุสำคัญสำหรับ C7 (นายช่างโครงการ) ก่อนอัปโหลดทับไฟล์เดิมบน GitHub:
   ไฟล์นี้ถูก REBUILD ใหม่ทั้งหมดในรอบนี้ เนื่องจาก session ปัจจุบันไม่มีสำเนา
   data.js/index.html ฉบับที่ deploy อยู่จริงอยู่ใน context (repo เป็น private,
   ไม่มีสิทธิ์ push/pull โดยตรง) — ชื่อฟิลด์ (property names) ด้านล่างเป็นการ
   สร้างใหม่ตามโครงสร้าง 3 globals เดิมที่ทราบ (PID903_ASOF / PID903_PIPES /
   PID903_DAILY) แต่ "ชื่อคีย์ภายใน" อาจไม่ตรงกับที่ index.html เรียกใช้ 100%
   กรุณา diff ตรวจสอบกับไฟล์ index.html ปัจจุบันก่อน commit ทับ
   หากสะดวก แนะนำแนบไฟล์ data.js ฉบับล่าสุดที่ deploy อยู่มาในแชทครั้งหน้า
   เพื่อให้ C1-C6 patch เฉพาะจุดแทนการ rebuild ทั้งไฟล์ (ลดความเสี่ยง schema mismatch)
   ============================================================================ */

const PID903_ASOF = {
  fieldDataDate: "2569-08-10",          // วันที่ข้อมูลภาคสนามล่าสุด (รายงาน 10 ส.ค.)
  reportGeneratedDate: "2569-08-12",    // วันที่ประมวลผล/สร้างไฟล์นี้
  contractNo: "PID-903(R1)",
  contractValueBaht: 19420000,
  overallProgressPercent: 12.13,        // unconfirmed — ดู earnedValue.totalPercent
  unconfirmed: true,
  notes: [
    "ไม่มีรายงานผลงานประจำวันช่วง 6-11 ส.ค. 69 นำเข้าระบบจนถึง 12 ส.ค. 69 " +
      "(ที่จริงมีการทำงานต่อเนื่อง แต่ผู้รับจ้างอัปโหลดล่าช้าเป็นชุดในวันที่ 12 ส.ค. 69)",
    "พบรายงาน 05-8-69 อัปโหลดซ้ำอีกครั้งพร้อมชุดใหม่ (fileId ต่างจากเดิม) " +
      "เนื้อหาตัวเลขตรงกับฉบับก่อนหน้าทุกประการ — ไม่กระทบข้อมูลสะสม ใช้ fileId ใหม่แทนในลิงก์",
    "ค่าคลาดเคลื่อนท่อ PVC สะสม 3 วัน (30/7, 31/7, 1/8) รวม 66 ม. ยังค้างรอ C7 ยืนยัน — ไม่ได้แก้ไขในรอบนี้",
    "⚠️ พบในสารบบหนังสือรับ (Google Sheet 'PID-903(R1)'): เลขที่ 24/2569, 25/2569 (6 ส.ค. 69) " +
      "และ 26/2569 (10 ส.ค. 69) — ผู้รับจ้างยื่น 'ขอรับรองคุณภาพและปริมาณงานก่อสร้าง ครั้งที่ 1', " +
      "'ขอส่งมอบงานครั้งที่ 1' และ 'ขอเบิกเงินค่างานครั้งที่ 1' ตามลำดับ " +
      "ช่วงเวลาตรงกับรายงานประจำวัน 6-10 ส.ค. ที่เพิ่งนำเข้าในรอบนี้พอดี — " +
      "ควรใช้ตัวเลขสะสม ณ 10 ส.ค. (piles 472 ต้น / PVC 516 ม. / support ติดตั้ง 255 หัว) " +
      "เป็นฐานตรวจสอบเทียบกับเอกสารเบิกงวดที่ 1 ของผู้รับจ้างโดยตรง"
  ]
};

const PID903_PIPES = {
  PVC300: {
    label: "ท่อ PVC ϕ300",
    targetLengthM: 925,
    cumulativeLaidM: 516,
    percentLaid: (516 / 925 * 100),      // 55.78% (ขั้นตอน "วางท่อ" อย่างเดียว ยังไม่รวม test/ล้าง/ตัดบรรจบ)
    sitePriceUsedBahtPerM: 2647.68,       // สมมติฐานเดิม: วางใต้ไหล่ทางทั้งหมด — ต้องยืนยันซ้ำหากเปลี่ยนรูปแบบ
    unconfirmed: true
  },
  AC300: {
    label: "ท่อ AC ϕ300 (ในคูน้ำ)",
    targetLengthM: 2233,
    cumulativePilesCount: 472,            // เสาเข็ม 22x22x600 ซม.
    cumulativePileLenM: 472 * 2.5,        // = 1180 ม.
    cumulativeSupportInstalledCount: 255,
    cumulativeSupportInstalledLenM: 255 * 2.5,  // = 637.5 ม.
    cumulativeSupportProducedCount: 340,  // ผลิตหัว Support (เตรียมการ ไม่นับใน WBS earned value)
    cumulativePipeLaidM: 0,               // ยังไม่มีรายงาน "วางท่อ AC" จริง
    sitePriceUsedBahtPerM: 2860.32,       // เสาเข็มยาว 6 ม. (สมมติฐานเดิม — ต้องยืนยันซ้ำ)
    unconfirmed: true
  },
  ST300: {
    label: "ท่อเหล็กเหนียว ST ϕ300",
    targetLengthM: 543,
    cumulativeLaidM: 0,
    note: "ยังไม่ใช้วิธีคิด earned value นี้ (10 รูปแบบ ราคาต่างกันมาก) — ดู หลักการคิดค่างาน_PID903R1.md ข้อ 7"
  },
  HDPE315: { label: "ท่อ HDPE ϕ315 (ชั่วคราว)", targetLengthM: 353, cumulativeLaidM: 0 },
  ST600: { label: "ท่อเหล็กเหนียว ϕ600 (Casing)", targetLengthM: 80, cumulativeLaidM: 0 },
  PVC150: { label: "ท่อ PVC ϕ150", targetLengthM: 12, cumulativeLaidM: 0 }
};

const PID903_EARNED_VALUE = {
  // คำนวณตาม หลักการคิดค่างาน_PID903R1.md — ข้อมูล ณ 10 ส.ค. 2569, unconfirmed
  asOfDate: "2569-08-10",
  unconfirmed: true,
  mobilization: {
    label: "งานเตรียมการ",
    fixed70PercentBaht: 432922,
    variable30PoolBaht: 185538,
    variable30EarnedBaht: 18199,          // 185538 × (1,905,033 / 19,420,000)
    totalEarnedBaht: 451121,
    targetBaht: 618460,
    percentOfOwnValue: (451121 / 618460 * 100)  // ~72.94%
  },
  ac300: {
    label: "งานวางท่อ AC",
    percentOfPipeTarget: 14.85,           // (1180/2233)*20% + (637.5/2233)*15%
    effLenM: 331.67,
    earnedValueBaht: 948691,
    targetValueBaht: 6348488.36
  },
  pvc300: {
    label: "งานวางท่อ PVC",
    percentOfPipeTarget: 39.05,           // (516/925)*70%
    effLenM: 361.2,
    earnedValueBaht: 956342,
    targetValueBaht: 2365216.05
  },
  st300: {
    label: "งานวางท่อ ST",
    percentOfPipeTarget: 0,
    earnedValueBaht: 0,
    targetValueBaht: 3078086.71
  },
  totalEarnedBaht: 2356154,               // 451121+948691+956342+0
  totalPercent: 12.13                     // 2,356,154 / 19,420,000 × 100
};

const PID903_DAILY = [
  // --- ชุดเดิม (28 ก.ค. - 5 ส.ค. 69) — คงค่าตามรอบก่อนหน้า ไม่แก้ไขในรอบนี้ ---
  { date: "2569-07-28", pilesCountToday: 108, pilesCountCum: 108, pvcLaidTodayM: 80,  pvcLaidCumM: 80,
    supportProducedTodayCount: 30, supportProducedCumCount: 30, supportInstalledTodayCount: 0, supportInstalledCumCount: 0,
    reportUrl: "https://drive.google.com/file/d/1TS69WEoUGcjozv8SVoFXIZnYri98pVwy/view", unconfirmed: true },
  { date: "2569-07-29", pilesCountToday: 108, pilesCountCum: 216, pvcLaidTodayM: 80,  pvcLaidCumM: 160,
    supportProducedTodayCount: 30, supportProducedCumCount: 60, supportInstalledTodayCount: 30, supportInstalledCumCount: 30,
    reportUrl: "https://drive.google.com/file/d/1XOqCm4J5VRceNkcW-zlKOITAS91mQ99W/view", unconfirmed: true },
  { date: "2569-07-30", pilesCountToday: 90, pilesCountCum: 306, pvcLaidTodayM: null, pvcLaidCumM: null,
    supportProducedTodayCount: 30, supportProducedCumCount: 90, supportInstalledTodayCount: 40, supportInstalledCumCount: 70,
    reportUrl: "https://drive.google.com/file/d/1aN32_PfPTJ6iRopwnJew8uwQrXNJnjCP/view",
    flag: "PVC ยอดรวม 3 วัน (30/7,31/7,1/8) คลาดเคลื่อน 66 ม. จากยอดหัวรายงาน — รอ C7 ยืนยัน", unconfirmed: true },
  { date: "2569-07-31", pilesCountToday: 90, pilesCountCum: 396, pvcLaidTodayM: null, pvcLaidCumM: null,
    supportProducedTodayCount: 30, supportProducedCumCount: 120, supportInstalledTodayCount: 30, supportInstalledCumCount: 100,
    reportUrl: "https://drive.google.com/file/d/1KYHlz-BHXrx4M3pA9z4UBXNT9Gq7RqiV/view",
    flag: "PVC — ดูหมายเหตุ 30/7", unconfirmed: true },
  { date: "2569-08-01", pilesCountToday: 42, pilesCountCum: 438, pvcLaidTodayM: null, pvcLaidCumM: null,
    supportProducedTodayCount: 30, supportProducedCumCount: 150, supportInstalledTodayCount: 30, supportInstalledCumCount: 130,
    reportUrl: "https://drive.google.com/file/d/1jpJyT1_lYoZF-yrxOb4ysz2YgtoWLLEE/view",
    flag: "PVC — ดูหมายเหตุ 30/7", unconfirmed: true },
  { date: "2569-08-02", pilesCountToday: 0, pilesCountCum: 421, pvcLaidTodayM: 42, pvcLaidCumM: 480,
    supportProducedTodayCount: 30, supportProducedCumCount: 180, supportInstalledTodayCount: 30, supportInstalledCumCount: 150,
    reportUrl: "https://drive.google.com/file/d/1xd8LscDrHU9LoNEXFKWiMdTO8PRI5QTq/view", unconfirmed: true },
  { date: "2569-08-03", pilesCountToday: 35, pilesCountCum: 421, pvcLaidTodayM: 0, pvcLaidCumM: 480,
    supportProducedTodayCount: 30, supportProducedCumCount: 210, supportInstalledTodayCount: 40, supportInstalledCumCount: 190,
    reportUrl: "https://drive.google.com/file/d/1G_lqW82JyP1orbguMqb2eQA_6XN9l7Cq/view", unconfirmed: true },
  { date: "2569-08-04", pilesCountToday: 15, pilesCountCum: 421, pvcLaidTodayM: 0, pvcLaidCumM: 480,
    supportProducedTodayCount: 30, supportProducedCumCount: 240, supportInstalledTodayCount: 0, supportInstalledCumCount: 190,
    reportUrl: "https://drive.google.com/file/d/1GdcbXxqXPRVbWmV7gKqPj9cq9GxtzCMF/view", unconfirmed: true },
  { date: "2569-08-05", pilesCountToday: 15, pilesCountCum: 421, pvcLaidTodayM: 0, pvcLaidCumM: 480,
    supportProducedTodayCount: 30, supportProducedCumCount: 240, supportInstalledTodayCount: 0, supportInstalledCumCount: 190,
    reportUrl: "https://drive.google.com/file/d/1pGQjovxhf6GM8IbRamgfdSuQbrhwNuJJ/view",
    note: "fileId อัปเดตจากรอบอัปโหลดใหม่ 12 ส.ค. 69 (เนื้อหาตัวเลขเดิมทุกประการ)", unconfirmed: true },

  // --- ชุดใหม่ (6-10 ส.ค. 69) — vision-read ยืนยันจากภาพหน้า 1 ของ PDF โดยตรงในรอบนี้ ---
  { date: "2569-08-06", pilesCountToday: 21, pilesCountCum: 442, pvcLaidTodayM: 0, pvcLaidCumM: 480,
    supportProducedTodayCount: 30, supportProducedCumCount: 270, supportInstalledTodayCount: 0, supportInstalledCumCount: 190,
    reportUrl: "https://drive.google.com/file/d/1SiubJFTiNHK2-4EqpVKn2Emihc8db1Sp/view", unconfirmed: true },
  { date: "2569-08-07", pilesCountToday: 0, pilesCountCum: 442, pvcLaidTodayM: 0, pvcLaidCumM: 480,
    supportProducedTodayCount: 30, supportProducedCumCount: 300, supportInstalledTodayCount: 0, supportInstalledCumCount: 190,
    reportUrl: "https://drive.google.com/file/d/1qf9LYgNFjVER_X_EUC5vgJeMZOGH9utx/view", unconfirmed: true },
  { date: "2569-08-08", pilesCountToday: 0, pilesCountCum: 442, pvcLaidTodayM: 0, pvcLaidCumM: 480,
    supportProducedTodayCount: 30, supportProducedCumCount: 330, supportInstalledTodayCount: 50, supportInstalledCumCount: 240,
    reportUrl: "https://drive.google.com/file/d/1LJ3SpC8rYK5RbFByMLZ_H7sL_DNRo79L/view", unconfirmed: true },
  { date: "2569-08-09", pilesCountToday: 0, pilesCountCum: 442, pvcLaidTodayM: 36, pvcLaidCumM: 516,
    supportProducedTodayCount: 0, supportProducedCumCount: 330, supportInstalledTodayCount: 0, supportInstalledCumCount: 240,
    pvcPipeSegmentsToday: 6, pvcLocationSTA: "3+000 - 3+036",
    reportUrl: "https://drive.google.com/file/d/1ADH0Kbz8P2-9DNy-ryZSZ9lzE2VXTeWi/view", unconfirmed: true },
  { date: "2569-08-10", pilesCountToday: 30, pilesCountCum: 472, pvcLaidTodayM: 0, pvcLaidCumM: 516,
    supportProducedTodayCount: 10, supportProducedCumCount: 340, supportInstalledTodayCount: 15, supportInstalledCumCount: 255,
    pilesLocationSTA: "0+720 - 0+795",
    reportUrl: "https://drive.google.com/file/d/1HLvLyOViiMDjcrnjpkwdhM7dQDBG_kwa/view", unconfirmed: true }
];
