import { store } from './store.js';

class AuthManager {
    constructor() {
        this.currentUser = store.getCurrentUser();
    }

    register(name, email, password) {
        if (store.findUserByEmail(email)) {
            throw new Error("User already exists with this email.");
        }

        const newUser = {
            id: crypto.randomUUID(),
            name,
            email,
            password,
            joinedAt: new Date().toISOString(),
            enrolledCourses: [],
            cart: [],
            streak: {
                count: 0,
                lastLoginDate: null
            }
        };

        store.saveUser(newUser);
        this.login(email, password);
        return newUser;
    }

    login(email, password) {
        const user = store.findUserByEmail(email);
        if (!user) {
            throw new Error("Invalid email or password.");
        }

        if (user.password !== password) {
            throw new Error("Invalid email or password.");
        }

        this._updateStreak(user);

        store.setCurrentUser(user);
        this.currentUser = user;
        
        window.dispatchEvent(new CustomEvent('auth:login', { detail: user }));
        return user;
    }

    logout() {
        store.clearSession();
        this.currentUser = null;
        window.dispatchEvent(new CustomEvent('auth:logout'));
        window.location.reload(); 
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    _updateStreak(user) {
        const today = new Date().toISOString().split('T')[0];
        const lastLogin = user.streak.lastLoginDate;

        if (lastLogin !== today) {
            if (lastLogin) {
                 const lastDate = new Date(lastLogin);
                 const currDate = new Date(today);
                 const diffTime = Math.abs(currDate - lastDate);
                 const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

                 if (diffDays === 1) {
                     user.streak.count++;
                 } else if (diffDays > 1) {
                     user.streak.count = 1; // Reset if skipped a day
                 }
            } else {
                user.streak.count = 1; // First login
            }
            user.streak.lastLoginDate = today;
            store.saveUser(user);
        }
    }
}

export const auth = new AuthManager();
