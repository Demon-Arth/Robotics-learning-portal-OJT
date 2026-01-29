export class Router {
    constructor(routes) {
        this.routes = routes;
        this.appContainer = document.getElementById('app');
        window.addEventListener('hashchange', this.handleRoute.bind(this));
        window.addEventListener('load', this.handleRoute.bind(this));
    }

    async handleRoute() {
        // Simple hash routing
        let hash = window.location.hash.slice(1) || '/';
        
        // Handle params (e.g. /course/:id) - very basic implementation
        let matchedRoute = null;
        let params = {};

        for (const path in this.routes) {
            // Convert route path to regex
            // e.g. /course/:id -> ^/course/([^/]+)$
            if (path.includes(':')) {
                const routeRegex = new RegExp('^' + path.replace(/:[^\s/]+/, '([^/]+)') + '$');
                const match = hash.match(routeRegex);
                if (match) {
                    matchedRoute = path;
                    params.id = match[1]; // Assuming single param for simplicity
                    break;
                }
            } else if (path === hash) {
                matchedRoute = path;
                break;
            }
        }

        const viewRenderer = this.routes[matchedRoute] || this.routes['*'];
        
        if (viewRenderer) {
            this.appContainer.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';
            try {
                const content = await viewRenderer(params);
                this.appContainer.innerHTML = content;
                // Dispatch event for nav updates
                window.dispatchEvent(new CustomEvent('router:load', { detail: { path: hash } }));
            } catch (err) {
                console.error("View rendering error:", err);
                this.appContainer.innerHTML = '<div class="container h2">Error loading page</div>';
            }
        }
    }

    navigateTo(path) {
        window.location.hash = path;
    }
}
