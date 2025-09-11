// Background parallax effect
(function(){
    var background = document.querySelector('.background');
    if (!background) return;
    var speed = 0.127;
    function update(){
        var y = window.scrollY * speed;
        background.style.backgroundPosition = 'center ' + (-y) + 'px';
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
})();

// Menu functionality
(function(){
    var menu = document.querySelector('.top-box');
    var toggle = document.querySelector('.menu-toggle');
    var closeBtn = document.querySelector('.menu-close');
    var backdrop = document.querySelector('.backdrop');
    if (!menu || !toggle || !backdrop) return;

    function openMenu(){
        menu.classList.add('open');
        backdrop.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        toggle.setAttribute('aria-expanded', 'true');
    }
    function closeMenu(){
        menu.classList.remove('open');
        backdrop.setAttribute('hidden', '');
        document.body.style.overflow = '';
        toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function(){
        if (menu.classList.contains('open')) { closeMenu(); } else { openMenu(); }
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function(){
        if (window.innerWidth > 900) closeMenu();
    });
})();

// Heading animation on scroll
(function(){
    var heading = document.querySelector('.heading');
    if (!heading) return;
    
    var headingText = heading.querySelector('h1');
    var headingParagraph = heading.querySelector('p');
    var headingButton = heading.querySelector('button');
    
    if (!headingText || !headingParagraph || !headingButton) return;
    
    // Initially hide the button
    headingButton.style.opacity = '0';
    headingButton.style.transform = 'translateY(20px)';
    headingButton.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Add transition to heading elements
    headingText.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    headingParagraph.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    function updateHeadingAnimation() {
        var scrollY = window.scrollY;
        var triggerPoint = 100; // Start animation after 100px scroll
        
        if (scrollY > triggerPoint) {
            // Show button
            headingButton.style.opacity = '1';
            headingButton.style.transform = 'translateY(0)';
            
            // Hide heading and paragraph
            var fadeOutProgress = Math.min((scrollY - triggerPoint) / 200, 1);
            headingText.style.opacity = 1 - fadeOutProgress;
            headingText.style.transform = 'translateY(' + (-20 * fadeOutProgress) + 'px)';
            headingParagraph.style.opacity = 1 - fadeOutProgress;
            headingParagraph.style.transform = 'translateY(' + (-20 * fadeOutProgress) + 'px)';
        } else {
            // Reset to initial state
            headingButton.style.opacity = '0';
            headingButton.style.transform = 'translateY(20px)';
            headingText.style.opacity = '1';
            headingText.style.transform = 'translateY(0)';
            headingParagraph.style.opacity = '1';
            headingParagraph.style.transform = 'translateY(0)';
        }
    }
    
    // Initial call
    updateHeadingAnimation();
    
    // Add scroll listener
    window.addEventListener('scroll', updateHeadingAnimation, { passive: true });
})();
