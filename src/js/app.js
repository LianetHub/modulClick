"use strict";



$(function () {

    // preloader

    setTimeout(function () {
        $('.preloader').hide();
        $('body').removeClass('lock')
    }, 1000);

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
            $("body").toggleClass("lock-menu");
        }
        if ($target.is('.menu')) {
            $(".header").removeClass("open-menu");
            $("body").removeClass("lock-menu");
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
            $('.energo__block').eq($target.index()).addClass('active').siblings().removeClass('active');
        }

        // submenu touch
        if ($target.is('.menu__link') && $('body').hasClass('_touch')) {

            let $submenu = $target.next();
            if ($submenu.length > 0) {
                e.preventDefault();
            }

            if ($target.hasClass('active')) {

                $target.removeClass('active');
                $submenu.removeClass('active');

            } else {

                $('.menu__link').removeClass('active');
                $('.submenu').removeClass('active');

                $target.addClass('active');
                $submenu.addClass('active');
            }

        }

        // price accordion
        if ($target[0].closest('.price__item-btn')) {
            let $btn = $target.closest('.price__item-btn')
            $btn.toggleClass('active')
            $btn.prev().find('.price__item-info').slideToggle();
        }
        if ($target[0].closest('.price__item-header')) {
            $target.next().slideToggle();
            $target.parent().next().toggleClass('active')
        }

        // plans select
        if ($target.is('.plans__slide-select')) {


            if ($target.hasClass('selected')) {
                $target.removeClass('selected');
                $target.text("Выбрать планировку");

            } else {
                $('.plans__slide-select').removeClass('selected');
                $('.plans__slide-select').text("Выбрать планировку");

                $target.text("Выбрано");
                $target.addClass('selected');
            }
        }

        // plans tabs
        if ($target.is('.plans__tab')) {
            $target.addClass('active').siblings().removeClass('active');
            $('.plans__block').eq($target.index()).addClass('active').siblings().removeClass('active');
            $('.plans__slider').slick("unslick")
            $('.plans__slider').slick({
                variableWidth: true,
                arrows: false,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            variableWidth: false,
                            slidesToShow: 1,
                        }
                    }
                ]
            });
        }
        // plans extras
        if ($target[0].closest('.plans__extras-btn')) {
            $target.closest('.plans__extras-btn').toggleClass('active').prev().find('.plans__extras-options').slideToggle()
        }

    });


    $('.submenu__link').on('mouseenter', function (e) {
        let $target = $(e.target);
        let $wrapper = $target.closest('.submenu');
        let $imagesWrapper = $wrapper.find('.submenu__images');

        if ($imagesWrapper.length > 0) {
            let $images = $imagesWrapper.find('.submenu__image');
            let indexLink = $target.parent().index();

            $images.eq(indexLink).addClass('active').siblings().removeClass('active');
        }

    });



    // fancybox settings

    // $('[data-fancybox]').fancybox({
    //     touch: false,
    // });



    // sliders

    if ($('.promo__slider').length > 0) {
        $('.promo__slider').slick({
            arrows: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 6000,
            fade: true,
            cssEase: 'linear'
        });
    }

    if ($('.gallery__slider').length > 0) {
        let gallerySlider = $('.gallery__slider').slick({
            infinite: false,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 576,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 0.95,
                    }
                }
            ]
        });

        gallerySlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {

            if (nextSlide > 0) {
                $('.gallery__offer').addClass('fade-tablet')
            } else {
                $('.gallery__offer').removeClass('fade-tablet')
            }
        })

    }

    if ($('.project__slider').length > 0) {
        $('.project__slider').slick({
            slidesToShow: 1,
            infinite: false,
            arrows: true,
            fade: true,
            asNavFor: '.project__thumbs, .popup__slider'
        });

        $('.project__thumbs').slick({
            asNavFor: '.project__slider, .popup__slider',
            slidesToShow: 4,
            variableWidth: true,
            infinite: false,
            focusOnSelect: true,
            arrows: false,
        });

        $('.popup__slider').slick({
            asNavFor: '.project__slider, .project__thumbs',
            slidesToShow: 1,
            infinite: false,
            arrows: true,
            fade: true,
        }) 
    }

    if ($('.plans__slider').length > 0) {
        $('.plans__slider').slick({
            variableWidth: true,
            arrows: true,
            infinite: false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        variableWidth: false,
                        slidesToShow: 1,
                    }
                }
            ]
        });

    }


    // header height

    getHeaderHeight();

    function getHeaderHeight() {
        const headerHeight = $('.header').outerHeight();
        $("body").css('--header-height', headerHeight + "px");
        return headerHeight;
    }

    gsap.registerPlugin(ScrollTrigger);


    if ($('.project__slider').length > 0) {
        gsap.to('.project__slide img', {
            yPercent: 50,
            scrollTrigger: {
                trigger: '.project',
                start: `top top`,
                end: 'bottom top',
                scrub: true,
            }
        });
        
    }



});
