/* Módulo de Formulario de Contacto y Validación - Iron Forge */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inyectar dinámicamente el HTML del formulario en el contenedor #contacto
    const contactoContainer = document.getElementById('contacto');

    if (contactoContainer) {
        contactoContainer.innerHTML = `
            <div class="container py-4">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center mb-4">
                        <h2 class="text-uppercase fw-bold text-warning mb-2">Contacto & Asesoría</h2>
                        <p class="text-muted">¿Dudas sobre tu equipamiento ideal? Escríbenos y un especialista responderá a la brevedad.</p>
                    </div>
                </div>
                
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-6">
                        <div class="card bg-black border-secondary p-4 shadow-lg rounded-4">
                            
                            <!-- Contenedor dinámico para alertas de validación -->
                            <div id="formAlertContainer"></div>

                            <form id="contactForm" novalidate>
                                <div class="mb-3">
                                    <label for="nombre" class="form-label text-light">Nombre Completo</label>
                                    <input type="text" class="form-control bg-dark text-light border-secondary" id="nombre" placeholder="Ej. Carlos Santana" required>
                                    <div class="invalid-feedback">Por favor, ingresa tu nombre.</div>
                                </div>

                                <div class="mb-3">
                                    <label for="email" class="form-label text-light">Correo Electrónico</label>
                                    <input type="email" class="form-control bg-dark text-light border-secondary" id="email" placeholder="correo@ejemplo.com" required>
                                    <div class="invalid-feedback">Por favor, ingresa un correo electrónico válido.</div>
                                </div>

                                <div class="mb-4">
                                    <label for="mensaje" class="form-label text-light">Mensaje o Requerimiento</label>
                                    <textarea class="form-control bg-dark text-light border-secondary" id="mensaje" rows="4" placeholder="Cuéntanos qué equipamiento o asesoría buscas..." required></textarea>
                                    <div class="invalid-feedback">El mensaje no puede estar vacío.</div>
                                </div>

                                <button type="submit" class="btn btn-warning w-100 fw-bold text-uppercase py-3 text-dark bg-orange-custom">
                                    Enviar Mensaje
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // 2. Inicializar lógica de validación
        initFormValidation();
    }
});

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formAlertContainer = document.getElementById('formAlertContainer');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            const nombreInput = document.getElementById('nombre');
            const emailInput = document.getElementById('email');
            const mensajeInput = document.getElementById('mensaje');

            let esValido = true;

            // Validar Nombre
            if (nombreInput.value.trim() === '') {
                marcarError(nombreInput);
                esValido = false;
            } else {
                marcarExito(nombreInput);
            }

            // Validar Email (Expresión Regular)
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(emailInput.value.trim())) {
                marcarError(emailInput);
                esValido = false;
            } else {
                marcarExito(emailInput);
            }

            // Validar Mensaje
            if (mensajeInput.value.trim() === '') {
                marcarError(mensajeInput);
                esValido = false;
            } else {
                marcarExito(mensajeInput);
            }

            // Notificación al usuario
            if (esValido) {
                mostrarAlerta('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.', 'success', formAlertContainer);
                contactForm.reset();
                [nombreInput, emailInput, mensajeInput].forEach(input => input.classList.remove('is-valid'));
            } else {
                mostrarAlerta('Por favor, completa correctamente todos los campos obligatorios.', 'danger', formAlertContainer);
            }
        });
    }
}

function marcarError(elemento) {
    elemento.classList.add('is-invalid');
    elemento.classList.remove('is-valid');
}

function marcarExito(elemento) {
    elemento.classList.remove('is-invalid');
    elemento.classList.add('is-valid');
}

function mostrarAlerta(mensaje, tipo, contenedor) {
    contenedor.innerHTML = `
        <div class="alert alert-${tipo} alert-dismissible fade show mb-4" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;

    setTimeout(() => {
        const alerta = contenedor.querySelector('.alert');
        if (alerta) {
            alerta.classList.remove('show');
            setTimeout(() => alerta.remove(), 300);
        }
    }, 4000);
}