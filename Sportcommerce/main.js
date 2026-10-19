/**
 * ==========================================================================
 * SPORTCOMMERCE - MAIN JAVASCRIPT MASTER (P1 / El Capitán)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar componentes esenciales
  initNavigation();
  initCartDrawer();
  initScrollAnimations();
});

/**
 * 1. Control del Menú Móvil y Scroll de la Navbar
 */
function initNavigation() {
  const header = document.querySelector('.main-header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  const links = document.querySelectorAll('.nav-link');

  // Ajustar tamaño navbar al hacer scroll (Efecto compactación)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Iluminación activa de links al hacer scroll
    highlightNavigation();
  });

  // Toggle Menú Móvil
  mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = navLinks.classList.toggle('active');
    
    // Cambiar icono según estado
    const icon = mobileMenuBtn.querySelector('i');
    if (isExpanded) {
      icon.className = 'fa-solid fa-xmark';
    } else {
      icon.className = 'fa-solid fa-bars';
    }
  });

  // Cerrar menú al hacer clic en un enlace (móviles)
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars';
    });
  });
}

/**
 * Detector de la sección activa al hacer scroll (Para la barra de navegación)
 */
function highlightNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100; // Offset por la navbar compacta
    const sectionId = current.getAttribute('id');
    const targetLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

    if (targetLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        targetLink.classList.add('active');
      }
    }
  });
}

/**
 * 2. Funciones del Modal Lateral del Carrito de Compras
 */
function initCartDrawer() {
  const cartBtn = document.getElementById('cartBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');

  // Funciones de apertura y cierre
  const openCart = () => cartDrawer.classList.add('active');
  const closeCart = () => cartDrawer.classList.remove('active');

  // Suscribirse a eventos de apertura/cierre
  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);

  // Escuchar tecla ESC para cerrar el carrito de forma rápida
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cartDrawer.classList.contains('active')) {
      closeCart();
    }
  });
}

/**
 * 3. Animaciones de scroll básicas y suavizado de movimientos
 * NOTA: Para las animaciones en el scroll y transiciones, la Persona 4 
 * podrá robustecer o sobrescribir esta sección en `animations.js`.
 */
function initScrollAnimations() {
  // Asegura un scroll fluido al interactuar con enlaces locales
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Espaciado adecuado por header fijo
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Puente del Contador del Carrito para los Productos (De Persona 1 hacia Persona 2)
 * Esta función es GLOBAL para que Persona 2 pueda llamarla fácilmente
 * al agregar o eliminar artículos de LocalStorage.
 */
window.actualizarBadgeCarrito = function (cantidad) {
  const badge = document.getElementById('cartBadge');
  const cartIcon = document.querySelector('.cart-toggle-btn');
  
  if (badge) {
    badge.textContent = cantidad;
    
    // Efecto de pulso / animación de inserción
    cartIcon.classList.remove('pulse-cart');
    void cartIcon.offsetWidth; // truco JS para forzar reinicio de animación
    cartIcon.classList.add('pulse-cart');
  }
};