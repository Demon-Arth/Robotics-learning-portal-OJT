import { store } from '../store.js';

export const renderCourses = async () => {
    setTimeout(attachCourseEvents, 100);

    const courses = store.getCourses();
    const categories = ['All', ...new Set(courses.map(c => c.category))];

    const categoryTabs = categories.map(cat => `
        <button class="filter-btn btn btn-outline ${cat === 'All' ? 'active' : ''}" data-category="${cat}" style="min-width: 80px;">
            ${cat}
        </button>
    `).join('');

    return `
        <div class="container" style="padding-top: 2rem;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h1 class="h1">Explore Our Courses</h1>
                <p class="h3" style="color: #94a3b8;">Find the perfect module for your skill level</p>
            </div>

            <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
                ${categoryTabs}
            </div>

            <div id="course-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; padding-bottom: 4rem;">
                ${renderCourseCards(courses)}
            </div>
        </div>
    `;
};

function renderCourseCards(courses) {
    if (courses.length === 0) {
        return '<p style="text-align: center; grid-column: 1/-1; color: #94a3b8;">No courses found.</p>';
    }

    return courses.map(course => `
        <div class="card">
            <div style="height: 180px; overflow: hidden;">
                <img src="${course.thumbnail}" alt="${course.title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div style="padding: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span style="font-size: 0.75rem; color: #6366f1; font-weight: 600; text-transform: uppercase;">${course.category}</span>
                    <span style="font-size: 0.75rem; color: #f59e0b;">★ ${course.rating}</span>
                </div>
                <h3 class="h3" style="margin: 0.5rem 0; font-size: 1.25rem;">${course.title}</h3>
                <p style="color: #94a3b8; font-size: 0.875rem; margin-bottom: 1rem;">${course.description.substring(0, 90)}...</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-weight: 600; font-size: 1.125rem;">₹${course.price}</span>
                    <a href="#/course/${course.id}" class="btn btn-outline" style="padding: 0.5rem 1rem;">Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

function attachCourseEvents() {
    const filters = document.querySelectorAll('.filter-btn');
    const grid = document.getElementById('course-grid');
    
    if (!filters.length || !grid) return;

    filters.forEach(btn => {
        btn.addEventListener('click', () => {
             // Reset active state
             filters.forEach(b => {
                 b.classList.remove('active'); 
                 b.style.borderColor = '#334155';
                 b.style.backgroundColor = 'transparent';
            });
             btn.classList.add('active');
             btn.style.borderColor = '#6366f1';
             btn.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';

             const category = btn.dataset.category;
             const allCourses = store.getCourses();
             const filtered = category === 'All' 
                ? allCourses 
                : allCourses.filter(c => c.category === category);
            
             grid.innerHTML = renderCourseCards(filtered);
        });
    });
    
    // Set initial active style manually since CSS class isn't defined for 'active' in new non-var CSS setup perfectly yet
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        activeBtn.style.borderColor = '#6366f1';
        activeBtn.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
    }
}
