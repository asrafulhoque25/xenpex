
// ============================================
// MOBILE MENU & NAVBAR
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const desktopDropdown = document.querySelector('.desktop-dropdown');
    const dropdownIcon = document.querySelector('.desktop-dropdown-icon');
    
    if (desktopDropdown && dropdownIcon) {
        desktopDropdown.addEventListener('mouseenter', function() {
            dropdownIcon.textContent = '−';
        });
        
        desktopDropdown.addEventListener('mouseleave', function() {
            dropdownIcon.textContent = '+';
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (mobileMenuLinks.length > 0 && mobileMenu) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const parent = this.parentElement;
                const submenu = parent.querySelector('.mobile-submenu');
                
                if (submenu) {
                    e.preventDefault();
                    parent.classList.toggle('active');
                } else {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024 && mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// ============================================
// BANNER LINE SHAPE ANIMATION
// ============================================
const checkAndAnimate = () => {
    const svgElement = document.querySelector('.banner-line-shape');
    
    if (!svgElement || typeof gsap === 'undefined') return;
    
    const horizontalLines = svgElement.querySelectorAll('rect:not([transform])');
    const verticalLines = svgElement.querySelectorAll('rect[transform*="rotate"]');
    
    if (horizontalLines.length === 0 && verticalLines.length === 0) return;
    
    const tl = gsap.timeline({
        delay: 1,
        defaults: {
            ease: "power2.inOut"
        }
    });
    
    if (horizontalLines.length > 0) {
        tl.fromTo(horizontalLines, 
            {
                scaleX: 0,
                transformOrigin: "left center"
            },
            {
                scaleX: 1,
                duration: 0.8,
                stagger: 0.15
            }
        );
    }
    
    if (verticalLines.length > 0) {
        tl.fromTo(verticalLines,
            {
                scaleY: 0,
                transformOrigin: "center top"
            },
            {
                scaleY: 1,
                duration: 0.8,
                stagger: 0.15
            },
            "-=0.3"
        );
    }
};

window.addEventListener('load', checkAndAnimate);


// ============================================
// 3D SHAPE ANIMATION (Home + About Page)
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    if (typeof gsap === 'undefined') return;
    
    const shapes = document.querySelectorAll('.shape-3d');
    
    if (shapes.length === 0) return;

    document.addEventListener("mousemove", function(event) {
        const x = (event.clientX / window.innerWidth) - 0.5;
        const y = (event.clientY / window.innerHeight) - 0.5;
        
        shapes.forEach(shape => {
            gsap.to(shape, {
                duration: 0.4,
                x: x * 50,
                y: y * 30,
                rotationY: x * 15,
                rotationX: -y * 15,
                rotationZ: x * 5,
                scale: 1 + (Math.abs(x) + Math.abs(y)) * 0.1,
                ease: "power1.out",
                overwrite: "auto"
            });
        });
    });
});

// ============================================
// VIDEO SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const videoSliderElement = document.getElementById('video-slider');
    
    if (!videoSliderElement || typeof Splide === 'undefined') return;

    const splide = new Splide('#video-slider', {
        type: 'loop',
        drag: 'free',
        focus: 'center',
        perPage: 5,
         gap: '12px',
        arrows: false,
        pagination: false,
        autoScroll: {
            speed: 1, 
            pauseOnHover: true,
            pauseOnFocus: true,
        },
        breakpoints: {
            1536: { perPage: 5 },
            1280: { perPage: 4 },
            1024: { perPage: 3 , gap: '10px',},
            768: { perPage: 2.5 },
            640: { perPage: 1.5, gap: '8px', }
        }
    });

    if (window.splide && window.splide.Extensions) {
        splide.mount(window.splide.Extensions);
    } else {
        splide.mount();
    }

    const videoCards = document.querySelectorAll('.video-card');

    if (videoCards.length > 0) {
        videoCards.forEach(card => {
            const video = card.querySelector('.video-element');
            if (!video) return;
            
            let isPlaying = false;

            card.addEventListener('mouseenter', function() {
                if (!isPlaying) {
                    video.currentTime = 0;
                    video.play().catch(err => console.log('Video play error:', err));
                    isPlaying = true;
                }
            });

            card.addEventListener('mouseleave', function() {
                if (isPlaying) {
                    video.pause();
                    video.currentTime = 0;
                    isPlaying = false;
                }
            });

            video.addEventListener('ended', function() {
                if (isPlaying) {
                    video.currentTime = 0;
                    video.play();
                }
            });
        });

        splide.on('move', function() {
            videoCards.forEach(card => {
                const video = card.querySelector('.video-element');
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });
        });
    }
});

