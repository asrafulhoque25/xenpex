
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
        document.addEventListener('DOMContentLoaded', function() {
            const videoCards = document.querySelectorAll('.video-card');

            videoCards.forEach(card => {
                const video = card.querySelector('.video-element');
                let isPlaying = false;

                // Hover In - Play Video
                card.addEventListener('mouseenter', function() {
                    if (!isPlaying) {
                        video.currentTime = 0; // Start from beginning
                        video.play().catch(err => console.log('Video play error:', err));
                        isPlaying = true;
                    }
                });

                // Hover Out - Pause Video
                card.addEventListener('mouseleave', function() {
                    if (isPlaying) {
                        video.pause();
                        video.currentTime = 0; // Reset to start
                        isPlaying = false;
                    }
                });

                // Handle video end (loop is set, but this is a fallback)
                video.addEventListener('ended', function() {
                    if (isPlaying) {
                        video.currentTime = 0;
                        video.play();
                    }
                });
            });

            // Stop all videos when slider moves
            splide.on('move', function() {
                videoCards.forEach(card => {
                    const video = card.querySelector('.video-element');
                    video.pause();
                    video.currentTime = 0;
                });
            });
        });
//video testimonial end

