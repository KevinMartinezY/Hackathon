/*  Módulo de Animaciones Visuales (Scroll Reveal & Smooth Scroll)*/
    // 1. Efecto Scroll Reveal para secciones
document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('section, footer');

    secciones.forEach(seccion => {
        seccion.classList.add('reveal');
    });

    function revelarAlScroll() {
        const alturaPantalla = window.innerHeight;
        const puntoDeCorte = 120;

        secciones.forEach(seccion => {
            const distanciaTop = seccion.getBoundingClientRect().top;

            if (distanciaTop < alturaPantalla - puntoDeCorte) {
                seccion.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', revelarAlScroll);
    revelarAlScroll(); 
    
    // funcion para ejecutar el formulario desde el encace de navbar
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});