(function(){
"use strict";

/* =========================================================
   PID-903(R1) Progress Dashboard — app.js
   งานวางท่อจ่ายน้ำแบบขุดเปิดตามแนว chainage (ต่างจากงานดันท่อบ่อพัก)
   Signature visual: Chainage Route Strip (แถบแนวสาย 0+000–3+665)
   ========================================================= */

/* ---------- ระบบสถานะ (ใช้ร่วมทั้งไฟล์) ---------- */
function stageColor(s){
  return {complete:"var(--green)", progress:"var(--amber)", none:"var(--grey)"}[s] || "var(--grey)";
}
function stageBadgeClass(s){
  return {complete:"badge-complete", progress:"badge-progress", none:"badge-none"}[s] || "badge-none";
}
function stageLabel(s){
  return {complete:"วางท่อแล้วเสร็จ", progress:"อยู่ระหว่างวางท่อ", none:"ยังไม่เริ่ม"}[s] || "ยังไม่เริ่ม";
}

/* คำสำคัญสำหรับประมวลสถานะอัตโนมัติจากข้อความรายงาน (ประมาณการ — ควรตั้ง segmentStatus เอง) */
const DONE_WORDS = ["แล้วเสร็จ","เสร็จ","ครบ","ทดสอบแรงดันผ่าน","ผ่านการทดสอบ"];
const PROG_WORDS = ["วางท่อ","ขุดวาง","ขุดร่อง","ประกอบท่อ","เชื่อมท่อ","จมท่อ","ดำเนินการ","ตอกเข็ม","เสาเข็ม"];
function classify(text){
  if(!text) return "none";
  if(DONE_WORDS.some(w=>text.includes(w))) return "complete";
  if(PROG_WORDS.some(w=>text.includes(w))) return "progress";
  return "progress";
}

/* ---------- helper: chainage ---------- */
function fmtCh(m){
  const km = Math.floor(m/1000), rem = m%1000;
  return km + "+" + String(rem).padStart(3,"0");
}
const METHOD = {
  canal:    {fill:"#DCEEFB", edge:"#065BAA", ink:"#044A85", short:"ในคูน้ำ"},
  crossing: {fill:"#FBDCE8", edge:"#C2185B", ink:"#A01248", short:"ข้ามคลอง"},
  shoulder: {fill:"#FBEBD9", edge:"#E07A1F", ink:"#B45E12", short:"ไหล่ทาง"},
  road:     {fill:"#E7EDF2", edge:"#93A4B4", ink:"#5C6B7A", short:"ผิวจราจร"}
};

/* ---------- สถานะรายช่วง ---------- */
function bandById(id){ return DATA.alignment.bands.find(b=>b.id===id); }
function recordsForSeg(id){
  return DATA.daily.filter(r => (r.segs||[]).includes(id));
}
function segStatus(id){
  if(DATA.segmentStatus && DATA.segmentStatus[id]) return DATA.segmentStatus[id];
  const cur = DATA.curated[id];
  if(cur && cur.length) return classify(cur[cur.length-1].stage + " " + cur[cur.length-1].text);
  const recs = recordsForSeg(id);
  if(recs.length) return classify(recs[recs.length-1].text);
  return "none";
}

/* =========================================================
   Tabs
   ========================================================= */
function initTabs(){
  const btns = document.querySelectorAll(".tab-btn");
  btns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      btns.forEach(b=>{ b.classList.remove("active"); b.setAttribute("aria-selected","false"); });
      btn.classList.add("active"); btn.setAttribute("aria-selected","true");
      document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"));
      document.getElementById("tab-"+btn.dataset.tab).classList.add("active");
    });
  });
}
window.goToSegTab = function(segId){
  // เดิมเรียก selectSeg(segId) ต่อเพื่อไฮไลต์รายละเอียดช่วงงาน S1..S5
  // แต่แท็บนี้ถูกแทนที่ด้วย "ผลงานแยกตามประเภทท่อ" (ราย AC/PVC/ST) ไม่มีรายละเอียดต่อช่วงงานแล้ว
  // จึงแค่สลับไปแท็บนี้เฉยๆ ไม่เรียก selectSeg (element เดิม #segDetail ไม่มีแล้ว จะ error)
  document.querySelector('.tab-btn[data-tab="segments"]').click();
};

/* =========================================================
   Hero + Verify banner
   ========================================================= */
