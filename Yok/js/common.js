document.addEventListener('DOMContentLoaded', function(){
  (function(){
    popupOverlay = document.getElementById('popupOverlay');
    popupsButon = document.getElementsByClassName('popup-open');
    for (var i = 0; i < popupsButon.length; i++) {
      popupsButon[i].onclick = function(){
        document.body.setAttribute("style", "overflow-y: hidden;");
        popupOverlay.setAttribute("style", "display: block;");
        popupId = this.getAttribute("data-popup-id");        
        popupBody = document.getElementById(popupId); 
        popupBody.setAttribute("style", "display: block;");
      }
    }
    popupOverlay.onclick = function(){
      for (var i = 0; i < popupsButon.length; i++) {
        popupId = popupsButon[i].getAttribute("data-popup-id");        
        popupBody = document.getElementById(popupId);
        popupBody.removeAttribute("style");
      }
      popupOverlay.removeAttribute("style");
      document.body.setAttribute("style", "overflow-y: visible;");
    }
  })(); 
});