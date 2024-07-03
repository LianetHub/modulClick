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

        if ($target.is('.visual__info-btn')) {
            let $currentAction = $target.parent(".visual__info-action");
            let $currentList = $target.next(".visual__info-list");

            if ($target.hasClass('active')) {
                $currentAction.removeClass('active');
                $target.removeClass('active');
                $currentList.slideUp();
            } else {

                $('.visual__info-action').removeClass('active');
                $('.visual__info-btn').removeClass('active');
                $('.visual__info-list').slideUp();


                $currentAction.addClass('active');
                $target.addClass('active');
                $currentList.slideDown();
            }
        }

    })



    // fancybox settings

    $('[data-fancybox]').fancybox({
        touch: false,
    });

    // init tooltip
    $(document).tooltip();


    // floating labels

    let floatingInputs = $('.form__field > .form-control');
    if (floatingInputs.length > 0) {
        floatingInputs.each(function () {
            checkEmpty($(this));

            $(this).on('input blur focus change keyup mouseup', function () {
                checkEmpty($(this));
            });
        });

        function checkEmpty(input) {
            if (input.val().length > 0) {
                input.addClass('_input');
            } else {
                input.removeClass('_input');
            }
        }
    }

    // header height

    getHeaderHeight();

    function getHeaderHeight() {
        const headerHeight = $('.header').outerHeight();
        $("body").css('--header-height', headerHeight + "px");
        return headerHeight;
    }

    window.addEventListener('resize', () => getHeaderHeight());


    // $(window).on('scroll', function () {
    //     if ($(this).scrollTop() > getHeaderHeight()) {
    //         $('header').addClass('scroll');
    //     } else {
    //         $('header').removeClass('scroll');
    //     }
    // });

    // animation

    // Инициализация ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    if ($('.main__header').length > 0) {
        gsap.to('.main__header', {
            opacity: 0,
            y: 100,
            scrollTrigger: {
                trigger: '.main__header',
                start: `top top+=${getHeaderHeight()}`,
                end: 'bottom top',
                scrub: true,
            }
        });
    }

    if ($('.main__banner-image').length > 0) {

        gsap.to('.main__banner-image', {
            marginLeft: '-10%',
            marginRight: '-10%',
            scrollTrigger: {
                trigger: '.main',
                start: `top top+=${getHeaderHeight()}`,
                end: 'bottom top',
                scrub: true,
            }
        });
    }

    if ($('.traditions__image').length > 0) {
        gsap.to('.traditions__image_sm img', {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
                trigger: '.traditions__image_sm',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });




        gsap.to('.traditions__image_lg img', {
            yPercent: -12,
            scrollTrigger: {
                trigger: '.traditions__image_lg',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    }

    if ($('.project__image').length > 0) {
        gsap.to('.project__image', {
            yPercent: 15,
            ease: "none",
            scrollTrigger: {
                trigger: '.project__image',
                start: 'top top',
                end: 'bottom top',
                scrub: true,

            }
        });

    }

    if ($('.works').length > 0) {
        const worksParent = $('.works');
        const mapContent = $('#map');


        const worksRect = worksParent[0].getBoundingClientRect();
        const worksCenterX = worksRect.left + worksRect.width / 2;
        const worksCenterY = worksRect.top + worksRect.height / 2;

        worksParent.on('mousemove', function (event) {
            const mouseX = event.clientX;
            const mouseY = event.clientY;


            const offsetX = (worksCenterX - mouseX) / 100;
            const offsetY = (worksCenterY - mouseY) / 100;

            gsap.to(mapContent, {
                x: offsetX,
                y: offsetY,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        worksParent.on('mouseleave', function () {
            gsap.to(mapContent, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }





    // map 
    if ($('#map').length > 0) {
        ymaps.ready(init);
        let map = document.getElementById('map');

        function init() {
            var myMap = new ymaps.Map("map", {
                center: [55.75399399999374, 37.62209300000001],
                zoom: 10,
                controls: ['']
            }, {
                suppressMapOpenBlock: true
            });


            myMap.controls.remove('routeEditor');
        }





    }



});
