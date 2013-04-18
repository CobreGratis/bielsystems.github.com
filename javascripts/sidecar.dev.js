/*
 * Copyright (C) 2013 digital-telepathy  (email : support@digital-telepathy.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var Sidecar;

(function($, window, undefined){
    window.Sidecar = function( contentElem, opts ){
        // Object to house elements used by this Class
        this.elems = {};
        this.options = {};
        
        // Is this open?
        this.isOpen = false;
        
        // Namespace
        this.ns = "sidecar";
        
        // Element that populdates the Sidecar
        this.elems.sidecarContent = $(contentElem);
        
        // Initialize this Class instance
        this.__construct( opts );
    };
    
    // Class instance initialization
    window.Sidecar.prototype.__construct = function(opts){
        var self = this;
        
        // Set Option defaults
        this.options.openDelay = 250;
        this.options.sidecarPosition = 'right';
        this.options.shadow = true;
        
        this.elems.body = $('body');
        this.elems.sidecarWrapper = $('#sidecar-wrapper');
        
        // Check to see if the wrapper element exists
        if( this.elems.sidecarWrapper.length == 0 ){
            // Create wrapper element
            self.elems.sidecarWrapper = document.createElement('div');
            self.elems.sidecarWrapper.id = 'sidecar-wrapper';
            
            // Move the body's children into this wrapper
            while( document.body.firstChild ){
                self.elems.sidecarWrapper.appendChild( document.body.firstChild );
            };
            // Append the wrapper to the body
            document.body.appendChild( self.elems.sidecarWrapper );
        };
        
        this.options.android = false;
        var ua = navigator.userAgent.toLowerCase();
        if( ua.indexOf("android") > -1 ) {
            this.options.android = true;
            
            this.elems.body.addClass( this.ns + '-no-drawer-transition');
            this.elems.body.addClass( this.ns + '-no-fixed-position');
        };
        
        if(typeof(opts) != "undefined"){
            for(var key in opts){
                self.options[key] = opts[key];
            };
        };
        
        // Set Position of the Sidecar (left|right)
        this.elems.body.addClass('sidecar-' + self.options.sidecarPosition);
        
        // Do a simple UA match to put the sidecar back on the right for mobile since 
        // being on the left for some reason causes the viewport to scale when the 
        // sidecar pushes it in.
        if( ua.match(/android|ipad|iphone/) ) this.elems.body.removeClass('sidecar-left');
        
        if( this.options.width != undefined ){
            // Set the Width/Position for all elements that need it.
            var css = "",
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');
            
            style.type = 'text/css';
            
            // Negative values
            css += "body.sidecar-open-drawer #sidecar-wrapper,body.sidecar-left div#sidecar .sidecar-inner{left:-"+ self.options.width +";}\n";
            css += "body.sidecar-left.sidecar-open-drawer #sidecar-wrapper {right:-"+ self.options.width +";}\n";

            // Positive values
            css += "body.sidecar-open-drawer div#sidecar,body div#sidecar .sidecar-inner{width:"+ self.options.width +"}\n";
            css += "body.sidecar-open-drawer #sidecar-open,body.sidecar-open-drawer #sidecar-open:link,body.sidecar-open-drawer #sidecar-open:visited,body.sidecar-open-drawer #sidecar-close,body.sidecar-open-drawer #sidecar-close:link,body.sidecar-open-drawer #sidecar-close:visited{right:"+ self.options.width +"}\n";
            css += "body.sidecar-left.sidecar-open-drawer #sidecar-open,body.sidecar-left.sidecar-open-drawer #sidecar-open:link,body.sidecar-left.sidecar-open-drawer #sidecar-open:visited,body.sidecar-left.sidecar-open-drawer #sidecar-close,body.sidecar-left.sidecar-open-drawer #sidecar-close:link,body.sidecar-left.sidecar-open-drawer #sidecar-close:visited{left:"+ self.options.width +"}\n";
            
            if( style.styleSheet ){
                style.styleSheet.cssText = css;
            }else{
                style.appendChild(document.createTextNode(css));
            };
            
            head.appendChild(style);
        }
        
        this._addDrawer();
        this._bindEvents();
    };
    
    // Add the Drawer markup
    window.Sidecar.prototype._addDrawer = function(){
        this.elems.drawer = $('<div id="' + this.ns + '"></div>').appendTo( this.elems.body );
        this.elems.drawerInner = $('<div class="' + this.ns + '-inner"></div>').appendTo( this.elems.drawer );
        
        // If shadow option is set to false, add class no-shadow
        if( !this.options.shadow ){
            this.elems.drawerInner.addClass( this.ns + '-no-shadow');
        };
        
        this.elems.sidecarContent.appendTo( this.elems.drawerInner );
        this.elems.drawerInner.css({
            height: $(document).height()
        });
        
        this._addOpenButton();
        this._addCloseButton();
    };
    
    // Set the position of the open/close button if tabPosition option is set
    window.Sidecar.prototype._setTabPosition = function( button ){
        var self = this;

        if( this.options.tabPosition != undefined ){
            if( self.options.tabPosition.indexOf('%') !== -1 ){
                var height = button.outerHeight( true );
                button.css({
                    marginTop: -height/2
                });
            };
            button.css({ top: self.options.tabPosition });
        };
    };
    
    // Add the open button
    window.Sidecar.prototype._addOpenButton = function(){
        this.elems.open = $('<a id="' + this.ns + '-open" class="icon-bars" href="#open"><div class="horiz bar"></div><div class="vert bar"></div></a>').appendTo( this.elems.body );
        this._setTabPosition( this.elems.open );
    };
    
    // Add the close button
    window.Sidecar.prototype._addCloseButton = function(){
        this.elems.close = $('<a id="' + this.ns + '-close" href="#close"><div class="horiz bar"></div></a>').appendTo( this.elems.body );
        this._setTabPosition( this.elems.close );
    };
    
    // Event binding
    window.Sidecar.prototype._bindEvents = function(){
        var self = this;
        
        this.elems.open.on('click', function(event){
            event.preventDefault();
            self.open();
        });
        
        this.elems.close.on('click', function(event){
            event.preventDefault();
            self.close();
        });
    };
    
    window.Sidecar.prototype.close = function(){
        this.elems.body.removeClass( this.ns + '-open-drawer');
    };
    
    window.Sidecar.prototype.open = function(){
        this.elems.body.addClass( this.ns + '-open-drawer');
    };
    
})(jQuery, window, null);