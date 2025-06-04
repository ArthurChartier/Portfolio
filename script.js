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

// Message de confirmation à l’envoi du formulaire de contact (Formspree)
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

// Animation d'apparition des sections
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
fadeEls.forEach(el => observer.observe(el));

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => card.classList.add('shadow-lg'));
    card.addEventListener('mouseleave', () => card.classList.remove('shadow-lg'));
});

// Fonction pour scroll smooth vers l'ancre si présente dans l'URL
function smoothScrollToHash() {
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({ behavior: 'smooth' });
            }, 100); // petit délai pour que le DOM soit prêt
        }
    }
}

// Au chargement de la page
document.addEventListener('DOMContentLoaded', smoothScrollToHash);

// Quand le hash change (ex : bouton retour du navigateur)
window.addEventListener('hashchange', smoothScrollToHash);