// ============================================
// WORK PROGRESS PATH ANIMATION
// ============================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

if (window.innerWidth >= 1024) {
    const path = document.querySelector("#draw-path");
    const workProgress = document.querySelector(".work-progress");
    
    if (path && workProgress && typeof gsap !== 'undefined') {
        const pathLength = path.getTotalLength();

        gsap.set(path, { 
            strokeDasharray: pathLength, 
            strokeDashoffset: pathLength 
        });

        const processItems = document.querySelectorAll(".process-item");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".work-progress",
                start: "top 80%",         
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });

        tl.to(path, {
            strokeDashoffset: 0,
            duration: 4,
            ease: "power1.inOut"
        });

        if (processItems.length > 0) {
            tl.to(".process-item", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.7, 
                ease: "power2.out"
            }, 0.5);
        }
    }
}

// ============================================
// OVERVIEW COUNTER
// ============================================
const counterSections = document.querySelectorAll('.overview-counter, .about-counter, .design-counter, .branding-counter, .scss-counter, .web-counter');

if (counterSections.length > 0 && typeof gsap !== 'undefined') {
    if (gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
    }
    
    counterSections.forEach(counterSection => {
        const counters = counterSection.querySelectorAll('.counter');

        if (counters.length > 0) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');

                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerText: 1 }, 
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 90%", 
                        toggleActions: "play none none none"
                    },
                    onUpdate: function () {
                        counter.innerHTML = Math.ceil(this.targets()[0].innerText);
                    }
                });
            });
        }
    });
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const testimonialSlider = document.getElementById('testimonial-slider');
    
    if (!testimonialSlider || typeof Splide === 'undefined') return;

    const splide = new Splide('#testimonial-slider', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        padding: '0',
        arrows: false,
        pagination: false,
        autoplay: false,
        breakpoints: {
            1024: {
                perPage: 2,
                gap: '1.5rem',
            },
            768: {
                perPage: 1,
                gap: '1rem',
            }
        }
    });

    splide.mount();

    const prevArrow = document.getElementById('prev-arrow');
    const nextArrow = document.getElementById('next-arrow');

    if (prevArrow) {
        prevArrow.addEventListener('click', function() {
            splide.go('<');
        });
    }

    if (nextArrow) {
        nextArrow.addEventListener('click', function() {
            splide.go('>');
        });
    }
});
// ============================================
// FAQ ACCORDION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0 || typeof gsap === 'undefined') return;
    
    // Initialize all FAQ items as collapsed
    faqItems.forEach((item) => {
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.plus-icon');
        
        // Remove active class from all items
        item.classList.remove('active');
        
        // Set all answers to height 0
        if (answer) {
            gsap.set(answer, { height: 0 });
        }
        
        // Set all icons to rotation 0
        if (icon) {
            gsap.set(icon, { rotation: 0 });
        }
    });

    // Add click event listeners
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.plus-icon');
        
        if (!question) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIcon = otherItem.querySelector('.plus-icon');
                
                otherItem.classList.remove('active');
                
                if (otherAnswer) {
                    gsap.to(otherAnswer, {
                        height: 0,
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }
                if (otherIcon) {
                    gsap.to(otherIcon, {
                        rotation: 0,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                
                if (answer) {
                    gsap.to(answer, {
                        height: 'auto',
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                }
                if (icon) {
                    gsap.to(icon, {
                        rotation: 45,
                        duration: 0.3,
                        ease: 'power2.inOut'
                    });
                }
            }
        });
    });
});