function renderHeroMeta(){
  document.getElementById("lastConfirmed").textContent = DATA.meta.lastConfirmed || "—";
}
function renderVerifyBanner(){
  const el = document.getElementById("verifyBanner");
  const p = DATA.provenance;
  if(!p || !(p.pending && p.pending.length)){ el.style.display="none"; return; }
  el.innerHTML = `
    <div class="vb-head"><span class="vb-icon">!</span><strong>ตรวจสอบก่อนใช้ (Verify Before Use)</strong>
      <span class="vb-ok">${p.verifiedNote||""}</span></div>
    <ul class="vb-list">${p.pending.map(x=>`<li>${x}</li>`).join("")}</ul>`;
}

/* =========================================================
   01 · Chainage Route Strip (signature visual)
   ========================================================= */
function renderAlignmentStrip(){
  const svg = document.getElementById("alignmentSvg");
  const al = DATA.alignment;
  if(!al || !al.bands || !al.bands.length){ svg.innerHTML=""; return; }

  const W=1200, padX=56;
  const total = al.chainEnd - al.chainStart;
  const availW = W - padX*2;
  const xAt = ch => padX + (ch-al.chainStart)/total*availW;

  const yBand=64, bandH=36;         // แถบวิธีก่อสร้าง
  const yProg=126, progH=16;        // แถบความก้าวหน้า
  const yRuler=170;                 // ไม้บรรทัด chainage

  let html = "";
  html += `<text x="${padX}" y="26" font-family="IBM Plex Mono" font-size="11" fill="var(--ink-faint)">ต้นโครงการ · คลองท้องคุ้ง (0+000)</text>`;
  html += `<text x="${W-padX}" y="26" text-anchor="end" font-family="IBM Plex Mono" font-size="11" fill="var(--ink-faint)">ปลายโครงการ · ซอยเก้าแสน (${fmtCh(al.chainEnd)})</text>`;
  html += `<text x="${padX}" y="${yBand-10}" font-family="IBM Plex Sans Thai" font-size="10.5" fill="var(--ink-soft)" font-weight="600">ช่วงวิธี/ตำแหน่งก่อสร้าง</text>`;
  html += `<text x="${padX}" y="${yProg-8}" font-family="IBM Plex Sans Thai" font-size="10.5" fill="var(--ink-soft)" font-weight="600">ความก้าวหน้าการวางท่อ</text>`;

  // ── แถบวิธีก่อสร้าง (bands) ──
  al.bands.forEach(b=>{
    const x1=xAt(b.from), x2=xAt(b.to), w=Math.max(x2-x1,1);
    const m=METHOD[b.method]||METHOD.road;
    const g0=`<g class="seg-marker" data-seg="${b.id}" style="cursor:pointer" tabindex="0" role="button" aria-label="${b.name}">`;
    html += g0;
    html += `<rect x="${x1}" y="${yBand}" width="${w}" height="${bandH}" fill="${m.fill}" stroke="${m.edge}" stroke-width="${b.critical?2.2:1.3}" rx="2"/>`;
    if(b.critical){ // เน้น Critical Path ด้วยลายทแยง
      html += `<rect x="${x1}" y="${yBand}" width="${w}" height="${bandH}" fill="url(#hatchCrit)" stroke="none"/>`;
      html += `<text x="${(x1+x2)/2}" y="${yBand-4}" text-anchor="middle" font-family="IBM Plex Sans Thai" font-size="8.5" font-weight="700" fill="${m.ink}">⚠ Critical</text>`;
    }
    // ป้ายชื่อช่วง — แสดงเต็มถ้ากว้างพอ, ไม่งั้นแสดงชื่อย่อวิธี
    const cx=(x1+x2)/2;
    if(w>90){
      html += `<text x="${cx}" y="${yBand+bandH/2+1}" text-anchor="middle" font-family="IBM Plex Sans Thai" font-size="10.5" font-weight="600" fill="${m.ink}">${m.short}</text>`;
      html += `<text x="${cx}" y="${yBand+bandH/2+13}" text-anchor="middle" font-family="IBM Plex Mono" font-size="8" fill="${m.ink}">${(b.to-b.from).toLocaleString()} ม.</text>`;
    } else if(w>26){
      html += `<text x="${cx}" y="${yBand+bandH/2+3}" text-anchor="middle" font-family="IBM Plex Mono" font-size="8" font-weight="700" fill="${m.ink}">${m.short}</text>`;
    }
    html += `<title>${b.name} · ${fmtCh(b.from)}–${fmtCh(b.to)} (${(b.to-b.from).toLocaleString()} ม.) · ${stageLabel(segStatus(b.id))}${b.permit? " · "+b.permit : ""}</title></g>`;
  });

  // ── แถบความก้าวหน้า (progress track) ──
  al.bands.forEach(b=>{
    const x1=xAt(b.from), x2=xAt(b.to), w=Math.max(x2-x1,1);
    const st=segStatus(b.id);
    html += `<rect x="${x1}" y="${yProg}" width="${w}" height="${progH}" fill="#EBF0F4" stroke="#D2E0EB" stroke-width="1"/>`;
    if(st==="complete"){
      html += `<rect x="${x1}" y="${yProg}" width="${w}" height="${progH}" fill="var(--green)" opacity="0.9"/>`;
    } else if(st==="progress"){
      html += `<rect x="${x1}" y="${yProg}" width="${w*0.5}" height="${progH}" fill="var(--amber)" opacity="0.9"/>`;
    }
  });

  // ── ไม้บรรทัด chainage (ทุก 500 ม. + จุดสิ้นสุด) ──
  const ticks=[];
  for(let c=0;c<=al.chainEnd;c+=500) ticks.push(c);
  if(ticks[ticks.length-1]!==al.chainEnd) ticks.push(al.chainEnd);
  html += `<line x1="${xAt(0)}" y1="${yRuler}" x2="${xAt(al.chainEnd)}" y2="${yRuler}" stroke="var(--ink-faint)" stroke-width="1"/>`;
  ticks.forEach(c=>{
    const x=xAt(c);
    html += `<line x1="${x}" y1="${yRuler-4}" x2="${x}" y2="${yRuler+4}" stroke="var(--ink-faint)" stroke-width="1"/>`;
    html += `<text x="${x}" y="${yRuler+18}" text-anchor="middle" font-family="IBM Plex Mono" font-size="9" fill="var(--ink-faint)">${fmtCh(c)}</text>`;
  });

  // ── defs: hatch สำหรับ Critical ──
  const defs = `<defs><pattern id="hatchCrit" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
    <line x1="0" y1="0" x2="0" y2="6" stroke="#C2185B" stroke-width="1.4" opacity="0.5"/></pattern></defs>`;

  svg.innerHTML = defs + html;
  svg.querySelectorAll(".seg-marker").forEach(g=>{
    g.addEventListener("click", ()=> window.goToSegTab(g.dataset.seg));
    g.addEventListener("keypress", e=>{ if(e.key==="Enter") window.goToSegTab(g.dataset.seg); });
  });
}

