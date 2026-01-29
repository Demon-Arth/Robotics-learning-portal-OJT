import { auth } from '../auth.js';
import { store } from '../store.js';

export const renderCoursePlayer = async (params) => {
    if (!auth.isAuthenticated()) {
        window.location.hash = '/login';
        return '';
    }

    setTimeout(() => attachPlayerEvents(params.id), 100);

    const course = store.getCourseById(params.id);
    const user = auth.currentUser;
    const enrollment = user.enrolledCourses.find(ec => ec.courseId === params.id);

    if (!course || !enrollment) {
        return `<div class="container h2" style="text-align: center; padding-top: 4rem;">Course enrollment not found.</div>`;
    }

    const activeModuleId = window.activeModuleId || course.modules[0].id;
    const activeModule = course.modules.find(m => m.id === activeModuleId);

    const isCompleted = enrollment.completedModules.includes(activeModuleId);

    const moduleListHTML = course.modules.map((mod, idx) => {
        const isModCompleted = enrollment.completedModules.includes(mod.id);
        const isActive = mod.id === activeModuleId;
        return `
            <div 
                class="module-item ${isActive ? 'active' : ''}" 
                data-id="${mod.id}"
                style="padding: 1rem; border-bottom: 1px solid var(--border-color); cursor: pointer; background: ${isActive ? 'var(--border-color)' : 'transparent'}; display: flex; justify-content: space-between; align-items: center;"
            >
                <div>
                    <span style="color: var(--text-muted); margin-right: 0.5rem;">${idx + 1}.</span>
                    <span style="color: ${isActive ? 'var(--text-main)' : 'var(--text-muted)'}; font-weight: ${isActive ? '600' : '400'};">${mod.title}</span>
                </div>
                ${isModCompleted ? '<span style="color: #22c55e;">✔</span>' : ''}
            </div>
        `;
    }).join('');

    return `
        <div style="display: flex; min-height: calc(100vh - 140px);">
            <!-- Sidebar -->
            <div style="width: 350px; background: var(--bg-card); border-right: 1px solid var(--border-color); display: flex; flex-direction: column;">
                <div style="padding: 1.5rem; border-bottom: 1px solid var(--border-color);">
                    <a href="#/my-courses" style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 0.5rem; display: block;">&larr; Back to Dashboard</a>
                    <h3 class="h3" style="font-size: 1.125rem;">${course.title}</h3>
                    <div style="margin-top: 0.5rem; height: 4px; background: var(--border-color); border-radius: 9999px;">
                        <div style="height: 100%; width: ${enrollment.progress}%; background: var(--primary); border-radius: 9999px;"></div>
                    </div>
                    <div style="text-align: right; font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">${enrollment.progress}% Complete</div>
                </div>
                <div style="flex: 1; overflow-y: auto;" id="module-list" class="module-list-sidebar">
                    ${moduleListHTML}
                </div>
            </div>

            <!-- Main Content -->
            <div style="flex: 1; background: var(--bg-body); display: flex; flex-direction: column;">
                <div style="flex: 1; display: flex; justify-content: center; align-items: center; background: black;">
                    <video 
                        id="video-player" 
                        controls 
                        style="width: 100%; max-height: 100%; aspect-ratio: 16/9;" 
                        src="${activeModule.videoUrl}"
                    ></video>
                </div>
                <div style="padding: 1.5rem; background: var(--bg-card); border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                    <h2 class="h2" style="margin: 0; font-size: 1.5rem;">${activeModule.title}</h2>
                    <button 
                        id="mark-complete-btn" 
                        class="btn ${isCompleted ? 'btn-outline' : 'btn-primary'}"
                        ${isCompleted ? 'disabled' : ''}
                    >
                        ${isCompleted ? 'Completed' : 'Mark as Complete'}
                    </button>
                </div>
            </div>
        </div>
    `;
};

function attachPlayerEvents(courseId) {
    const markBtn = document.getElementById('mark-complete-btn');
    const moduleItems = document.querySelectorAll('.module-item');
    
    if (markBtn) {
        markBtn.addEventListener('click', () => {
             const user = auth.currentUser;
             // Re-fetch user to ensure latest state
             const latestUser = store.getUsers().find(u => u.email === user.email);
             if (!latestUser) return; 

             const enrollment = latestUser.enrolledCourses.find(ec => ec.courseId === courseId);
             
             // Get active module ID from DOM
             const activeModuleEl = document.querySelector('.module-item.active');
             const moduleId = activeModuleEl ? activeModuleEl.dataset.id : null;
             
             if (moduleId && enrollment && !enrollment.completedModules.includes(moduleId)) {
                 enrollment.completedModules.push(moduleId);
                 
                 const course = store.getCourseById(courseId);
                 enrollment.progress = Math.round((enrollment.completedModules.length / course.modules.length) * 100);
                 
                 store.saveUser(latestUser);
                 auth.currentUser = latestUser;
                 
                 markBtn.textContent = 'Completed';
                 markBtn.disabled = true;
                 markBtn.classList.remove('btn-primary');
                 markBtn.classList.add('btn-outline');
                 
                 const sidebar = activeModuleEl.closest('.module-list-sidebar') || document.querySelector('#app > div > div:first-child');
                 if (sidebar) {
                     const progressContainer = sidebar.querySelector('div[style*="border-radius: 9999px"]');
                     const progressFill = progressContainer ? progressContainer.firstElementChild : null;
                     const progressLabel = sidebar.querySelector('div[style*="text-align: right"]');
                     
                     if (progressFill) progressFill.style.width = `${enrollment.progress}%`;
                     if (progressLabel) progressLabel.textContent = `${enrollment.progress}% Complete`;
                 }

                 if (activeModuleEl) {
                     if (!activeModuleEl.querySelector('span[style*="#22c55e"]')) {
                         const checkmark = document.createElement('span');
                         checkmark.style.color = '#22c55e';
                         checkmark.innerHTML = '✔';
                         activeModuleEl.appendChild(checkmark);
                     }
                 }
             }
        });
    }

    moduleItems.forEach(item => {
        item.addEventListener('click', () => {
            const moduleId = item.dataset.id;
            window.activeModuleId = moduleId;
            const router = new CustomEvent('hashchange'); 
            window.dispatchEvent(router);
        });
    });
}
