# ⚡ Sportcommerce | Proyecto Landing Page para Hackathon

**Sportcommerce** es una landing page de e-commerce interactiva de alto impacto, diseñada para deportistas que buscan equiparse para sus entrenamientos de gimnasio o de casa. Cuenta con un catálogo dinámico y flexible de peso libre, accesorios y suplementación con persistencia de compras en tiempo real en LocalStorage.

Este proyecto ha sido desarrollado bajo el enfoque y rúbrica del Hackathon de 6 horas de Generation.

---

## 🎨 Paleta de Color: Heavy Iron Power
Para evocar el ambiente de entrenamiento pesado de alta intensidad, se ha seleccionado la **Opción B**:
*   `#111827` **Negro Acero** (Fondo base oscuro para enfocar los productos)
*   `#E5E7EB` **Gris Plata** (Tipografía de alta legibilidad y detalles)
*   `#E11D48` **Rojo Adrenalina** (Llamados a la Acción [CTA], alertas, logotipo)
*   `#F59E0B` **Ámbar Alerta** (Incentivador de ofertas de tiempo limitado, estrellas de valoración, notificaciones de carrito)

---

## 🏗️ Organización y Roles del Equipo
Para maximizar el avance simultáneo sin colisiones de código en Git, el equipo se ha dividido bajo el esquema de archivos exclusivos:

*   **Persona 1: El Capitán/Integrador (Capitán) 👑** 
    *   *Misión:* Desarrollo de la arquitectura base, cabecera de navegación, sección de bienvenida (Hero), drawer de carrito de compras, unión del repositorio Git, y despliegue del software.
    *   *Archivos:* `index.html`, `css/base.css`, `js/main.js`, `README.md`
*   **Persona 2: La Vitrina de Productos (Catálogo) 🏋️‍♂️**
    *   *Misión:* Creación del almacén de 8 productos, sistema de filtros categorizados, botones funcionales "Agregar al carrito" y el sistema de LocalStorage con manejo de excepciones (Try-Catch).
    *   *Archivos:* `css/products.css`, `js/products.js`
*   **Persona 3: Servicios y Urgencia ⏱️**
    *   *Misión:* Construcción de las 4 tarjetas de servicios, banner promocional con el reloj de cuenta regresiva vivo (`offers.js`) y sección de testimonios en carrusel.
    *   *Archivos:* `css/services.css`, `js/offers.js`
*   **Persona 4: Atención, Animaciones y QA 📋**
    *   *Misión:* Creación del formulario de contacto con validación robusta y captación de correos, animaciones de entrada en el scroll (Fade-in) y pruebas cross-browser y mobile (Responsive).
    *   *Archivos:* `css/contact.css`, `js/form.js`, `js/animations.js`

---

## 📂 Arquitectura de Archivos
El repositorio Git se mantiene organizado bajo la siguiente jerarquía modular:
```text
├── index.html               # Esqueleto base de secciones
├── css/
│   ├── base.css             # Varibales de paleta, estilos globales, navbar y Hero (P1)
│   ├── products.css         # Grid de productos, tarjetas, y Drawer de Carrito (P2)
│   ├── services.css         # Tarjetas de servicios y Banner de Oferta (P3)
│   └── contact.css          # Formulario, footer, y estilos de animación (P4)
├── js/
│   ├── main.js              # Controlador de navegación y drawers (P1)
│   ├── products.js          # Arreglo de catálogo, render dinámico y LocalStorage (P2)
│   ├── offers.js            # Lógica del Reloj Countdown interactivo (P3)
│   ├── form.js              # Validación de formulario y gestión de envío (P4)
│   └── animations.js        # Eventos para animaciones fluidas (P4)
└── README.md                # Documento de gestión del equipo