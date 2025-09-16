// Navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer click en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 150; // Compensar navbar tech más alto

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar efecto a elementos específicos
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.timeline-item, .risk-item, .component-item, .faq-item, .criteria-item'
    );

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Contador animado para los porcentajes de evaluación
function animateCounters() {
    const counters = document.querySelectorAll('.criteria-percentage');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50; // Velocidad de animación

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + '%';
        }, 30);
    });
}

// Ejecutar contador cuando la sección sea visible
const criteriaSection = document.querySelector('.evaluation-criteria');
if (criteriaSection) {
    const criteriaObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                criteriaObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    criteriaObserver.observe(criteriaSection);
}

// Botón CTA con efecto
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');

    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Aquí puedes agregar la lógica para el registro
            alert('¡Redirigiendo al formulario de registro!');
            // window.location.href = 'formulario-registro.html';
        });
    }
});

// Destacar sección activa en navegación
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 160;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// FAQ Accordion (si decides implementarlo)
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item h4');

    faqItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const isOpen = content.style.display === 'block';

            // Cerrar todos los demás
            faqItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.nextElementSibling.style.display = 'none';
                    otherItem.classList.remove('active');
                }
            });

            // Toggle actual
            content.style.display = isOpen ? 'none' : 'block';
            this.classList.toggle('active');
        });
    });
}

// Función para mostrar/ocultar el botón de volver arriba
function initBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.classList.add('back-to-top');
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(102,126,234,0.4);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Efecto de escritura automática para el título
function initTypewriterEffect() {
    const title = document.querySelector('.hero-content h1');
    if (!title) return;

    const originalText = title.textContent;
    title.textContent = '';
    title.style.borderRight = '3px solid #fff3cd';
    title.style.animation = 'blink 1s infinite';

    let i = 0;
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                title.style.borderRight = 'none';
                title.style.animation = 'none';
            }, 1000);
        }
    }

    // Iniciar efecto después de un delay
    setTimeout(typeWriter, 1000);

    // CSS para el efecto de parpadeo
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: #fff3cd; }
        }
    `;
    document.head.appendChild(style);
}

// Inicializar todas las funciones
document.addEventListener('DOMContentLoaded', function() {
    initBackToTop();
    initParticleEffect();

    // Activar contador regresivo con fecha real
    const eventDate = new Date('2025-09-17T08:00:00').getTime();
    initCountdown(eventDate);

    // initFAQAccordion(); // Descomenta si quieres el efecto accordion en FAQ

    // Inicializar efecto de escritura después de cargar la página
    setTimeout(initTypewriterEffect, 500);
});