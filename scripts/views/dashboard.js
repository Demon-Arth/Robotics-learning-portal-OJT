import { auth } from '../auth.js';
import { store } from '../store.js';

export const renderDashboard = async () => {
    if (!auth.isAuthenticated()) {
        window.location.hash = '/login';
        return '';
    }

    const startLearningEvents = () => {
        setTimeout(() => {
            document.querySelectorAll('.btn-learn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.hash = btn.getAttribute('href');
                });
            });
        }, 100);
    };

    startLearningEvents();

    const user = auth.currentUser;
    const enrolledData = user.enrolledCourses;
    
    // Calculate Overall Progress
    const totalCourses = enrolledData.length;
    const totalProgress = enrolledData.reduce((acc, curr) => acc + (curr.progress || 0), 0);
    const overallProgress = totalCourses ? Math.round(totalProgress / totalCourses) : 0;

    const courseCards = enrolledData.map(enrollment => {
        const course = store.getCourseById(enrollment.courseId);
        if (!course) return '';
        
        return `
            <div class="card">
                <div style="height: 140px; overflow: hidden; position: relative;">
                    <img src="${course.thumbnail}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,0.6); padding: 0.5rem; color: white;">
                        <span style="font-size: 0.875rem; font-weight: 500;">${course.title}</span>
                    </div>
                </div>
                <div style="padding: 1rem;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.875rem; color: #94a3b8; margin-bottom: 0.5rem;">
                        <span>Progress</span>
                        <span>${enrollment.progress}%</span>
                    </div>
                    <div style="height: 6px; background: #334155; border-radius: 9999px; overflow: hidden; margin-bottom: 1rem;">
                        <div style="height: 100%; width: ${enrollment.progress}%; background: #22c55e; border-radius: 9999px;"></div>
                    </div>
                    <a href="#/learn/${course.id}" class="btn btn-primary btn-learn" style="width: 100%; padding: 0.5rem; font-size: 0.875rem;">Continue Learning</a>
                </div>
            </div>
        `;
    }).join('');

    return `
        <div class="container" style="padding-top: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: end; margin-bottom: 2rem;">
                <div>
                    <h1 class="h1">My Dashboard</h1>
                    <p class="h3" style="color: #94a3b8;">Welcome back, ${user.name}</p>
                </div>
                <div style="background: #1e293b; padding: 1rem; border-radius: 0.75rem; border: 1px solid #334155;">
                    <div style="font-size: 0.875rem; color: #94a3b8;">Overall Progress</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #6366f1;">${overallProgress}%</div>
                </div>
            </div>

            ${enrolledData.length === 0 ? `
                <div style="text-align: center; padding: 4rem; background: #1e293b; border-radius: 1rem; border: 1px solid #334155;">
                    <h2 class="h2">You haven't enrolled in any courses yet.</h2>
                    <a href="#/courses" class="btn btn-primary" style="margin-top: 1rem;">Browse Courses</a>
                </div>
            ` : `
                <h2 class="h2" style="margin-bottom: 1.5rem;">Enrolled Courses</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem;">
                    ${courseCards}
                </div>
            `}
        </div>
    `;
};
