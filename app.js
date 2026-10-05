const state = {
  page: "overview",
  family: [
    {id:1,name:"Rajesh Behera",role:"Father",age:52,blood:"B+",conditions:["Hypertension"],initials:"RB"},
    {id:2,name:"Sunita Behera",role:"Mother",age:48,blood:"O+",conditions:["Vitamin D deficiency"],initials:"SB"},
    {id:3,name:"Arjun Behera",role:"Son",age:23,blood:"B+",conditions:["None"],initials:"AB"},
    {id:4,name:"Kamala Behera",role:"Grandmother",age:74,blood:"A+",conditions:["Diabetes"],initials:"KB"}
  ],
  docs: [
    {id:1,name:"Rajesh — Blood Test Report",type:"Lab Report",member:"Rajesh Behera",date:"12 Sep 2026",size:"1.8 MB",status:"Reviewed"},
    {id:2,name:"Sunita — Prescription",type:"Prescription",member:"Sunita Behera",date:"08 Sep 2026",size:"640 KB",status:"Reviewed"},
    {id:3,name:"Kamala — Discharge Summary",type:"Discharge",member:"Kamala Behera",date:"21 Aug 2026",size:"2.4 MB",status:"Needs review"},
    {id:4,name:"Family — Vaccination Records",type:"Vaccination",member:"Family",date:"15 Aug 2026",size:"1.1 MB",status:"Reviewed"},
    {id:5,name:"Health Insurance Policy",type:"Insurance",member:"Family",date:"02 Jul 2026",size:"3.2 MB",status:"Reviewed"}
  ],
  hospitals: [
    {name:"CityCare Multispeciality",distance:"2.4 km",specialty:"Multispeciality",emergency:"24/7",price:"₹₹",match:"92% match"},
    {name:"Apollo Community Hospital",distance:"4.1 km",specialty:"Cardiology · General",emergency:"24/7",price:"₹₹₹",match:"89% match"},
    {name:"MedPlus Family Hospital",distance:"5.8 km",specialty:"General · Diagnostics",emergency:"Day",price:"₹",match:"84% match"},
    {name:"CarePoint Medical Centre",distance:"7.2 km",specialty:"Orthopedics · General",emergency:"24/7",price:"₹₹",match:"81% match"}
  ],
  doctors: [
    {name:"Dr. Ananya Rao",specialty:"Internal Medicine",experience:"14 years",fee:"₹700",mode:"Online · Clinic",match:"94% match"},
    {name:"Dr. Vivek Sharma",specialty:"Cardiologist",experience:"18 years",fee:"₹1,000",mode:"Clinic",match:"91% match"},
    {name:"Dr. Meera Das",specialty:"Endocrinologist",experience:"11 years",fee:"₹800",mode:"Online · Clinic",match:"88% match"},
    {name:"Dr. Rohan Patnaik",specialty:"Orthopedics",experience:"12 years",fee:"₹650",mode:"Clinic",match:"86% match"}
  ],
  pharmacies: [
    {name:"Apollo Pharmacy",distance:"0.8 km",hours:"Open until 11 PM",delivery:"30–45 min"},
    {name:"MedPlus",distance:"1.3 km",hours:"Open until 10 PM",delivery:"25–40 min"},
    {name:"HealthFirst Medicals",distance:"2.1 km",hours:"Open until 9:30 PM",delivery:"40–55 min"}
  ],
  chat: [
    {who:"ai",text:"Hi! I’m CareVault AI. I can help you understand your stored records, prepare for a doctor visit, or navigate healthcare options. I’ll only use the information available in this demo."},
    {who:"user",text:"What health information do we have for Dad?"},
    {who:"ai",text:"Rajesh Behera, 52, has a stored blood-test report dated 12 Sep 2026 and a recorded condition of hypertension. His profile lists blood group B+. For clinical decisions, a qualified clinician should review the original report.",source:"Source: Rajesh — Blood Test Report · Family Profile"}
  ]
};

const content = document.getElementById("content");

