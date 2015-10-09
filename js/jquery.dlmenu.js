(function($, window, undefined) {

    'use strict';

    // global
    var $body = $('body');

    $.DLMenu = function(options, element) {
        this.$el = $(element);

        this._init(options);
    };

    // the options
    $.DLMenu.defaults = {
        // callback: click a link that has a sub menu
        // el is the link element (li); name is the level name
        onLevelClick: function(el, name) {
            return false;
        },
        // callback: click a link that does not have a sub menu
        // el is the link element (li); ev is the event obj
        onLinkClick: function(el, ev) {
            return false;
        }
    };

    $.DLMenu.prototype = {
        _init: function(options) {
            // options
            this.options = $.extend(true, {}, $.DLMenu.defaults, options);
            // cache some elements and initialize some variables
            this._config();

            this._initEvents();
        },
        _config: function() {
            this.open = false;
            this.$menu = this.$el.children('ul.dl-menu');
            this.$menuitems = this.$menu.find('li:not(.dl-back)');
            this.$el.find('ul.dl-submenu').prepend('<li class="dl-back"><a href="#">back</a></li>');
            this.$back = this.$menu.find('li.dl-back');
        },
        _initEvents: function() {

            var self = this;

            this.$menuitems.on('click.dlmenu', function(event) {

                event.stopPropagation();

                var $item = $(this),
                    $submenu = $item.children('ul.dl-submenu');

                if ($submenu.length > 0) {

                    self.$menu.addClass('dl-subview');
                    $item.addClass('dl-subviewopen').parents('.dl-subviewopen:first').removeClass('dl-subviewopen').addClass('dl-subview');
                    self.options.onLevelClick($item, $item.children('a:first').text());

                    return false;

                } else {
                    self.options.onLinkClick($item, event);
                }

            });

            this.$back.on('click.dlmenu', function(event) {

                var $this = $(this),
                    $submenu = $this.parents('ul.dl-submenu:first'),
                    $item = $submenu.parent();

                $item.removeClass('dl-subviewopen');

                var $subview = $this.parents('.dl-subview:first');
                if ($subview.is('li')) {
                    $subview.addClass('dl-subviewopen');
                }
                $subview.removeClass('dl-subview');

                return false;

            });

        },
        closeMenu: function() {
            if (this.open) {
                this._closeMenu();
            }
        },
        _closeMenu: function() {
            var self = this;

            this.$menu.removeClass('dl-menuopen');

            self._resetMenu();
            this.open = false;
        },
        openMenu: function() {
            if (!this.open) {
                this._openMenu();
            }
        },
        _openMenu: function() {
            var self = this;
            // clicking somewhere else makes the menu close
            $body.off('click').on('click.dlmenu', function() {
                self._closeMenu();
            });
            this.$menu.addClass('dl-menuopen');
            this.open = true;
        },
        // resets the menu to its original state (first level of options)
        _resetMenu: function() {
            this.$menu.removeClass('dl-subview');
            this.$menuitems.removeClass('dl-subview dl-subviewopen');
        }
    };

    var logError = function(message) {
        if (window.console) {
            window.console.error(message);
        }
    };

    $.fn.dlmenu = function(options) {
        if (typeof options === 'string') {
            var args = Array.prototype.slice.call(arguments, 1);
            this.each(function() {
                var instance = $.data(this, 'dlmenu');
                if (!instance) {
                    logError("cannot call methods on dlmenu prior to initialization; " +
                        "attempted to call method '" + options + "'");
                    return;
                }
                if (!$.isFunction(instance[options]) || options.charAt(0) === "_") {
                    logError("no such method '" + options + "' for dlmenu instance");
                    return;
                }
                instance[options].apply(instance, args);
            });
        } else {
            this.each(function() {
                var instance = $.data(this, 'dlmenu');
                if (instance) {
                    // return instance;
                    instance._resetMenu();
                } else {
                    instance = $.data(this, 'dlmenu', new $.DLMenu(options, this));
                }
            });
        }
        return this;
    };

})(jQuery, window);