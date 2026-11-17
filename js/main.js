/*-----------------------------------------------------------------

Template Name: Axispro Business & corporate agency HTML template 
Author:  Valorwide
Author URI: https://themeforest.net/user/Valorwide/portfolio
Version: 1.0.0
Description: Axispro Business & corporate agency HTML template <

-------------------------------------------------------------------
CSS TABLE OF CONTENTS
-------------------------------------------------------------------

01. header
02. magnificPopup
03. counter up
04. wow animation
05. nice select
06. swiper slider
07. search popup
08. back to top 
09. mousecursor
10. circle-progress 
11. preloader 


------------------------------------------------------------------*/

(function($) {
    "use strict";

    $(document).ready( function() {

        //>> Active Nav Link Auto-Highlight <<//
        try {
            var currentFile = window.location.pathname.split("/").pop() || "index.html";
            if (!currentFile || currentFile === "" || currentFile === "/") currentFile = "index.html";
            $(".header-main .main-menu ul li").each(function() {
                var linkHref = $(this).children("a").attr("href");
                if (linkHref && linkHref.split("/").pop() === currentFile) {
                    $(".header-main .main-menu ul li").removeClass("active");
                    $(this).addClass("active");
                }
            });
        } catch (e) {}

        //>> Mobile Menu Js Start <<//
        $('#mobile-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "1199",
            meanExpand: ['<i class="far fa-plus"></i>'],
        });

        //>> Sidebar Toggle Js Start <<//
        function closeOffcanvas() {
            $(".offcanvas__info").removeClass("info-open");
            $(".offcanvas__overlay").removeClass("overlay-open");
            $("body, html").removeClass("no-scroll");
        }

        function openOffcanvas() {
            $(".offcanvas__info").addClass("info-open");
            $(".offcanvas__overlay").addClass("overlay-open");
            $("body, html").addClass("no-scroll");
        }

        $(".offcanvas__close,.offcanvas__overlay").on("click", function() {
            closeOffcanvas();
        });
        $(".sidebar__toggle").on("click", function() {
            openOffcanvas();
        });

        // Close offcanvas on Escape key
        $(document).on("keydown", function(e) {
            if ((e.key === "Escape" || e.keyCode === 27) && $(".offcanvas__info").hasClass("info-open")) {
                closeOffcanvas();
            }
        });

        // Prevent wheel / touch drag scrolling over background overlay
        $(".offcanvas__overlay").on("wheel touchmove", function(e) {
            e.preventDefault();
        });

        //>> Body Overlay Js Start <<//
        $(".body-overlay").on("click", function() {
            $(".offcanvas__area").removeClass("offcanvas-opened");
            $(".df-search-area").removeClass("opened");;
            $(".body-overlay").removeClass("opened");
        });

        //>> Sticky Header Js Start <<//

        $(window).scroll(function() {
            if ($(this).scrollTop() > 250) {
                $("#header-sticky").addClass("sticky");
            } else {
                $("#header-sticky").removeClass("sticky");
            }
        });

        //>> Video Popup Start <<//
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: {
                enabled: true,
            },
        });

        $('.video-popup').magnificPopup({
            type: 'iframe',
            callbacks: {
            }
        });
        
        //>> Counterup Start <<//
        $(".count").counterUp({
            delay: 15,
            time: 4000,
        });

        //>> Wow Animation Start <<//
        new WOW().init();

        //>> Nice Select Start <<//
        $('select').niceSelect();

        //>> Service Slider Start <<//
        if($('.hero-slider').length > 0) {
            const heroSlider = new Swiper(".hero-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },

                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
            });
        }

        //>> Service Slider Start <<//
        if($('.sevice-slider').length > 0) {
            const serviceSlider = new Swiper(".sevice-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".dot",
                    clickable: true,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    400: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Project Slider Start <<//
        if($('.project-slider').length > 0) {
            const projectSlider = new Swiper(".project-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 4,
                    },
                    991: {
                        slidesPerView: 3,
                    },
                    767: {
                        slidesPerView: 2,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    400: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Brand Slider Start <<//
        if($('.brand-slider').length > 0) {
            const brandSlider = new Swiper(".brand-slider", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    400: {
                        slidesPerView: 2,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Brand Slider-2 Start <<//
        if($('.brand-slider-2').length > 0) {
            const brandSlider2 = new Swiper(".brand-slider-2", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 5,
                    },
                    991: {
                        slidesPerView: 4,
                    },
                    767: {
                        slidesPerView: 3,
                    },
                    575: {
                        slidesPerView: 2,
                    },
                    400: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

        //>> Testimonial Slider Start <<//
        if($('.testimonial-active').length > 0) {
            const testimonialActive = new Swiper(".testimonial-active", {
                spaceBetween: 30,
                speed: 2000,
                loop: true,
                autoplay: {
                    delay: 1000,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: ".array-prev",
                    prevEl: ".array-next",
                },
                breakpoints: {
                    1199: {
                        slidesPerView: 1,
                    },
                    991: {
                        slidesPerView: 1,
                    },
                    767: {
                        slidesPerView: 1,
                    },
                    575: {
                        slidesPerView: 1,
                    },
                    0: {
                        slidesPerView: 1,
                    },
                },
            });
        }

         //>> Search Popup Start <<//
         const $searchWrap = $(".search-wrap");
         const $navSearch = $(".nav-search");
         const $searchClose = $("#search-close");
 
         $(".search-trigger").on("click", function (e) {
             e.preventDefault();
             $searchWrap.animate({ opacity: "toggle" }, 500);
             $navSearch.add($searchClose).addClass("open");
         });
 
         $(".search-close").on("click", function (e) {
             e.preventDefault();
             $searchWrap.animate({ opacity: "toggle" }, 500);
             $navSearch.add($searchClose).removeClass("open");
         });
 
         function closeSearch() {
             $searchWrap.fadeOut(200);
             $navSearch.add($searchClose).removeClass("open");
         }
 
         $(document.body).on("click", function (e) {
             closeSearch();
         });
 
         $(".search-trigger, .main-search-input").on("click", function (e) {
             e.stopPropagation();
         });

        //>> Back To Top Slider Start <<//
        $(window).scroll(function () {
            if ($(this).scrollTop() > 20) {
                $("#back-top").addClass("show");
            } else {
                $("#back-top").removeClass("show");
            }
        });
        $("#back-top").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 800);
            return false;
        });

        //>> Mouse Cursor Start <<//
        function mousecursor() {
            if ($("body")) {
                const e = document.querySelector(".cursor-inner"),
                    t = document.querySelector(".cursor-outer");
                let n,
                    i = 0,
                    o = !1;
                (window.onmousemove = function(s) {
                    o ||
                        (t.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                        (e.style.transform =
                            "translate(" + s.clientX + "px, " + s.clientY + "px)"),
                        (n = s.clientY),
                        (i = s.clientX);
                }),
                $("body").on("mouseenter", "a, .cursor-pointer", function() {
                        e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
                    }),
                    $("body").on("mouseleave", "a, .cursor-pointer", function() {
                        ($(this).is("a") && $(this).closest(".cursor-pointer").length) ||
                        (e.classList.remove("cursor-hover"),
                            t.classList.remove("cursor-hover"));
                    }),
                    (e.style.visibility = "visible"),
                    (t.style.visibility = "visible");
            }
        }
        $(function() {
            mousecursor();
        });

         // circle-progress
         $(".circle-bar").loading();

        //>> Global 404 Redirect for Buttons & Icons (except mobile sidebar, nav, footer, auth, & dashboard navigation) <<//
        $(document).on("click", "button, input[type='submit'], input[type='button'], a, .theme-btn, .link-btn, .video-btn, .icon, i, svg, .feature-step-items, .array-prev, .array-next", function(e) {
            var $target = $(this);

            // 1. Exemption: Desktop Header Nav
            if ($target.closest("#mobile-menu, .main-menu, .header-logo, .top-logo").length > 0) {
                return; // Allow standard header nav
            }

            // 2. Exemption: Mobile Sidebar & Hamburger Toggle
            if ($target.closest(".header__hamburger, .sidebar__toggle, .offcanvas__info, .offcanvas__wrapper, .offcanvas__close, .offcanvas__overlay, .mobile-menu, .mean-nav, .mean-bar").length > 0) {
                return; // Allow mobile sidebar toggle & menu
            }

            // 3. Exemption: Footer & Back to top
            if ($target.closest("footer, .footer-section, #back-top").length > 0) {
                return; // Allow footer links & back to top
            }

            // 4. Exemption: Auth & Navigation to Login, Register, Index & Dashboards
            if ($target.closest(".auth-card, #loginForm, #registerForm, .auth-guest, .auth-user, .btn-goto-dashboard, .return-dashboard-btn, .btn-logout, .back-home-btn").length > 0) {
                return; // Allow login/register form actions and dashboard routing
            }
            if ($target.is("a")) {
                var href = $target.attr("href") || "";
                if (href === "index.html" || href === "login.html" || href === "register.html" || 
                    href === "admin-dashboard.html" || href === "manager-dashboard.html" || href === "user-dashboard.html") {
                    return; // Allow direct page transitions
                }
            }

            // 5. Exemption: Dashboard Sidebar Mobile Toggle & Sidebar Navigation
            if ($target.closest(".dash-sidebar-toggle, .dash-sidebar-overlay, .dash-nav-link, .btn-dash-logout, .dash-brand, .dash-sidebar-brand, #brandLogoLink").length > 0) {
                return; // Allow dashboard sidebar toggling & sidebar switching
            }

            // 6. Otherwise: All other buttons and icons redirect to 404.html (including action buttons in dashboard pages)
            e.preventDefault();
            e.stopPropagation();
            window.location.href = "404.html";
        });

    }); // End Document Ready Function

    $.fn.loading = function() {
        const DEFAULTS = {
            backgroundColor: '#b3cef6',
            progressColor: '#4b86db',
            percent: 75,
            duration: 2000
        };

        $(this).each(function() {
            const $target = $(this);

            const opts = {
                backgroundColor: $target.data('color') ? $target.data('color').split(',')[0] : DEFAULTS.backgroundColor,
                progressColor: $target.data('color') ? $target.data('color').split(',')[1] : DEFAULTS.progressColor,
                percent: $target.data('percent') ? $target.data('percent') : DEFAULTS.percent,
                duration: $target.data('duration') ? $target.data('duration') : DEFAULTS.duration
            };
            // console.log(opts);

            $target.append('<div class="background"></div><div class="rotate"></div><div class="left"></div><div class="right"></div><div class=""><span>' + opts.percent + '%</span></div>');

            $target.find('.background').css('background-color', opts.backgroundColor);
            $target.find('.left').css('background-color', opts.backgroundColor);
            $target.find('.rotate').css('background-color', opts.progressColor);
            $target.find('.right').css('background-color', opts.progressColor);

            const $rotate = $target.find('.rotate');
            setTimeout(function() {
                $rotate.css({
                    'transition': 'transform ' + opts.duration + 'ms linear',
                    'transform': 'rotate(' + opts.percent * 3.6 + 'deg)'
                });
            }, 1);

            if (opts.percent > 50) {
                let animationRight = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-end';
                let animationLeft = 'toggle ' + (opts.duration / opts.percent * 50) + 'ms step-start';
                $target.find('.right').css({
                    animation: animationRight,
                    opacity: 1
                });
                $target.find('.left').css({
                    animation: animationLeft,
                    opacity: 0
                });
            }
        });
    }

    function loader() {
        $(window).on('load', function() {
            // Animate loader off screen
            $(".preloader").addClass('loaded');                    
            $(".preloader").delay(600).fadeOut();                       
        });
    }

    loader();
   

})(jQuery); // End jQuery


// Global Strict Field Restrictions:
// 1. Name fields block all numbers (0-9).
// 2. Number / Phone fields block all alphabets (a-z, A-Z).
(function setupStrictFieldRestrictions() {
    function isNameField(el) {
        if (!el || el.tagName !== 'INPUT') return false;
        var id = (el.id || '').toLowerCase();
        var name = (el.name || '').toLowerCase();
        var ph = (el.placeholder || '').toLowerCase();
        var cls = (el.className || '').toLowerCase();
        // Exclude email and password fields
        if (id.includes('email') || name.includes('email') || ph.includes('email') ||
            id.includes('password') || name.includes('password') || ph.includes('password')) {
            return false;
        }
        return id.includes('name') || name.includes('name') || ph.includes('name') || cls.includes('name');
    }

    function isNumberField(el) {
        if (!el || el.tagName !== 'INPUT') return false;
        var type = (el.type || '').toLowerCase();
        var id = (el.id || '').toLowerCase();
        var name = (el.name || '').toLowerCase();
        var ph = (el.placeholder || '').toLowerCase();
        var cls = (el.className || '').toLowerCase();
        if (type === 'number' || type === 'tel') return true;
        return id.includes('phone') || name.includes('phone') || ph.includes('phone') || cls.includes('phone') ||
               id.includes('mobile') || name.includes('mobile') || ph.includes('mobile') ||
               id.includes('number') || name.includes('number') || ph.includes('number');
    }

    // Keydown blocking
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var navKeys = ['Backspace', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Home', 'End'];
        if (navKeys.indexOf(e.key) !== -1) return;

        var target = e.target;
        if (isNameField(target)) {
            // Block digits
            if (/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        } else if (isNumberField(target)) {
            // Block letters
            if (/[a-zA-Z]/.test(e.key)) {
                e.preventDefault();
            }
        }
    }, true);

    // Input sanitization (handles paste, autocomplete, virtual keyboards)
    document.addEventListener('input', function (e) {
        var target = e.target;
        if (isNameField(target)) {
            var val = target.value;
            var clean = val.replace(/[0-9]/g, '');
            if (val !== clean) {
                target.value = clean;
            }
        } else if (isNumberField(target)) {
            var val = target.value;
            var clean = val.replace(/[a-zA-Z]/g, '');
            if (val !== clean) {
                target.value = clean;
            }
        }
    }, true);
})();
