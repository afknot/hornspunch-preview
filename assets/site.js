(function(){
  var b=document.querySelector('.menu-btn'),n=document.getElementById('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
  document.addEventListener('keydown',function(e){if(e.key!=='Escape')return;
    document.querySelectorAll('nav .has-sub').forEach(function(li){if(li.matches(':hover,:focus-within')){li.classList.add('dismissed');var a=li.querySelector(':scope>a');if(a&&li.contains(document.activeElement))a.focus()}});
    if(n&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');b.focus()}});
  document.querySelectorAll('nav .has-sub').forEach(function(li){['mouseleave','focusout'].forEach(function(t){li.addEventListener(t,function(){if(!li.matches(':hover,:focus-within'))li.classList.remove('dismissed')})})});
  var ts=document.getElementById('ts');if(ts){ts.value=Date.now()}
  var d=document.querySelector('input[name=eventDate]');if(d){d.min=new Date().toISOString().slice(0,10)}
  /* Lightbox for photos and videos (media page) */
  var g=document.querySelector('[data-lightbox]'),dlg=document.getElementById('lightbox');
  if(g&&dlg&&dlg.showModal){
    var shots=[].slice.call(g.querySelectorAll('.shot')),stage=dlg.querySelector('.lb-stage'),cap=dlg.querySelector('.lb-cap'),idx=0,opener=null;
    function show(i){
      idx=(i+shots.length)%shots.length;var a=shots[idx],k=a.dataset.kind,src=a.dataset.src,t=a.dataset.caption||'';
      stage.innerHTML='';var el;
      if(k==='image'){el=document.createElement('img');el.src=src;el.alt=t||(a.querySelector('img')||{}).alt||''}
      else if(k==='file'){el=document.createElement('video');el.src=src;el.controls=true;el.autoplay=true;el.playsInline=true;el.setAttribute('aria-label',t||'Video')}
      else{el=document.createElement('iframe');el.src=src;el.title=t||'Video';el.allow='autoplay; fullscreen; picture-in-picture';el.allowFullscreen=true;el.referrerPolicy='strict-origin-when-cross-origin'}
      stage.appendChild(el);cap.textContent=(t?t+' \u2014 ':'')+(idx+1)+' of '+shots.length;
      var nx=shots[(idx+1)%shots.length];if(nx&&nx.dataset.kind==='image'){new Image().src=nx.dataset.src}
    }
    shots.forEach(function(a,i){a.addEventListener('click',function(e){if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();opener=a;show(i);dlg.showModal();document.documentElement.style.overflow='hidden';dlg.querySelector('.lb-close').focus()})});
    dlg.querySelector('.lb-next').addEventListener('click',function(){show(idx+1)});
    dlg.querySelector('.lb-prev').addEventListener('click',function(){show(idx-1)});
    dlg.querySelector('.lb-close').addEventListener('click',function(){dlg.close()});
    dlg.addEventListener('click',function(e){if(e.target===dlg||e.target.classList.contains('lb-inner'))dlg.close()});
    dlg.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){show(idx+1)}else if(e.key==='ArrowLeft'){show(idx-1)}});
    dlg.addEventListener('close',function(){stage.innerHTML='';document.documentElement.style.overflow='';if(opener)opener.focus()});
  }
})();
