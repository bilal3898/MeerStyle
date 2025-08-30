// Global Variables
let currentStep = 1;
const totalSteps = 4;
let selectedGarment = null;
let orderData = {
    garment: null,
    measurements: {},
    customization: {},
    customer: {},
    total: 0
};

// Password Toggle Functionality
function togglePassword(fieldId = 'password') {
    const passwordField = document.getElementById(fieldId);
    let eyeIcon;
    
    if (fieldId === 'password') {
        eyeIcon = document.getElementById('eyeIcon') || document.getElementById('eyeIcon1');
    } else if (fieldId === 'confirmPassword') {
        eyeIcon = document.getElementById('eyeIcon2');
    } else {
        eyeIcon = document.getElementById('eyeIcon');
    }
    
    if (passwordField && eyeIcon) {
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        }
    }
}

// Password Strength Checker
function checkPasswordStrength(password) {
    const strengthIndicator = document.getElementById('passwordStrength');
    if (!strengthIndicator) return;
    
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Update visual indicator
    strengthIndicator.className = 'password-strength';
    if (strength <= 2) {
        strengthIndicator.classList.add('weak');
    } else if (strength <= 4) {
        strengthIndicator.classList.add('medium');
    } else if (strength <= 5) {
        strengthIndicator.classList.add('strong');
    } else {
        strengthIndicator.classList.add('very-strong');
    }
}

// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Password strength checker
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
});

// Custom Order Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('customOrderForm');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextStep);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevStep);
    }
    
    if (form) {
        form.addEventListener('submit', handleOrderSubmit);
    }
    
    // Garment Selection
    const garmentCards = document.querySelectorAll('.garment-card');
    garmentCards.forEach(card => {
        card.addEventListener('click', function() {
            garmentCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            selectedGarment = {
                type: this.dataset.type,
                price: parseInt(this.dataset.price),
                name: this.querySelector('h3').textContent
            };
            
            orderData.garment = selectedGarment;
            updateOrderSummary();
        });
    });
    
    // Fabric Selection
    const fabricCards = document.querySelectorAll('.fabric-card');
    fabricCards.forEach(card => {
        card.addEventListener('click', function() {
            fabricCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            orderData.customization.fabric = {
                type: this.dataset.fabric,
                price: parseInt(this.dataset.price) || 0,
                name: this.querySelector('span').textContent
            };
            
            updateOrderSummary();
        });
    });
    
    // Color Selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            
            orderData.customization.color = this.dataset.color;
        });
    });
    
    // Addon Options
    const addonCheckboxes = document.querySelectorAll('.addon-label input[type="checkbox"]');
    addonCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const price = parseInt(this.dataset.price) || 0;
            const name = this.parentElement.querySelector('.addon-info span').textContent;
            
            if (this.checked) {
                if (!orderData.customization.addons) {
                    orderData.customization.addons = [];
                }
                orderData.customization.addons.push({ name, price });
            } else {
                if (orderData.customization.addons) {
                    orderData.customization.addons = orderData.customization.addons.filter(
                        addon => addon.name !== name
                    );
                }
            }
            
            updateOrderSummary();
        });
    });
    
    // Priority Selection
    const prioritySelect = document.getElementById('priority');
    if (prioritySelect) {
        prioritySelect.addEventListener('change', function() {
            updateOrderSummary();
        });
    }
});

function nextStep() {
    if (!validateCurrentStep()) {
        return;
    }
    
    if (currentStep < totalSteps) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('completed');
        
        // Show next step
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
        
        // Update navigation buttons
        updateNavigationButtons();
        
        // Special handling for step 4 (review)
        if (currentStep === 4) {
            updateOrderSummary();
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.getElementById(`step${currentStep}`).classList.remove('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show previous step
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('completed');
        
        // Update navigation buttons
        updateNavigationButtons();
    }
}

function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            if (!selectedGarment) {
                alert('Please select a garment type to continue.');
                return false;
            }
            break;
        case 2:
            const requiredMeasurements = ['chest', 'waist', 'shoulders', 'sleeves', 'neck', 'height'];
            const missingMeasurements = requiredMeasurements.filter(field => {
                const input = document.getElementById(field);
                return !input || !input.value.trim();
            });
            
            if (missingMeasurements.length > 0) {
                alert('Please fill in all required measurements to continue.');
                return false;
            }
            
            // Store measurements
            requiredMeasurements.forEach(field => {
                const input = document.getElementById(field);
                if (input) {
                    orderData.measurements[field] = input.value;
                }
            });
            break;
        case 3:
            if (!orderData.customization.fabric) {
                alert('Please select a fabric to continue.');
                return false;
            }
            if (!orderData.customization.color) {
                alert('Please select a color to continue.');
                return false;
            }
            break;
    }
    return true;
}

function updateNavigationButtons() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Show/hide previous button
    if (currentStep === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-flex';
    }
    
    // Show/hide next and submit buttons
    if (currentStep === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-flex';
    } else {
        nextBtn.style.display = 'inline-flex';
        submitBtn.style.display = 'none';
    }
}