/* =========================================================
   02 · KPI cards
   ========================================================= */
function beToDate(iso){ const [y,m,d]=iso.split("-").map(Number); return new Date(Date.UTC(y-543,m-1,d)); }

function renderKPIs(){
  const plan = DATA.scurve.planMonthly || [];
  const actual = DATA.scurve.actualMonthly || [];
  const hasPlan = plan.length>0, hasActual = actual.length>0;

  // แผน / จริง
  const planEl=document.getElementById("kpiPlan"), planSub=document.getElementById("kpiPlanSub");
  const actEl=document.getElementById("kpiActual"), deltaEl=document.getElementById("kpiDelta"), asOfEl=document.getElementById("kpiActualAsOf");
  if(hasPlan){
    const cumPlan = plan.slice(0, Math.max(actual.length,1)).reduce((a,b)=>a+b,0);
    planEl.textContent = cumPlan.toFixed(2)+"%";
    const lb=(DATA.scurve.labels||[])[Math.max(actual.length-1,0)];
    planSub.textContent = lb? ("ณ สิ้นเดือน "+lb) : "ณ สิ้นเดือนล่าสุด";
    if(hasActual){
      const cumAct=actual.reduce((a,b)=>a+b,0);
      actEl.textContent=cumAct.toFixed(2)+"%";
      const d=cumAct-cumPlan;
      deltaEl.textContent=(d>=0?"เร็วกว่าแผน ":"ล่าช้ากว่าแผน ")+Math.abs(d).toFixed(2)+"%";
      deltaEl.style.color=d>=0?"var(--green)":"var(--red)";
      const a=DATA.meta.actualAsOf;
      if(a){ const TH=["","ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."];
        const [yy,mm,dd]=a.split("-").map(Number);
        asOfEl.textContent="ความก้าวหน้าถึงวันที่ "+dd+" "+TH[mm]+" "+yy; asOfEl.style.color="var(--ink-soft)"; }
      else { asOfEl.textContent="ยังไม่ระบุวันที่วัดผลงาน"; asOfEl.style.color="var(--red)"; }
    } else {
      actEl.textContent="0.00%"; deltaEl.textContent="ยังไม่มีผลงานจริงที่ยืนยัน"; deltaEl.style.color="var(--ink-faint)";
      asOfEl.textContent=""; 
    }
  } else {
    planEl.textContent="—"; planSub.textContent="รอป้อนแผนงานหลัก (Master Schedule)";
    actEl.textContent="—"; deltaEl.textContent="รอป้อนผลงานจริง (ปร.5/ปร.6 · งวดงาน)"; deltaEl.style.color="var(--ink-faint)";
    asOfEl.textContent="";
  }

  // วันตามสัญญาที่ล่วงไป — ฐาน NTP (startDate) ถึง วันข้อมูลล่าสุด/วันนี้
  const cStart=beToDate(DATA.meta.startDate);
  let cNow;
  if(DATA.daily.length) cNow=beToDate(DATA.daily[DATA.daily.length-1].iso);
  else { const t=new Date(); cNow=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate())); }
  const cTotal=DATA.meta.durationDays;
  let cElapsed=Math.round((cNow-cStart)/86400000)+1;
  cElapsed=Math.max(0,Math.min(cTotal,cElapsed));
  document.getElementById("kpiDays").textContent=cElapsed+" / "+cTotal+" วัน";
  document.getElementById("kpiDaysSub").textContent="ล่วงไปแล้ว "+(cElapsed/cTotal*100).toFixed(1)+"% ของอายุสัญญา";

  // ระยะท่อที่วางแล้ว — ผลรวม meters จาก daily (นับเฉพาะยืนยันแล้ว)
  const laid=DATA.daily.filter(r=>!r.unconfirmed).reduce((a,r)=>a+(Number(r.meters)||0),0);
  const totLen=DATA.alignment.chainEnd-DATA.alignment.chainStart;
  document.getElementById("kpiMeters").textContent=laid.toLocaleString()+" / "+totLen.toLocaleString()+" ม.";
  document.getElementById("kpiMetersSub").textContent=(laid/totLen*100).toFixed(1)+"% ของแนวสาย (จากรายงานหน้างาน)";
}

