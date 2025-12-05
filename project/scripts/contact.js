// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function () {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    // Error elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Input elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (!name) {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            emailError.textContent = 'Email is required';
            emailError.style.display = 'block';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        } else {
            emailError.style.display = 'none';
            return true;
        }
    }

    function validatePhone() {
        const phone = phoneInput.value.trim();
        // Basic phone validation - allows various formats
        if (phone && !/^[\d\s\-\+\(\)]{10,}$/.test(phone)) {
            phoneError.textContent = 'Please enter a valid phone number';
            phoneError.style.display = 'block';
            return false;
        } else {
            phoneError.style.display = 'none';
            return true;
        }
    }

    function validateSubject() {
        const subject = subjectInput.value;
        if (!subject) {
            subjectError.textContent = 'Please select a subject';
            subjectError.style.display = 'block';
            return false;
        } else {
            subjectError.style.display = 'none';
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (!message) {
            messageError.textContent = 'Message is required';
            messageError.style.display = 'block';
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageError.style.display = 'block';
            return false;
        } else {
            messageError.style.display = 'none';
            return true;
        }
    }

    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    subjectInput.addEventListener('change', validateSubject);
    messageInput.addEventListener('blur', validateMessage);

    // Clear errors on input
    nameInput.addEventListener('input', function () {
        nameError.style.display = 'none';
    });

    emailInput.addEventListener('input', function () {
        emailError.style.display = 'none';
    });

    phoneInput.addEventListener('input', function () {
        phoneError.style.display = 'none';
    });

    subjectInput.addEventListener('change', function () {
        subjectError.style.display = 'none';
    });

    messageInput.addEventListener('input', function () {
        messageError.style.display = 'none';
    });


    // FAQ Modal Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    const faqModal = document.getElementById('faqModal');
    const modalQuestion = document.getElementById('modal-question');
    const modalAnswer = document.getElementById('modal-answer');
    const closeBtn = faqModal.querySelector('.close');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', function () {
            // Fill modal with content
            modalQuestion.textContent = question.textContent.replace('+', '').trim();
            modalAnswer.textContent = answer.textContent.trim();

            // Show modal
            faqModal.style.display = 'flex';
        });
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', function () {
        faqModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === faqModal) {
            faqModal.style.display = 'none';
        }
    });

});



