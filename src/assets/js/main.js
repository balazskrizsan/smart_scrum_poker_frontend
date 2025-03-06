//Global var to avoid any conflicts
var CRUMINA = {};

(function ($) {
    // USE STRICT
    "use strict";

    //----------------------------------------------------/
    // Predefined Variables
    //----------------------------------------------------/
    var $window = $(window),
        $document = $(document),
        $body = $('body'),
        $sidebar = $('.fixed-sidebar'),
        $preloader = $('#hellopreloader');

    /* -----------------------
     * Preloader
     * --------------------- */
    CRUMINA.preloader = function () {
        $window.scrollTop(0);
        setTimeout(function () {
            $preloader.fadeOut(800);
        }, 500);
        return false;
    };

    //Scroll to top.
    jQuery('.back-to-top').on('click', function () {
        $('html,body').animate({
            scrollTop: 0
        }, 1200);
        return false;
    });

    /* -----------------------
     * Input Number Quantity
     * --------------------- */
    $(document).on("click", ".quantity-plus", function () {
        var val = parseInt($(this).prev('input').val());
        $(this).prev('input').val(val + 1).change();
        return false;
    });

    $(document).on("click", ".quantity-minus", function () {
        var val = parseInt($(this).next('input').val());
        if (val !== 1) {
            $(this).next('input').val(val - 1).change();
        }
        return false;
    });

    /* -----------------------------
     Custom input type="number"
     https://bootsnipp.com/snippets/featured/bootstrap-number-spinner-on-click-hold
     * ---------------------------*/
    $(function () {
        var action;
        $(document).on("touchstart mousedown", ".number-spinner button", function () {
            var btn = $(this);
            var input = btn.closest('.number-spinner').find('input');
            btn.closest('.number-spinner').find('button').prop("disabled", false);

            if (btn.attr('data-dir') === 'up') {
                action = setInterval(function () {
                    if (input.attr('max') === undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                        input.val(parseInt(input.val()) + 1);
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 50);
            } else {
                action = setInterval(function () {
                    if (input.attr('min') === undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                        input.val(parseInt(input.val()) - 1);
                    } else {
                        btn.prop("disabled", true);
                        clearInterval(action);
                    }
                }, 50);
            }
        });
        $(document).on("touchend mouseup", ".number-spinner button", function () {
            clearInterval(action);
        });
    });

    /* -----------------------------
     * Toggle functions
     * ---------------------------*/
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); // activated tab
        if ('#events' === target) {
            $('.fc-state-active').click();
        }
    });

    CRUMINA.perfectScrollbarInit = function () {
        var $chatContainer = $('.popup-chat .mCustomScrollbar');
        var $containers = $('.mCustomScrollbar');

        $containers.perfectScrollbar({wheelPropagation: false});

        if (!$chatContainer.length) {
            return;
        }

        $chatContainer.scrollTop($chatContainer.prop("scrollHeight"));
        $chatContainer.perfectScrollbar('update');
    };

    /* -----------------------------
     * Responsive
     * ---------------------------*/
    CRUMINA.responsive = {
        $profilePanel: null,
        $desktopContainerPanel: null,
        $responsiveContainerPanel: null,
        init: function () {
            this.$profilePanel = jQuery('#profile-panel');
            this.$desktopContainerPanel = jQuery('#desktop-container-panel > .ui-block');
            this.$responsiveContainerPanel = jQuery('#responsive-container-panel .ui-block');
            this.update();
        },
        mixPanel: function () {
            if (window.matchMedia("(max-width: 1024px)").matches) {
                this.$responsiveContainerPanel.append(this.$profilePanel);

            } else {
                this.$desktopContainerPanel.append(this.$profilePanel);
            }
        },
        update: function () {
            var _this = this;
            var resizeTimer = null;
            var resize = function () {
                resizeTimer = null;

                // Methods
                _this.mixPanel();
            };

            $(window).on('resize', function () {
                if (resizeTimer === null) {
                    resizeTimer = window.setTimeout(function () {
                        resize();
                    }, 300);
                }
            }).resize();
        }
    };

    /* -----------------------------
     * On DOM ready functions
     * ---------------------------*/
    $document.ready(function () {
        //CRUMINA.preloader();

        CRUMINA.perfectScrollbarInit();

        // Run scripts only if they included on page.
        if (typeof $.fn.gifplayer !== 'undefined') {
            $('.gif-play-image').gifplayer();
        }
        if (typeof $.fn.mediaelementplayer !== 'undefined') {
            $('#mediaplayer').mediaelementplayer({
                "features": ['prevtrack', 'playpause', 'nexttrack', 'loop', 'shuffle', 'current', 'progress', 'duration', 'volume']
            });
        }

        CRUMINA.responsive.init();
    });
})(jQuery);