/* =========================================================
   03 · S-Curve
   ========================================================= */
function renderSCurve(){
  const svg=document.getElementById("scurveSvg");
  const labels=DATA.scurve.labels||[];
  const plan=DATA.scurve.planMonthly||[];
  const actual=DATA.scurve.actualMonthly||[];

  const W=1200,H=460,padL=54,padR=30,padT=24,padB=48;
  const plotW=W-padL-padR, plotH=H-padT-padB, maxY=100, n=labels.length;
  const xAt=i=> padL+(plotW/Math.max(n-1,1))*i;
  const yAt=v=> padT+plotH-(v/maxY)*plotH;

  let html="";
  for(let g=0;g<=5;g++){ const val=g*20, yy=yAt(val);
    html+=`<line x1="${padL}" y1="${yy}" x2="${W-padR}" y2="${yy}" stroke="var(--paper-line)" stroke-width="1"/>`;
    html+=`<text x="${padL-10}" y="${yy+4}" text-anchor="end" font-family="IBM Plex Mono" font-size="11" fill="var(--ink-faint)">${val}%</text>`; }
  labels.forEach((lb,i)=>{ html+=`<text x="${xAt(i)}" y="${H-padB+22}" text-anchor="middle" font-family="IBM Plex Mono" font-size="11" fill="var(--ink-faint)">${lb}</text>`; });

  if(!plan.length){
    html+=`<text x="${W/2}" y="${padT+plotH/2}" text-anchor="middle" font-family="IBM Plex Sans Thai" font-size="15" fill="var(--ink-faint)">รอป้อนแผนงานหลัก (Master Schedule) และผลงานจริง</text>`;
    html+=`<text x="${W/2}" y="${padT+plotH/2+24}" text-anchor="middle" font-family="IBM Plex Sans Thai" font-size="12" fill="var(--ink-faint)">cross-check กับตารางแผนงาน/งวดงานที่อนุมัติ (ปร.5/ปร.6) ก่อนป้อนลง DATA.scurve</text>`;
    svg.innerHTML=html; return;
  }

  const cumPlan=[]; let p=0; plan.forEach(v=>{p+=v;cumPlan.push(p);});
  const cumAct=[]; let a=0; actual.forEach(v=>{a+=v;cumAct.push(a);});

  const planPath=cumPlan.map((v,i)=>(i===0?"M":"L")+xAt(i)+" "+yAt(v)).join(" ");
  html+=`<path d="${planPath}" fill="none" stroke="var(--steel)" stroke-width="2.5" stroke-dasharray="6 4"/>`;

  if(cumAct.length){
    const actPath=cumAct.map((v,i)=>(i===0?"M":"L")+xAt(i)+" "+yAt(v)).join(" ");
    html+=`<path d="${actPath} L ${xAt(cumAct.length-1)} ${yAt(0)} L ${xAt(0)} ${yAt(0)} Z" fill="var(--amber)" opacity=".08"/>`;
    html+=`<path d="${actPath}" fill="none" stroke="var(--amber)" stroke-width="3"/>`;
    cumAct.forEach((v,i)=> html+=`<circle cx="${xAt(i)}" cy="${yAt(v)}" r="4" fill="var(--amber)" stroke="#fff" stroke-width="1.5"/>`);
    const t=cumAct.length-1;
    html+=`<line x1="${xAt(t)}" y1="${padT}" x2="${xAt(t)}" y2="${H-padB}" stroke="var(--red)" stroke-width="1" stroke-dasharray="3 3"/>`;
    html+=`<text x="${xAt(t)+6}" y="${padT+14}" font-family="IBM Plex Mono" font-size="10" fill="var(--red)">ปัจจุบัน</text>`;
  }
  cumPlan.forEach((v,i)=>{ if(i<Math.max(cumAct.length,1)) html+=`<circle cx="${xAt(i)}" cy="${yAt(v)}" r="3" fill="var(--steel)" stroke="#fff" stroke-width="1"/>`; });

  html+=`<g transform="translate(${padL},${padT-4})">
    <line x1="0" y1="0" x2="22" y2="0" stroke="var(--steel)" stroke-width="2.5" stroke-dasharray="6 4"/>
    <text x="28" y="4" font-family="IBM Plex Sans Thai" font-size="12" fill="var(--ink-soft)">แผนงาน (Plan)</text>
    <line x1="150" y1="0" x2="172" y2="0" stroke="var(--amber)" stroke-width="3"/>
    <text x="178" y="4" font-family="IBM Plex Sans Thai" font-size="12" fill="var(--ink-soft)">ผลงานจริง (Actual)</text></g>`;
  svg.innerHTML=html;
}