// ============================================
// GRADIENT BACKGROUND ANIMATION (UPDATED)
// ============================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyGradientAnimation(sectionSelector) {
  
    const sections = document.querySelectorAll(sectionSelector);
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    
    sections.forEach((section, index) => {
        const gradientOverlay1 = document.createElement('div');
        gradientOverlay1.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(50% 27.56% at 50% -10%, rgba(6, 81, 54, 0.8) 0%, transparent 100%);
            pointer-events: none;
            z-index: 0;
            filter: blur(40px);
        `;


        const gradientOverlay2 = document.createElement('div');
        gradientOverlay2.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(50% 27.56% at 50% 0%, #065136 0%, #002417 100%);
            pointer-events: none;
            z-index: 0;
        `;

        section.insertBefore(gradientOverlay1, section.firstChild);
        section.insertBefore(gradientOverlay2, section.firstChild);

        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: section, // Unique trigger for each section
                start: 'top 108%',
                end: 'top 25%',
                scrub: 2,
                markers:false,
            }
        });

        masterTl.to(gradientOverlay1, {
            opacity: 0.6,
            scale: 1.1,
            duration: 1,
            ease: 'power2.inOut'
        }, 0);

        masterTl.to(gradientOverlay2, {
            opacity: 1,
            backgroundPosition: '50% 8%',
            duration: 1,
            ease: 'power2.inOut'
        }, 0);

        const contentWrapper = section.querySelector('.cta-wrap, .teamwrap, .workprocess-wrap > div');
        if (contentWrapper) {
            masterTl.from(contentWrapper, {
                y: 25,
                opacity: 0.85,
                duration: 1,
                ease: 'power1.out'
            }, 0.2);
        }
    });
}

applyGradientAnimation('.cta-section');
applyGradientAnimation('.teamsection');
applyGradientAnimation('.work-progress');

// ============================================
// OVERVIEW/ABOUT COUNTER (UPDATED)
// ============================================

// ============================================
// CONTACT FORM GRADIENT BACKGROUND ANIMATION
// ============================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyContactGradientAnimation(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    sections.forEach((section, index) => {
        // Create main gradient overlay
        const gradientOverlay = document.createElement('div');
        gradientOverlay.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(
                40% 20% at 50% 100%,
                #065136 0%,
                #002417 100%
            );
            pointer-events: none;
            z-index: 1;
            border-radius: 1.5rem;
        `;

        // Create blur overlay for depth
        const blurOverlay = document.createElement('div');
        blurOverlay.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: radial-gradient(
                45% 25% at 50% 95%,
                rgba(6, 81, 54, 0.9) 0%,
                transparent 100%
            );
            pointer-events: none;
            z-index: 0;
            filter: blur(60px);
            border-radius: 1.5rem;
        `;

        section.insertBefore(gradientOverlay, section.firstChild);
        section.insertBefore(blurOverlay, section.firstChild);

       
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
       start: 'bottom 95%',   
      end: 'bottom 50%',     
                scrub: 1.5,           
             
            }
        });

       
        masterTl.to(blurOverlay, {
            opacity: 0.8,
            scale: 1.15,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);

        
        masterTl.to(gradientOverlay, {
            opacity: 1,
            scale: 1.05,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);


    });
}

// Initialize gradient animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        applyContactGradientAnimation('.anatomy');
    }, 100);
});





//normal bg gradient 

