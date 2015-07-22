(function ( $ ) {

    $.loadIframeWhenInView = function(element, options) {

        var defaults = {

            debug: false,
            percentageToBeVisible: 25,
            unloadIframeWhenOutOfView: true

        }

        var plugin = this;

        plugin.settings = {}

        var $element = $(element),  // reference to the jQuery version of DOM element the plugin is attached to
             element = element;     // reference to the actual DOM element

        plugin.init = function() {

            plugin.settings = $.extend({}, defaults, options);

            doLog(plugin.settings);

            $( window ).bind('resize', function() {
                doLog('resize');
                doChecker();
            });

            $( window ).bind('scroll', function() {
                doLog('scroll');
                doChecker();
            });

            doChecker();

        }

        // private method
        var doLog = function(msg) {
            if (plugin.settings.debug) {
                console.log(msg);
            }
        }
        var doBgColor = function(color) {
            if (plugin.settings.debug) {
                $element.css('background-color', color);
            }
        }

        // private method
        var doChecker = function() {

            var top = $( window ).scrollTop();

            var contentTop = $element.offset().top;
            var contentHeight = $element.height();
            var contentBottom = contentTop + contentHeight;
            var contentMiddle = contentTop + (contentHeight / 2);

            var visibleBrowserHeight = $( window ).height();
            var pageHeight = $( document ).height();

            doLog(contentTop + " " + contentHeight + " " + contentBottom + " " + contentMiddle + " " + visibleBrowserHeight + " " + pageHeight + " " + top);

            var isTopOfContentVisible = contentTop > top && contentTop < (top + visibleBrowserHeight);
            var isBottomOfContentVisible = (contentBottom) > top && contentBottom < (top + visibleBrowserHeight);

            if (isTopOfContentVisible) {
                // top of content is visible
                var pixelsVisible = (top + visibleBrowserHeight) - contentTop;
                var percentageVisible = (pixelsVisible / contentHeight) * 100;
                if (percentageVisible > plugin.settings.percentageToBeVisible) {
                    doLog("top of content is visible");
                    doBgColor('green');

                    if ($element.attr('src') == '') {
                        $element.attr('src', $element.data('src'));
                    }

                }
                else {
                    doLog("top of content is visible - but not enough");
                    doBgColor('yellow');

                    if (plugin.settings.unloadIframeWhenOutOfView) {
                        if ($element.attr('src') != '') {
                            $element.attr('src', '');
                        }
                    }

                }
            }
            else if (isBottomOfContentVisible) {
                // bottom of content is visible
                var pixelsVisible = contentBottom - top;
                var percentageVisible = (pixelsVisible / contentHeight) * 100;
                if (percentageVisible > plugin.settings.percentageToBeVisible) {
                    doLog("bottom of content is visible");
                    doBgColor('blue');

                    if ($element.attr('src') == '') {
                        $element.attr('src', $element.data('src'));
                    }

                }
                else {
                    doLog("bottom of content is visible - but not enough");
                    doBgColor('yellow');

                    if (plugin.settings.unloadIframeWhenOutOfView) {
                        if ($element.attr('src') != '') {
                            $element.attr('src', '');
                        }
                    }

                }
            }
            else {
                doLog("do nothing");
                doBgColor('red');

                if (plugin.settings.unloadIframeWhenOutOfView) {
                    if ($element.attr('src') != '') {
                        $element.attr('src', '');
                    }
                }

            }

        }

        // a public method. for demonstration purposes only - remove it!
        plugin.public_method = function() {

            // code goes here

        }

        plugin.init();

    }

    $.fn.loadIframeWhenInView = function(options) {

        return this.each(function() {

            var plugin = new $.loadIframeWhenInView(this, options);

            $(this).data('pluginName', plugin);

        });

    };

}( jQuery ));