/* =========================================================
   04 · Pipe schedule (bar summary)
   ========================================================= */
function renderPipeSchedule(){
  const el=document.getElementById("pipeSchedule");
  const rows=DATA.pipeSchedule||[];
  if(!rows.length){ el.innerHTML="<p style='color:var(--ink-faint)'>ยังไม่มีข้อมูลบัญชีท่อ</p>"; return; }
  const MAT={PVC:"#00C2F3", AC:"#E07A1F", ST:"#5C6B7A", HDPE:"#1F7A54"};
  const max=Math.max(...rows.map(r=>r.len));
  const total=rows.reduce((a,r)=>a+r.len,0);
  let html=`<div class="pipe-list">`;
  rows.forEach(r=>{
    const c=MAT[r.type]||"#93A4B4";
    const w=(r.len/max*100).toFixed(1);
    html+=`<div class="pipe-row">
      <span class="pipe-label mono">ϕ${r.dia} ${r.type}${r.note?` · ${r.note}`:""}</span>
      <span class="pipe-bar-wrap"><span class="pipe-bar" style="width:${w}%;background:${c}"></span></span>
      <span class="pipe-len mono">${r.len.toLocaleString()} ม.</span>
    </div>`;
  });
  html+=`</div>
    <div class="pipe-total mono">รวมท่อตาม Pipe Schedule ≈ ${total.toLocaleString()} ม.
      <span class="pipe-flag">· ผลต่างกับความยาวแนวสาย ${DATA.alignment.chainEnd.toLocaleString()} ม. = ${(total-DATA.alignment.chainEnd).toLocaleString()} ม. (รอ resolve)</span></div>
    <p class="pipe-note">${DATA.pipeScheduleVerified?"":"⚠ ปริมาณข้างต้นรอยืนยันกับ BOQ ต้นฉบับ — อย่าใช้อ้างอิงงวดงานก่อน cross-check"}</p>`;
  el.innerHTML=html;
}