if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyLinearGradientOnScroll() {
    const sections = document.querySelectorAll('.bg-linear-gradient');
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    sections.forEach((section) => {
        // Create a wrapper div for the gradient
        const gradientBg = document.createElement('div');
        gradientBg.style.cssText = `
            position: absolute;
            inset: 0;
            opacity: 0;
            background: linear-gradient(180deg, var(--dark-shade-1, #002417) 0%, var(--dark-extra-dark, #001B11) 100%);
            pointer-events: none;
            z-index: 0;
        `;
        
        section.insertBefore(gradientBg, section.firstChild);
        
        // Animate gradient on scroll
        gsap.to(gradientBg, {
            opacity: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                end: 'top 60%',
                scrub: 1,
            }
        });
    });
}

// Call the function
applyLinearGradientOnScroll();






//phase background scroll

if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyPhaseBackgroundAnimation(sectionSelector) {
    const sections = document.querySelectorAll(sectionSelector);
    
    if (sections.length === 0 || typeof gsap === 'undefined') return;
    
    sections.forEach((section, index) => {
        // Create background wrapper with Tailwind classes
        const backgroundWrapper = document.createElement('div');
        backgroundWrapper.className = 'absolute inset-0 opacity-0 pointer-events-none z-0 rounded-3xl border-white/16 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-[0px]';
        
        section.insertBefore(backgroundWrapper, section.firstChild);
       
        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',   
                end: 'top 60%',     
                scrub: 1.5,           
            }
        });
       
        masterTl.to(backgroundWrapper, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0);
    });
}

// Initialize animation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        applyPhaseBackgroundAnimation('.phase-bg');
    }, 100);
});




// ============================================
// TOOLS BACKGROUND IMAGE TRANSITION
// ============================================
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);
}

function applyBackgroundImageTransition(sectionSelector, imageUrl) {
    const section = document.querySelector(sectionSelector);
    
    if (!section || typeof gsap === 'undefined') return;
    
    const imageOverlay = document.createElement('div');
    imageOverlay.style.cssText = `
        position: absolute;
        inset: 0;
        opacity: 0;
        background-image: url(${imageUrl});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: bottom;
        pointer-events: none;
        z-index: 0;
        filter: blur(20px);
        transform: scale(1.1);
    `;
    
    section.insertBefore(imageOverlay, section.firstChild);
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sectionSelector,
            start: 'bottom 95%', 
            end: 'bottom 88%',  
            scrub: 2,
            markers: false 
        }
    });
    
    tl.to(imageOverlay, {
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 1,
        ease: 'power2.inOut'
    });
    
    const contentWrapper = section.querySelector('.toolswrap');
    if (contentWrapper) {
        gsap.from(contentWrapper, {
            scrollTrigger: {
                trigger: sectionSelector,
                start: 'bottom 75%',
                end: 'bottom 35%',
                scrub: 1.5
            },
            y: 30,
            opacity: 1,
            duration: 1,
            ease: 'power1.out'
        });
    }
}

applyBackgroundImageTransition('.tools-technology', 'assets/images/alltools.webp');


// video section in team page

document.addEventListener('DOMContentLoaded', function() {
    // Prothome check korbe 'team-video-section' class-ti page-e ache kina
    const videoSection = document.querySelector('.team-video-section');

    if (videoSection) {
        // Jodi class-ti thake, tobei baki elements gulo khujbe
        const playButton = document.getElementById('playButton');
        const videoThumbnail = document.getElementById('videoThumbnail');
        const videoPlayer = document.getElementById('videoPlayer');

        // Check kora bhalo j elements gulo thikmoto ache kina (Error avoid korar jonno)
        if (playButton && videoThumbnail && videoPlayer) {
            
            // Play Button Click Handler
            playButton.addEventListener('click', function() {
                playButton.classList.add('hidden-scale');
                videoThumbnail.classList.add('hidden-fade');
                
                setTimeout(() => {
                    videoPlayer.classList.add('visible');
                    videoPlayer.play();
                }, 300);
            });

            // Video Ends Handler
            videoPlayer.addEventListener('ended', function() {
                videoPlayer.classList.remove('visible');
                videoThumbnail.classList.remove('hidden-fade');
                playButton.classList.remove('hidden-scale');
            });

            // Pause Handling
            videoPlayer.addEventListener('pause', function() {
                if (videoPlayer.currentTime === 0 || videoPlayer.ended) {
                    videoPlayer.classList.remove('visible');
                    videoThumbnail.classList.remove('hidden-fade');
                    playButton.classList.remove('hidden-scale');
                }
            });
        }
    }
});




