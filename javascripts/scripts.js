$(document).ready(function(){
  $("a[rel^='external']").each(function() { $(this).attr("target","_blank"); });

  $('nav, header, #right, #single-page').localScroll({
    duration: 1000,
    axis: 'y'
  });

  $(window).scroll(function(){
    var posX = $(window).scrollTop() - ($(window).scrollTop() * 40/100) + "px";
    $("#home").css({backgroundPosition: "50% " + posX });
  });

});

/**
 * Parallax Scrolling Tutorial
 * For NetTuts+
 *  
 * Author: Mohiuddin Parekh
 *  http://www.mohi.me
 *  @mohiuddinparekh   
 */


$(document).ready(function(){
  // Cache the Window object
  $window = $(window);
                
   $('section[data-type="background"]').each(function(){
     var $bgobj = $(this); // assigning the object
                    
      $(window).scroll(function() {
                    
    // Scroll the background at var speed
    // the yPos is a negative value because we're scrolling it UP!                
    var yPos = -($window.scrollTop() / $bgobj.data('speed')); 
    
    // Put together our final background position
    var coords = '50% '+ yPos + 'px';

    // Move the background
    $bgobj.css({ backgroundPosition: coords });
    
}); // window scroll Ends

 });  

}); 
/* 
 * Create HTML5 elements for IE's sake
 */

document.createElement("article");
document.createElement("section");