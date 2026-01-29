import { Router } from './router.js';
import { auth } from './auth.js';
import { store } from './store.js';

import { renderHome } from './views/home.js';
import { renderLogin, renderSignup } from './views/auth-views.js';
import { renderCourses } from './views/courses.js';
import { renderCourseDetail } from './views/course-detail.js';
import { renderDashboard } from './views/dashboard.js';
import { renderCoursePlayer } from './views/course-player.js';

import { renderProfile } from './views/profile.js';

const render404 = async () => `<div class="container"><h1 class="h1">404 - Page Not Found</h1></div>`;

const routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/signup': renderSignup,
    '/courses': renderCourses,
    '/course/:id': renderCourseDetail,
    '/my-courses': renderDashboard,
    '/learn/:id': renderCoursePlayer,
    '/profile': renderProfile,
    '/progress': renderProfile, // Alias for progress
    '*': render404
};

    document.addEventListener('DOMContentLoaded', () => {
    console.log('RoboLearn App Initializing...');
    const router = new Router(routes);
    
    // Listen for auth changes
    window.addEventListener('auth:login', () => updateNav());
    window.addEventListener('auth:logout', () => updateNav());
    
    updateNav();
    initTheme();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggleBtn.textContent = '☀️';
    } else {
        themeToggleBtn.textContent = '🌙';
    }
    
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        const isLight = document.body.classList.contains('light-mode');
        themeToggleBtn.textContent = isLight ? '☀️' : '🌙';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

function updateNav() {
    const nav = document.getElementById('main-nav');
    const authActions = document.getElementById('auth-actions');
    const isAuth = auth.isAuthenticated();
    
    nav.innerHTML = `
        <ul style="display: flex; gap: 1.5rem;">
            <li><a href="#/">Home</a></li>
            <li><a href="#/courses">Courses</a></li>
            ${isAuth ? `
            <li><a href="#/my-courses">My Courses</a></li>
            <li><a href="#/progress">Progress</a></li>
            ` : ''}
        </ul>
    `;
    
    if (isAuth) {
        authActions.innerHTML = `
            <div style="display: flex; align-items: center; gap: 1rem;">
                <a href="#/profile" class="text-sm" style="text-decoration: none; cursor: pointer;">Hi, ${auth.currentUser.name}</a>
                <span class="text-sm">🔥 ${auth.currentUser.streak?.count || 0}</span>
                <button id="logout-btn" class="btn btn-outline" style="padding: 0.5rem 1rem;">Logout</button>
            </div>
        `;
        document.getElementById('logout-btn').addEventListener('click', () => auth.logout());
    } else {
        authActions.innerHTML = `
            <a href="#/login" class="btn btn-outline" style="margin-right: 0.5rem;">Login</a>
            <a href="#/signup" class="btn btn-primary">Sign Up</a>
        `;
    }
}
