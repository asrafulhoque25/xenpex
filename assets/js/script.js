
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