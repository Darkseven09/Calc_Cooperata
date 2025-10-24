// Cooperata PWA utilidades
(function(){
  function isStandalone(){
    try{ if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true; }catch(_e){}
    try{ if (typeof navigator !== 'undefined' && navigator.standalone === true) return true; }catch(_e){}
    return false;
  }

  function goHomeReplace(){
    try{ window.location.replace('index.html'); }catch(_e){ window.location.href = 'index.html'; }
  }

  function closeOrHome(){
    try{ window.close(); }catch(_e){}
    setTimeout(goHomeReplace, 100);
  }

  function bindNavButtons(){
    var back = document.getElementById('btn-back');
    if(back){
      back.addEventListener('click', function(){
        try{
          if (history.length > 1) history.back(); else window.location.href = 'index.html';
        }catch(_e){}
        // Garantia de não deixar histórico
        setTimeout(function(){ goHomeReplace(); }, 100);
      });
    }
    var closeBtn = document.getElementById('btn-close');
    if(closeBtn){
      closeBtn.addEventListener('click', function(){ closeOrHome(); });
    }
  }

  function onReady(){
    if(isStandalone()){
      try{ document.body.classList.add('pwa-standalone'); }catch(_e){}
    }
    bindNavButtons();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', onReady);
  }else{
    onReady();
  }

  // Exporta para uso opcional
  window.CooperataPWA = { isStandalone:isStandalone, goHomeReplace:goHomeReplace, closeOrHome:closeOrHome };
})();