function updateOrderSummary() {
    const orderItemsContainer = document.getElementById('orderItems');
    const totalPriceElement = document.getElementById('totalPrice');
    
    if (!orderItemsContainer || !totalPriceElement) return;
    
    let total = 0;
    let itemsHTML = '';
    
    // Base garment
    if (orderData.garment) {
        total += orderData.garment.price;
        itemsHTML += `
            <div class="order-item">
                <span class="item-name">${orderData.garment.name}</span>
                <span class="item-price">$${orderData.garment.price}.00</span>
            </div>
        `;
    }
    
    // Fabric upgrade
    if (orderData.customization.fabric && orderData.customization.fabric.price > 0) {
        total += orderData.customization.fabric.price;
        itemsHTML += `
            <div class="order-item">
                <span class="item-name">${orderData.customization.fabric.name} Upgrade</span>
                <span class="item-price">$${orderData.customization.fabric.price}.00</span>
            </div>
        `;
    }
    
    // Addons
    if (orderData.customization.addons) {
        orderData.customization.addons.forEach(addon => {
            total += addon.price;
            itemsHTML += `
                <div class="order-item">
                    <span class="item-name">${addon.name}</span>
                    <span class="item-price">$${addon.price}.00</span>
                </div>
            `;
        });
    }
    
    // Priority upgrade
    const prioritySelect = document.getElementById('priority');
    if (prioritySelect && prioritySelect.value) {
        const priorityPrices = { rush: 200, express: 400 };
        const priorityPrice = priorityPrices[prioritySelect.value] || 0;
        if (priorityPrice > 0) {
            total += priorityPrice;
            const priorityName = prioritySelect.options[prioritySelect.selectedIndex].text;
            itemsHTML += `
                <div class="order-item">
                    <span class="item-name">${priorityName}</span>
                    <span class="item-price">$${priorityPrice}.00</span>
                </div>
            `;
        }
    }
    
    orderItemsContainer.innerHTML = itemsHTML;
    totalPriceElement.textContent = `$${total}.00`;
    orderData.total = total;
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    // Collect customer information
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    
    if (!customerName || !customerEmail || !customerPhone || !address || !city) {
        alert('Please fill in all customer information fields.');
        return;
    }
    
    // Store customer data
    orderData.customer = {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: address,
        city: city
    };
    
    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.classList.add('loading');
    submitBtn.textContent = 'Processing...';
    
    // Simulate order processing
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        
        // Show success message
        alert(`Thank you ${customerName}! Your custom order has been received. 
        
Order Details:
- Item: ${orderData.garment.name}
- Total: $${orderData.total}.00
- Delivery: ${document.getElementById('deliveryDate').value || 'Standard timing'}

We will contact you within 24 hours to schedule your first fitting appointment. You will receive a confirmation email shortly.`);
        
        // Redirect to home page
        window.location.href = 'index.html';
    }, 2000);
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const email = formData.get('email') || this.querySelector('input[type="email"]').value;
            const phone = formData.get('phone') || this.querySelector('input[type="tel"]').value;
            const message = formData.get('message') || this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate sending
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
                
                alert(`Thank you ${name}! Your message has been sent successfully. We will get back to you within 24 hours.`);
                this.reset();
            }, 1500);
        });
    }
});

// Login Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!email || !password) {
                alert('Please fill in both email and password.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            
            // Simulate login
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
                
                alert('Login successful! Welcome back to MeerStyle.');
                window.location.href = 'index.html';
            }, 1500);
        });
    }
});

// Register Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const terms = document.querySelector('input[name="terms"]').checked;
            
            // Validation
            if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Phone validation
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (!phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))) {
                alert('Please enter a valid phone number.');
                return;
            }
            
            // Password validation
            if (password.length < 8) {
                alert('Password must be at least 8 characters long.');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }
            
            if (!terms) {
                alert('Please accept the Terms of Service and Privacy Policy.');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            
            // Simulate registration
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
                
                alert(`Welcome to MeerStyle, ${firstName}! Your account has been created successfully. You can now sign in and start your custom order.`);
                window.location.href = 'login.html';
            }, 2000);
        });
    }
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Animate Elements on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .featured-item, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .featured-item, .about-content, .contact-content');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    // Set minimum date for delivery
    const deliveryDateInput = document.getElementById('deliveryDate');
    if (deliveryDateInput) {
        const today = new Date();
        today.setDate(today.getDate() + 21); // Minimum 3 weeks from now
        deliveryDateInput.min = today.toISOString().split('T')[0];
        deliveryDateInput.value = today.toISOString().split('T')[0];
    }
});

// Social Login Handlers
document.addEventListener('DOMContentLoaded', function() {
    const googleBtns = document.querySelectorAll('.btn-google');
    const facebookBtns = document.querySelectorAll('.btn-facebook');
    
    googleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Google login integration would be implemented here. For demo purposes, this redirects to the main page.');
            window.location.href = 'index.html';
        });
    });
    
    facebookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Facebook login integration would be implemented here. For demo purposes, this redirects to the main page.');
            window.location.href = 'index.html';
        });
    });
});

// Form Enhancement Functions
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,3})/, '($1) $2');
    }
    input.value = value;
}

// Add phone formatting to phone inputs
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    });
});

// Measurement validation
function validateMeasurement(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (value < min || value > max) {
        input.style.borderColor = '#ef4444';
        return false;
    } else {
        input.style.borderColor = '#10b981';
        return true;
    }
}

// Add measurement validation
document.addEventListener('DOMContentLoaded', function() {
    const measurementInputs = document.querySelectorAll('#step2 input[type="number"]');
    measurementInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value) {
                validateMeasurement(this);
            }
        });
    });
});

// Enhanced error handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    const form = document.querySelector('.auth-form, .order-form, .contact-form');
    if (form) {
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    const form = document.querySelector('.auth-form, .order-form, .contact-form');
    if (form) {
        form.insertBefore(successDiv, form.firstChild);
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}