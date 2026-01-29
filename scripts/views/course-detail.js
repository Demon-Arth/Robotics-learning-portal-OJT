import { store } from '../store.js';
import { auth } from '../auth.js';

export const renderCourseDetail = async (params) => {
    setTimeout(attachDetailEvents, 100);

    const course = store.getCourseById(params.id);
    if (!course) {
        return `<div class="container h2" style="text-align: center; padding-top: 4rem;">Course not found</div>`;
    }

    const isEnrolled = auth.currentUser?.enrolledCourses.some(ec => ec.courseId === course.id);
    const inCart = auth.currentUser?.cart.includes(course.id);

    return `
        <div class="container" style="padding-top: 2rem; padding-bottom: 4rem;">
            <a href="#/courses" style="color: #94a3b8; margin-bottom: 1rem; display: inline-block;">&larr; Back to Courses</a>
            
            <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; margin-top: 1rem;">
                <!-- Main Content -->
                <div>
                    <h1 class="h1" style="margin-bottom: 1rem;">${course.title}</h1>
                    <p style="font-size: 1.125rem; color: #94a3b8; margin-bottom: 2rem;">${course.description}</p>
                    
                    <div style="margin-bottom: 2rem;">
                         <img src="${course.thumbnail}" alt="${course.title}" style="width: 100%; border-radius: 1rem;">
                    </div>

                    <h2 class="h2">Curriculum</h2>
                    <div style="background: #1e293b; border-radius: 1rem; overflow: hidden; border: 1px solid #334155;">
                        ${course.modules.map((mod, idx) => `
                            <div style="padding: 1rem 1.5rem; border-bottom: 1px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 1rem;">
                                    <span style="color: #94a3b8;">${idx + 1}</span>
                                    <span>${mod.title}</span>
                                </div>
                                <span style="font-size: 0.875rem; color: #94a3b8;">${mod.duration}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div>
                    <div class="card" style="padding: 2rem; position: sticky; top: 100px;">
                        <h3 class="h3" style="margin-bottom: 1rem;">₹${course.price}</h3>
                        <ul style="margin-bottom: 2rem; color: var(--text-muted); font-size: 0.875rem;">
                            <li style="margin-bottom: 0.5rem;">✓ Full lifetime access</li>
                            <li style="margin-bottom: 0.5rem;">✓ Access on mobile and TV</li>
                            <li style="margin-bottom: 0.5rem;">✓ Certificate of completion</li>
                        </ul>
                        ${getActionButtons(course, isEnrolled, inCart)}
                    </div>
                </div>
            </div>
        </div>
    `;
};

function getActionButtons(course, isEnrolled, inCart) {
    if (!auth.isAuthenticated()) {
        return `<a href="#/login" class="btn btn-primary" style="width: 100%;">Login to Enroll</a>`;
    }

    if (isEnrolled) {
        return `<a href="#/my-courses" class="btn btn-primary" style="width: 100%;">Go to Course</a>`;
    }

    if (inCart) {
        return `<button class="btn btn-outline" style="width: 100%;" disabled>Added to Cart</button>`;
    }

    return `
        <button id="buy-btn" class="btn btn-primary" style="width: 100%;" data-id="${course.id}">Enroll Now</button>
    `;
}

function attachDetailEvents() {
    const buyBtn = document.getElementById('buy-btn');
    if (!buyBtn) return;

    buyBtn.addEventListener('click', () => {
        const courseId = buyBtn.dataset.id;
        const user = auth.currentUser;
        
        if (!user.enrolledCourses.find(c => c.courseId === courseId)) {
            user.enrolledCourses.push({
                courseId: courseId,
                progress: 0,
                completedModules: [],
                purchaseDate: new Date().toISOString()
            });
            store.saveUser(user);
            store.setCurrentUser(user);
            alert('Enrolled successfully!');
            window.location.hash = '/my-courses';
        }
    });
}
