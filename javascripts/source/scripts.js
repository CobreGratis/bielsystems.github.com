<<<<<<< HEAD
// Collapse Plugin

(function($) {
  $.fn.collapsable = function(options) {
    // iterate and reformat each matched element
    return this.each(function() {
      // cache this:
      var obj = $(this);
      var tree = obj.next('.navigation');
      obj.click(function() {
        if (obj.is(':visible')) {
          tree.toggle();
        }
      });
      $(window).resize(function() {
        if ($(window).width() <= 570) {
          tree.attr('style', '');
        }
      });
    });
  };

  $('#work-mvp').prepend('<a class="more" href="">&raquo;</a>');

  $('#work-mvp .more').on('click', function(e) {
    e.preventDefault();

    $(this).parent().toggleClass('expanded');

    $('html, body').stop().animate({
      'scrollTop': $('#work-mvp').offset().top
    }, 900, 'swing');
  });
})(jQuery);


=======
>>>>>>> goes back to use jquery 1.11 as jQuery 2.x has the same API as jQuery 1.x, but does not support Internet Explorer 6, 7, or 8
// Functions

var App = {
  I18n: {
    _translations: {
      en: {
        Field18: "First name is required",
        Field19: "Last name is required",
        Field3: "Email is required",
        Field16: "Skype username or phone is required",
        Field5: "Message is required"
      },
      pt: {
        Field18: "Nome é obrigatório",
        Field19: "Sobrenome é obrigatório",
        Field3: "Email inválido",
        Field16: "Usuário no Skype ou telefone é obrigatório",
        Field5: "Resumo do projeto é obrigatório"
      }
    },
    defaultLocale: "pt",
    getCurrentLocale: function() {
      var locale = location.pathname.split('/')[1];
      if (this._translations.hasOwnProperty(locale)) {
        return locale;
      } else {
        return this.defaultLocale;
      }
    },
    t: function(field) {
      var currentLocale = this.getCurrentLocale();
      var translation = this._translations[currentLocale][field];
      if (translation) {
        return translation;
      } else {
        return "Missing translation for '" + field + "' with locale '" + currentLocale + "'";
      }
    }
  },
  StartApp: function() {
    this.CollapsePlugin();
    this.Modal();
    this.InterfaceActions();
    this.UserNavigation.init();
  },

  CollapsePlugin: function() {
    $.fn.collapsable = function(options) {
      // iterate and reformat each matched element
      return this.each(function() {
        // cache this:
        var obj = $(this);
        var tree = obj.next('.navigation');
        obj.click(function() {
          if (obj.is(':visible')) {
            tree.toggle();
          }
        });
        $(window).resize(function() {
          if ($(window).width() <= 570) {
            tree.attr('style', '');
          }
        });
      });
    }
  },

  // Collapse Plugin

  Modal: function() {

    var
      $modalBg = $("#modalBg"),
      $modalBox = $(".modalBox")
    ;

    $modalBox.append('<span class="modalClose">Fechar</span>');

    function EnableModal() {
      $('body').css({
        'overflow': 'hidden'
      });
      $modalBg.show();
    }

    function DisableModal() {
      $modalBg.fadeOut();
      $modalBox.fadeOut();
      $("body").css("overflow", "visible");
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
  UserNavigation: {
    init: function() {
      if (!window.sessionStorage) {
        return;
      }

      var userNavigation = this;

      $(function() {
        userNavigation.pushData(window.location.pathname);
        $('input[name=Field27]').val(userNavigation.getPaths().join('\n'));

        $('#talk-to-us').submit(function() {
          userNavigation.clear();
        });
      });
    },
    pushData: function(url) {
      var data = this.getPaths() || [];
      data.push(url);
      sessionStorage.setItem('user-navigation', JSON.stringify(data));
      return data;
    },
    clear: function() {
      sessionStorage.clear();
    },
    getPaths: function() {
      return JSON.parse(sessionStorage.getItem('user-navigation'));
    }
  },
  InterfaceActions: function() {

    // Eduardo's easter egg
    $("img[src='/images/time/time-eduardo.jpg']").hover(function() {
      $(this).attr("src", "/images/time/time-eduardo.gif");
    });

    $("#talk-to-us").validate({
      rules: {
        Field3: {
          required: true,
          email: true
        }
      },
      messages: {
        Field18: App.I18n.t('Field18'),
        Field19: App.I18n.t('Field19'),
        Field3: App.I18n.t('Field3'),
        Field16: App.I18n.t('Field16'),
        Field5: App.I18n.t('Field5')
      }
    });

    //
    $('.hide-content').addClass("hidden");

    $('.hide-content').click(function() {
      var $this = $(this);

      if ($this.hasClass("hidden")) {
        $(this).removeClass("hidden").addClass("visible");

      } else {
        $(this).removeClass("visible").addClass("hidden");
      }
    });

    /* Menu: Current Page */

    var current_page = location.pathname;

    $("#menu2 a").each(function(i) {
      if (current_page.indexOf($(this).attr('href')) == 0) {
        $(this).addClass('current-page');
        return false
      }
    });


    /* Menu: Mobile */

    $("#menu-trigger").click(function() {
      $("#menu2").toggle();
    });

    $('.slide-trigger').collapsable();


    /* PrettyPhoto */

    $("a[rel^='prettyPhoto']").prettyPhoto({
      deeplinking: false,
      changepicturecallback: function() {
        var viewportWidth = $('body').innerWidth();
        if (viewportWidth < 1025) {
          $(".pp_pic_holder.pp_default").css("top", window.pageYOffset + "px");
        }
      }
    });


    /* External Links */

    $("a[rel^='external']").each(function() {
      $(this).attr("target", "_blank");
    });


    /* General */

    $('nav, .advice, header, #right, #single-page').localScroll({
      duration: 1000,
      axis: 'y'
    });

    $('#process-info').localScroll({
      duration: 1000,
      axis: 'y',
      hash: true
    });

    $(window).scroll(function() {
      if ($(window).width() > 960) {
        var posX = $(window).scrollTop() - ($(window).scrollTop() * 40 / 100) + "px";
        $("#home").css({
          backgroundPosition: "50% " + posX
        });
      }
    });

    if ($("section#cloud").size() > 0) {

      var
      $slider = $("ul.step-list"),
        i = 1;

      function changeActive() {
        $("ul.nav-slider a").removeClass("active").eq(i - 1).addClass("active");
      }

      function animateSlider(index) {
        $slider.animate({
          left: "-" + 930 * i + "px"
        }, 1000);
      }

      $("ul.nav-slider li").click(function(e) {
        e.preventDefault();
        i = $(this).index();
        animateSlider(i);
        i = $(this).index() + 1;
        changeActive();
      });

      $("#next").click(function(e) {
        e.preventDefault();
        if (i <= 2) {
          i++;
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

      $("#prev").click(function(e) {
        e.preventDefault();
        if (i > 1) {
          $slider.animate({
            left: "+=930px"
          }, 1000);
          i--;
        } else if (i <= 1) {
          $slider.animate({
            left: "-=" + 930 * 2 + "px"
          }, 1000);
          i = 5;
        }
        changeActive();
      });
    }

    if ($("section#cliente").size() > 0) {

      var
        link = $(".js-client-videos-chooser a"),
        iframe = $(".js-client-videos iframe")
      ;

      iframe.hide();
      iframe.eq(0).show();

      link.eq(0).addClass("selected");
      link.click(function(e) {
        var clicked = $(this).index();
        link.removeClass("selected");
        $(this).addClass("selected");
        iframe.hide();
        iframe.eq(clicked).show();
        e.preventDefault();
      });
    }
  }


} // Var Site

jQuery(function() {
  App.StartApp();
});

