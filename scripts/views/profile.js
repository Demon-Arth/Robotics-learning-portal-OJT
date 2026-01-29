import { auth } from '../auth.js';
import { store } from '../store.js';

export const renderProfile = async () => {
    if (!auth.isAuthenticated()) {
        window.location.hash = '/login';
        return '';
    }

    const user = auth.currentUser;
    const enrolled = user.enrolledCourses;
    
    // Stats
    const totalEnrolled = enrolled.length;
    const totalCompletedCourses = enrolled.filter(c => c.progress === 100).length;
    const totalModulesCompleted = enrolled.reduce((acc, curr) => acc + curr.completedModules.length, 0);
    const overallProgress = totalEnrolled ? Math.round(enrolled.reduce((acc, c) => acc + c.progress, 0) / totalEnrolled) : 0;
    
    // Streak
    const streak = user.streak?.count || 0;

    return `
        <div class="container" style="padding-top: 3rem; padding-bottom: 4rem;">
            <h1 class="h1" style="text-align: center; margin-bottom: 3rem;">Your Profile</h1>

            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; align-items: start;">
                
                <!-- User Card -->
                <div class="card" style="padding: 2rem; text-align: center;">
                    <div style="width: 100px; height: 100px; background: #334155; border-radius: 50%; margin: 0 auto 1.5rem; display: flex; justify-content: center; align-items: center; font-size: 3rem;">
                        👤
                    </div>
                    <h2 class="h2" style="font-size: 1.5rem; margin-bottom: 0.5rem;">${user.name}</h2>
                    <p style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 2rem;">${user.email}</p>
                    
                    <div style="text-align: left; background: #0f172a; padding: 1.5rem; border-radius: 1rem;">
                        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                            <span style="font-size: 1.5rem;">🔥</span>
                            <div>
                                <div style="font-weight: 700; font-size: 1.25rem;">${streak} Day Streak</div>
                                <div style="font-size: 0.75rem; color: #94a3b8;">Keep learning every day!</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats & Detail -->
                <div>
                    <h3 class="h3" style="margin-bottom: 1.5rem;">Learning Statistics</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 3rem;">
                        <div class="card" style="padding: 1.5rem;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: #6366f1; margin-bottom: 0.5rem;">${overallProgress}%</div>
                            <div style="color: #94a3b8;">Overall Progress</div>
                        </div>
                        <div class="card" style="padding: 1.5rem;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: #6366f1; margin-bottom: 0.5rem;">${totalCompletedCourses}</div>
                            <div style="color: #94a3b8;">Courses Completed</div>
                        </div>
                        <div class="card" style="padding: 1.5rem;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: #6366f1; margin-bottom: 0.5rem;">${totalModulesCompleted}</div>
                            <div style="color: #94a3b8;">Modules Finished</div>
                        </div>
                        <div class="card" style="padding: 1.5rem;">
                            <div style="font-size: 2.5rem; font-weight: 700; color: #6366f1; margin-bottom: 0.5rem;">${totalEnrolled}</div>
                            <div style="color: #94a3b8;">Active Enrollments</div>
                        </div>
                    </div>

                    <h3 class="h3" style="margin-bottom: 1.5rem;">Achievements</h3>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${streak >= 3 ? `
                            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid #f59e0b; padding: 0.5rem 1rem; border-radius: 9999px; color: #f59e0b; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span>🏆</span> 3 Day Streak
                            </div>
                        ` : ''}
                        ${totalCompletedCourses > 0 ? `
                             <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; padding: 0.5rem 1rem; border-radius: 9999px; color: #22c55e; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span>🎓</span> First Course Done
                            </div>
                        ` : ''}
                        ${totalEnrolled > 0 ? `
                            <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid #6366f1; padding: 0.5rem 1rem; border-radius: 9999px; color: #6366f1; font-size: 0.875rem; display: flex; align-items: center; gap: 0.5rem;">
                                <span>🚀</span> Started Journey
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
};