//blog tab 

// Tab Functionality
function initBlogTab() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0 || tabPanes.length === 0) return;
    
    function switchTab(tabId) {
        // Remove active class from all buttons
        tabButtons.forEach(button => {
            button.classList.remove('active');
            button.classList.add('inactive');
        });
        
        // Remove active class from all panes
        tabPanes.forEach(pane => {
            pane.classList.remove('active');
        });
        
        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
        if (activeButton) {
            activeButton.classList.remove('inactive');
            activeButton.classList.add('active');
        }
        
        // Show corresponding tab pane
        const activePane = document.getElementById(tabId);
        if (activePane) {
            activePane.classList.add('active');
            
            // Check load more button visibility when switching tabs
            checkLoadMoreButton();
        }
    }
    
    // Add click event listeners to all buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            if (tabId) {
                switchTab(tabId);
            }
        });
    });
}

// Load More Functionality
function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!loadMoreBtn) return;
    
    // Initial check
    checkLoadMoreButton();
    
    loadMoreBtn.addEventListener('click', function() {
        // Get current active tab
        const activeTab = document.querySelector('.tab-pane.active');
        if (!activeTab) return;
        
        // Get all hidden blog items in active tab
        const hiddenBlogs = activeTab.querySelectorAll('.blogitem.blog-hidden');
        
        if (hiddenBlogs.length === 0) {
            // No more items to load
            loadMoreBtn.style.display = 'none';
            return;
        }
        
        // Show next 12 items (or remaining items if less than 12)
        const itemsToShow = Math.min(12, hiddenBlogs.length);
        
        for (let i = 0; i < itemsToShow; i++) {
            const blog = hiddenBlogs[i];
            
            setTimeout(() => {
                blog.classList.remove('blog-hidden');
                blog.style.opacity = '0';
                blog.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    blog.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    blog.style.opacity = '1';
                    blog.style.transform = 'translateY(0)';
                }, 50);
            }, i * 50);
        }
        
        // Check if there are more hidden items after showing these 12
        setTimeout(() => {
            checkLoadMoreButton();
        }, itemsToShow * 50 + 500);
    });
}

// Check if load more button should be visible
function checkLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const activeTab = document.querySelector('.tab-pane.active');
    
    if (!loadMoreBtn || !activeTab) return;
    
    const hiddenBlogs = activeTab.querySelectorAll('.blogitem.blog-hidden');
    
    if (hiddenBlogs.length > 0) {
        loadMoreBtn.style.display = 'inline-flex';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initBlogTab();
    initLoadMore();
});




//terms condition and privacy policy

// Check if the wrapper exists before running the script
const termWrap = document.querySelector('.term-wrap');

