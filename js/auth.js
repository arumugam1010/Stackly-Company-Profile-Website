/**
 * Bizly Authentication & Session Manager
 * Handles Login, Register, Role-based Routing, and Navbar State
 */

(function () {
    const STORAGE_KEY = 'bizly_auth_user';

    // Role dashboard mapping
    const ROLE_DASHBOARDS = {
        'admin': 'admin-dashboard.html',
        'manager': 'manager-dashboard.html',
        'client': 'user-dashboard.html',
        'user': 'user-dashboard.html'
    };

    const Auth = {
        // Get currently logged-in user
        getUser: function () {
            try {
                const data = localStorage.getItem(STORAGE_KEY);
                return data ? JSON.parse(data) : null;
            } catch (e) {
                return null;
            }
        },

        // Check if user is authenticated
        isLoggedIn: function () {
            const user = this.getUser();
            return !!(user && user.email && user.role);
        },

        // Get appropriate dashboard URL for role
        getDashboardUrl: function (role) {
            const r = (role || (this.getUser() && this.getUser().role) || 'client').toLowerCase();
            return ROLE_DASHBOARDS[r] || 'user-dashboard.html';
        },

        // Perform login
        login: function (email, role, name) {
            const normalizedRole = (role || 'Client').trim();
            const user = {
                email: email.trim(),
                name: name ? name.trim() : email.split('@')[0],
                role: normalizedRole,
                roleKey: normalizedRole.toLowerCase(),
                loggedInAt: new Date().toISOString()
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            return user;
        },

        // Perform logout
        logout: function (redirectUrl) {
            localStorage.removeItem(STORAGE_KEY);
            window.location.href = redirectUrl || 'index.html';
        },

        // Password validator: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special symbol
        validatePassword: function (password) {
            if (!password || password.length < 8) {
                return { valid: false, message: 'Password must be at least 8 characters long.' };
            }
            if (!/[A-Z]/.test(password)) {
                return { valid: false, message: 'Password must include at least one uppercase letter (A-Z).' };
            }
            if (!/[a-z]/.test(password)) {
                return { valid: false, message: 'Password must include at least one lowercase letter (a-z).' };
            }
            if (!/[0-9]/.test(password)) {
                return { valid: false, message: 'Password must include at least one number (0-9).' };
            }
            if (!/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/]/.test(password)) {
                return { valid: false, message: 'Password must include at least one special symbol (!@#$%^&* etc.).' };
            }
            return { valid: true };
        },

        // Name validator (Strictly no numbers)
        validateName: function (name) {
            if (!name || !name.trim()) {
                return { valid: false, message: 'Please enter your name.' };
            }
            if (/[0-9]/.test(name)) {
                return { valid: false, message: 'Numbers are not allowed in the Name field.' };
            }
            return { valid: true };
        },

        // Phone / Number validator (Strictly no alphabets)
        validatePhone: function (phone) {
            if (!phone || !phone.trim()) {
                return { valid: false, message: 'Please enter your phone number.' };
            }
            if (/[a-zA-Z]/.test(phone)) {
                return { valid: false, message: 'Alphabets are not allowed in the Phone Number field.' };
            }
            return { valid: true };
        },

        // Email validator
        validateEmail: function (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email.trim())) {
                return { valid: false, message: 'Please enter a valid email address.' };
            }
            return { valid: true };
        },

        // Update UI based on auth state (Header Nav, Mobile Offcanvas, 404 buttons)
        syncUI: function () {
            const loggedIn = this.isLoggedIn();
            const user = this.getUser();
            const dashUrl = this.getDashboardUrl(user ? user.role : 'client');

            // 1. Guest items (Login / Register links)
            document.querySelectorAll('.auth-guest').forEach(function (el) {
                if (loggedIn) {
                    el.style.setProperty('display', 'none', 'important');
                } else {
                    el.style.removeProperty('display');
                }
            });

            // 2. User items (Dashboard button / Logout)
            document.querySelectorAll('.auth-user').forEach(function (el) {
                if (loggedIn) {
                    el.style.removeProperty('display');
                    el.classList.remove('d-none');
                } else {
                    el.style.setProperty('display', 'none', 'important');
                }
            });

            // 3. Update all Dashboard links with the user's role dashboard URL
            document.querySelectorAll('.btn-goto-dashboard, a.dashboard-link').forEach(function (el) {
                el.setAttribute('href', dashUrl);
            });

            // 4. Update 404 "Return to Dashboard" button (ONLY visible when logged in)
            document.querySelectorAll('.return-dashboard-btn').forEach(function (el) {
                if (loggedIn) {
                    el.style.display = 'inline-flex';
                    el.setAttribute('href', dashUrl);
                    el.innerHTML = '<i class="fa-solid fa-gauge me-2"></i><span>Return to Dashboard</span>';
                } else {
                    el.style.display = 'none';
                }
            });

            // 5. User badge / name display if present
            document.querySelectorAll('.auth-user-name').forEach(function (el) {
                if (user) {
                    el.textContent = user.name || user.email;
                }
            });
            document.querySelectorAll('.auth-user-role').forEach(function (el) {
                if (user) {
                    el.textContent = user.role;
                }
            });

            // 6. Bind logout buttons
            document.querySelectorAll('.btn-logout').forEach(function (el) {
                el.onclick = function (e) {
                    e.preventDefault();
                    Auth.logout('index.html');
                };
            });
        }
    };

    // Expose globally
    window.BizlyAuth = Auth;

    // Run syncUI on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            Auth.syncUI();
        });
    } else {
        Auth.syncUI();
    }
})();


