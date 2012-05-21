/************************************************
Plug-in Name:HTML5 Placeholder
Description:jQuery HTML5 placeholder Plug-in is a jQuery Plug-in that enables HTML5 placeholder support for legacy browsers. It also enables you to add a custom color for your placehoder text (in all browsers).
Version:1.0
Requirement:Jquery 1.2.6+
Copyright:Kanchan Gogoi, 2012
Author:Kanchan Gogoi
Website: http://thewebmagz.com
Email: query@thewebmagz.com
License:MIT License - http://www.opensource.org/licenses/mit-license.php
************************************************/
(function($) {
$.fn.placeholder =function(options) { 
	var defaults = {
			default_color:"#000000",
  			placeholder_color:"#aaaaaa"
  			};
   function sprted() {
        var input = document.createElement("input");
        return ('placeholder' in input);
    }
	var sprt = sprted();
    var options = $.extend(defaults, options);   
 	return this.each(function(){
	$this=$(this);
	var d_color=defaults.default_color;
   	var p_color = defaults.placeholder_color;
	var val=$this.attr("placeholder");
	var type=$(this).attr("type");
	var idi=$(this).attr('id');
	var claz=$(this).attr('class');
	if(idi=='undefined' || idi==''){var a='';}
	else{var a=' id="'+idi+'"';}
	if(claz=='undefined' || claz==''){var b='';}
	else{var b=' class="'+claz+'"';}
	if(type=="password" && $.browser.msie && parseInt($.browser.version) < 9){
		var $org = $(this);
        $org.after('<input id="'+$org.attr('id')+'-hd" '+b+' style="display:none;" type="text" value="' + $org.attr('placeholder') + '" />');
        var $hd = $('#'+$org.attr('id')+'-hd');
       	$hd.show();
		$hd.css('color',p_color);
        $org.hide();
        $hd.focus(function() {
            $hd.hide();
            $org.show().focus();
			$org.css('color',d_color);
         });
        $org.blur(function() {
           if($org.val() === '') {
             $org.hide();
                $hd.show();
            	$hd.css('color',p_color);
               }
           });
		}
	    else{
	     if (sprt == true) {
	        $('<style>input,textarea{color:'+d_color+'}\
			::-webkit-input-placeholder{color: '+p_color+';}\
			:-moz-placeholder{color:'+p_color+';}\
			</style>').appendTo('head');
		}
    	if (sprt == false) {
        	$(this).val(val);
			$(this).css('color',p_color);
   		}
		$(this).focus(function() {
       	 	if (sprt == false) {
            if ($(this).val() == val){
				$(this).val('');
				$(this).css('color',d_color);
			}    
        }
    });
    $(this).blur(function() {
        if (sprt == false) {
            if($(this).val() == ''){
				$(this).val(val);
				$(this).css('color',p_color);
			}              
        }
      });
	}
});	
}
})(jQuery);