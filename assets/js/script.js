
// Add this to mobile-menu.js or create desktop-dropdown.js

document.addEventListener('DOMContentLoaded', function() {
    const desktopDropdown = document.querySelector('.desktop-dropdown');
    const dropdownIcon = document.querySelector('.desktop-dropdown-icon');
    
    if (desktopDropdown && dropdownIcon) {
        // Optional: Add click toggle support
        desktopDropdown.addEventListener('mouseenter', function() {
            dropdownIcon.textContent = '−'; // or use '–' for en-dash
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

    // Open mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', function(e) {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle dropdown toggles
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parent = this.parentElement;
            const submenu = parent.querySelector('.mobile-submenu');
            
            if (submenu) {
                e.preventDefault();
                parent.classList.toggle('active');
            } else {
                // Close menu when clicking regular links
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Close menu on window resize to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});



// navbar end




//banner start

// GSAP Timeline with 3s delay
// Check if the class exists, then run animation
const checkAndAnimate = () => {
  const svgElement = document.querySelector('.banner-line-shape');
  
  if (svgElement) {
    // Get all horizontal and vertical lines
    const horizontalLines = svgElement.querySelectorAll('rect:not([transform])');
    const verticalLines = svgElement.querySelectorAll('rect[transform*="rotate"]');
    
    // GSAP Timeline with 1s delay
    const tl = gsap.timeline({
      delay: 1,
      defaults: {
        ease: "power2.inOut"
      }
    });
    
    // Horizontal lines - left to right
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
    
    // Vertical lines - bottom to top
    tl.fromTo(verticalLines,
      {
        scaleY: 0,
        transformOrigin: "center top" // TOP থেকে animation start
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
// Run on page load
window.addEventListener('load', checkAndAnimate);


//bg and 3d shape animation start

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("mousemove", function(event) {
        var x = (event.clientX / window.innerWidth) - 0.5;
        var y = (event.clientY / window.innerHeight) - 0.5;

        // Background animation
        gsap.to('.banner', {
            duration: 0.6,
            rotationY: 5 * x,
            rotationX: 5 * y,
            ease: "power1.out",
            transformPerspective: 500,
            transformOrigin: "center"
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const banner = document.querySelector('.banner');
    const shape = document.querySelector('.shape-3d');
    
  
    const setBannerRotationY = gsap.quickSetter(banner, "rotationY", "deg");
    const setBannerRotationX = gsap.quickSetter(banner, "rotationX", "deg");
    
    const setShapeX = gsap.quickSetter(shape, "x", "px");
    const setShapeY = gsap.quickSetter(shape, "y", "px");
    const setShapeRotationY = gsap.quickSetter(shape, "rotationY", "deg");
    const setShapeRotationX = gsap.quickSetter(shape, "rotationX", "deg");
    const setShapeRotationZ = gsap.quickSetter(shape, "rotationZ", "deg");
    const setShapeScale = gsap.quickSetter(shape, "scale");

    gsap.ticker.add(() => {
        // Smooth interpolation
        gsap.to(shape, {
            duration: 0.3,
            overwrite: true
        });
    });

    document.addEventListener("mousemove", function(event) {
        const x = (event.clientX / window.innerWidth) - 0.5;
        const y = (event.clientY / window.innerHeight) - 0.5;
        
        // Banner animation
        gsap.to(banner, {
            duration: 0.6,
            rotationY: 5 * x,
            rotationX: 5 * y,
            ease: "power1.out"
        });
        
        // Shape animation - smooth
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
//banner end



//video testimonial start
 
  const splide = new Splide('#video-slider', {
    type: 'loop',
    drag: 'free',
    focus: 'center',
    perPage: 5,
    gap: '0px',
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
        1024: { perPage: 3 },
        768: { perPage: 2 },
        640: { perPage: 1 }
    }
});

splide.mount(window.splide.Extensions);

        // Video Hover Animation Logic
       // Video Hover Animation Logic
document.addEventListener('DOMContentLoaded', function() {
    const videoCards = document.querySelectorAll('.video-card');

    // Preload and prepare videos immediately on page load
    videoCards.forEach(card => {
        const video = card.querySelector('.video-element');
        
        // Set video properties for better autoplay compatibility
        video.muted = true; // Important for autoplay policy
        video.setAttribute('playsinline', '');
        video.load(); // Preload the video
        
        let isPlaying = false;

        // Hover In - Play Video
        card.addEventListener('mouseenter', function() {
            if (!isPlaying) {
                video.currentTime = 0;
                video.muted = true; // Ensure muted
                video.play().catch(err => {
                    console.log('Video play error:', err);
                    // Fallback: try playing after a brief delay
                    setTimeout(() => {
                        video.play().catch(e => console.log('Retry failed:', e));
                    }, 100);
                });
                isPlaying = true;
            }
        });

        // Hover Out - Pause Video
        card.addEventListener('mouseleave', function() {
            if (isPlaying) {
                video.pause();
                video.currentTime = 0;
                isPlaying = false;
            }
        });

        // Handle video end
        video.addEventListener('ended', function() {
            if (isPlaying) {
                video.currentTime = 0;
                video.play();
            }
        });
    });

    // Stop all videos when slider moves
    if (typeof splide !== 'undefined') {
        splide.on('move', function() {
            videoCards.forEach(card => {
                const video = card.querySelector('.video-element');
                video.pause();
                video.currentTime = 0;
            });
        });
    }
});
//video testimonial end





//  work progress start
gsap.registerPlugin(ScrollTrigger);

// Only run on devices 1024px and above
if (window.innerWidth >= 1024) {
    const path = document.querySelector("#draw-path");
    if (path) {
        const pathLength = path.getTotalLength();

        // Initial Stroke setup
        gsap.set(path, { 
            strokeDasharray: pathLength, 
            strokeDashoffset: pathLength 
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".work-progress",
                start: "top 80%",         
                end: "bottom 20%",
                toggleActions: "play none none none"
            }
        });

        // 1. Line Drawing Animation
        tl.to(path, {
            strokeDashoffset: 0,
            duration: 4,
            ease: "power1.inOut"
        })
        // 2. Content Stagger Animation
        .to(".process-item", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.7, 
            ease: "power2.out"
        }, 0.5); 
    }
}

// work progress end




// overview counter start
if (document.querySelector('.overview-counter')) {
    gsap.registerPlugin(ScrollTrigger);

    const counters = document.querySelectorAll('.counter');

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

// overview counter end



// testimonial start
    document.addEventListener('DOMContentLoaded', function () {
            // Initialize Splide
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

            // Custom arrow controls
            const prevArrow = document.getElementById('prev-arrow');
            const nextArrow = document.getElementById('next-arrow');

            prevArrow.addEventListener('click', function() {
                splide.go('<');
            });

            nextArrow.addEventListener('click', function() {
                splide.go('>');
            });
        });
// testimonial end



// faq start
  document.addEventListener('DOMContentLoaded', function() {
            const faqItems = document.querySelectorAll('.faq-item');
            
            // Initialize all items as closed first
            faqItems.forEach((item) => {
                const answer = item.querySelector('.faq-answer');
                gsap.set(answer, { height: 0 });
            });

            // Then open the first item
            const firstItem = faqItems[0];
            const firstAnswer = firstItem.querySelector('.faq-answer');
            const firstBorder = firstItem.querySelector('.green-border');
            const firstIcon = firstItem.querySelector('.plus-icon');
            
            gsap.set(firstAnswer, { height: 'auto' });
            gsap.set(firstBorder, { opacity: 1 });
            gsap.set(firstIcon, { rotation: 45 });

            // Click handler
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                const answer = item.querySelector('.faq-answer');
                const border = item.querySelector('.green-border');
                const icon = item.querySelector('.plus-icon');
                
                question.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    
                    // Close all items
                    faqItems.forEach(otherItem => {
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherBorder = otherItem.querySelector('.green-border');
                        const otherIcon = otherItem.querySelector('.plus-icon');
                        
                        otherItem.classList.remove('active');
                        gsap.to(otherAnswer, {
                            height: 0,
                            duration: 0.4,
                            ease: 'power2.inOut'
                        });
                        gsap.to(otherBorder, {
                            opacity: 0,
                            duration: 0.3
                        });
                        gsap.to(otherIcon, {
                            rotation: 0,
                            duration: 0.3,
                            ease: 'power2.inOut'
                        });
                    });
                    
                    // If clicked item wasn't active, open it
                    if (!isActive) {
                        item.classList.add('active');
                        gsap.to(answer, {
                            height: 'auto',
                            duration: 0.4,
                            ease: 'power2.inOut'
                        });
                        gsap.to(border, {
                            opacity: 1,
                            duration: 0.3
                        });
                        gsap.to(icon, {
                            rotation: 45,
                            duration: 0.3,
                            ease: 'power2.inOut'
                        });
                    }
                });
            });
        });
// faq end






// cta start
gsap.registerPlugin(ScrollTrigger);

// Function to apply gradient animation to any section
function applyGradientAnimation(sectionSelector) {
  const section = document.querySelector(sectionSelector);
  
  if (!section) return; // section na thakle return
  
  // Multiple gradient layers for depth
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

  // Master timeline
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionSelector,
      start: 'top 75%',
      end: 'top 25%',
      scrub: 2,
      // markers: true
    }
  });

  // Layer 1 - Blur glow effect
  masterTl.to(gradientOverlay1, {
    opacity: 0.6,
    scale: 1.1,
    duration: 1,
    ease: 'power2.inOut'
  }, 0);

  // Layer 2 - Main gradient
  masterTl.to(gradientOverlay2, {
    opacity: 1,
    backgroundPosition: '50% 8%',
    duration: 1,
    ease: 'power2.inOut'
  }, 0);

  // Content gentle lift
  const contentWrapper = section.querySelector('.cta-wrap, .teamwrap, .workprocess-wrap  > div');
  if (contentWrapper) {
    masterTl.from(contentWrapper, {
      y: 25,
      opacity: 0.85,
      duration: 1,
      ease: 'power1.out'
    }, 0.2);
  }
}

// Apply animation to multiple sections
applyGradientAnimation('.cta-section');
applyGradientAnimation('.teamsection');
applyGradientAnimation('.work-progress');
// applyGradientAnimation('.career-section');
// cta end



// tools animaiton bg start
gsap.registerPlugin(ScrollTrigger);

function applyBackgroundImageTransition(sectionSelector, imageUrl) {
  const section = document.querySelector(sectionSelector);
  
  if (!section) {
    console.warn(`Section not found: ${sectionSelector}`);
    return;
  }
  

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
      opacity: 0.8,
      duration: 1,
      ease: 'power1.out'
    });
  }
}


applyBackgroundImageTransition('.tools-technology', 'assets/images/alltools.webp');
// tools animation bg end