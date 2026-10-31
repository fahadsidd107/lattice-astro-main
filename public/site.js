(function(){
  'use strict';
  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro=$('.intro'); if(intro&&!reduced){setTimeout(()=>intro.classList.add('out'),800);setTimeout(()=>intro.remove(),1750)}else intro?.remove();
  const clock=$('[data-clock]'); if(clock){const fmt=new Intl.DateTimeFormat('en-GB',{timeZone:clock.dataset.tz,hour:'2-digit',minute:'2-digit',hour12:false});const tick=()=>clock.textContent=fmt.format(new Date());tick();setInterval(tick,15000)}
  $('[data-year]').textContent=new Date().getFullYear();
  const menu=$('#menu'), menuBtn=$('.menu-btn'); const setMenu=open=>{menu.classList.toggle('open',open);menuBtn.setAttribute('aria-expanded',open);document.documentElement.style.overflow=open?'hidden':'';if(open)setTimeout(()=>$('a',menu)?.focus(),100)};menuBtn.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));$$('a',menu).forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
  const progress=$('.progress i');addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.height=(max?scrollY/max*100:0)+'%'},{passive:true});
  function latticeOrb(canvas){
    if(!canvas)return;
    const ctx=canvas.getContext('2d',{alpha:true});
    const sections=[
      {id:'main-content',anchor:'.hero',shape:'sphere',color:[232,229,222],scale:.29,opacity:.8,speed:.00009},
      {id:'work',anchor:'.project-visual',shape:'ellipsoid',color:[82,199,184],scale:.25,opacity:.78,speed:.00016},
      {id:'capabilities',anchor:'.cap-control',shape:'torus',color:[214,161,74],scale:.23,opacity:.8,speed:.00013},
      {id:'experience',anchor:'.experience',shape:'helix',color:[137,151,190],scale:.22,opacity:.62,speed:.00018,side:.29},
      {id:'about',anchor:'.about-grid',shape:'organic',color:[139,171,143],scale:.22,opacity:.62,speed:.00008,side:.31},
      {id:'contact',anchor:'.contact-grid',shape:'portal',color:[210,124,108],scale:.23,opacity:.72,speed:.00011,side:.31}
    ];
    const sectionEls=sections.map(s=>$('#'+s.id));
    let w=0,h=0,dpr=1,count=0,shapeCache=[],active=0,last=0,rot=0,started=false;
    let ax=0,ay=0,tx=0,ty=0,scale=1,targetScale=1,opacity=.8,targetOpacity=.8,color=[232,229,222],targetColor=color.slice();
    let pointer={x:-9999,y:-9999,tx:-9999,ty:-9999,life:0},scrollV=0,lastScroll=scrollY,hidden=false,raf=0;
    const fract=n=>n-Math.floor(n), hash=n=>fract(Math.sin(n*127.1)*43758.5453);
    function form(kind,i,n){
      const u=(i+.5)/n,v=hash(i+19),a=Math.PI*2*fract(i*.61803398875), z=1-2*u, rr=Math.sqrt(Math.max(0,1-z*z));
      if(kind==='sphere')return [rr*Math.cos(a),z,rr*Math.sin(a)];
      if(kind==='ellipsoid')return [rr*Math.cos(a)*1.28,z*.75,rr*Math.sin(a)*.82];
      if(kind==='torus'){const b=Math.PI*2*v,R=.66,r=.3;return[(R+r*Math.cos(b))*Math.cos(a),r*Math.sin(b),(R+r*Math.cos(b))*Math.sin(a)]}
      if(kind==='helix'){const turns=4.2,b=(u-.5)*Math.PI*2*turns,band=(v-.5)*.28;return[Math.cos(b)*(.58+band), (u-.5)*1.8, Math.sin(b)*(.58+band)]}
      if(kind==='organic'){const wobble=1+.12*Math.sin(a*3+z*4)+.07*Math.sin(a*7-z*2);return[rr*Math.cos(a)*wobble,z*(1+.08*Math.cos(a*4)),rr*Math.sin(a)*wobble]}
      const ring=i<n*.56;if(ring){const b=(v-.5)*.16;return[Math.cos(a)*(1+b),Math.sin(a)*(1+b),b*2]}return[rr*Math.cos(a)*.67,z*.67,rr*Math.sin(a)*.67];
    }
    function make(kind){return Array.from({length:count},(_,i)=>form(kind,i,count))}
    function resize(){
      dpr=Math.min(devicePixelRatio||1,1.75);w=innerWidth;h=innerHeight;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
      const next=innerWidth<620?350:innerWidth<1000?480:680;if(next!==count){count=next;shapeCache=sections.map(s=>make(s.shape))} updateTarget(!started);started=true;
    }
    function anchorFor(s){
      const el=$(s.anchor)||$('#'+s.id),r=el.getBoundingClientRect();
      if(s.id==='main-content')return [w*.5,h*.51];
      if(s.side)return [w*s.side,Math.max(h*.28,Math.min(h*.72,r.top+r.height*.48))];
      return [r.left+r.width*.5,Math.max(h*.28,Math.min(h*.72,r.top+r.height*.5))];
    }
    const mix=(a,b,t)=>a+(b-a)*t, smooth=t=>t*t*(3-2*t);
    function scrollState(){
      const focus=scrollY+h*.48,knots=sectionEls.map((el,i)=>{const r=el.getBoundingClientRect();return scrollY+r.top+r.height*(i? .46:.51)});
      let lo=0;while(lo<knots.length-2&&focus>knots[lo+1])lo++;const hi=Math.min(lo+1,sections.length-1),span=Math.max(1,knots[hi]-knots[lo]);let t=hi===lo?0:Math.max(0,Math.min(1,(focus-knots[lo])/span));t=smooth(t);
      return {lo,hi,t};
    }
    function updateTarget(snap=false){
      const state=scrollState(),a=sections[state.lo],b=sections[state.hi],pa=anchorFor(a),pb=anchorFor(b),t=state.t;
      tx=mix(pa[0],pb[0],t);ty=mix(pa[1],pb[1],t);targetScale=Math.min(w,h)*(mix(a.scale,b.scale,t)+Math.sin(Math.PI*t)*.012);targetOpacity=mix(a.opacity,b.opacity,t);targetColor=a.color.map((c,i)=>mix(c,b.color[i],t));
      const next=t<.5?state.lo:state.hi;if(next!==active){active=next;document.documentElement.dataset.orbSection=sections[active].id;document.documentElement.style.setProperty('--active-accent',`rgb(${sections[active].color.join(' ')})`)}
      if(snap){ax=tx;ay=ty;scale=targetScale;opacity=targetOpacity;color=targetColor.slice()}return state;
    }
    function draw(t){
      if(hidden)return;const dt=Math.min(32,t-last||16);last=t;const state=updateTarget(),follow=reduced?1:1-Math.exp(-dt/(Math.abs(scrollV)>12?105:175)),soft=reduced?1:1-Math.exp(-dt/180);
      ax+=(tx-ax)*follow;ay+=(ty-ay)*follow;scale+=(targetScale-scale)*soft;opacity+=(targetOpacity-opacity)*soft;
      color=color.map((c,i)=>c+(targetColor[i]-c)*soft);pointer.x+=(pointer.tx-pointer.x)*(1-Math.exp(-dt/90));pointer.y+=(pointer.ty-pointer.y)*(1-Math.exp(-dt/90));pointer.life+=(0-pointer.life)*(1-Math.exp(-dt/260));scrollV*=Math.pow(.86,dt/16);
      const s=sections[active];if(!reduced)rot+=(s.speed*dt*16)+(scrollV*.000008);
      ctx.clearRect(0,0,w,h);const cosY=Math.cos(rot),sinY=Math.sin(rot),cosX=Math.cos(rot*.47),sinX=Math.sin(rot*.47),projected=[];
      for(let i=0;i<count;i++){
        const f=shapeCache[state.lo][i],q=shapeCache[state.hi][i],me=state.t;let x=mix(f[0],q[0],me),y=mix(f[1],q[1],me),z=mix(f[2],q[2],me);
        const x1=x*cosY-z*sinY,z1=x*sinY+z*cosY,y1=y*cosX-z1*sinX,z2=y*sinX+z1*cosX;
        const perspective=2.9/(3.45-z2),sx=ax+x1*scale*perspective,sy=ay+y1*scale*perspective;
        const dx=sx-pointer.x,dy=sy-pointer.y,dist=Math.hypot(dx,dy),radius=Math.max(75,scale*.55),fall=pointer.life*Math.max(0,1-dist/radius);let px=sx,py=sy;
        if(fall>0){const push=fall*fall*24;px+=dx/(dist||1)*push;py+=dy/(dist||1)*push-(z2*fall*4)}
        projected[i]=[px,py,z2,perspective];
      }
      ctx.fillStyle=`rgb(${color.map(Math.round).join(',')})`;
      for(let i=0;i<count;i++){const p=projected[i],depth=Math.max(.12,Math.min(1,(p[2]+1.5)/3));ctx.globalAlpha=opacity*(.18+depth*.78);const size=(.7+depth*1.55)*(w<620?.8:1);ctx.beginPath();ctx.arc(p[0],p[1],size,0,Math.PI*2);ctx.fill()}
      ctx.globalAlpha=.09*opacity;ctx.strokeStyle=`rgb(${color.map(Math.round).join(',')})`;for(let i=0;i<count;i+=34){const p=projected[i],q=projected[(i+13)%count];if(Math.hypot(p[0]-q[0],p[1]-q[1])<scale*.62){ctx.beginPath();ctx.moveTo(p[0],p[1]);ctx.lineTo(q[0],q[1]);ctx.stroke()}}
      ctx.globalAlpha=1;if(!reduced)raf=requestAnimationFrame(draw)
    }
    addEventListener('pointermove',e=>{pointer.tx=e.clientX;pointer.ty=e.clientY;pointer.life=1},{passive:true});addEventListener('pointerleave',()=>{pointer.life=0});
    addEventListener('scroll',()=>{const now=scrollY;scrollV=Math.max(-28,Math.min(28,now-lastScroll));lastScroll=now;if(reduced)draw(performance.now())},{passive:true});
    document.addEventListener('visibilitychange',()=>{hidden=document.hidden;if(!hidden&&!reduced){last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(draw)}});
    new ResizeObserver(resize).observe(document.documentElement);resize();document.documentElement.dataset.orbSection=sections[active].id;if(reduced)draw(0);else raf=requestAnimationFrame(draw);
  }
  latticeOrb($('[data-lattice-orb]'));
  let node=0;const readout=$('[data-readout]');if(readout&&!reduced)setInterval(()=>{node=(node+1)%99;readout.textContent=`NODE ${String(node).padStart(2,'0')} · ${node%5?'STABLE':'SYNCING'}`},1600);
  const projectsEl=$('#portfolio-projects');if(projectsEl){
    const projects=JSON.parse(projectsEl.textContent),root=$('[data-project-root]'),tabs=$('.project-tabs',root),shell=$('.project-tabs-shell',root),tabButtons=$$('[data-project-tab]',root);let at=0;
    const dismissCue=()=>shell?.classList.add('has-interacted');
    const render=(i,interacted=false)=>{if(interacted)dismissCue();at=(i+projects.length)%projects.length;const p=projects[at];$('[data-project-index]',root).textContent=String(at+1).padStart(2,'0');$('[data-project-code]',root).textContent=p.code;$('[data-project-status]',root).textContent=p.status;$('[data-project-meta]',root).textContent=`${p.year} · ${p.discipline}`;$('[data-project-name]',root).textContent=p.name;$('[data-project-summary]',root).textContent=p.summary;$('[data-project-detail]',root).textContent=p.detail;const stack=$('[data-project-stack]',root);stack.replaceChildren(...p.stack.map(x=>{const li=document.createElement('li');li.textContent=x;return li}));const links=$('[data-project-links]',root);links.replaceChildren();[['githubUrl','View source ↗'],['liveUrl','Open project ↗']].forEach(([key,label])=>{if(p[key]){const a=document.createElement('a');a.href=p[key];a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;links.append(a)}});tabButtons.forEach((b,j)=>b.setAttribute('aria-selected',String(j===at)));const accent=p.accent==='amber'?'#d6a14a':'#52c7b8';root.style.setProperty('--project-accent',accent);$('.project-code',root).style.color=accent};
    $('[data-project-prev]',root).addEventListener('click',()=>render(at-1,true));
    $('[data-project-next]',root).addEventListener('click',()=>render(at+1,true));
    tabButtons.forEach(b=>b.addEventListener('click',()=>render(+b.dataset.projectTab,true)));
    tabs?.addEventListener('scroll',dismissCue,{passive:true});
    tabs?.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const target=e.key==='Home'?0:e.key==='End'?projects.length-1:at+(e.key==='ArrowRight'?1:-1);render(target,true);tabButtons[at].focus();tabButtons[at].scrollIntoView({block:'nearest',inline:'nearest',behavior:reduced?'auto':'smooth'})});
  }
  const capsEl=$('#portfolio-capabilities');if(capsEl){const caps=JSON.parse(capsEl.textContent),root=$('[data-capability-root]');$$('[data-cap-tab]',root).forEach(btn=>btn.addEventListener('click',()=>{const i=+btn.dataset.capTab,c=caps[i];$('[data-cap-title]',root).textContent=c.title;$('[data-cap-second]',root).textContent=c.second;$('[data-cap-description]',root).textContent=c.description;$('[data-cap-signal]',root).textContent=c.signal;$$('[data-cap-tab]',root).forEach((b,j)=>b.setAttribute('aria-selected',String(i===j)))}))}
  const form=$('#contact-form');if(form)form.addEventListener('submit',async e=>{e.preventDefault();const button=$('button',form),status=$('.form-status',form);button.disabled=true;status.textContent='Transmitting…';try{const res=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}),data=await res.json();if(!res.ok||!data.success)throw new Error(data.message||'Unable to send');form.reset();status.textContent='Message received. I’ll reply as soon as I can.'}catch(err){status.textContent=`${err.message}. Please email fsiddiqui107@gmail.com directly.`}finally{button.disabled=false}});
})();