// Global Strict Field Restrictions:
// 1. Name fields block all numbers (0-9).
// 2. Number / Phone fields block all alphabets (a-z, A-Z).
(function setupStrictFieldRestrictions() {
    function isNameField(el) {
        if (!el || el.tagName !== 'INPUT') return false;
        var id = (el.id || '').toLowerCase();
        var name = (el.name || '').toLowerCase();
        var ph = (el.placeholder || '').toLowerCase();
        var cls = (el.className || '').toLowerCase();
        // Exclude email and password fields
        if (id.includes('email') || name.includes('email') || ph.includes('email') ||
            id.includes('password') || name.includes('password') || ph.includes('password')) {
            return false;
        }
        return id.includes('name') || name.includes('name') || ph.includes('name') || cls.includes('name');
    }

    function isNumberField(el) {
        if (!el || el.tagName !== 'INPUT') return false;
        var type = (el.type || '').toLowerCase();
        var id = (el.id || '').toLowerCase();
        var name = (el.name || '').toLowerCase();
        var ph = (el.placeholder || '').toLowerCase();
        var cls = (el.className || '').toLowerCase();
        if (type === 'number' || type === 'tel') return true;
        return id.includes('phone') || name.includes('phone') || ph.includes('phone') || cls.includes('phone') ||
               id.includes('mobile') || name.includes('mobile') || ph.includes('mobile') ||
               id.includes('number') || name.includes('number') || ph.includes('number');
    }

    // Keydown blocking
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        var navKeys = ['Backspace', 'Tab', 'Enter', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Home', 'End'];
        if (navKeys.indexOf(e.key) !== -1) return;

        var target = e.target;
        if (isNameField(target)) {
            // Block digits
            if (/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        } else if (isNumberField(target)) {
            // Block letters
            if (/[a-zA-Z]/.test(e.key)) {
                e.preventDefault();
            }
        }
    }, true);

    // Input sanitization (handles paste, autocomplete, virtual keyboards)
    document.addEventListener('input', function (e) {
        var target = e.target;
        if (isNameField(target)) {
            var val = target.value;
            var clean = val.replace(/[0-9]/g, '');
            if (val !== clean) {
                target.value = clean;
            }
        } else if (isNumberField(target)) {
            var val = target.value;
            var clean = val.replace(/[a-zA-Z]/g, '');
            if (val !== clean) {
                target.value = clean;
            }
        }
    }, true);
})();
