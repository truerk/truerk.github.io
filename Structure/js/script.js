$(document).ready(function(){

   /* --- прелоад страницы, .load не работает так что пока сюда  --- */
   function close_preload(){
      if ($(window).scrollTop() >= 300) {
         $('.top-header').css('position', 'fixed');
         $('.mobile-menu').css('position', 'fixed');
      }
      setTimeout(function(){
         $('.preloader').fadeOut(500);
         setTimeout(function(){
            $('.preloader').remove();
         }, 600);      
         $('html').css('overflow', 'auto');
      }, 1000);
   }
   /* --- открываем меню + фикс transform --- */
   function open_menu(){
      var topcheck = $(window).scrollTop();
      $('#wrapper').css('transition','all 0.3s ease-in-out');
      $('#wrapper').css('transform','translate(-240px, 0)');
      $('html').css('overflow','hidden');
      $('.top-header').css('top', topcheck);
      setTimeout(function(){
         $('html').css('overflow','hidden');
      }, 150);
      $('.mobile-menu').css('display', 'flex');
      $('.menu-background').css('display','block');
   }
   /* --- закрываем меню --- */
   function close_menu(){
      $('#wrapper').css('transition','all 0.3s ease-in-out');
      $('#wrapper').css('transform','translate(0px, 0)');
      setTimeout(function(){
         $('html').css('overflow','auto');         
      }, 200);
      setTimeout(function(){
         $('.top-header').css('top', '0');
         $('#wrapper').removeAttr( 'style' );
         $('.mobile-menu').css('display', 'none');         
      }, 310);
      $('.menu-background').css('display','none');
      
   }   
   $('.burger-button').click(function(){
      open_menu();      
   });   
   $('.menu-background').click(function(){
      close_menu();
   });

   

   /* --- скролл к контейнерам --- */
   function scroll_to(){      
      var link = $(".top-header a[href*='#']");      
      link.on('click',function(e){
         var section = $(this).attr('href');
         e.preventDefault();         
         /*link.removeClass('menu-selected');
         $(this).addClass('menu-selected');*/
         $('html, body').animate({
            scrollTop : $(section).offset().top - 80 /*+ $(section).height()*/
         }, 2000);
      });
   }   
    /* --- скролл к контейнерам в мобилке--- */
   function scroll_to_mobile(){           
      var link = $(".mobile-menu a[href*='#']");      
      link.on('click',function(e){
         var section = $(this).attr('href');
         linka = $(this);
         e.preventDefault();
         close_menu();
         setTimeout(function(){                     
            link.removeClass('menu-selected');
            linka.addClass('menu-selected');
            $('html, body').animate({
               scrollTop : $(section).offset().top - 50 /*+ $(section).height()*/
            }, 2000);
         }, 500); 
      });
   }

   /* --- при скролле страницы -- */
   $(window).scroll(function(){
      fixed_menu();
      menu_select();
      function fixed_menu(){
         if ($(window).scrollTop() >= 0) {
            $('.top-header').css('position', 'fixed');
            $('.mobile-menu').css('position', 'fixed');
         }else{
            $('.top-header').css('position', 'absolute');
            $('.mobile-menu').css('position', 'absolute');
         }

         if ($(window).scrollTop() >= 300){
            $('.top-menu').css('height', '70px');
         }else{
            $('.top-menu').css('height', '100px');
         }
      }
      function menu_select(){
         if(window.matchMedia('(max-width: 769px)').matches){
            var link = $('.mobile-menu a[href*="#"]');
         }else{
            var link = $('.top-header a[href*="#"]');
         }         
         var scroll_top = $(window).scrollTop();
         link.each(function(){
            var container = $(this).attr('href');
            /*alert('Высота текущего скролла: ' + $(window).scrollTop() 
               + '; Блок: ' + $(this).attr('href') 
               + '; Вверх блока: ' + $($(this).attr('href')).offset().top 
               + '; Высота блока: ' + $($(this).attr('href')).height());*/
            //alert(scroll_top + ' > ' + $(container).offset().top + ' && ' + scroll_top + ' < ' + ($(container).offset().top + $(container).height()));
            if (scroll_top + 100 > $(container).offset().top && scroll_top + 100 < ($(container).offset().top + $(container).height())) {
               $('a[href*="#"].menu-selected').removeClass('menu-selected');
               $(this).addClass('menu-selected');          
            }
         });
      }      
   });

   /* --- slider --- */
   function slider_team(){
      var dot = $('.dot');      
      dot.on('click', function(){
         var dot_id = $(this).attr('id');
         var id = dot_id.slice(4);
         var slider = $('#slider-team-' + id);
         if (slider.length > 0) {
            $('.team').removeClass('slider-active');
            dot.removeClass('dot-active');
            $(this).addClass('dot-active');
            slider.addClass('slider-active');
         }else{
            alert('Слайдер отсутствует');
         }         
      });
   }
   /* --- Отправка сообщения --- */


  
   slider_team();

   scroll_to_mobile();
   scroll_to();
   close_preload();  
});