/* =========================================================
   05 · Recent events
   ========================================================= */
function renderRecent(){
  const el=document.getElementById("recentList");
  if(!DATA.daily.length){
    el.innerHTML=`<p style="color:var(--ink-faint);padding:12px 0;">ยังไม่มีรายงานประจำวัน — เมื่ออัปโหลดใบรายงานและ merge เข้า data.js แล้ว รายการล่าสุดจะปรากฏที่นี่</p>`;
    return;
  }
  const items=DATA.daily.slice(-8).reverse();
  el.innerHTML=items.map(r=>`
    <div class="recent-item">
      <span class="recent-date">${r.date}${r.unconfirmed?" *":""}</span>
      <span class="recent-wells">${(r.segs||[]).slice(0,3).map(s=>`<span class="tag">${(bandById(s)||{}).id||s}</span>`).join("")}</span>
      <span class="recent-text">${r.text}</span>
    </div>`).join("") +
    (items.some(i=>i.unconfirmed)?'<p style="font-size:.76rem;color:var(--ink-faint);margin-top:10px;">* แผนงานที่ยังไม่มีรายงานผลยืนยันในวันถัดไป</p>':"");
}

/* =========================================================
   Daily tab
   ========================================================= */
function initDailyTab(){
  const monthSel=document.getElementById("filterMonth");
  const segSel=document.getElementById("filterSeg");
  const searchInput=document.getElementById("filterSearch");

  const months=[...new Set(DATA.daily.map(d=>d.month))].sort((a,b)=>a-b);
  const MN={7:"กรกฎาคม",8:"สิงหาคม",9:"กันยายน",10:"ตุลาคม",11:"พฤศจิกายน",12:"ธันวาคม",1:"มกราคม",2:"กุมภาพันธ์"};
  const yearOf=m=>(m>=7?"2569":"2570");
  monthSel.innerHTML=`<option value="">ทุกเดือน</option>`+months.map(m=>`<option value="${m}">${MN[m]||m} ${yearOf(m)}</option>`).join("");
  segSel.innerHTML=`<option value="">ทุกช่วงงาน</option>`+DATA.alignment.bands.map(b=>`<option value="${b.id}">${b.id} · ${b.name}</option>`).join("");

  [monthSel,segSel,searchInput].forEach(el=>{ el.addEventListener("input",renderDailyTable); el.addEventListener("change",renderDailyTable); });
  document.getElementById("clearFilters").addEventListener("click",()=>{ monthSel.value="";segSel.value="";searchInput.value="";renderDailyTable(); });
  renderDailyTable();
}
function renderDailyTable(){
  const month=document.getElementById("filterMonth").value;
  const seg=document.getElementById("filterSeg").value;
  const search=document.getElementById("filterSearch").value.trim().toLowerCase();
  let rows=DATA.daily.filter(r=>{
    if(month && String(r.month)!==month) return false;
    if(seg && !(r.segs||[]).includes(seg)) return false;
    if(search && !r.text.toLowerCase().includes(search)) return false;
    return true;
  });
  document.getElementById("dailyCount").textContent=`พบ ${rows.length} รายการ`;
  const tbody=document.getElementById("dailyTbody");
  if(!DATA.daily.length){ tbody.innerHTML=`<tr class="empty-row"><td colspan="3">ยังไม่มีรายงานประจำวัน — เริ่มด้วยการอัปโหลดใบรายงานแล้ว merge เข้า data.js (ดู tools/pid903.py)</td></tr>`; return; }
  if(!rows.length){ tbody.innerHTML=`<tr class="empty-row"><td colspan="3">ไม่พบรายการที่ตรงกับตัวกรอง</td></tr>`; return; }
  tbody.innerHTML=rows.slice().reverse().map(r=>`
    <tr class="${r.holiday?'is-holiday':''} ${r.unconfirmed?'is-unconfirmed':''}">
      <td class="cell-date">${r.date}${r.unconfirmed?" *":""}</td>
      <td><div class="cell-wells">${(r.segs||[]).map(s=>`<span class="tag tag-well" data-seg="${s}">${s}</span>`).join("")}</div></td>
      <td>${r.text}${r.meters?` <span class="mono" style="color:var(--ink-faint)">(${Number(r.meters).toLocaleString()} ม.)</span>`:""}${r.reportUrl?` <a class="report-link" href="${r.reportUrl}" target="_blank" rel="noopener" title="เปิดใบรายงานของวันนี้">📄 ดูใบรายงานจริง</a>`:""}</td>
    </tr>`).join("");
  tbody.querySelectorAll(".tag-well").forEach(t=> t.addEventListener("click",()=>window.goToSegTab(t.dataset.seg)));
}

