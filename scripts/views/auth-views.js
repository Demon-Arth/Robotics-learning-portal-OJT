import { auth } from '../auth.js';

export const renderLogin = async () => {
    // We attach event listeners after render in the Router, 
    // but for simple vanilla JS, we can return string and use a global delegate or a timeout.
    // Better approach: Return a container, append to it, or use a helper to attach events.
    // simpler here: Inline onsubmit or setupEvent helper in app.js
    
    // We will use a unique ID and let the router/app.js attach the listener.
    // OR we can make this logic self-contained if we return a DOM element, 
    // but router expects string currently.
    // Let's use a script tag injection or wait for DOMContentLoaded (won't work for spa nav).
    // The Router implementation handles string content. I will improve the router to handle DOM elements or setup callbacks.
    
    setTimeout(attachLoginEvents, 100);

    return `
        <div class="container" style="max-width: 400px; padding-top: 4rem;">
            <div class="card" style="padding: 2rem;">
                <h2 class="h2" style="text-align: center;">Welcome Back</h2>
                <form id="login-form" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #94a3b8;">Email</label>
                        <input type="email" name="email" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; background: #334155; border: 1px solid #475569; color: white;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #94a3b8;">Password</label>
                        <input type="password" name="password" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; background: #334155; border: 1px solid #475569; color: white;">
                    </div>
                    <div id="login-error" style="color: #ef4444; font-size: 0.875rem; display: none;"></div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Login</button>
                </form>
                <p style="text-align: center; margin-top: 1.5rem; color: #94a3b8; font-size: 0.875rem;">
                    Don't have an account? <a href="#/signup" style="color: #6366f1;">Sign up</a>
                </p>
            </div>
        </div>
    `;
};

function attachLoginEvents() {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const errorEl = document.getElementById('login-error');
        
        try {
            auth.login(formData.get('email'), formData.get('password'));
            window.location.hash = '/';
        } catch (err) {
            errorEl.textContent = err.message;
            errorEl.style.display = 'block';
        }
    });
}

export const renderSignup = async () => {
    setTimeout(attachSignupEvents, 100);

    return `
        <div class="container" style="max-width: 400px; padding-top: 4rem;">
            <div class="card" style="padding: 2rem;">
                <h2 class="h2" style="text-align: center;">Join RoboLearn</h2>
                <form id="signup-form" style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #94a3b8;">Full Name</label>
                        <input type="text" name="name" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; background: #334155; border: 1px solid #475569; color: white;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #94a3b8;">Email</label>
                        <input type="email" name="email" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; background: #334155; border: 1px solid #475569; color: white;">
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; color: #94a3b8;">Password</label>
                        <input type="password" name="password" required style="width: 100%; padding: 0.75rem; border-radius: 0.5rem; background: #334155; border: 1px solid #475569; color: white;">
                    </div>
                    <div id="signup-error" style="color: #ef4444; font-size: 0.875rem; display: none;"></div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Create Account</button>
                </form>
                <p style="text-align: center; margin-top: 1.5rem; color: #94a3b8; font-size: 0.875rem;">
                    Already have an account? <a href="#/login" style="color: #6366f1;">Login</a>
                </p>
            </div>
        </div>
    `;
};

function attachSignupEvents() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const errorEl = document.getElementById('signup-error');
        
        try {
            auth.register(formData.get('name'), formData.get('email'), formData.get('password'));
            window.location.hash = '/';
        } catch (err) {
            errorEl.textContent = err.message;
            errorEl.style.display = 'block';
        }
    });
}
