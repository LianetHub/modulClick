"use strict";



$(function () {


    // detect webP support
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src =
            "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        if (support == true) {
            $("body").addClass("webp");
        } else {
            $("body").addClass("no-webp");
        }
    });

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (
                isMobile.Android() ||
                isMobile.BlackBerry() ||
                isMobile.iOS() ||
                isMobile.Opera() ||
                isMobile.Windows()
            );
        },
    };

    function getNavigator() {
        if (isMobile.any() || window.innerWidth < 992) {
            $("body").removeClass("_pc").addClass("_touch");
        } else {
            $("body").removeClass("_touch").addClass("_pc");
        }
    }

    getNavigator();

    $(window).on("resize", () => getNavigator());



    // click handler
    $(document).on('click', function (e) {

        let $target = $(e.target);


        if ($target.hasClass('icon-menu')) {
            $(".header").toggleClass("open-menu");
        }

        // accordion
        if ($target[0].closest('.consult__item-btn')) {
            $target.closest('.consult__item-btn').toggleClass('active')
            $target.closest('.consult__item-btn').next().slideToggle();
        }

        // details btn
        if ($target.is('.energo__detail-btn')) {

            let $currentAction = $target;
            let $currentItem = $target.parent();
            let $currentDesc = $target.next();

            if ($target.hasClass('active')) {
                $currentAction.removeClass('active');
                $currentItem.removeClass('active');
                $currentDesc.fadeOut();
            } else {

                $('.energo__detail-btn').removeClass('active');
                $('.energo__detail-item').removeClass('active');
                $('.energo__detail-desc').fadeOut();


                $currentAction.addClass('active');
                $currentItem.addClass('active');
                $currentDesc.fadeIn();
            }
        }

        // details tabs
        if ($target.is('.energo__tab')) {
            $target.addClass('active').siblings().removeClass('active');
        }

    })



    // fancybox settings

    $('[data-fancybox]').fancybox({
        touch: false,
    });

    // init tooltip

    // sliders

    if ($('.promo__slider').length > 0) {
        $('.promo__slider').slick({
            arrows: false
        });
    }

    if ($('.gallery__slider').length > 0) {
        let gallerySlider = $('.gallery__slider').slick({
            infinite: false,
            variableWidth: true
        });

        gallerySlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            if (nextSlide > 0) {
                $('.gallery__offer').addClass('fade')
            } else {
                $('.gallery__offer').removeClass('fade')
            }
        })

    }


    // header height

    getHeaderHeight();

    function getHeaderHeight() {
        const headerHeight = $('.header').outerHeight();
        $("body").css('--header-height', headerHeight + "px");
        return headerHeight;
    }

    // window.addEventListener('resize', () => getHeaderHeight());


    // $(window).on('scroll', function () {
    //     if ($(this).scrollTop() > getHeaderHeight()) {
    //         $('header').addClass('scroll');
    //     } else {
    //         $('header').removeClass('scroll');
    //     }
    // });









});