/* =========================================================
   Segments tab
   ========================================================= */
function initSegTab(){
  const chipsEl=document.getElementById("segChips");
  chipsEl.innerHTML=DATA.alignment.bands.map(b=>{
    const st=segStatus(b.id);
    return `<button class="well-chip" data-seg="${b.id}"><i class="chip-dot" style="background:${stageColor(st)}"></i>${b.id} · ${(METHOD[b.method]||{}).short||""}</button>`;
  }).join("");
  chipsEl.querySelectorAll(".well-chip").forEach(btn=> btn.addEventListener("click",()=>selectSeg(btn.dataset.seg)));
  selectSeg(DATA.alignment.bands[0].id);
}
function selectSeg(id){
  if(!id) return;
  document.querySelectorAll(".well-chip").forEach(c=>c.classList.toggle("active",c.dataset.seg===id));
  const b=bandById(id); if(!b) return;
  const st=segStatus(id);
  const curated=DATA.curated[id];
  const auto=recordsForSeg(id);
  let timeline="";
  if(curated && curated.length){
    timeline=curated.map(it=>`
      <div class="timeline-item">
        <span class="timeline-date mono">${it.date}</span>
        <span class="timeline-text">${it.text}</span>
        <span class="timeline-stage"><span class="badge ${stageBadgeClass(classify(it.stage+' '+it.text))}">${it.stage||stageLabel(classify(it.text))}</span></span>
      </div>`).join("");
  } else if(auto.length){
    timeline=auto.map(r=>`
      <div class="timeline-item">
        <span class="timeline-date mono">${r.date}${r.unconfirmed?" *":""}</span>
        <span class="timeline-text">${r.text}</span>
        <span class="timeline-stage"><span class="badge ${stageBadgeClass(classify(r.text))}">${stageLabel(classify(r.text))}</span></span>
      </div>`).join("");
  } else {
    timeline=`<p style="color:var(--ink-faint);padding:20px 0;">ยังไม่มีข้อมูลรายงานสำหรับช่วงงานนี้</p>`;
  }
  const sub = `${fmtCh(b.from)} – ${fmtCh(b.to)} · ระยะ ${(b.to-b.from).toLocaleString()} ม. · วิธี: ${b.name}${b.permit? " · "+b.permit : ""}${b.verified===false? " · (จุดตัดช่วงรอยืนยัน)":""}`;
  document.getElementById("segDetail").innerHTML=`
    <div class="well-detail-head">
      <div><div class="well-detail-title">${b.id} · ${b.name}</div>
        <p class="well-detail-sub">${sub}</p></div>
      <span class="badge ${stageBadgeClass(st)}" style="font-size:.85rem;padding:6px 16px;">${stageLabel(st)}</span>
    </div>
    <div class="timeline">${timeline}</div>`;
}

/* =========================================================
   Init
   ========================================================= */
document.addEventListener("DOMContentLoaded",()=>{
  initTabs();
  renderHeroMeta();
  renderVerifyBanner();
  renderAlignmentStrip();
  renderKPIs();
  renderSCurve();
  renderPipeSchedule();
  renderRecent();
  // initDailyTab()/initSegTab() ปิดไว้: แท็บ "รายงานรายวัน" และ "ผลงานแยกตามประเภทท่อ"
  // ถูกแทนที่ด้วยมาร์กอัป/สคริปต์ใหม่ทั้งหมดใน index.html (ดู #tab-daily / #tab-segments)
  // element เดิม (filterMonth, dailyTbody, segChips, segDetail) ไม่มีอยู่แล้ว เรียกต่อจะ error
});

})();
