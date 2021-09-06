/**
* Prixer Portfolio Template
*
* @author Webestica (https://skdevbd.com)
* @version 1.0.0
**/


/* ===================
Table Of Content
======================
01 PRELOADER
02 GLOBAL
03 PORTFOLIO
04 FAQ
05 POPUP
06 HEADER
07 PARALLAX
08 SLIDE 
====================== */

(function($) {
    "use strict";

    /*--------------------------------------------------
                    PRELOADER SCRIPT
    ---------------------------------------------------*/ 
    $(window).on('load',  function() { 

        $("#preloader").fadeOut('400'); 

        // Wow Js Init
        new WOW().init(); 

    });
    /*--------------------------------------------------
                    GLOBAL INIT
    ---------------------------------------------------*/

    // Background Image
    $('[data-img-src]').each(function() {
        var Bg = $(this).attr('data-img-src');
        $(this).css('background-image', 'url(' + Bg + ')');
    });
    /*--------------------------------------------------
                    PORTFOLIO INIT
    ---------------------------------------------------*/
    $(".has-potfolio-load-item .filter-grid-item:hidden").slice(0, 6).addClass('show');
    $('.filter-grid').isotope({
        itemSelector: '.filter-grid-item',
        masonry: {
            columnWidth: '.filter-grid-item',
        }
    });
    $(".has-portfolio-load-item-btn").on('click', function (event) {
        var btnHtml = $(this).html();
        var thisBtn = $(this);
        $(this).html(`<span class="spinner-border spinner-border-sm"></span> Loading...`);
        setTimeout(function () {
            $(".has-potfolio-load-item .filter-grid-item:hidden").slice(0, 3).addClass('show');
            $('.filter-grid').isotope({
                itemSelector: '.filter-grid-item',
                masonry: {
                    columnWidth: '.filter-grid-item',
                }
            });
            thisBtn.html(btnHtml);
            if ($(".has-potfolio-load-item .filter-grid-item:hidden").length == 0) {
                thisBtn.slideUp(400);
            }
        }, 1500);
    });
    // filter items on button click
    $('.filter-nav').on('click', 'li', function () {
        var filterValue = $(this).attr('data-filter');
        $('.filter-grid').isotope({
            filter: filterValue,
            itemSelector: '.filter-grid-item',
            masonry: {
                columnWidth: '.filter-grid-item'
            }
        });
        $('.filter-nav li').removeClass('active');
        $(this).addClass('active');
    });
    /*--------------------------------------------------
                    FAQ INIT
    ---------------------------------------------------*/
    // Accordion   
    $('.accordion-wrapper > .accordion-item:eq(0)').addClass('active').find('.accordion-body').slideDown(300);

    $('.accordion-wrapper .accordion-title').on('click', function(e) {
        var dropDown = $(this).closest('.accordion-item').find('.accordion-body');

        $(this).closest('.accordion-wrapper').find('.accordion-body').not(dropDown).slideUp();

        if ($(this).closest('.accordion-item').hasClass('active')) {
            $(this).closest('.accordion-item').removeClass('active');
        } else {
            $(this).closest('.accordion-wrapper').find('.accordion-item.active').removeClass('active');
            $(this).closest('.accordion-item').addClass('active');
        }
        dropDown.stop(false, true).slideToggle(300);
        e.preventDefault();
    });

    $('.faq-wrapper').find('.faq-thumb li').each(function(index, el) {
        $(this).find('.faq-thumg-content').attr('id', `accordionThumb-${index}`);
    });
    $(".faq-wrapper .accordion-wrapper .accordion-title").each(function(index, el) {
        $(this).on("click", function() {
            $(".faq-wrapper .faq-thumb li").removeClass('active');
            $(`#accordionThumb-${index}`).parent("li").addClass('active');
        });

    });
    /*--------------------------------------------------
                    POPUP INIT
    ---------------------------------------------------*/
    $('.has-video-lightbox').each(function() { 
        $(this).fancybox(); 
    });
    /*--------------------------------------------------
                    HEADER INIT
    ---------------------------------------------------*/
    $(".header-search-wrapper .btn-search").on("click", function() {
        $(this).parent('.header-search-wrapper').toggleClass('open-search');
    });
    $(".header-area .toggle-btn").on("click", function() {
        $(".header-area").toggleClass('active-sidenav');
    });
    $(".sidenav_wrapper .side_navbar .nav-item").each(function(index) {
        $(this).css('--nav-index', index);
    });

    $('.side_navbar .dropdown-link').on("click", function(j) {
        var dropDown = $(this).closest('li').find('.submenu');

        $(this).closest('.side_navbar').find('.submenu').not(dropDown).slideUp();

        if ($(this).hasClass('active-dropdown')) {
            $(this).removeClass('active-dropdown');
        } else {
            $(this).closest('.side_navbar').find('.dropdown-link.active-dropdown').removeClass('active-dropdown');
            $(this).addClass('active-dropdown');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $(".header-area").append('<span class="header-space">');

     var HeaderHeight = $(".header-area").innerHeight();

    $(".header-area .header-space").css({
        "height": HeaderHeight,
    });

    $(window).on('scroll', HeaderSticky);

    function HeaderSticky() {
        var ScrollTop = $(window).scrollTop();
        if (ScrollTop > 150) {   
            $(".header-area").addClass('sticky');
        } else {
            $(".header-area").removeClass('sticky');
        }
    }
    HeaderSticky(); 
    /*--------------------------------------------------
                    HERO SLIDE SCRIPT
    ---------------------------------------------------*/
    var interleaveOffset = 0.5;
    var HeroSlideImages = new Swiper('.hero_slide_container', {
        loop: false,
        speed: 1200,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        parallax: true,
        navigation: {
            nextEl: ".hero_slide_wrapper .next",
            prevEl: ".hero_slide_wrapper .prev"
        },
        pagination: {
            el: '.hero_slide_wrapper .slide-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return (`<div class="${className}"> 
                    <svg viewBox="0 0 20 20"><circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke-opacity="1" stroke-width="2px"></circle><circle class="solid-fill" cx="10" cy="10" r="3"></circle></svg>
                </div>`);
            }
        },
        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide_bg").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide_bg").style.transition =
                        speed + "ms";
                }
            }
        }
    });
    /*--------------------------------------------------
                PARALLAX SCRIPT
    ---------------------------------------------------*/
    $('.parallax-group-wrapper').each(function() {
        $('.parallax-group-wrapper').isotope({
            itemSelector: '.parallax-item',
            masonry: {
                columnWidth: '.parallax-item'
            }
        });
    });
    // Global Variable
    jarallax(document.querySelectorAll('.parallax-bg'), {
        speed: 0.8
    });
    jarallax(document.querySelectorAll('.parallax-small'), {
        speed: 0.8
    });
    jarallax(document.querySelectorAll('.page-top-bg'), {
        speed: 0.7
    });
    /*--------------------------------------------------
                SLIDE
    ---------------------------------------------------*/
    new Swiper('.post-slide', {
        loop: false,
        speed: 700,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        navigation: {
            nextEl: ".post-slide-wrapper .next",
            prevEl: ".post-slide-wrapper .prev"
        }
    });
    new Swiper('.post-card-slide', {
        loop: false,
        speed: 700,
        grabCursor: true,
        slidesPerView: 2,
        spaceBetween: 20,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        breakpoints: {
            200: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 20, 
            }
        }
    });
    /*--------------------------------------------------
                    END SCRIPTS
    ---------------------------------------------------*/
})(jQuery); 
