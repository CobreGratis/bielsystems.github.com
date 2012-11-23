$(document).ready(function(){
  $("a[rel^='external']").each(function() { $(this).attr("target","_blank"); });

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
      if(i <= 3) {
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
          left: "-="+ 930 * 3 +"px"
        }, 1000);
        i = 5;
      }
      changeActive();
    });
  }

});