function pageHead(kicker,title,sub,actions=""){
  return `<div class="page-head"><div><div class="eyebrow">${kicker}</div><h1 class="page-title">${title}</h1><div class="page-subtitle">${sub}</div></div><div class="actions">${actions}</div></div>`;
}
function btn(label,fn,cls="btn"){ return `<button class="${cls}" onclick="${fn}">${label}</button>`; }
function statCard(icon,value,label){return `<div class="card"><div class="stat-icon">${icon}</div><div class="stat">${value}</div><div class="stat-label">${label}</div></div>`}
function memberCard(m){return `<div class="member" onclick="showMember(${m.id})"><div class="person-avatar">${m.initials}</div><div><div class="member-name">${m.name}</div><div class="member-role">${m.role} · ${m.age} yrs · ${m.blood}</div><div style="margin-top:6px">${m.conditions.map(x=>`<span class="tag">${x}</span>`).join(" ")}</div></div></div>`}
function docRow(d){return `<div class="list-item"><div class="doc-icon">▣</div><div class="grow"><div class="item-title">${d.name}</div><div class="item-sub">${d.type} · ${d.member} · ${d.date}</div></div><span class="tag ${d.status==="Needs review"?"amber":"green"}">${d.status}</span><button class="btn" style="padding:7px 9px" onclick="showDoc(${d.id})">View</button></div>`}

function render(){
  document.querySelectorAll(".nav-item").forEach(x=>x.classList.toggle("active",x.dataset.page===state.page));
  const views={overview, family, vault, assistant, hospitals, doctors, insurance, pharmacies, emergency};
  content.innerHTML=views[state.page]();
  window.scrollTo({top:0,behavior:"smooth"});
}

function overview(){
 return pageHead("FAMILY HEALTH OS","Good evening, Rocky.","One place to organize your family’s health records, care decisions and next steps.",
  btn("+ Add record","openUpload()","btn primary")) + `
 <div class="hero"><div><div class="eyebrow">CareVault snapshot</div><h2>Your family’s health, organized for life.</h2><p>Keep medical documents, family profiles and care navigation together. Use the AI layer to turn complex records into simple, traceable summaries — without replacing a clinician.</p><div style="margin-top:15px">${btn("Open Health Vault","go('vault')","btn primary")} ${btn("Ask AI Assistant","go('assistant')","btn")}</div></div><div class="hero-art">♧</div></div>
 <div class="grid grid-4" style="margin-bottom:17px">${statCard("♧",state.family.length,"Family members")}${statCard("▣",state.docs.length,"Health documents")}${statCard("✦","AI","Record assistant")}${statCard("⚠","1","Action to review")}</div>
 <div class="grid grid-2">
   <div class="card"><div class="card-head"><div><div class="card-title">Family</div><div class="muted">Tap a member to see their profile</div></div>${btn("Manage","go('family')","btn")}</div><div class="family-row">${state.family.map(memberCard).join("")}</div></div>
   <div class="card"><div class="card-head"><div><div class="card-title">Recent records</div><div class="muted">Your latest stored documents</div></div>${btn("View all","go('vault')","btn")}</div><div class="list">${state.docs.slice(0,4).map(docRow).join("")}</div></div>
 </div>
 <div class="grid grid-3" style="margin-top:17px">
  <div class="card"><div class="card-title">Prepare for a doctor</div><p class="muted" style="line-height:1.6">Turn your recent records into a visit checklist and questions to discuss.</p>${btn("Prepare visit","go('assistant')","btn primary")}</div>
  <div class="card"><div class="card-title">Find care</div><p class="muted" style="line-height:1.6">Explore hospitals and doctors using location, specialty, cost and services.</p>${btn("Explore hospitals","go('hospitals')","btn primary")}</div>
  <div class="card"><div class="card-title">Emergency access</div><p class="muted" style="line-height:1.6">Surface essential family information and nearby emergency options.</p>${btn("Open emergency","go('emergency')","btn danger")}</div>
 </div>
 <div class="footer-note">Demo disclaimer: CareVault is a hackathon prototype using fictional data. It is not a medical device and does not diagnose, prescribe, or replace professional medical advice.</div>`;
}

