document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('ticketForm');
    const ticketContainer = document.getElementById('ticketContainer');
    
    // Input fields
    const fileInput = document.getElementById('fileInput');
    const fullNameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('Email');
    const usernameInput = document.getElementById('username');
    
    // Error messages
    const fileError = document.getElementById('fileError');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const usernameError = document.getElementById('usernameError');
    
    // Ticket display elements
    const ticketName = document.getElementById('ticketName');
    const ticketEmail = document.getElementById('ticketEmail');
    const ticketUserName = document.getElementById('ticketUserName');
    const ticketGithub = document.getElementById('ticketGithub');
    const ticketNumber = document.getElementById('ticketNumber');
    const ticketAvatar = document.getElementById('ticketAvatar');

    // Initialize with form visible and ticket hidden
    if (ticketContainer) {
        ticketContainer.style.display = 'none';
    }

    // File validation
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            validateFile(this.files[0]);
        });
    }

    function validateFile(file) {
        if (!fileError) return false;
        
        if (!file) {
            fileError.textContent = 'Please upload an image.';
            fileError.classList.add('show');
            return false;
        }
        
        const validTypes = ['image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            fileError.textContent = 'Only JPG or PNG files are allowed.';
            fileError.classList.add('show');
            return false;
        }
        
        if (file.size > 500000) { // 500KB
            fileError.textContent = 'File size must be less than 500KB.';
            fileError.classList.add('show');
            return false;
        }
        
        fileError.classList.remove('show');
        return true;
    }

    // Name validation
    if (fullNameInput) {
        fullNameInput.addEventListener('input', function() {
            if (!nameError) return;
            
            if (this.value.length < 3) {
                nameError.textContent = 'Name must be at least 3 characters.';
                nameError.classList.add('show');
                this.setCustomValidity('Invalid name');
            } else {
                nameError.classList.remove('show');
                this.setCustomValidity('');
            }
        });
    }

    // Email validation
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (!emailError) return;
            
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(this.value)) {
                emailError.textContent = 'Please enter a valid email address.';
                emailError.classList.add('show');
                this.setCustomValidity('Invalid email');
            } else {
                emailError.classList.remove('show');
                this.setCustomValidity('');
            }
        });
    }

    // Username validation
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            if (!usernameError) return;
            
            if (!this.value.startsWith('@') || this.value.length < 2) {
                usernameError.textContent = 'Please enter a valid GitHub username starting with @.';
                usernameError.classList.add('show');
                this.setCustomValidity('Invalid username');
            } else {
                usernameError.classList.remove('show');
                this.setCustomValidity('');
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Trigger validation for all fields
            if (fileInput && fileInput.files.length > 0) {
                validateFile(fileInput.files[0]);
            }
            
            if (fullNameInput) {
                fullNameInput.dispatchEvent(new Event('input'));
            }
            
            if (emailInput) {
                emailInput.dispatchEvent(new Event('input'));
            }
            
            if (usernameInput) {
                usernameInput.dispatchEvent(new Event('input'));
            }

            // Check if form is valid
            if (this.checkValidity()) {
                generateTicket();
            } else {
                // Focus on first invalid field
                const invalidFields = this.querySelectorAll(':invalid');
                if (invalidFields.length) {
                    invalidFields[0].focus();
                }
            }
        });
    }

    // Generate ticket with user data
    function generateTicket() {
        if (!ticketContainer || !ticketName || !ticketEmail || !ticketUserName || !ticketGithub || !ticketNumber || !ticketAvatar) {
            console.error('One or more ticket elements are missing');
            return;
        }

        // Set user data
        if (fullNameInput) ticketName.textContent = fullNameInput.value;
        if (emailInput) ticketEmail.textContent = emailInput.value;
        if (fullNameInput) ticketUserName.textContent = fullNameInput.value;
        if (usernameInput) ticketGithub.textContent = usernameInput.value;
        
        // Generate random ticket number
        const randomNum = Math.floor(Math.random() * 90000) + 10000;
        ticketNumber.textContent = `#${randomNum}`;
        
        // Set avatar if uploaded
        if (fileInput && fileInput.files.length) {
            const reader = new FileReader();
            reader.onload = function(e) {
                ticketAvatar.src = e.target.result;
            };
            reader.readAsDataURL(fileInput.files[0]);
        } else if (ticketAvatar) {
            ticketAvatar.src = './images/image-avatar.jpg';
        }
        
        // Show ticket and hide form
        if (form) form.style.display = 'none';
        if (ticketContainer) ticketContainer.style.display = 'block';
        
        // Scroll to ticket
        ticketContainer.scrollIntoView({ behavior: 'smooth' });
    }


});
