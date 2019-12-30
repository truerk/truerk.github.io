document.addEventListener('DOMContentLoaded', function () {
  

  var moveBlock = (idBlock, settings = {parent: false}) => {
    //========================= cloneBlock ==========================
    function moveBlockClone (idBlock, settings = {parent: false}) {
      //координаты контейнера относительно страницы 
      //если не указан родитель, то становиться родителем первый по вложенности выше
      if (settings.parent != false) {      
        var container = document.querySelector(settings.parent); //контейнер
      } else {
        var container = document.querySelector(idBlock).parentNode; //контейнер      
      }
      
      var containerPosition = {
        height: parseInt(container.getBoundingClientRect().bottom - container.getBoundingClientRect().top),
        width: parseInt(container.getBoundingClientRect().right - container.getBoundingClientRect().left),
        top: container.getBoundingClientRect().top,
        bottom: container.getBoundingClientRect().bottom,
        left: container.getBoundingClientRect().left,
        right: container.getBoundingClientRect().right
      };      
      container.style.position = "relative";
  
      //координаты блока относительно страницы
      var block = document.querySelector(idBlock); //блок который двигаем
      var blockPosition = {
        height: parseInt(block.getBoundingClientRect().bottom - block.getBoundingClientRect().top),
        width: parseInt(block.getBoundingClientRect().right - block.getBoundingClientRect().left),
        top: block.getBoundingClientRect().top,
        bottom: block.getBoundingClientRect().bottom,
        left: block.getBoundingClientRect().left,
        right: block.getBoundingClientRect().right
      };
      block.style.zIndex = 1;
      block.style.position = "absolute";
      block.setAttribute("data-drag_move", false); //проверка чтобы последний двигаемый блок был сверху остальных
      block.ondragstart = function () {
        return false;
      };
      
      //обновляем координаты блока
      function updatingCoordinates() {
        containerPosition = {
          height: parseInt(container.getBoundingClientRect().bottom - container.getBoundingClientRect().top),
          width: parseInt(container.getBoundingClientRect().right - container.getBoundingClientRect().left),
          top: container.getBoundingClientRect().top,
          bottom: container.getBoundingClientRect().bottom,
          left: container.getBoundingClientRect().left,
          right: container.getBoundingClientRect().right
        };
  
        blockPosition = {
          height: parseInt(block.getBoundingClientRect().bottom - block.getBoundingClientRect().top),
          width: parseInt(block.getBoundingClientRect().right - block.getBoundingClientRect().left),
          top: block.getBoundingClientRect().top,
          bottom: block.getBoundingClientRect().bottom,
          left: block.getBoundingClientRect().left,
          right: block.getBoundingClientRect().right
        };
      }
  
      //изменяем координаты блока 
      function changeCoordinates(cursorCY, cursorCX, cursorBY, cursorBX) {
        if (settings.parent == false) {
          block.style.top = (cursorCY - cursorBY) + "px";
          block.style.left = (cursorCX - cursorBX) + "px"; 
        } else {
          if (parseInt(cursorCY - cursorBY + blockPosition.height) >= parseInt(containerPosition.height)) { 
            block.style.top = (containerPosition.height - blockPosition.height) + "px";          
          } else if(parseInt(cursorCY - cursorBY) >= 0){
            block.style.top = (cursorCY - cursorBY) + "px";
          }
  
          if (parseInt(cursorCX - cursorBX + blockPosition.width) >= parseInt(containerPosition.width)) {           
            block.style.left = (containerPosition.width - blockPosition.width) + "px";  
          } else if(parseInt(cursorCX - cursorBX) >= 0){
            block.style.left = (cursorCX - cursorBX) + "px";
          }
        }      
      }
  
      //функция drag n drop блока
      function moveBlock(e) {
        updatingCoordinates();
        var cursorBlockY = e.pageY - blockPosition.top; //курсор в блоке
        var cursorBlockX = e.pageX - blockPosition.left; //курсор в блоке 
        block.style.zIndex = 999;
        block.setAttribute('data-drag_move', true);
        //чтобы последний двигаемый блок был сверху остальных
        document.querySelectorAll("div[data-drag_move='false']").forEach((block) => {
          block.style.zIndex = 1;
        });
        
        document.onmousemove = function (e) {
          updatingCoordinates();
          var cursorContainerY = e.pageY - containerPosition.top; //курсор в контейнере
          var cursorContainerX = e.pageX - containerPosition.left; //курсор в контейнере
  
          changeCoordinates(cursorContainerY, cursorContainerX, cursorBlockY, cursorBlockX);        
        }
        //если вдруг резко дернули или вышли за пределы страницы или блока
        block.onmouseout = function (e) {
          block.onmousemove = null; 
          block.setAttribute('data-drag_move', false);
          block.style.zIndex = 2;
        }
      }
  
      block.onmousedown = function (e) {      
        moveBlock(e);  
      }
  
      block.onmouseup = function () {
        block.onmousemove = null;
        block.setAttribute('data-drag_move', false);
        block.style.zIndex = 2;
        block.onmouseout = null;
      }
  
      document.onmouseup = function () {
        document.onmousemove = null;
        block.setAttribute('data-drag_move', false);
        block.style.zIndex = 2;
        document.onmouseout = null;
        block.remove();
      }
  
      block.onmousedown(event);
    }
    //======================= end cloneBlock ========================
    
    //координаты контейнера относительно страницы 
    //если не указан родитель, то становиться родителем первый по вложенности выше
    if (settings.parent != false) {      
      var container = document.querySelector(settings.parent); //контейнер
    } else {
      var container = document.querySelector(idBlock).parentNode; //контейнер      
    }
    
    var containerPosition = {
      height: parseInt(container.getBoundingClientRect().height),
      width: parseInt(container.getBoundingClientRect().width),
      top: container.getBoundingClientRect().top,
      bottom: container.getBoundingClientRect().bottom,
      left: container.getBoundingClientRect().left,
      right: container.getBoundingClientRect().right
    };      
    container.style.position = "relative";

    //координаты блока относительно страницы
    var block = document.querySelector(idBlock); //блок который двигаем
    var blockPosition = {
      height: parseInt(block.getBoundingClientRect().height),
      width: parseInt(block.getBoundingClientRect().width),
      top: block.getBoundingClientRect().top,
      bottom: block.getBoundingClientRect().bottom,
      left: block.getBoundingClientRect().left,
      right: block.getBoundingClientRect().right
    };
    block.style.zIndex = 1;
    block.style.position = "absolute";
    block.setAttribute("data-drag_move", false); //проверка чтобы последний двигаемый блок был сверху остальных
    block.ondragstart = function () {
      return false;
    };
    /*if (settings.parent != false) {
      block.style.width = "95%";
      block.style.height = "95%";
    }*/
    
    //обновляем координаты блока
    function updatingCoordinates() {
      containerPosition = {
        height: parseInt(container.getBoundingClientRect().height),
        width: parseInt(container.getBoundingClientRect().width),
        top: container.getBoundingClientRect().top,
        bottom: container.getBoundingClientRect().bottom,
        left: container.getBoundingClientRect().left,
        right: container.getBoundingClientRect().right
      };

      blockPosition = {
        height: parseInt(block.getBoundingClientRect().height),
        width: parseInt(block.getBoundingClientRect().width),
        top: block.getBoundingClientRect().top,
        bottom: block.getBoundingClientRect().bottom,
        left: block.getBoundingClientRect().left,
        right: block.getBoundingClientRect().right
      };
    }

    //изменяем координаты блока 
    function changeCoordinates(cursorCY, cursorCX, cursorBY, cursorBX) {
      if (settings.parent == false) {
        block.style.top = (cursorCY - cursorBY) + "px";
        block.style.left = (cursorCX - cursorBX) + "px"; 
      } else {
        if (parseInt(cursorCY - cursorBY + blockPosition.height) >= parseInt(containerPosition.height)) { 
          block.style.top = (containerPosition.height - blockPosition.height) + "px";          
        } else if(parseInt(cursorCY - cursorBY) >= 0){
          block.style.top = (cursorCY - cursorBY) + "px";
        }

        if (parseInt(cursorCX - cursorBX + blockPosition.width) >= parseInt(containerPosition.width)) {           
          block.style.left = (containerPosition.width - blockPosition.width) + "px";  
        } else if(parseInt(cursorCX - cursorBX) >= 0){
          block.style.left = (cursorCX - cursorBX) + "px";
        }
      }      
    }

    //функция drag n drop блока
    function moveBlock(e) {
      updatingCoordinates();
      var cursorBlockY = e.pageY - blockPosition.top; //курсор в блоке
      var cursorBlockX = e.pageX - blockPosition.left; //курсор в блоке 
      block.style.zIndex = 999;
      block.setAttribute('data-drag_move', true);
      //чтобы последний двигаемый блок был сверху остальных
      document.querySelectorAll("div[data-drag_move='false']").forEach((block) => {
        block.style.zIndex = 1;
      });
      
      document.onmousemove = function (e) {
        updatingCoordinates();
        var cursorContainerY = e.pageY - containerPosition.top; //курсор в контейнере
        var cursorContainerX = e.pageX - containerPosition.left; //курсор в контейнере

        changeCoordinates(cursorContainerY, cursorContainerX, cursorBlockY, cursorBlockX);        
      }
      //если вдруг резко дернули или вышли за пределы страницы или блока
      block.onmouseout = function (e) {
        block.onmousemove = null; 
        block.setAttribute('data-drag_move', false);
        block.style.zIndex = 2;
      }
    }

    //функция клонирования в случае конфликта position: relative
    function cloneBlock(item) {
      updatingCoordinates();
      if (settings.parent != false) {
        var cloneBlock = item.cloneNode(true);
        cloneBlock.setAttribute('data-clone', 'true');
        //cloneBlock.setAttribute('id', idBlock.substr(idBlock.indexOf('#') + 1) + "__clone");
        cloneBlock.setAttribute('id', idBlock.substr(idBlock.indexOf('#') + 1));
        //cloneBlock.classList.add('drag_block_clone');
        /*if (blockPosition.width > containerPosition.width) {
          cloneBlock.style.left = "0px";
        } else {*/
        //cloneBlock.style.left = (blockPosition.left - containerPosition.left) + "px";
        //cloneBlock.style.top = (blockPosition.top - containerPosition.top) + "px";        
        
        if (item.getAttribute('data-clone') != 'true') {
          item.closest(settings.parent).appendChild(cloneBlock);
          item.remove();        
          //moveBlockClone(idBlock + "__clone", {parent: settings.parent});
          moveBlockClone(idBlock, {parent: settings.parent});          
        }
      }
    }
    cloneBlock(block);

    block.onmousedown = function (e) {
      //if (settings.parent != false) {
      //  cloneBlock(block);
      //} else {        
        updatingCoordinates();
        moveBlock(e);
      //}
    }

    block.onmouseup = function () {
      block.onmousemove = null;
      block.setAttribute('data-drag_move', false);
      block.style.zIndex = 2;
      block.onmouseout = null;
      
    }

    document.onmouseup = function () {
      document.onmousemove = null;
      block.setAttribute('data-drag_move', false);
      block.style.zIndex = 2;
      document.onmouseout = null;
    }
  }

  //координаты курсора
  var cursorInfo = (id_block) => {
    var block = document.querySelector(id_block);
    var blockX = block.querySelector('#cursorX');
    var blockY = block.querySelector('#cursorY');
    var cursorBlockY = block.querySelector('#cursorBlockY');
    var curscursorBlockXorY = block.querySelector('#curscursorBlockXorY');

    block.style.position = 'absolute';
    block.style.minWidth = '40px';
    block.style.background = '#e7e3e38e';
    block.style.fontSize = '10px';
    block.style.display = 'none';
    block.style.borderRadius = '5px';
    block.style.flexDirection = 'column';
    block.style.padding = '1px 5px';
    block.style.zIndex = '99999';
    block.style.pointerEvents = 'none';

    document.addEventListener('dblclick', (e) => {
      if (block.style.display == 'flex') {
        block.style.display = 'none';
        document.onmousemove = null;
      } else {
        document.onmousemove = (e) => {
          block.style.display = 'flex';
          block.style.left = (e.pageX - block.offsetWidth) + 'px';
          block.style.top = (e.pageY - block.offsetHeight) + 'px';
          blockX.innerHTML = "X: " + e.pageX;
          blockY.innerHTML = "Y: " + e.pageY;
          cursorBlockY.innerHTML = "blockY: " + Math.trunc(e.pageY - e.target.getBoundingClientRect().top);
          cursorBlockX.innerHTML = "blockX: " + Math.trunc(e.pageX - e.target.getBoundingClientRect().left);
        }
        document.onmouseover = (e) => {

        }
      }
    });

    document.onmouseout = (e) => {
      block.style.display = 'none';
    }
  }

  cursorInfo('#cursorInfo');
  /*moveBlock("#container__block", {parent: '#container'});
  moveBlock("#container__block1");*/



  //========= retail work =============
  (() => {
    /*var retail = [2357, 2353, 2353, 2354, 2349, 2348, 2356, 275, 2350, 2352, 2358, 2351, 633, 636, 634, 642, 599, 764, 759, 631, 641, 555, 557, 632, 638];

    if(retail.indexOf(2357) != -1 || retail.indexOf(2357) != -1){
        console.log('найдено');
        return;
      } else {
        console.log('нет');
      }

    var productList = [];
    productList.push("393406432", "393406432");
    console.log(productList);*/
  })();
});


//инфа
(() => {
  // console.log('Высота блока ' + this.offsetHeight);
  // console.log('Ширина блока ' + this.offsetWidth);
  // console.log(e.pageX); // координаты курсора относительно всего документа
  // console.log(e.clientY); // координаты курсора относительно экрана
  // console.log(window.innerHeight); данные высоты/ширины страницы со скролом
  // console.log(window.innerWidth);
  // document.documentElement.clientWidth данные высоты/ширины страницы без скрола
  // var blockLeft = parseInt(block.style.left.replace(/[^\d]/g, ''));
  // var blockTop = parseInt(block.style.top.substr(0, block.style.top.indexOf('px')));
  //в функцию
  //настройки обьект
  //передача блоков в виде класса
  //режим переноса в другое место
  //передать под плагин

  //если указан родитель то делаем через relative  
})();