function family(){
 return pageHead("FAMILY","Family profiles","Keep key health context together for the people you care for.",btn("+ Add family member","addFamily()","btn primary"))+
 `<div class="grid grid-2">${state.family.map(m=>`<div class="card"><div class="entity-card"><div class="person-avatar" style="width:52px;height:52px;font-size:15px">${m.initials}</div><div class="grow"><h3>${m.name}</h3><p>${m.role} · ${m.age} years · Blood group ${m.blood}</p>${m.conditions.map(c=>`<span class="tag">${c}</span>`).join(" ")}<div class="mini-actions">${btn("View profile",`showMember(${m.id})`,"btn")}${btn("View records",`filterMember('${m.name}')`,"btn")}</div></div></div></div>`).join("")}</div>`;
}

function vault(){
 return pageHead("HEALTH VAULT","Your family health vault","Store and find prescriptions, reports, discharge summaries, vaccinations and insurance records.",btn("+ Upload document","openUpload()","btn primary"))+
 `<div class="card"><div class="filters"><input class="searchbox" style="max-width:380px" placeholder="Search documents..." oninput="filterDocs(this.value)"><select class="filter" onchange="filterDocType(this.value)"><option>All types</option><option>Lab Report</option><option>Prescription</option><option>Discharge</option><option>Vaccination</option><option>Insurance</option></select><select class="filter"><option>All family</option>${state.family.map(m=>`<option>${m.name}</option>`).join("")}</select></div><div id="docList" class="list">${state.docs.map(docRow).join("")}</div></div>
 <div class="grid grid-2" style="margin-top:16px"><div class="card"><div class="card-title">AI document intelligence</div><p class="muted" style="line-height:1.6">Upload a document and CareVault extracts key information, creates a plain-language summary and keeps the original available for verification.</p>${btn("Try AI summary","showDoc(1)","btn primary")}</div><div class="upload"><div class="upload-icon">⇧</div><strong>Drop a medical document here</strong><p>PDF, JPG or PNG · Demo upload stores a fictional record</p>${btn("Choose file","openUpload()","btn")}</div></div>`;
}

function assistant(){
 return pageHead("AI ASSISTANT","CareVault AI","Ask questions about your family’s stored information or prepare for a healthcare visit.",btn("Doctor visit prep","visitPrep()","btn primary"))+
 `<div class="grid grid-3"><div class="card" style="grid-column:span 2"><div class="chat"><div class="chat-messages" id="chatMessages">${state.chat.map(m=>`<div class="bubble ${m.who}">${m.text}${m.source?`<div class="source">${m.source}</div>`:""}</div>`).join("")}</div><div class="chat-input"><input id="chatInput" placeholder="Ask about a family record..."><button class="btn primary" onclick="sendChat()">Send</button></div></div></div>
 <div class="card"><div class="card-title">Try asking</div><div class="prompt-grid">${["Summarize Dad’s latest report","What should we take to a doctor visit?","Which records need review?","Show Grandma’s health history"].map(x=>`<button class="prompt" onclick="usePrompt('${x}')">${x}</button>`).join("")}</div><div style="margin-top:20px"><div class="card-title">Safety layer</div><p class="muted" style="line-height:1.6">AI answers are grounded in available records and should be verified against original documents and a qualified healthcare professional.</p></div></div></div>`;
}

function hospitals(){
 return pageHead("CARE NAVIGATION","Find a hospital","Compare care options using specialty, distance, emergency service and illustrative cost.",btn("Use my location","locationDemo()","btn"))+
 `<div class="filters"><input class="searchbox" style="max-width:430px" placeholder="Search hospital or specialty..." oninput="filterEntities('hospital',this.value)"><button class="filter">Within 10 km</button><button class="filter">24/7 Emergency</button><button class="filter">Budget</button></div><div id="hospitalGrid" class="grid grid-2">${state.hospitals.map(hospitalCard).join("")}</div><div class="footer-note">Match percentages are illustrative demo logic, not clinical quality ratings or endorsements.</div>`;
}
function hospitalCard(h){return `<div class="card"><div class="entity-card"><div class="entity-icon">✚</div><div class="grow"><h3>${h.name}</h3><p>${h.specialty} · ${h.distance} away · Emergency: ${h.emergency}</p><span class="match">${h.match}</span> <span class="tag">${h.price}</span><div class="mini-actions">${btn("View details",`showHospital('${h.name}')`,"btn")}${btn("Directions","locationDemo()","btn primary")}</div></div></div></div>`}

