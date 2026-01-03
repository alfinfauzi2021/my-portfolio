// ===== TYPING EFFECT =====
const typingTextElement = document.getElementById('typing-text');
const professions = ['Web Developer', 'UI/UX Designer', 'Tech Enthusiast', 'Problem Solver'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingTextElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentProfession.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } 
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// ===== MOBILE MENU TOGGLE =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

const hamburger = document.createElement('div');
hamburger.className = 'hamburger';
hamburger.innerHTML = '<i class="fas fa-bars"></i>';
navbar.querySelector('.container').appendChild(hamburger);

const hamburgerStyle = document.createElement('style');
hamburgerStyle.textContent = `
    .hamburger {
        display: none;
        font-size: 1.8rem;
        cursor: pointer;
        color: var(--dark-color);
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: block;
        }
        
        .nav-links {
            position: fixed;
            top: 80px;
            left: 0;
            width: 100%;
            background-color: white;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            box-shadow: 0 10px 15px rgba(0,0,0,0.1);
            transform: translateY(-150%);
            transition: transform 0.4s ease;
            z-index: 999;
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
        
        .nav-links li {
            margin: 15px 0;
        }
    }
`;
document.head.appendChild(hamburgerStyle);

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNavLink() {
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = `#${section.id}`;
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === currentSectionId) {
            item.classList.add('active');
        }
    });
}

const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-color) !important;
        background-color: rgba(37, 99, 235, 0.1) !important;
    }
`;
document.head.appendChild(activeNavStyle);

// ===== PROJECTS DATA =====
const projects = [
    {
        title: 'Website Portal PSB',
        category: 'web',
        description: 'Website simulasi pendaftaran santri baru dengan form dan dashboard admin.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
        title: 'Aplikasi To-Do List',
        category: 'web',
        description: 'Aplikasi manajemen tugas dengan fitur tambah, hapus, dan edit.',
        image: 'https://images.unsplash.com/photo-1550645612-83f5d594b671?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
];

// ===== CONTACT FORM =====
const contactInfo = document.querySelector('.contact-info');
const contactFormHTML = `
    <form id="contact-form" class="contact-form">
        <div class="form-group">
            <input type="text" id="name" placeholder="Nama Lengkap" required>
        </div>
        <div class="form-group">
            <input type="email" id="email" placeholder="Email Anda" required>
        </div>
        <div class="form-group">
            <textarea id="message" rows="5" placeholder="Pesan Anda" required></textarea>
        </div>
        <button type="submit" class="btn">Kirim Pesan</button>
        <p id="form-message" class="form-message"></p>
    </form>
`;

if (contactInfo) {
    contactInfo.insertAdjacentHTML('afterend', contactFormHTML);
}

const formStyle = document.createElement('style');
formStyle.textContent = `
    .contact-form {
        max-width: 600px;
        margin: 40px auto 0;
        background: white;
        padding: 30px;
        border-radius: 15px;
        box-shadow: var(--shadow);
    }
    
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group input,
    .form-group textarea {
        width: 100%;
        padding: 15px;
        border: 2px solid #e5e7eb;
        border-radius: 10px;
        font-size: 1rem;
        transition: var(--transition);
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
    
    .form-message {
        margin-top: 20px;
        text-align: center;
        font-weight: 600;
    }
    
    .form-message.success {
        color: #10b981;
    }
    
    .form-message.error {
        color: #ef4444;
    }
`;
document.head.appendChild(formStyle);

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('form-message');
        
        if (!name || !email || !message) {
            formMessage.textContent = 'Harap isi semua field!';
            formMessage.className = 'form-message error';
            return;
        }
        
        formMessage.textContent = `Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan membalas ke ${email} segera.`;
        formMessage.className = 'form-message success';
        
        this.reset();
        
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = 'form-message';
        }, 5000);
    });
}

// ===== SCROLL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .skill-card, .project-card').forEach(el => {
    observer.observe(el);
});

const scrollAnimationStyle = document.createElement('style');
scrollAnimationStyle.textContent = `
    section, .skill-card, .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animate, .skill-card.animate, .project-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .skill-card:nth-child(2) { transition-delay: 0.1s; }
    .skill-card:nth-child(3) { transition-delay: 0.2s; }
    .skill-card:nth-child(4) { transition-delay: 0.3s; }
`;
document.head.appendChild(scrollAnimationStyle);

// ===== CURRENT YEAR IN FOOTER =====
const footerParagraph = document.querySelector('footer p');
if (footerParagraph) {
    footerParagraph.innerHTML = footerParagraph.innerHTML.replace('2024', new Date().getFullYear());
}

// ===== INITIALIZATION =====
window.addEventListener('DOMContentLoaded', () => {
    if (typingTextElement) {
        setTimeout(typeEffect, 1000);
    }
    
    updateActiveNavLink();
    
    if (window.innerWidth > 768) {
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('animate');
        });
    }
});

window.addEventListener('scroll', updateActiveNavLink);

console.log("✅ Website script loaded successfully!");