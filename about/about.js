/* 스몰브랜드설계자 소개 페이지 v1 — 블록 6a226b27dd719608c4919df3 의 스크립트 (2026-09-10).
   로더 블록이 불러온 뒤 window.__sbaAboutRun(bm) 을 부른다. 히어로 엔진은 강의 페이지 「헥사 갤럭시」 v7 그대로. */
window.__sbaAboutRun = function(bm){
  function reduced(){
    try{ return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; }
  }

  /* ══ 헥사 갤럭시 ═══════════════════════════════════════════════
     육각형 궤도 28겹(세 겹마다 또렷, 꼭짓점은 금색) + 중심 군집 + 먼 먼지.
     궤도 입자 3할은 제 자리에서 55초에 걸쳐 중심으로 흘러 든다(양 끝은 옅게).
     마우스: 시점이 살짝 기울고(반응 절반), 커서 둘레 원형으로 입자가 비켜나며 채도가 오른다.
     클릭: 그 자리에서 파동. 화면 밖이면 멈춘다. */
  function startGL(host, cv){
    var gl = cv.getContext('webgl', {antialias:false, alpha:true, premultipliedAlpha:true});
    if(!gl) return false;

    var RINGS=28, N1=5544, N2=2772, DUST=1800, CORE=1100, TOTAL=N1+N2+DUST+CORE, i, r, t, k, f, base, ax, ay, bx, by, x, y, z, jit;
    var pos=new Float32Array(TOTAL*3), seed=new Float32Array(TOTAL), ring=new Float32Array(TOTAL), kind=new Float32Array(TOTAL), layer=new Float32Array(TOTAL);
    var step=0.055, per=[], tot=0, n=0;
    for(r=0;r<RINGS;r++){ per.push(r+1); tot+=r+1; }
    /* 궤도 입자 — 1층(N1)과 그 사본 2층(N2)을 같은 규칙으로 만든다. 2층은 셰이더가 한 몸으로 중심으로 끌어간다 */
    function rings(count, L){
      var m=0;
      for(r=0;r<RINGS;r++){
        var cnt=Math.round(count*per[r]/tot);
        base=(r+1)*step;
        for(i=0;i<cnt && m<count;i++){
          t=Math.random(); k=Math.floor(t*6); f=t*6-k;
          ax=Math.cos(k*Math.PI/3)*base; ay=Math.sin(k*Math.PI/3)*base;
          bx=Math.cos((k+1)*Math.PI/3)*base; by=Math.sin((k+1)*Math.PI/3)*base;
          x=ax+(bx-ax)*f; y=ay+(by-ay)*f;
          var crisp=(r%3===0), corner=(f<0.035||f>0.965);
          jit=(Math.random()-.5)*step*(crisp?0.12:(0.35+0.4*Math.random()));
          var len=Math.hypot(x,y)||1; x+=x/len*jit; y+=y/len*jit;
          z=(Math.random()-.5)*(crisp?0.012:(0.04+0.04*r/RINGS));
          pos[n*3]=x*1.18; pos[n*3+1]=y*1.18; pos[n*3+2]=z; seed[n]=Math.random(); ring[n]=r/(RINGS-1);
          kind[n]= corner&&crisp ? 3 : (crisp ? 2 : 0); layer[n]=L; n++; m++;
        }
      }
    }
    rings(N1, 0); rings(N2, 1);
    for(i=n;i<n+DUST;i++){
      var R=2.6*Math.pow(Math.random(),.5)+0.2, th=Math.random()*Math.PI*2, ph=(Math.random()-.5)*1.2;
      pos[i*3]=Math.cos(th)*R; pos[i*3+1]=Math.sin(th)*R; pos[i*3+2]=Math.sin(ph)*0.9;
      seed[i]=Math.random(); ring[i]=1; kind[i]=1; layer[i]=0;
    }
    n+=DUST;
    /* 중심 군집 — 가운데로 갈수록 빽빽하고, 몇 개는 큼직하게 */
    for(i=n;i<n+CORE;i++){
      var g=(Math.random()+Math.random()+Math.random())/3;
      var Rc=0.30*Math.pow(Math.abs(g-0.5)*2,1.3), thc=Math.random()*Math.PI*2;
      pos[i*3]=Math.cos(thc)*Rc*1.18; pos[i*3+1]=Math.sin(thc)*Rc*1.18; pos[i*3+2]=(Math.random()-.5)*0.05;
      seed[i]=Math.random(); ring[i]=0; kind[i]=5; layer[i]=0;
    }
    n+=CORE; TOTAL=n;

    var VS=[
    'attribute vec3 aPos; attribute float aSeed; attribute float aRing; attribute float aKind; attribute float aLayer;',
    'uniform float uT; uniform vec2 uRes; uniform vec2 uTilt; uniform vec2 uMouse; uniform float uPulse; uniform vec2 uPulseXY; uniform float uDpr; uniform float uShift; uniform float uScale; uniform float uPt;',
    'varying float vA; varying float vSeed; varying float vRing; varying float vKind; varying float vHit;',
    'mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }',
    'void main(){',
    '  vec3 p=aPos; float fall=1.0; float grow=1.0;',
    /* 2층(aLayer=1)은 1층의 사본. 한 몸으로 약 60초에 걸쳐 중심으로 끌려 들어가며 그만큼 더 돌고, 양 끝에서 옅어진다 */
    '  if(aLayer>0.5){',
    '    float ph = fract(uT*0.0165);',
    '    float s = 1.0 - 0.97*pow(ph,1.15);',
    '    p.xy *= s;',
    '    p.xy = rot((1.0-s)*1.4) * p.xy;',
    '    fall = smoothstep(0.0,0.12,ph)*smoothstep(1.0,0.86,ph)*0.85;',
    '    grow = 1.0 + 0.6*ph;',
    '  }',
    '  float w = (aKind>0.5&&aKind<1.5) ? 0.012 : 0.034;',
    '  p.xy = rot(uT*w + aSeed*0.02) * p.xy;',
    '  float breathe = 1.0 + 0.035*sin(uT*0.6 + aRing*6.0);',
    '  p.xy *= breathe;',
    '  float tx = -0.62 + uTilt.y*0.11, ty = uTilt.x*0.15;',
    '  float cx=cos(tx), sx=sin(tx); p.yz = mat2(cx,-sx,sx,cx)*p.yz;',
    '  float cy=cos(ty), sy=sin(ty); p.xz = mat2(cy,-sy,sy,cy)*p.xz;',
    '  p.x += uShift; p.y += 0.04;',
    '  float fov=2.6; float sc = fov/(fov+p.z);',
    '  vec2 ndc = vec2(p.x*sc*uRes.y/uRes.x, p.y*sc) * uScale;',
    '  vec2 asp = vec2(uRes.x/uRes.y, 1.0);',
    '  vec2 d = (ndc - uMouse)*asp; float L=length(d);',
    '  float push = smoothstep(0.24,0.0,L);',
    '  ndc += normalize(d+1e-4) * push * 0.05 / asp;',
    '  float hit=0.0;',
    '  if(uPulse < 2.2){',
    '    float pr = uPulse*0.85; vec2 pd=(ndc-uPulseXY)*asp; float dd = length(pd);',
    '    float band = exp(-pow((dd-pr)*7.0,2.0)) * (1.0-uPulse/2.2);',
    '    ndc += normalize(pd+1e-4)*band*0.07/asp; hit=band;',
    '  }',
    '  gl_Position = vec4(ndc, 0.0, 1.0);',
    '  float tw = 0.78 + 0.22*sin(uT*(1.5+aSeed*2.5) + aSeed*40.0);',
    '  float sz = aKind>0.5&&aKind<1.5 ? (0.7+1.6*aSeed) : (1.4 + 3.4*pow(aSeed,2.2));',
    '  if(aKind>1.5&&aKind<2.5) sz *= 1.5; if(aKind>2.5&&aKind<3.5) sz *= 3.3;',
    '  sz *= grow; if(aKind>4.5) sz = (aSeed>0.9 ? 6.5+4.0*aSeed : 1.8+3.0*pow(aSeed,1.5));',
    '  gl_PointSize = sz*sc*uDpr*uPt*(1.0+push*1.6+hit*2.2)*tw;',
    '  float baseA = (aKind>0.5&&aKind<1.5) ? 0.30 : 0.75+0.45*aSeed; if(aKind>1.5&&aKind<2.5) baseA*=1.35; if(aKind>2.5&&aKind<3.5) baseA=1.6;',
    '  baseA *= fall; if(aKind>4.5) baseA = 1.1+0.5*aSeed;',
    '  vA = baseA * sc * tw; vSeed=aSeed; vRing=aRing; vKind=aKind; vHit=hit+push;',
    '}'].join('\n');

    var FS=[
    'precision mediump float;',
    'varying float vA; varying float vSeed; varying float vRing; varying float vKind; varying float vHit;',
    'void main(){',
    '  vec2 q=gl_PointCoord-0.5; float d=length(q);',
    '  float a = smoothstep(0.5,0.05,d); a *= a; a *= vA;',
    '  vec3 mint=vec3(0.50,0.88,0.75), gold=vec3(0.95,0.72,0.35), white=vec3(0.96,1.0,0.98), deep=vec3(0.18,0.77,0.55);',
    '  vec3 c = mix(deep, mint, vRing);',
    '  if(vSeed>0.86) c=gold; if(vSeed<0.06) c=white;',
    '  if(vKind>0.5&&vKind<1.5) c=mix(mint,white,0.5)*0.8;',
    '  if(vKind>1.5&&vKind<2.5) c=mix(mint,white,0.35); if(vKind>2.5&&vKind<3.5) c=mix(gold,white,0.25);',
    '  if(vKind>4.5) c = vSeed>0.9 ? mix(gold,white,0.35) : mix(white,mint,0.35);',
    '  float h = clamp(vHit*1.3,0.0,1.0); float lum = dot(c, vec3(0.33));',
    '  c = clamp(mix(vec3(lum), c, 1.0 + 1.6*h) * (1.0 + 0.25*h), 0.0, 1.0);',
    '  gl_FragColor = vec4(c*a, a);',
    '}'].join('\n');

    function sh(type,src){ var s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s); return s; }
    var prog=gl.createProgram(); gl.attachShader(prog,sh(gl.VERTEX_SHADER,VS)); gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FS)); gl.linkProgram(prog);
    if(!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);
    function buf(data,name,size){ var b=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW); var loc=gl.getAttribLocation(prog,name); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,size,gl.FLOAT,false,0,0); }
    buf(pos,'aPos',3); buf(seed,'aSeed',1); buf(ring,'aRing',1); buf(kind,'aKind',1); buf(layer,'aLayer',1);
    var U={}; ['uT','uRes','uTilt','uMouse','uPulse','uPulseXY','uDpr','uShift','uScale','uPt'].forEach(function(key){ U[key]=gl.getUniformLocation(prog,key); });
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); gl.clearColor(0,0,0,0);

    var W=0,H=0,dpr=1,shift=0.70,scl=1,pt=1;
    function resize(){
      dpr=Math.min(window.devicePixelRatio||1,2);
      W=host.clientWidth; H=host.clientHeight; if(!W||!H) return;
      cv.width=Math.round(W*dpr); cv.height=Math.round(H*dpr);
      gl.viewport(0,0,cv.width,cv.height);
      shift = W<768 ? 0.0 : 0.62;              /* 모바일은 은하를 가운데로 */
      var k = Math.max(H,640)/640;             /* 640px 기준. 화면이 커져도 은하는 완만하게만 커진다 */
      scl = Math.pow(k,0.55)*640/H; pt = Math.pow(k,0.3);
    }
    var mouse={x:9,y:9}, mS={x:9,y:9}, tilt={x:0,y:0}, tgt={x:0,y:0}, pulse=9, pxy={x:0,y:0}, t0=performance.now(), alive=true, raf=0;
    function toNdc(e){ var rc=host.getBoundingClientRect(); return {x:((e.clientX-rc.left)/rc.width)*2-1, y:-(((e.clientY-rc.top)/rc.height)*2-1)}; }
    host.addEventListener('pointermove',function(e){ var p=toNdc(e); mouse=p; tgt={x:p.x,y:p.y}; },{passive:true});
    host.addEventListener('pointerleave',function(){ mouse={x:9,y:9}; mS={x:9,y:9}; tgt={x:0,y:0}; });
    host.addEventListener('pointerdown',function(e){ if(e.target.closest('button,a')) return; pxy=toNdc(e); pulse=0; });
    var still = reduced();
    function frame(now){
      raf=0; if(!alive) return;
      var T=(now-t0)/1000;
      tilt.x+=(tgt.x-tilt.x)*0.035; tilt.y+=(tgt.y-tilt.y)*0.035; pulse+=1/60;
      if(mouse.x>5){ mS={x:9,y:9}; } else { if(mS.x>5) mS={x:mouse.x,y:mouse.y}; mS.x+=(mouse.x-mS.x)*0.05; mS.y+=(mouse.y-mS.y)*0.05; }
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(U.uT,T); gl.uniform2f(U.uRes,cv.width,cv.height); gl.uniform2f(U.uTilt,tilt.x,tilt.y);
      gl.uniform2f(U.uMouse,mS.x,mS.y); gl.uniform1f(U.uPulse,pulse); gl.uniform2f(U.uPulseXY,pxy.x,pxy.y); gl.uniform1f(U.uDpr,dpr); gl.uniform1f(U.uShift,shift); gl.uniform1f(U.uScale,scl); gl.uniform1f(U.uPt,pt);
      gl.drawArrays(gl.POINTS,0,TOTAL);
      if(!still) raf=requestAnimationFrame(frame);
    }
    resize();
    if(window.ResizeObserver){ new ResizeObserver(resize).observe(host); } else { window.addEventListener('resize', resize); }
    setTimeout(resize, 500); setTimeout(resize, 1800);
    if(window.IntersectionObserver){
      new IntersectionObserver(function(es){ alive=!!(es[0]&&es[0].isIntersecting); if(alive&&!raf) raf=requestAnimationFrame(frame); },{threshold:0}).observe(host);
    }
    document.addEventListener('visibilitychange',function(){ if(document.visibilityState==='visible'&&alive&&!raf) raf=requestAnimationFrame(frame); });
    raf=requestAnimationFrame(frame);
    return true;
  }

  var bound=null;
  function fitHdr(root){ var h=document.querySelector('header.global-header'); if(!h) return; var hh=Math.round(h.getBoundingClientRect().height); if(hh>0&&hh<200) root.style.setProperty('--abx-hdr', hh+'px'); }
  function boot(){
    var root = bm.container && bm.container.querySelector('.abx');
    if(!root) return false;
    if(bound !== root){
      root.addEventListener('click', function(e){
        var go = e.target.closest('[data-go]'); if(!go) return;
        e.preventDefault();
        var target = root.querySelector(go.getAttribute('data-go'));
        if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      });
      /* 모바일 하단 버튼: 히어로 70% 지나면 뜨고, 폼이 보이면 숨는다 */
      var bar = root.querySelector('.abx-bar'), hero = root.querySelector('.hf');
      function tick(){
        if(!bar) return;
        var form = document.querySelector('.cs-form'), vh = innerHeight;
        var past = hero ? (hero.getBoundingClientRect().bottom < vh*0.3) : (scrollY > 400);
        var formIn = false; if(form){ var r=form.getBoundingClientRect(); formIn = r.top < vh*0.85 && r.bottom > 0; }
        bar.classList.toggle('on', past && !formIn);
      }
      addEventListener('scroll', tick, {passive:true}); addEventListener('resize', tick); setTimeout(tick, 300);
      fitHdr(root); addEventListener('resize', function(){ fitHdr(root); }); setTimeout(function(){ fitHdr(root); }, 900);
      /* 스크롤 등장: 같은 부모 안에서는 순번(--i)만큼 시간차. 숫자는 켜질 때 0 부터 센다 */
      var reduced=false; try{ reduced=matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){}
      var targets = root.querySelectorAll('[data-rv]');
      var seen = new Map();
      targets.forEach(function(el){ var par = el.parentElement; var k = seen.get(par)||0; el.style.setProperty('--i', k); seen.set(par, k+1); });
      function countUp(b){ var to = parseInt(b.getAttribute('data-n'),10); if(isNaN(to) || b.__done) return; b.__done = true; if(reduced || to<=1){ b.textContent = to; return; }
        var t0 = performance.now(), dur = 900; (function step(now){ var p = Math.min(1,(now-t0)/dur); p = 1-Math.pow(1-p,3); b.textContent = Math.round(to*p); if(p<1) requestAnimationFrame(step); })(t0); }
      /* 금빛 순회: 켜질 때 한 번, 그 뒤 7~10초마다 반복(카드마다 어긋나게), 마우스를 올리면 즉시 */
      function sweep(el){ el.classList.remove('sweep'); void el.offsetWidth; el.classList.add('sweep'); }
      function armSweep(el){ if(el.__sweepArmed || reduced) return; el.__sweepArmed = true;
        var i = parseFloat(el.style.getPropertyValue('--i'))||0;
        setTimeout(function(){ sweep(el); }, 350 + i*180);
        setTimeout(function(){ sweep(el); setInterval(function(){ if(!el.matches(':hover')) sweep(el); }, 7000 + (i%4)*900); }, 7000 + i*900 + Math.random()*1200);
        el.addEventListener('pointerenter', function(){ sweep(el); }); }
      /* 실행 계획 체크리스트: 켜지면 2초마다 하나씩 체크, 다 차면 잠깐 쉬고 비운 뒤 반복 */
      function armCycle(ul){ if(ul.__cyc) return; ul.__cyc = true; var lis = ul.querySelectorAll('li'), k = 0;
        if(reduced){ lis.forEach(function(li){ li.classList.add('on'); }); return; }
        function step(){ if(k < lis.length){ lis[k].classList.add('on'); k++; setTimeout(step, 2000); } else { setTimeout(function(){ lis.forEach(function(li){ li.classList.remove('on'); }); k = 0; setTimeout(step, 1200); }, 2600); } }
        setTimeout(step, 900); }
      function armRoles(ul){ if(ul.__roles) return; ul.__roles = true; var lis = ul.querySelectorAll('li'); if(reduced){ lis.forEach(function(l){ l.classList.add('lit'); }); return; }
        var k = 0; function step(){ if(k>0) lis[k-1].classList.remove('gold'); if(k < lis.length){ lis[k].classList.add('lit'); if(!lis[k].classList.contains('now')) lis[k].classList.add('gold'); k++; setTimeout(step, 420); } else { setTimeout(function(){ lis.forEach(function(l){ l.classList.remove('lit','gold'); }); k = 0; setTimeout(step, 900); }, 5200); } }
        setTimeout(step, 500); }
      function show(el){ el.classList.add('in'); if(el.classList.contains('roles')) armRoles(el); el.querySelectorAll('[data-n]').forEach(countUp); if(el.hasAttribute('data-n')) countUp(el); if(el.classList.contains('gl')) armSweep(el); el.querySelectorAll('[data-cycle]').forEach(armCycle); }
      if(reduced || !('IntersectionObserver' in window)){ targets.forEach(show); }
      else { var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ show(e.target); io.unobserve(e.target); } }); }, {threshold:0.18, rootMargin:'0px 0px -6% 0px'}); targets.forEach(function(el){ io.observe(el); }); }
      bound = root;
    }
    var host = root.querySelector('.ah'), cv = host && host.querySelector('.ah-gl');
    if(host && cv && !cv.__sbaGl){ cv.__sbaGl = true; if(!startGL(host, cv)) cv.style.display='none'; }
    return true;
  }
  if(!boot()){ var tries=0; var timer=setInterval(function(){ if(boot() || ++tries>200) clearInterval(timer); }, 50); }
  setTimeout(boot, 900); setTimeout(boot, 2600);
  if(typeof bm !== 'undefined') bm.onContextChange = function(){ boot(); };
};