function doctors(){
 return pageHead("CARE NAVIGATION","Find a doctor","Search by specialty, location, consultation mode and fee.",btn("Doctor visit prep","visitPrep()","btn primary"))+
 `<div class="filters"><input class="searchbox" style="max-width:430px" placeholder="Search doctor or specialty..." oninput="filterEntities('doctor',this.value)"><button class="filter">Online</button><button class="filter">Under ₹800</button><button class="filter">This week</button></div><div id="doctorGrid" class="grid grid-2">${state.doctors.map(doctorCard).join("")}</div><div class="footer-note">Availability and fees shown here are fictional demo data.</div>`;
}
function doctorCard(d){return `<div class="card"><div class="entity-card"><div class="entity-icon">♙</div><div class="grow"><h3>${d.name}</h3><p>${d.specialty} · ${d.experience} · ${d.mode}</p><span class="match">${d.match}</span><span class="price" style="float:right">${d.fee}</span><div class="mini-actions">${btn("View profile",`showDoctor('${d.name}')`,"btn")}${btn("Request visit","showToast('Appointment request simulated.')","btn primary")}</div></div></div></div>`}

function insurance(){
 return pageHead("FINANCIAL HEALTH","Insurance navigator","Compare coverage criteria and estimate illustrative out-of-pocket costs without declaring a universally 'best' policy.",btn("Add policy document","openUpload()","btn"))+
 `<div class="grid grid-2"><div class="card"><div class="card-head"><div><div class="card-title">Family needs</div><div class="muted">Adjust to see criteria matches</div></div></div>
 <div class="form-group"><label>Family size</label><select id="familySize"><option>4 members</option><option>2 members</option><option>5 members</option></select></div>
 <div class="form-group"><label>Annual budget</label><select id="budget"><option>₹10,000–₹20,000</option><option>₹20,000–₹40,000</option><option>₹40,000+</option></select></div>
 <div class="form-group"><label>Priority</label><select id="priority"><option>Hospitalization coverage</option><option>Low premium</option><option>Senior coverage</option><option>Critical illness coverage</option></select></div>
 ${btn("Compare criteria","compareInsurance()","btn primary")}</div>
 <div class="card"><div class="card-title">Illustrative cost planner</div><p class="muted">Example treatment bill: ₹1,00,000</p><div class="form-group"><label>Eligible coverage</label><input id="coverage" type="range" min="0" max="100" value="80" oninput="document.getElementById('covLabel').textContent=this.value+'%'"><div id="covLabel">80%</div></div><div class="stat" id="outCost">₹20,000</div><div class="stat-label">Illustrative out-of-pocket amount before deductibles, exclusions and limits.</div></div></div>
 <div id="insuranceResults" class="card" style="margin-top:16px"><div class="card-title">Policy comparison framework</div><table class="table"><thead><tr><th>Policy</th><th>Premium</th><th>Network</th><th>Senior cover</th><th>Notes</th></tr></thead><tbody>
 <tr><td>Family Shield A</td><td>₹18k/yr</td><td>Wide</td><td>Yes</td><td>Check room-rent limits</td></tr>
 <tr><td>Care Plus B</td><td>₹15k/yr</td><td>Medium</td><td>Limited</td><td>Lower premium; review exclusions</td></tr>
 <tr><td>Secure Family C</td><td>₹23k/yr</td><td>Wide</td><td>Yes</td><td>Higher premium; compare waiting periods</td></tr>
 </tbody></table><div class="footer-note">The table is for demo comparison. Real insurance decisions require checking current policy wording, exclusions, waiting periods, co-pay, network hospitals and insurer disclosures.</div></div>`;
}

