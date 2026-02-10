document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. LÓGICA DE TEMA (DARK / LIGHT MODE)
    // ==========================================================================
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;

    if(themeButton) {
        themeButton.addEventListener('click', () => {
            // Alternamos la clase 'light-mode' en el body
            body.classList.toggle('light-mode');
            
            // Cambiar el icono dependiendo del modo
            if(body.classList.contains('light-mode')) {
                themeButton.classList.remove('fa-circle-half-stroke');
                themeButton.classList.add('fa-sun'); // Icono de sol
            } else {
                themeButton.classList.remove('fa-sun');
                themeButton.classList.add('fa-circle-half-stroke'); // Icono original
            }
        });
    }

    // ==========================================================================
    // 2. LÓGICA DE IDIOMA (TRADUCCIONES)
    // ==========================================================================
    const langButton = document.getElementById('language-toggle');
    const textsToChange = document.querySelectorAll("[data-section]");
    const textEn = document.getElementById('lang-en');
    const textEs = document.getElementById('lang-es');

    // Objeto con todos los textos (Hero + Proyectos + Educación)
    const translations = {
        "es": {
            "hero": {
                "title": "Hola, soy <span class='typing-name'>Ignacio</span>",
                "subtitle": "<span class='code-highlight'>&lt; Hola Mundo /&gt;</span>, Programador Front End",
                "description": "Ingeniero Civil en transición al Desarrollo Web. Enfocado en construir experiencias front-end limpias, estructurales y de alto rendimiento.",
                "cv": "<i class='fa-solid fa-file-arrow-down'></i> Descargar CV"
            },
            "projects": {
                "section_title": "Mis Proyectos",
                "title_task": "Task Manager App",
                "desc_task": "Una aplicación de gestión de tareas construida con React. Permite crear, editar y eliminar tareas con persistencia de datos.",
                "title_resto": "Restaurante Vegetariano",
                "desc_resto": "Landing page responsive para un restaurante. Enfocada en UI/UX atractivo, menú interactivo y formulario de reservas.",
                "title_portfolio": "Mi Portafolio",
                "desc_portfolio": "Este sitio web diseñado desde cero con HTML semántico, CSS moderno y JavaScript para temas e internacionalización."
            },
            "education": {
                "title": "Educación",
                "ucsd_degree": "Certificado en Front End Development",
                "ucsd_desc": "Programa intensivo enfocado en tecnologías web modernas: HTML5, CSS3, JavaScript (ES6+) y React.js. Desarrollo de aplicaciones SPA y diseño responsivo.",
                "civil_degree": "Ingeniería Civil",
                "civil_desc": "Formación sólida en lógica, resolución de problemas complejos y gestión de proyectos. Habilidades transferibles al desarrollo de software y arquitectura de sistemas."
            }
        },
        "en": {
            "hero": {
                "title": "Hey, I'm <span class='typing-name'>Ignacio</span>",
                "subtitle": "<span class='code-highlight'>&lt; Hello World /&gt;</span>, Programmer Front End",
                "description": "Civil Engineer pivoting to Web Development. Focused on building clean, structural, and high-performing front-end experiences.",
                "cv": "<i class='fa-solid fa-file-arrow-down'></i> Download CV"
            },
            "projects": {
                "section_title": "My Projects",
                "title_task": "Task Manager App",
                "desc_task": "A task management application built with React. Allows creating, editing, and deleting tasks with data persistence.",
                "title_resto": "Vegetarian Restaurant",
                "desc_resto": "Responsive landing page for a restaurant. Focused on attractive UI/UX, interactive menu, and reservation form.",
                "title_portfolio": "My Portfolio",
                "desc_portfolio": "This website designed from scratch with semantic HTML, modern CSS, and JavaScript for theming and internationalization."
            },
            "education": {
                "title": "Education",
                "ucsd_degree": "Front End Development Certificate",
                "ucsd_desc": "Intensive program focused on modern web technologies: HTML5, CSS3, JavaScript (ES6+), and React.js. SPA development and responsive design.",
                "civil_degree": "Civil Engineering",
                "civil_desc": "Solid background in logic, complex problem solving, and project management. Transferable skills to software development and system architecture."
            }
        }
    };

    let currentLang = "en"; // Idioma por defecto

    if(langButton) {
        langButton.addEventListener('click', () => {
            // Cambiar el estado del idioma
            currentLang = currentLang === "en" ? "es" : "en";
            
            // Actualizar visualmente qué idioma está activo (negrita/color)
            if(currentLang === "es") {
                textEn.classList.remove('active');
                textEs.classList.add('active');
            } else {
                textEs.classList.remove('active');
                textEn.classList.add('active');
            }

            // Recorrer todos los elementos con el atributo data-section y actualizarlos
            textsToChange.forEach(el => {
                const section = el.dataset.section; // "hero", "projects" o "education"
                const value = el.dataset.value;     // ej: "title", "desc_task"

                // Verificamos si existe la traducción para evitar errores
                if (translations[currentLang][section] && translations[currentLang][section][value]) {
                    el.innerHTML = translations[currentLang][section][value];
                }
            });
        });
    }

    // ==========================================================================
    // 3. ANIMACIÓN DE SCROLL (INTERSECTION OBSERVER)
    // ==========================================================================
    
    const observerOptions = {
        root: null, // Observa el viewport (pantalla)
        rootMargin: '0px',
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Cuando el elemento entra en pantalla, le ponemos la clase 'show'
                entry.target.classList.add('show');
                
                // (Opcional) Dejar de observar para que no se anime de nuevo al subir
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Seleccionamos todos los elementos que tengan la clase 'hidden' en el HTML
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

// ==========================================================================
    // 4. COPIAR EMAIL AL PORTAPAPELES (UX PRO)
    // ==========================================================================
    const emailBtn = document.getElementById('btn-email');
    
    if(emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            // Opcional: Si prefieres que NO se abra la app de correo, descomenta la siguiente línea:
            e.preventDefault(); 

            const email = "ignacioelicetche@gmail.com";
            
            // API del Portapapeles
            navigator.clipboard.writeText(email).then(() => {
                
                // Guardamos el contenido original del botón
                const originalContent = emailBtn.innerHTML;
                
                // Feedback visual: Cambiamos el texto temporalmente
                emailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                emailBtn.style.borderColor = '#4AF626'; // Borde verde
                emailBtn.style.color = '#4AF626';      // Texto verde
                
                // Volver a la normalidad después de 2 segundos
                setTimeout(() => {
                    emailBtn.innerHTML = originalContent;
                    emailBtn.style.borderColor = ''; // Vuelve al color original del CSS
                    emailBtn.style.color = '';      // Vuelve al color original
                }, 2000);
            });
        });
    }