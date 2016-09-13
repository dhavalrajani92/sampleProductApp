app = function () {
    function sideBarFunctions() {
        var overlay = $('.sidebar-overlay');
        var sidebar = $('.sidebar');
        var lsidebar = $('.sidebar-left');
        var rsidebar = $('.sidebar-fixed-right');
        var dcnavbarsidebar = $('.dc-navbar-sidebar');
        var sidebar = $('.sidebar');
        var sidebarHeader = $('#sidebar .sidebar-header');
        var sidebarImg = sidebarHeader.css('background-image');
        var toggleButtons = $('.sidebar-toggle');
        toggleButtons.css('display', 'none');

        // Left Sidebar
        $('.sidebar-toggle').on('click', function () {
            lsidebar.toggleClass('open');
            if ((lsidebar.hasClass('sidebar-fixed-left') || lsidebar.hasClass('sidebar-fixed-right')) && lsidebar.hasClass('open')) {
                overlay.addClass('active');
                $('body').addClass("open-sidebar")
            } else {
                overlay.removeClass('active');
                $('body').removeClass("open-sidebar")
            }
        });

        // Right Sidebar
        $('.sidebar-toggle-right').on('click', function () {
            rsidebar.toggleClass('open');
            if ((rsidebar.hasClass('sidebar-right')) && rsidebar.hasClass('open')) {
                overlay.addClass('active');
                $('body').addClass("open-sidebar")
            } else {
                overlay.removeClass('active');
                $('body').removeClass("open-sidebar")
            }
        });

        // Nave bar in Sidebar
        $('.navbar-sidebar-toggle').on('click', function () {
            dcnavbarsidebar.toggleClass('open');
            if ((dcnavbarsidebar.hasClass('dc-navbar-sidebar')) && dcnavbarsidebar.hasClass('open')) {
                overlay.addClass('active');
                $('body').addClass("open-sidebar")
            } else {
                overlay.removeClass('active');
                $('body').removeClass("open-sidebar")
            }
        });

        // Overlay
        overlay.on('click', function () {
            $(this).removeClass('active');
            $('.sidebar').removeClass('open');
            $('.dc-navbar-sidebar').removeClass('open');
            $('body').removeClass("open-sidebar")
        });

        // Window load browser resize position
        if ($(window).width() < 1200) {
            sidebar.removeClass('open sidebar-stacked');
            lsidebar.addClass('sidebar-fixed-left');
            rsidebar.addClass('sidebar-right');
            toggleButtons.css('display', 'inherit');
            $('body').removeClass("open-sidebar")
        }


// window resize position
        $(window).resize(function () {
            if ($(window).width() < 1200) {
                sidebar.removeClass('open sidebar-stacked');
                lsidebar.addClass('sidebar-fixed-left');
                rsidebar.addClass('sidebar-right');
                toggleButtons.css('display', 'inherit');
                overlay.removeClass('active');
                $('body').removeClass("open-sidebar")
            } else {
                lsidebar.removeClass('sidebar-fixed-left').addClass('open sidebar-stacked');
                rsidebar.removeClass('sidebar-right');
                toggleButtons.css('display', 'none');
                overlay.removeClass('active');
                $('body').removeClass("open-sidebar")
            }
        });


// dropdown elements.
        (function ($) {
            var dropdown = $('.dropdown');
            // Add slidedown animation to dropdown
            dropdown.on('show.bs.dropdown', function (e) {
                $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
            });
            // Add slideup animation to dropdown
            dropdown.on('hide.bs.dropdown', function (e) {
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
            });
        })(jQuery);

        (function (removeClass) {
            jQuery.fn.removeClass = function (value) {
                if (value && typeof value.test === "function") {
                    for (var i = 0, l = this.length; i < l; i++) {
                        var elem = this[i];
                        if (elem.nodeType === 1 && elem.className) {
                            var classNames = elem.className.split(/\s+/);

                            for (var n = classNames.length; n--;) {
                                if (value.test(classNames[n])) {
                                    classNames.splice(n, 1);
                                }
                            }
                            elem.className = jQuery.trim(classNames.join(" "));
                        }
                    }
                } else {
                    removeClass.call(this, value);
                }
                return this;
            }
        })(jQuery.fn.removeClass);
    }
    //functions for paper input
    function paperInputFunction(){
        $(".bar").remove();
        $(".paper-input .form-control").after('<span class="bar"></span>');
        $('.paper-input .form-control').each(function () {
            if($(this).val() != ""){
                $(this).closest('.paper-input').addClass("floating-label-completed");
            }
        });

        $(".paper-input .form-control").focus(function(){
            $(this).closest('.paper-input').addClass("floating-label-active floating-label-completed");
        });

        $(".paper-input .form-control").focusout(function(){
            if($(this).val() === ""){
                $(this).closest('.paper-input').removeClass("floating-label-completed");
            }
            $(this).closest('.paper-input').removeClass("floating-label-active");
        });
    }
    function rippelEffectFunctions() {
        $(".ripple-effect").on('mousedown touchstart', function (e) {
            var rippler = $(this);
            $('.ink').remove();
            // create .ink element if it doesn't exist
            if (rippler.find(".ink").length == 0) {
                rippler.append("<span class='ink'></span>");
            }

            var ink = rippler.find(".ink");

            // prevent quick double clicks
            ink.removeClass("animate");

            // set .ink diametr
            if (!ink.height() && !ink.width()) {
                var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                ink.css({height: d, width: d});
            }
            // get click coordinates
            var x = e.pageX - rippler.offset().left - ink.width() / 2;
            var y = e.pageY - rippler.offset().top - ink.height() / 2;

            // set .ink position and add class .animate
            ink.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("animate");

            setTimeout(function () {
                ink.remove();
            }, 1500);
        })
        $(".checkbox-ripple-effect").on('mousedown', function (e) {
            var rippler = $(this);
            $('.ink').remove();
            // create .ink element if it doesn't exist
            if (rippler.find(".ink").length == 0) {
                rippler.append('<span class="ink"></span>');
            }

            var ink = rippler.find(".ink");

            // prevent quick double clicks
            ink.removeClass("animate");

            // set .ink diametr
            if (!ink.height() && !ink.width()) {
                var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                ink.css({height: 20, width: 20});
            }

            // get click coordinates
            var x = e.pageX - rippler.offset().left - ink.width() / 2;
            var y = e.pageY - rippler.offset().top - ink.height() / 2;

            // set .ink position and add class .animate
            ink.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("animate");
            setTimeout(function () {
                ink.remove();
            }, 1500);
        })

        $(".radio-options").on('mousedown', function (e) {
            var rippler = $(this);
            $('.ink').remove();
            // create .ink element if it doesn't exist
            if (rippler.find(".ink").length == 0) {
                rippler.append('<span class="ink"></span>');
            }

            var ink = rippler.find(".ink");

            // prevent quick double clicks
            ink.removeClass("animate");

            // set .ink diametr
            if (!ink.height() && !ink.width()) {
                var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                ink.css({height: 15, width: 15});
            }
            // get click coordinates
            var x = e.pageX - rippler.offset().left - ink.width() / 2;
            var y = e.pageY - rippler.offset().top - ink.height() / 2;

            // set .ink position and add class .animate
            ink.css({
                top: y + 'px',
                left: x + 'px'
            }).addClass("animate");
            setTimeout(function () {
                ink.remove();
            }, 1500);
        })
    }
    return {
        init: function () {
            rippelEffectFunctions();
        },
        sideBar:function (){
            sideBarFunctions();
        },
        paperInput: function (){
            paperInputFunction();
        }
    }
}();