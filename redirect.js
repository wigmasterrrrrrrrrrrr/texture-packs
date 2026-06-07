// Navigation controller for smooth page transitions with loading screen
const Navigator = {
    // Configuration
    config: {
        loadingPage: 'loading.html',
        validPages: ['home.html', 'texturepacks.html', 'about.html', 'index.html'],
        transitionDelay: 300 // ms before showing loading screen
    },

    // Check if page is valid
    isValidPage(page) {
        return this.config.validPages.includes(page) || page.startsWith('http');
    },

    // Navigate to a page with loading screen
    goToPage(page) {
        if (!page) {
            console.warn('Navigator: No page specified');
            return;
        }

        // External links open in new tab
        if (page.startsWith('http')) {
            window.open(page, '_blank');
            return;
        }

        // Validate internal page
        if (!this.isValidPage(page)) {
            console.warn(`Navigator: Invalid page "${page}"`);
            return;
        }

        // Show loading screen and navigate
        const encodedPage = encodeURIComponent(page);
        window.location.href = `${this.config.loadingPage}?target=${encodedPage}`;
    },

    // Direct navigation (skips loading screen)
    directTo(page) {
        if (this.isValidPage(page) || page.startsWith('http')) {
            window.location.href = page;
        } else {
            console.warn(`Navigator: Invalid page "${page}"`);
        }
    },

    // Get target from URL parameters
    getTargetFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('target');
    },

    // Navigate from loading screen to target
    loadTarget() {
        const target = this.getTargetFromUrl();
        if (target && this.isValidPage(target)) {
            window.location.href = target;
        } else {
            // Fallback to home
            window.location.href = 'home.html';
        }
    }
};

// Export for global use
window.goToPage = (page) => Navigator.goToPage(page);
window.directTo = (page) => Navigator.directTo(page);
