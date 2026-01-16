
document.addEventListener('DOMContentLoaded', () => {
    /* 
    ========================================
       STATE MANAGEMENT (Store)
    ========================================
    */
    const Store = {
        cart: JSON.parse(localStorage.getItem('syntax_cart')) || [],
        user: JSON.parse(localStorage.getItem('syntax_user')) || null,

        saveCart() {
            localStorage.setItem('syntax_cart', JSON.stringify(this.cart));
            UI.updateCart();
        },

        saveUser() {
            localStorage.setItem('syntax_user', JSON.stringify(this.user));
            UI.updateAuth();
        },

        addToCart(courseId) {
            if (this.cart.find(item => item.id === courseId)) {
                UI.showToast('Course already in cart!', 'info');
                return;
            }
            const course = courses.find(c => c.id === courseId);
            if (course) {
                this.cart.push(course);
                this.saveCart();
                UI.showToast(`Added ${course.title} to cart`);
                UI.openCart();
            }
        },

        removeFromCart(courseId) {
            this.cart = this.cart.filter(item => item.id !== courseId);
            this.saveCart();
            UI.renderCartItems(); // Re-render immediately
        },

        login(email) {
            // Mock Login
            this.user = { ...mockUser, email };
            this.saveUser();
            UI.showToast(`Welcome back, ${this.user.name.split(' ')[0]}!`);
            UI.closeModal();
        },

        logout() {
            this.user = null;
            this.saveUser();
            UI.showToast('Logged out successfully');
        }
    };

    /* 
    ========================================
       UI CONTROLLER
    ========================================
    */
    const UI = {
        init() {
            this.updateCart();
            this.updateAuth();
            this.setupEventListeners();
            this.setupAnimations();
        },

        // --- Cart UI ---
        updateCart() {
            const countEl = document.getElementById('cart-count');
            const totalEl = document.getElementById('cart-total');
            
            if (countEl) countEl.textContent = Store.cart.length;
            
            if (totalEl) {
                const total = Store.cart.reduce((sum, item) => {
                    const price = parseInt(item.price.replace(/[^\d]/g, ''));
                    return sum + price;
                }, 0);
                totalEl.textContent = `৳ ${total}`;
            }

            this.renderCartItems();
        },

        renderCartItems() {
            const container = document.getElementById('cart-items-container');
            if (!container) return;

            if (Store.cart.length === 0) {
                container.innerHTML = '<p class="text-center description" style="margin-top: 50px;">Your cart is empty.</p>';
                return;
            }

            container.innerHTML = Store.cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}">
                    <div style="flex: 1;">
                        <h4 style="font-size: 0.9rem; margin-bottom: 5px;">${item.title}</h4>
                        <p style="color: var(--primary); font-weight: 600; font-size: 0.9rem;">${item.price}</p>
                    </div>
                    <button class="btn btn-outline btn-sm" style="padding: 2px 8px; border: none; color: #ef4444;" onclick="removeItem(${item.id})">✖</button>
                </div>
            `).join('');

            // Bind remove events
            // Note: inline onclick="removeItem" needs global scope, simplified binding below:
            container.querySelectorAll('button').forEach((btn, idx) => {
                btn.onclick = () => Store.removeFromCart(Store.cart[idx].id);
            });
        },

        openCart() {
            document.querySelector('.cart-wrapper').classList.add('cart-active');
        },

        closeCart() {
            document.querySelector('.cart-wrapper').classList.remove('cart-active');
        },

        // --- Auth UI ---
        updateAuth() {
            const authSection = document.getElementById('auth-section');
            if (!authSection) return;

            if (Store.user) {
                authSection.innerHTML = `
                    <div class="flex items-center gap-4" style="cursor: pointer;" id="user-profile">
                        <img src="${Store.user.avatar}" alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--primary);">
                        <span style="font-weight: 500; font-size: 0.9rem; display: none; @media(min-width: 768px){display:block;}">${Store.user.name}</span>
                    </div>
                `;
                // Add logout listener
                document.getElementById('user-profile').onclick = () => {
                   if(confirm('Logout?')) Store.logout();
                };
            } else {
                authSection.innerHTML = `<button class="btn btn-primary btn-sm" id="login-btn">Login</button>`;
                // Re-bind login button
                document.getElementById('login-btn').addEventListener('click', () => this.openModal());
            }
        },

        openModal() {
            const wrapper = document.getElementById('login-modal-wrapper');
            if(wrapper) wrapper.classList.add('modal-active');
        },

        closeModal() {
            const wrapper = document.getElementById('login-modal-wrapper');
            if(wrapper) wrapper.classList.remove('modal-active');
        },

        // --- General UI ---
        showToast(message, type = 'success') {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            // Trigger reflow
            void toast.offsetWidth; 
            toast.classList.add('show');

            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },

        setupEventListeners() {
            // Cart Toggles
            const cartToggle = document.getElementById('cart-toggle');
            const closeCart = document.getElementById('close-cart');
            const cartOverlay = document.querySelector('.cart-overlay');
            
            if(cartToggle) cartToggle.addEventListener('click', () => this.openCart());
            if(closeCart) closeCart.addEventListener('click', () => this.closeCart());
            if(cartOverlay) cartOverlay.addEventListener('click', () => this.closeCart());

            // Modal Toggles
            const closeLogin = document.getElementById('close-login');
            const blurOverlay = document.getElementById('blur-overlay');
            
            if(closeLogin) closeLogin.addEventListener('click', () => this.closeModal());
            if(blurOverlay) blurOverlay.addEventListener('click', () => this.closeModal());

            // Login Form
            const loginForm = document.getElementById('login-form');
            if(loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = e.target.querySelector('input[type="email"]').value;
                    Store.login(email);
                });
            }

            // Mobile Menu
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            if (mobileBtn) {
                mobileBtn.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    if (navLinks.style.display === 'flex') {
                        navLinks.style.flexDirection = 'column';
                        navLinks.style.position = 'absolute';
                        navLinks.style.top = '70px';
                        navLinks.style.left = '0';
                        navLinks.style.width = '100%';
                        navLinks.style.backgroundColor = 'white';
                        navLinks.style.padding = '20px';
                        navLinks.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                    }
                });
            }
        },

        setupAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.card, .section h2').forEach(el => {
                el.classList.add('fade-in');
                observer.observe(el);
            });
        }
    };

    // --- Page Specific Rendering Updates (Refactored from previous main.js) ---
    
    // 1. Categories
    const categoryGrid = document.querySelector('#categories-grid');
    if (categoryGrid && typeof categories !== 'undefined') {
        categoryGrid.innerHTML = categories.map(cat => `
            <div class="card fade-in" style="text-align: center; padding: 20px; cursor: pointer;">
                <div style="font-size: 3rem; margin-bottom: 10px;">${cat.icon}</div>
                <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${cat.name}</h3>
                <p class="description" style="font-size: 0.85rem;">${cat.count}</p>
            </div>
        `).join('');
    }

    // 2. Courses Rendering (Home & All Courses)
    const populateCourses = (gridId, items) => {
        const grid = document.querySelector(gridId);
        if (!grid) return;
        
        if (items.length === 0) {
            grid.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No courses found.</p>';
            return;
        }

        grid.innerHTML = items.map(course => {
            // Check if enrolled
            const isEnrolled = false; // Mock enrollment logic based on user purchases could go here
            return `
            <a href="course-detail.html?id=${course.id}" class="card fade-in" style="display: block; text-decoration: none; color: inherit;">
                <img src="${course.image}" alt="${course.title}" class="card-img">
                <div class="card-body">
                    <span class="card-badge">${course.category}</span>
                    <h3 class="card-title">${course.title}</h3>
                    <p class="description" style="font-size: 0.9rem;">By ${course.instructor}</p>
                    <p class="description" style="font-size: 0.85rem; margin-top: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${course.description}</p>
                    <div class="flex items-center justify-between" style="margin-top: 1rem;">
                        <div>
                            <span style="font-weight: 700; color: var(--primary); font-size: 1.1rem;">FREE</span>
                        </div>
                        <div class="flex gap-4">
                             <button class="btn btn-primary btn-sm add-to-cart-btn" data-id="${course.id}" onclick="event.preventDefault(); event.stopPropagation();">Enroll</button>
                        </div>
                    </div>
                </div>
            </a>
        `}).join('');

        // Bind Add to Cart buttons
        grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // prevent navigation if inside anchor
                Store.addToCart(parseInt(btn.dataset.id));
            });
        });
    };

    if (typeof courses !== 'undefined') {
        // Home Page: Top 3
        populateCourses('#popular-courses-grid', courses.slice(0, 3));
        
        // All Courses Page
        const allGrid = document.querySelector('#all-courses-grid');
        if (allGrid) {
            populateCourses('#all-courses-grid', courses);
            
            // Search & Filter Logic
            const searchInput = document.querySelector('#course-search');
            const categoryFilter = document.querySelector('#course-category-filter');
            
            if(searchInput) {
                searchInput.addEventListener('input', (e) => {
                    const term = e.target.value.toLowerCase();
                    const filtered = courses.filter(c => c.title.toLowerCase().includes(term));
                    populateCourses('#all-courses-grid', filtered);
                });
            }
            if(categoryFilter) {
                categoryFilter.addEventListener('change', (e) => {
                    const cat = e.target.value;
                    const filtered = cat === 'all' ? courses : courses.filter(c => c.category === cat);
                    populateCourses('#all-courses-grid', filtered);
                });
            }
        }
    }

    // 3. Detail Page Rendering
    const detailContainer = document.querySelector('#course-detail-content');
    if (detailContainer && typeof courses !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = parseInt(urlParams.get('id'));
        const course = courses.find(c => c.id === courseId);

        if (course) {
            detailContainer.innerHTML = `
                <div style="background: #1f2937; color: white; padding: 60px 0;">
                    <div class="container flex" style="align-items: center; gap: 40px; flex-wrap: wrap;">
                        <div style="flex: 1;">
                            <span class="card-badge" style="background: var(--primary); color: white;">${course.category}</span>
                            <h1 style="margin-top: 10px; font-size: 2.5rem;">${course.title}</h1>
                            <p style="color: #d1d5db; font-size: 1.2rem;">${course.description}</p>
                            <p style="color: #9ca3af;">Created by <span style="color: white; font-weight: 600;">${course.instructor}</span></p>
                            <div style="margin-top: 20px;">
                                <span style="font-size: 2rem; font-weight: 700; color: var(--primary);">FREE</span>
                            </div>
                            <div class="flex gap-4" style="margin-top: 30px;">
                                <button class="btn btn-primary" id="detail-add-cart">Add to Cart</button>
                            </div>
                        </div>
                        <div style="flex: 1; min-width: 300px;">
                            <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);">
                                <iframe width="100%" height="315" src="https://www.youtube.com/embed/${course.videoId}" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="section container flex" style="gap: 40px; align-items: flex-start; flex-wrap: wrap;">
                    <div style="flex: 2; min-width: 300px;">
                        <h2 style="margin-bottom: 20px;">Course Content</h2>
                        <div style="border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
                            ${course.features.map((feature, index) => `
                                <div class="curriculum-item">
                                    <span>Module ${index + 1}: ${feature}</span>
                                    <span>▶</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div style="flex: 1; min-width: 300px; background: var(--bg-light); padding: 30px; border-radius: 12px;">
                        <h3>This Course Includes:</h3>
                        <ul style="margin-top: 20px;">
                            <li>✅ Lifetime Access</li>
                            <li>✅ Certificate of Completion</li>
                            <li>✅ 30-Day Money-Back Guarantee</li>
                        </ul>
                    </div>
                </div>
            `;
            // Bind Add to Cart
            document.getElementById('detail-add-cart').addEventListener('click', () => Store.addToCart(course.id));
        } else {
            detailContainer.innerHTML = '<div class="container section text-center"><h2>Course not found</h2></div>';
        }
    }

    // Initialize App
    UI.init();
});