if (termWrap) {
    // Table of Contents functionality
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('.content-section');

    // Smooth scroll on click
    tocLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight active section on scroll
    function updateActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Checking if current scroll position is within section bounds
            if (window.scrollY >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            updateActiveSection();
        });
    });

    // Initial call to set active section
    updateActiveSection();
}






      // career section 

      const careerSection = document.querySelector('.career');
        
        if (careerSection) {
            // Variables
            const tabButtons = document.querySelectorAll('.tab-button');
            const jobCards = document.querySelectorAll('.job-card');
            const loadMoreBtn = document.querySelector('.load-more-btn');
            const loadMoreContainer = document.querySelector('.load-more-container');
            let currentCategory = 'all';
            let visibleCount = 5;

            // Initialize - Show first 5 items
            function initializeJobs() {
                jobCards.forEach((card, index) => {
                    const cardIndex = parseInt(card.getAttribute('data-index'));
                    if (cardIndex < 5) {
                        card.classList.remove('hidden');
                        card.classList.add('show');
                    } else {
                        card.classList.add('hidden');
                        card.classList.remove('show');
                    }
                });
                checkLoadMoreButton();
            }

            // Check if Load More button should be visible
            function checkLoadMoreButton() {
                const filteredCards = Array.from(jobCards).filter(card => {
                    const cardCategory = card.getAttribute('data-category');
                    return currentCategory === 'all' || cardCategory === currentCategory;
                });

                const visibleCards = filteredCards.filter(card => !card.classList.contains('hidden'));
                
                if (visibleCards.length >= filteredCards.length) {
                    loadMoreContainer.classList.add('hidden');
                } else {
                    loadMoreContainer.classList.remove('hidden');
                }
            }

            // Tab Filter Functionality
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active', 'bg-green1', 'text-green5', 'font-bold');
                        btn.classList.add('bg-dark-shade3', 'text-white', 'font-medium');
                    });
                    
                    // Add active class to clicked button
                    button.classList.add('active', 'bg-green1', 'text-green5', 'font-bold');
                    button.classList.remove('bg-dark-shade3', 'text-white', 'font-medium');

                    // Get selected category
                    currentCategory = button.getAttribute('data-category');

                    // Reset visible count
                    visibleCount = 5;

                    // Filter job cards
                    const filteredCards = Array.from(jobCards).filter(card => {
                        const cardCategory = card.getAttribute('data-category');
                        return currentCategory === 'all' || cardCategory === currentCategory;
                    });

                    // Hide all cards first
                    jobCards.forEach(card => {
                        card.classList.add('hidden');
                        card.classList.remove('show');
                    });

                    // Show first 5 of filtered cards
                    filteredCards.slice(0, 5).forEach(card => {
                        card.classList.remove('hidden');
                        card.classList.add('show');
                    });

                    checkLoadMoreButton();
                });
            });

            // Load More Functionality
            loadMoreBtn.addEventListener('click', () => {
                const filteredCards = Array.from(jobCards).filter(card => {
                    const cardCategory = card.getAttribute('data-category');
                    const isMatch = currentCategory === 'all' || cardCategory === currentCategory;
                    return isMatch;
                });

                const hiddenCards = filteredCards.filter(card => card.classList.contains('hidden'));
                const cardsToShow = hiddenCards.slice(0, 5);

                cardsToShow.forEach(card => {
                    card.classList.remove('hidden');
                    card.classList.add('show');
                });

                visibleCount += 5;
                checkLoadMoreButton();
            });

            // Initialize on page load
            initializeJobs();
        }





        // service section scroll box counter 


        document.addEventListener('DOMContentLoaded', function() {
    const phaseItems = document.querySelectorAll('.phase-single-item');
    const counterNumber = document.querySelector('.counter-number');
    
    if (!phaseItems.length || !counterNumber) return;

    let lastActivePhase = "1";

    const updateCounter = () => {
        const triggerPoint = window.innerHeight / 2;
        let currentPhase = lastActivePhase;

        phaseItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            // If the top of the item has crossed the middle of the screen
            if (rect.top <= triggerPoint) {
                currentPhase = item.getAttribute('data-phase');
            }
        });

        if (currentPhase !== lastActivePhase) {
            lastActivePhase = currentPhase;
            
            // Animation for number change
            counterNumber.style.opacity = '0';
            counterNumber.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                counterNumber.textContent = currentPhase;
                counterNumber.style.opacity = '1';
                counterNumber.style.transform = 'translateY(0)';
            }, 150);
        }
    };

    window.addEventListener('scroll', updateCounter, { passive: true });
    window.addEventListener('resize', updateCounter);
    updateCounter(); // Initial check
});