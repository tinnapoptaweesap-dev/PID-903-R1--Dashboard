/**
 * data.js — ข้อมูลสำหรับ Dashboard สัญญา PID-903(R1)
 * สร้าง/อัปเดตล่าสุด: 5 ส.ค. 2569 (คำสั่ง "อัพเดท 903")
 * แหล่งข้อมูล: ใบรายงานประจำวันผู้รับจ้าง (Google Drive: 01_Reports_Inbox)
 *              vision-read จากต้นฉบับ PDF ทุกฉบับ + cross-check ทางคณิตศาสตร์
 *              กับ หลักการคิดค่างาน_PID903R1.md (Earned Value methodology)
 *
 * ⚠️ สถานะข้อมูล: ตัวเลขผลงานรายวันทั้งหมดยังเป็น unconfirmed
 *    (รอยืนยันภาคสนามอย่างเป็นทางการ ตามหลักเกณฑ์ข้อ 7.1 ของเอกสารวิธีคิด)
 *    วิธีคำนวณมูลค่างาน (Earned Value) ได้ตรวจสอบตรงกับตัวอย่างฐาน 31 ก.ค. แล้ว
 */

const PID903_DATA = {
  meta: {
    contract: "PID-903(R1)",
    lastUpdated: "2026-08-05",
    dataAsOf: "2026-08-03",
    sourceNote: "vision-read จาก PDF ต้นฉบับใน Google Drive/01_Reports_Inbox — ตัวเลขรายวันยัง unconfirmed รอยืนยันภาคสนาม"
  },

  contract: {
    employer: "การประปานครหลวง (กปน.)",
    contractor: "บริษัท ไทคูนวณิชย์ จำกัด",
    baseValue: 19420000,
    performanceBond: 971000,
    durationDays: 210,
    ntpDate: "2026-07-27",
    completionDeadline: "2027-02-22"
  },

  // ---- ใบรายงานประจำวันผู้รับจ้าง (สำหรับแท็บ "รายงานรายวัน") ----
  dailyReports: [
    {
      date: "2026-07-28",
      staToday: { pile: "STA. 1+600 - 3+500", pvc: "STA. 3+400 - 3+500" },
      todayWork: { pileM: 80, pvcM: 108, pvcJoints: 18, supportProduced: 30, supportInstalled: 0 },
      cumulative: { pilePcs: 80, pvcM: 108, acM: 0, stM: 0, hdpeM: 0, st600M: 0, supportProducedPcs: 30, supportInstalledPcs: 0 },
      unconfirmed: true,
      sourceFile: { name: "Report 28-7-69.pdf", driveId: "1wGTxO67wDUcodj6zt8BF6Q7Bllf7wzdg" }
    },
    {
      date: "2026-07-29",
      staToday: { pile: "STA. 2+150 - 3+400", pvc: "STA. 1+950 - 3+300" },
      todayWork: { pileM: 80, pvcM: 108, pvcJoints: 18, supportProduced: 30, supportInstalled: 30 },
      cumulative: { pilePcs: 160, pvcM: 216, acM: 0, stM: 0, hdpeM: 0, st600M: 0, supportProducedPcs: 60, supportInstalledPcs: 30 },
      unconfirmed: true,
      sourceFile: { name: "Report 29-7-69.pdf", driveId: "1dfeysGIbr5DdXbq4mKNbd_QYGQj7K9nA" }
    },
    {
      date: "2026-07-30",
      staToday: { pile: "STA. 1+300 - 3+300", pvc: "STA. 1+150 - 3+200" },
      todayWork: { pileM: 80, pvcM: 78, pvcJoints: 13, supportProduced: 30, supportInstalled: 30 },
      cumulative: { pilePcs: 320, pvcM: 402, acM: 0, stM: 0, hdpeM: 0, st600M: 0, supportProducedPcs: 120, supportInstalledPcs: 90 },
      unconfirmed: true,
      sourceFile: { name: "Report 30-7-69.pdf", driveId: "1bqTb98_2-g6LOP7bwzabEWWjP90RF_ql" }
    },
    {
      date: "2026-07-31",
      staToday: { pile: "STA. 1+100 - 3+200", pvc: "STA. 1+200 - 3+100" },
      todayWork: { pileM: 80, pvcM: 78, pvcJoints: 13, supportProduced: 30, supportInstalled: 30 },
      cumulative: { pilePcs: 356, pvcM: 480, acM: 0, stM: 0, hdpeM: 0, st600M: 0, supportProducedPcs: 150, supportInstalledPcs: 120 },
      unconfirmed: true,
      note: "เลขฐานนี้ยืนยันตรงกับตัวอย่างคำนวณในหลักการคิดค่างาน_PID903R1.md",
      sourceFile: { name: "Report 31-7-69.pdf", driveId: "1pvu4xpB-aybkZzV7UcaagAIpzxMTOWAq" }
    },
    {
      date: "2026-08-01",
      staToday: { pile: "STA. 1+100 (ติดตั้ง Support)", pvc: null },
      todayWork: { pileM: 0, pvcM: 0, pvcJoints: 0, supportProduced: 30, supportInstalled: 30 },
      cumulative: { pilePcs: 356, pvcM: 480, acM: 0, stM: 0, hdpeM: 0, st600M: 0, supportProducedPcs: 180, supportInstalledPcs: 150 },
      unconfirmed: true,
      note: "ไม่มีงานกดเข็ม/วางท่อ PVC เพิ่มเติมวันนี้ — มีเฉพาะงานผลิต/ติดตั้งหัว Support",
      sourceFile: { name: "Report 01-8-69.pdf", driveId: "1W8JFOlvSiG1w7yjU0Gfde5zdf8sLZiep" }
    },
    {
      date: "2026-08-03",
      staToday: { pile: "STA. 1+100 - 1+200", pvc: null },
      todayWork: { pileM: 35, pvcM: 0, pvcJoints: 0, supportProduced: 30, supportInstalled: 40 },
      cumulative: { pilePcs: 391, pvcM: 480, acM: 0, stM: 0, hdpeM: 0, st600M: 0, supportProducedPcs: 210, supportInstalledPcs: 190 },
      unconfirmed: true,
      note: "2 ส.ค. (วันอาทิตย์) ไม่มีรายงาน — ไม่มีงานวางท่อ PVC เพิ่มเติมตั้งแต่ 31 ก.ค.",
      sourceFile: { name: "Report 03-8-69.pdf", driveId: "1Wc3J_7L8HYovy-7Ib8hjuAkZL5JN_dvC" }
    }
  ],

  // ---- ความก้าวหน้าเชิงมูลค่า (Earned Value) ณ วันที่ล่าสุด — สำหรับแท็บ "ภาพรวมความก้าวหน้า" ----
  progress: {
    asOf: "2026-08-03",
    contractBase: 19420000,
    items: [
      {
        name: "งานเตรียมการ",
        detail: "ส่งมอบสำนักงานสนาม+ป้ายจราจรครบถ้วน (70% คงที่) + งวด 30% ตามสัดส่วนผลงานวางท่อ",
        earned: 448710.99,
        target: 618460.00,
        pctOfItem: 72.55
      },
      {
        name: "งานวางท่อ AC",
        detail: "กดเสาเข็ม 391 ต้น (977.5 ม.) + ติดตั้ง Support 190 หัว (475 ม.) — ยังไม่เริ่มวางท่อจริง",
        earned: 762990.36,
        target: 6348488.36,
        pctOfItem: 12.02
      },
      {
        name: "งานวางท่อ PVC",
        detail: "วางท่อสะสม 480 ม. (คงที่ตั้งแต่ 31 ก.ค. — ยังไม่มีความคืบหน้าเพิ่มเติม)",
        earned: 889620.48,
        target: 2365216.05,
        pctOfItem: 37.61
      },
      {
        name: "งานวางท่อ ST",
        detail: "ยังไม่มีผลงาน",
        earned: 0,
        target: 3078086.71,
        pctOfItem: 0
      }
    ],
    totalEarned: 2101321.83,
    overallPct: 10.82,
    unconfirmed: true
  },

  // ---- ประวัติความก้าวหน้าสะสม สำหรับกราฟ S-Curve ----
  history: [
    { date: "2026-07-28", totalEarned: 750504.87,   overallPct: 3.87 },
    { date: "2026-07-29", totalEarned: 1100573.77,  overallPct: 5.67 },
    { date: "2026-07-30", totalEarned: 1744579.09,  overallPct: 8.98 },
    { date: "2026-07-31", totalEarned: 1974987.25,  overallPct: 10.17 },
    { date: "2026-08-01", totalEarned: 2007473.29,  overallPct: 10.34 },
    { date: "2026-08-03", totalEarned: 2101321.83,  overallPct: 10.82 }
  ]
};

// สำหรับใช้งานทั้งแบบ module และแบบ script tag ธรรมดา
if (typeof module !== "undefined" && module.exports) {
  module.exports = PID903_DATA;
}
