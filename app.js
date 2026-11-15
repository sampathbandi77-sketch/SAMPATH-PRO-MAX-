const $ = s => document.querySelector(s);
function clock(){ $('#clock').textContent = new Date().toLocaleTimeString('en-IN',{hour12:false}); }
setInterval(clock,1000); clock();
async function refresh(){
  try{
    const [health, data] = await Promise.all([fetch('/api/health'),fetch('/api/brokers')]);
    if(!health.ok || !data.ok) throw new Error('Backend unavailable');
    const h=await health.json(), d=await data.json();
    $('#systemStatus').textContent='BACKEND ONLINE'; $('#systemStatus').className='pill ok';
    $('#apiState').textContent=h.status; 
    const connected=d.brokers.filter(x=>x.status==='CONNECTED').length;
    $('#brokerCount').textContent=`${connected} / ${d.brokers.length}`;
    $('#brokers').innerHTML=d.brokers.map(b=>{
      const label=b.status==='CONNECTED'?'CONNECTED':b.status==='CONFIGURED_PENDING_IMPLEMENTATION'?'CREDENTIALS DETECTED':'NOT CONFIGURED';
      const cls=b.status==='CONNECTED'?'ok':b.status==='NOT_CONFIGURED'?'muted':'warn';
      return `<article class="broker"><h3>${escapeHtml(b.broker)}</h3><span class="pill ${cls}">${label}</span><p>${escapeHtml(b.message)}</p></article>`;
    }).join('');
  }catch(e){
    $('#systemStatus').textContent='BACKEND OFFLINE'; $('#systemStatus').className='pill warn';
    $('#apiState').textContent='Offline';
    $('#brokers').innerHTML=['Dhan','Upstox','CoinSwitch'].map(n=>`<article class="broker"><h3>${n}</h3><span class="pill warn">STATUS UNAVAILABLE</span><p>Start the backend and refresh.</p></article>`).join('');
  }
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
$('#refresh').addEventListener('click',refresh);
refresh();
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('/assets/sw.js').catch(()=>{}));
