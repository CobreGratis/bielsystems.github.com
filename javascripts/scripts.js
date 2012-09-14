$(document).ready(function(){
  $("a[rel^='external']").each(function() { $(this).attr("target","_blank"); });

  $('nav, header').localScroll({
    duration: 1000,
    axis: 'y'
  });
  });
  