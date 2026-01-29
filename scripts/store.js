import { MOCK_COURSES } from './data.js';

const KEYS = {
    USERS: 'rtp_users',
    CURRENT_USER: 'rtp_currentUser',
    COURSES: 'rtp_courses'
};

class StorageManager {
    constructor() {
        this.init();
    }

    init() {
        if (!localStorage.getItem(KEYS.COURSES)) {
            console.log('Seeding initial course data...');
            localStorage.setItem(KEYS.COURSES, JSON.stringify(MOCK_COURSES));
        }

        if (!localStorage.getItem(KEYS.USERS)) {
            localStorage.setItem(KEYS.USERS, JSON.stringify([]));
        }
    }

    getCourses() {
        return JSON.parse(localStorage.getItem(KEYS.COURSES) || '[]');
    }

    getCourseById(id) {
        const courses = this.getCourses();
        return courses.find(c => c.id === id);
    }

    getUsers() {
        return JSON.parse(localStorage.getItem(KEYS.USERS) || '[]');
    }

    saveUser(user) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.email === user.email);
        if (index >= 0) {
            users[index] = user;
        } else {
            users.push(user);
        }
        localStorage.setItem(KEYS.USERS, JSON.stringify(users));
        
        const currentUser = this.getCurrentUser();
        if (currentUser && currentUser.email === user.email) {
             localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
        }
    }

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem(KEYS.CURRENT_USER));
    }

    setCurrentUser(user) {
        localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    }

    clearSession() {
        localStorage.removeItem(KEYS.CURRENT_USER);
    }
}

export const store = new StorageManager();
