// Scroll doux pour la navigation interne
document.querySelectorAll('a.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Affichage dynamique de l'année dans le footer
document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    document.querySelectorAll('.current-year').forEach(el => el.textContent = year);
});

// Animation d'apparition au scroll avec options améliorées
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer toutes les sections avec la classe fade-in
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Animation pour les badges de compétences
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.skill-badge, .hexagon, .badge').forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.transition = 'all 0.3s ease';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Animation parallax pour les formes flottantes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelectorAll('.floating-shape');
    
    parallax.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Animation de typing pour le header
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-animation');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        typingElement.style.width = '0';
        typingElement.style.borderRight = '3px solid #6f42c1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                typingElement.style.width = (i + 1) * 0.6 + 'em';
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Animation du curseur qui clignote
                setInterval(() => {
                    typingElement.style.borderRight = 
                        typingElement.style.borderRight === '3px solid transparent' 
                        ? '3px solid #6f42c1' 
                        : '3px solid transparent';
                }, 750);
            }
        };
        
        setTimeout(typeWriter, 1500);
    }
});

// Message de confirmation à l'envoi du formulaire de contact (Formspree)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if(form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const data = new FormData(form);
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                formMessage.innerHTML = '<div class="alert alert-success">Merci, votre message a bien été envoyé !</div>';
                form.reset();
            } else {
                formMessage.innerHTML = '<div class="alert alert-danger">Une erreur est survenue. Merci de réessayer.</div>';
            }
        });
    }
});

// Bouton "Remonter en haut"
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Effet hover amélioré pour les cartes
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 30px rgba(111,66,193,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 16px rgba(111,66,193,0.08)';
        });
    });
});

// Fonction pour scroll smooth vers l'ancre si présente dans l'URL
function smoothScrollToHash() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    }
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', smoothScrollToHash);

// Quand le hash change (ex : bouton retour du navigateur)
window.addEventListener('hashchange', smoothScrollToHash);