function pharmacies(){
 return pageHead("CARE NAVIGATION","Nearby pharmacies","Find nearby medical stores and see illustrative hours and delivery estimates.",btn("Use my location","locationDemo()","btn primary"))+
 `<div class="grid grid-3">${state.pharmacies.map(p=>`<div class="card"><div class="entity-card"><div class="entity-icon">⌕</div><div class="grow"><h3>${p.name}</h3><p>${p.distance} away · ${p.hours}</p><span class="tag green">Delivery ${p.delivery}</span><div class="mini-actions">${btn("Directions","locationDemo()","btn primary")}${btn("Call","showToast('Demo: call action.')","btn")}</div></div></div></div>`).join("")}</div>`;
}

function emergency(){
 return pageHead("EMERGENCY ACCESS","Emergency mode","A quick-access view for essential family information. In a real emergency, contact local emergency services first.",btn("Exit emergency","go('overview')","btn"))+
 `<div class="emergency-hero"><h2>⚠ If this is a real emergency</h2><p class="muted">Call your local emergency service or go to the nearest emergency department. CareVault is not an emergency service.</p><div style="margin-top:12px">${btn("Emergency call","showToast('Demo only — no real call is placed.')","btn danger")} ${btn("Find 24/7 hospitals","go('hospitals')","btn")}</div></div>
 <div class="grid grid-3" style="margin-top:16px"><div class="card"><div class="card-title">Family essentials</div>${state.family.map(m=>`<div class="emergency-contact"><div><b style="font-size:11px">${m.name}</b><div class="muted">${m.blood} · ${m.conditions.join(", ")}</div></div>${btn("Profile",`showMember(${m.id})`,"btn")}</div>`).join("")}</div>
 <div class="card"><div class="card-title">Current medications</div><div class="doc-summary"><b>Demo data</b><div class="bullet">Rajesh: blood-pressure medication recorded in profile context.</div><div class="bullet">Kamala: diabetes treatment details should be verified from the original prescription.</div><div class="bullet">Always carry original medication information when possible.</div></div></div>
 <div class="card"><div class="card-title">Emergency contacts</div><div class="emergency-contact"><span>Primary family contact</span><b>+91 ••••• ••••</b></div><div class="emergency-contact"><span>Caregiver</span><b>+91 ••••• ••••</b></div><div class="emergency-contact"><span>Local emergency service</span><b>Use local number</b></div></div></div>`;
}

