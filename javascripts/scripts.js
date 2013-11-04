// Console

if(typeof(console) == 'undefined') console = { log : function(){} };
if(typeof(console.log) != 'function') console.log = function(){};

// Collapse Plugin

(function($) {
$.fn.collapsable = function(options) {
  // iterate and reformat each matched element
  return this.each(function() {
    // cache this:
    var obj = $(this);
    var tree = obj.next('.navigation');
    obj.click(function(){
      if( obj.is(':visible') ){tree.toggle();}
    });
    $(window).resize(function(){
      if ( $(window).width() <= 570 ){tree.attr('style','');};
    });
  });
};
})(jQuery);


// Functions

var App = {

  StartApp: function() {
      try {
        this.Modal();
        this.InterfaceActions();
      } catch (e) {
        alert('Existem erros no script.');
        console.log('Error: ' + e);
      }
  },

	Modal: function() {

		var $modalBg = $("#modalBg");
		var $modalBox = $(".modalBox");

		$('.modalBox').append('<span class="modalClose">Fechar</span>');

		function EnableModal(){
      $('body').css({'overflow':'hidden'});
      window.scrollTo(0,0);
      $(document).bind('scroll',function () {
        window.scrollTo(0,0); 
      });
			$modalBg.show();
		}

		function DisableModal(){
			$modalBg.fadeOut();
			$modalBox.fadeOut();
      $("body").css("overflow", "visible");
      $(document).unbind('scroll');
		}

    // Trigger 01
		$('.modalTrigger').click(function() {
			EnableModal();
			$(this).parent().parent().find('.modalBox').fadeIn();
		});

    // Trigger 02
		$('.m-det').click(function() {
			EnableModal();
			$(this).parent().find('.modalBox').fadeIn();
		});

		$modalBg.mouseup(function() {
			DisableModal();
		});

		$('.modalClose').click(function() {
			DisableModal();
		});

  }, // Modal

  InterfaceActions: function() {


    /* Menu: Current Page */

    var current_page = location.pathname;

    $("#menu2 a").each(function(i) {
      if (current_page.indexOf($(this).attr('href')) == 0) {
        $(this).addClass('current-page');
        return false
      }
    });


    /* Menu: Mobile */

    $("#menu-trigger").click(function(){
      $("#menu2").toggle();
    });

		$('.slide-trigger').collapsable();


    /* PrettyPhoto */

		$("a[rel^='prettyPhoto']").prettyPhoto({
			deeplinking: false
		});
    
    
    /* External Links */

    $("a[rel^='external']").each(function() {
      $(this).attr("target","_blank");
    });
    
    
    /* General */

    $('nav, .advice, header, #right, #single-page').localScroll({
      duration: 1000,
      axis: 'y'
    });

    $(window).scroll(function(){
      var posX = $(window).scrollTop() - ($(window).scrollTop() * 40/100) + "px";
      $("#home").css({backgroundPosition: "50% " + posX });
    });

    if($("section#cloud").size() > 0) {

      var $slider = $("ul.step-list");

      var i = 1;

      function changeActive(){
        $("ul.nav-slider a").removeClass("active");
        $("ul.nav-slider a").eq(i - 1).addClass("active");
      }

      function animateSlider(index){
        $slider.animate({
          left: "-" + 930 * i + "px"
        }, 1000);
      }

      $("ul.nav-slider li").click(function(e){
        e.preventDefault();
        i = $(this).index();
        animateSlider(i);
        i = $(this).index() + 1;
        changeActive();
        console.log(i);
      });

      $("#next").click(function(e){
        e.preventDefault();
        if(i <= 2) {
          i++;
          console.log("menor");
          $slider.animate({
            left: "-=930px"
          }, 1000);
        } else {
          i = 1;
          $slider.animate({
            left: "0px"
          }, 1000);
        }

        changeActive();
      });

      $("#prev").click(function(e){
        e.preventDefault();
        if(i > 1) {
          $slider.animate({
            left: "+=930px"
          }, 1000);
          i--;
        } else if (i <= 1) {
          $slider.animate({
            left: "-="+ 930 * 2 +"px"
          }, 1000);
          i = 5;
        }
        changeActive();
      });
    }

    if($("section#cliente").size() > 0) {

      link = $(".js-client-videos-chooser a")
      iframe = $(".js-client-videos iframe");
      iframe.hide();
      iframe.eq(0).show();
      link.eq(0).addClass("selected");
      link.click(function(e){
        clicked = $(this).index();
        link.removeClass("selected");
        $(this).addClass("selected");
        iframe.hide();
        iframe.eq(clicked).show();
        e.preventDefault();
      });
    }
  }


} // Var Site

jQuery(function(){
	App.StartApp();
});

$(document).ready(function(){
  $('.eduardo-photo').on("hover", function(){
    $(this).find("img").attr("src", "/images/time/time-eduardo.gif");
  });
});
