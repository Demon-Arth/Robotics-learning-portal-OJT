import { auth } from '../auth.js';
import { store } from '../store.js';

export const renderHome = async () => {
    const isAuth = auth.isAuthenticated();
    const user = auth.currentUser;
    const courses = store.getCourses().slice(0, 3); // Top 3 trending

    const heroSection = `
        <section class="hero" style="text-align: center; padding: 4rem 1rem; background: linear-gradient(180deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%);">
            <div class="container">
                <h1 class="h1" style="margin-bottom: 1rem;">
                    ${isAuth ? `Welcome back, ${user.name}!` : 'Unlock Your Robotics Potential'}
                </h1>
                <p class="h3" style="color: #94a3b8; margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                    ${isAuth 
                        ? 'Continue your learning journey or explore new modules below.' 
                        : 'Join thousands of students mastering Arduino, Drones, and ROS today.'}
                </p>
                ${!isAuth ? `
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <a href="#/courses" class="btn btn-primary">Browse Courses</a>
                        <a href="#/signup" class="btn btn-outline">Start for Free</a>
                    </div>
                ` : `
                    <a href="#/my-courses" class="btn btn-primary">Go to Dashboard</a>
                `}
            </div>
        </section>
    `;

    const trendingHTML = courses.map(course => `
        <div class="card">
            <div style="height: 160px; overflow: hidden;">
                <img src="${course.thumbnail}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 1.5rem;">
                <span style="font-size: 0.75rem; color: #6366f1; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${course.category}</span>
                <h3 class="h3" style="margin: 0.5rem 0; font-size: 1.25rem;">${course.title}</h3>
                <p style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 1rem;">${course.description.substring(0, 80)}...</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; font-size: 1.125rem;">₹${course.price}</span>
                    <a href="#/course/${course.id}" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.875rem;">View</a>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <div>
            ${heroSection}
            
            <section class="container" style="padding-top: 2rem; padding-bottom: 4rem;">
                <h2 class="h2">Trending Courses</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;">
                    ${trendingHTML}
                </div>
            </section>
        </div>
    `;
};