function openUpload(){
 openModal(`<button class="close" onclick="closeModal()">×</button><h2>Add health record</h2><p class="muted">Demo upload — no file is actually sent to a server.</p><div class="form-group"><label>Record name</label><input id="newDocName" placeholder="e.g. Dad — ECG Report"></div><div class="form-grid"><div class="form-group"><label>Family member</label><select id="newDocMember">${state.family.map(m=>`<option>${m.name}</option>`).join("")}</select></div><div class="form-group"><label>Document type</label><select id="newDocType"><option>Lab Report</option><option>Prescription</option><option>Discharge</option><option>Vaccination</option><option>Insurance</option></select></div></div><div class="upload"><div class="upload-icon">⇧</div><b>Choose a PDF / JPG / PNG</b><p>For this MVP, clicking Add creates a demo record.</p></div><div style="margin-top:14px;text-align:right">${btn("Cancel","closeModal()","btn")} ${btn("Add record","addDocument()","btn primary")}</div>`);
}
function addDocument(){
 const name=document.getElementById("newDocName").value.trim()||"New Health Document";
 state.docs.unshift({id:Date.now(),name,type:document.getElementById("newDocType").value,member:document.getElementById("newDocMember").value,date:"19 Sep 2026",size:"Demo",status:"Needs review"});
 closeModal(); showToast("Record added to your demo vault."); state.page="vault"; render();
}
function showDoc(id){
 const d=state.docs.find(x=>x.id===id);
 openModal(`<button class="close" onclick="closeModal()">×</button><div class="eyebrow">${d.type}</div><h2>${d.name}</h2><p class="muted">${d.member} · ${d.date} · ${d.size}</p><div class="doc-summary"><b>AI summary</b><p>This demo summary shows how CareVault can convert a complex medical document into a concise overview. The original document remains the source of truth.</p><div class="bullet">• Key finding: example extracted information would appear here.</div><div class="bullet">• Important values: example structured fields would appear here.</div><div class="bullet">• Follow-up: discuss the document with a qualified clinician.</div></div><div style="margin-top:14px">${btn("Ask AI about this","usePrompt('Summarize '+d.name)","btn primary")} ${btn("Mark reviewed",`markReviewed(${d.id})`,"btn")}</div>`);
}
function markReviewed(id){const d=state.docs.find(x=>x.id===id);d.status="Reviewed";closeModal();showToast("Marked as reviewed.");render();}
function showMember(id){
 const m=state.family.find(x=>x.id===id);
 openModal(`<button class="close" onclick="closeModal()">×</button><div class="entity-card"><div class="person-avatar" style="width:54px;height:54px;font-size:15px">${m.initials}</div><div><h2>${m.name}</h2><p class="muted">${m.role} · ${m.age} years · Blood group ${m.blood}</p></div></div><div class="grid grid-2" style="margin-top:17px"><div class="card"><div class="card-title">Health context</div><p class="muted" style="line-height:1.7">Recorded conditions: <b>${m.conditions.join(", ")}</b><br>Emergency profile should be verified and kept current.</p></div><div class="card"><div class="card-title">Records</div>${state.docs.filter(d=>d.member===m.name||d.member==="Family").slice(0,3).map(d=>`<div class="list-item"><div class="grow"><div class="item-title">${d.name}</div><div class="item-sub">${d.date}</div></div></div>`).join("")}</div></div>`);
}
function showHospital(name){const h=state.hospitals.find(x=>x.name===name);openModal(`<button class="close" onclick="closeModal()">×</button><h2>${h.name}</h2><p class="muted">${h.distance} · ${h.specialty}</p><div class="doc-summary"><b>Care navigation details</b><div class="bullet">Specialties: ${h.specialty}</div><div class="bullet">Emergency service: ${h.emergency}</div><div class="bullet">Illustrative cost band: ${h.price}</div><div class="bullet">CareVault match: ${h.match}</div></div><div style="margin-top:14px">${btn("Directions","locationDemo()","btn primary")}</div>`)}
function showDoctor(name){const d=state.doctors.find(x=>x.name===name);openModal(`<button class="close" onclick="closeModal()">×</button><h2>${d.name}</h2><p class="muted">${d.specialty} · ${d.experience}</p><div class="doc-summary"><b>Consultation</b><div class="bullet">Fee: ${d.fee}</div><div class="bullet">Mode: ${d.mode}</div><div class="bullet">CareVault criteria match: ${d.match}</div></div><div style="margin-top:14px">${btn("Request appointment","showToast('Demo appointment request created.');closeModal()","btn primary")}</div>`)}
function visitPrep(){openModal(`<button class="close" onclick="closeModal()">×</button><h2>Doctor Visit Prep</h2><p class="muted">A concise checklist generated from the demo family records.</p><div class="doc-summary"><b>Bring</b><div class="bullet">• Recent prescriptions and lab reports</div><div class="bullet">• Current medication list</div><div class="bullet">• Insurance / ID documents if required</div><br><b>Questions to discuss</b><div class="bullet">• What do the latest results mean in context?</div><div class="bullet">• Are any medications or tests due for review?</div><div class="bullet">• What symptoms or changes should be monitored?</div></div><div style="margin-top:14px">${btn("Open AI Assistant","closeModal();go('assistant')","btn primary")}</div>`)}
function addFamily(){openModal(`<button class="close" onclick="closeModal()">×</button><h2>Add family member</h2><div class="form-grid"><div class="form-group"><label>Name</label><input id="fmName"></div><div class="form-group"><label>Relationship</label><input id="fmRole" placeholder="e.g. Sister"></div><div class="form-group"><label>Age</label><input id="fmAge" type="number"></div><div class="form-group"><label>Blood group</label><input id="fmBlood" placeholder="e.g. O+"></div></div><div style="text-align:right">${btn("Cancel","closeModal()","btn")} ${btn("Add","saveFamily()","btn primary")}</div>`)}
function saveFamily(){const n=document.getElementById("fmName").value.trim();if(!n){showToast("Enter a name.");return}const m={id:Date.now(),name:n,role:document.getElementById("fmRole").value||"Family",age:document.getElementById("fmAge").value||"—",blood:document.getElementById("fmBlood").value||"—",conditions:["None"],initials:n.split(" ").map(x=>x[0]).join("").slice(0,2).toUpperCase()};state.family.push(m);closeModal();showToast("Family member added.");render();}
function compareInsurance(){document.getElementById("insuranceResults").scrollIntoView({behavior:"smooth"});showToast("Criteria comparison updated for your selected needs.");}
function locationDemo(){showToast("Demo location enabled — real geolocation is not connected in this MVP.");}
function filterMember(name){state.page="vault";render();setTimeout(()=>{const i=document.querySelector("#docList");if(i)i.innerHTML=state.docs.filter(d=>d.member===name||d.member==="Family").map(docRow).join("")},50);}
function filterDocs(q){const list=document.getElementById("docList");if(list)list.innerHTML=state.docs.filter(d=>(d.name+d.type+d.member).toLowerCase().includes(q.toLowerCase())).map(docRow).join("")}
function filterDocType(type){if(type==="All types"){render();return}const list=document.getElementById("docList");if(list)list.innerHTML=state.docs.filter(d=>d.type===type).map(docRow).join("")}
function filterEntities(type,q){const data=type==="hospital"?state.hospitals:state.doctors;const arr=data.filter(x=>(x.name+x.specialty).toLowerCase().includes(q.toLowerCase()));const el=document.getElementById(type==="hospital"?"hospitalGrid":"doctorGrid");if(el)el.innerHTML=arr.map(type==="hospital"?hospitalCard:doctorCard).join("")}
function usePrompt(p){state.page="assistant";render();setTimeout(()=>{document.getElementById("chatInput").value=p;sendChat()},80)}
function sendChat(){
 const input=document.getElementById("chatInput");const q=input.value.trim();if(!q)return;
 state.chat.push({who:"user",text:q});
 let answer="I found relevant information in the demo records. Please verify the original document before making a healthcare decision.";
 if(/summarize|report|dad/i.test(q)) answer="Rajesh has a stored blood-test report dated 12 Sep 2026 and a recorded hypertension condition. The demo can extract structured values from the original report, but it should not interpret them as a diagnosis.";
 else if(/doctor|visit|take/i.test(q)) answer="For a doctor visit, bring recent reports, prescriptions, medication details, insurance information and a short list of symptoms or questions. CareVault can turn these into a visit checklist.";
 else if(/review|records/i.test(q)) answer="The demo vault currently has one record marked 'Needs review': Kamala’s discharge summary. You can open it and mark it reviewed after checking the original document.";
 else if(/grandma|kamala/i.test(q)) answer="Kamala Behera is 74, blood group A+, with diabetes recorded in the family profile. Her discharge summary from 21 Aug 2026 is stored in the vault.";
 state.chat.push({who:"ai",text:answer,source:"CareVault demo knowledge base"});
 input.value="";render();
}
function openModal(html){document.getElementById("modalCard").innerHTML=html;document.getElementById("modal").classList.remove("hidden")}
function closeModal(){document.getElementById("modal").classList.add("hidden")}
function showToast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2300)}
function go(p){state.page=p;render()}
document.getElementById("nav").addEventListener("click",e=>{const b=e.target.closest(".nav-item");if(b)go(b.dataset.page)});
document.getElementById("globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){const q=e.target.value.trim();if(q){state.page="vault";render();filterDocs(q)}}});
document.addEventListener("input",e=>{if(e.target.id==="coverage"){document.getElementById("outCost").textContent="₹"+Math.round(100000*(1-e.target.value/100)).toLocaleString("en-IN")}})
render();
