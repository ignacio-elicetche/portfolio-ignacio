document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. Theme Logic (Dark / Light Mode)
       ========================================= */
    const themeButton = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            body.classList.toggle('light-mode');

            // Toggle icon between sun and moon
            if (body.classList.contains('light-mode')) {
                themeButton.classList.replace('fa-circle-half-stroke', 'fa-sun');
            } else {
                themeButton.classList.replace('fa-sun', 'fa-circle-half-stroke');
            }
        });
    }


    /* =========================================
       2. Localization (i18n)
       ========================================= */
    const langButton = document.getElementById('language-toggle');
    const textsToChange = document.querySelectorAll("[data-section]");
    const textEn = document.getElementById('lang-en');
    const textEs = document.getElementById('lang-es');

    // Translation Dictionary
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
                "civil_desc": "Formación sólida en lógica, resolución de problemas complejos y gestión de proyectos. Habilidades transferibles al desarrollo de software y arquitectura de sistemas.",
                "bachelor_degree": "Licenciatura en Ciencias de la Ingeniería",
                 "bachelor_desc": "Formación fundamental en matemáticas avanzadas, física y mecánica estructural."
            }
        },
        "en": {
            "hero": {
                "title": "Hey, I'm <span class='typing-name'>Ignacio</span>",
                "subtitle": "<span class='code-highlight'>&lt; Hello World /&gt;</span>, Front End Developer",
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
                "civil_desc": "Solid background in logic, complex problem solving, and project management. Transferable skills to software development and system architecture.",
                "bachelor_degree": "Bachelor of Engineering Sciences",
                 "bachelor_desc": "Foundational training in advanced mathematics, physics, and structural mechanics."
            }
        }
    };

    let currentLang = "en";

    if (langButton) {
        langButton.addEventListener('click', () => {
            // Toggle language state
            currentLang = currentLang === "en" ? "es" : "en";

            // Update UI indicators
            if (currentLang === "es") {
                textEn.classList.remove('active');
                textEs.classList.add('active');
            } else {
                textEs.classList.remove('active');
                textEn.classList.add('active');
            }

            // Update text content based on data attributes
            textsToChange.forEach(el => {
                const section = el.dataset.section;
                const value = el.dataset.value;

                // Safe navigation to prevent errors if key is missing
                if (translations[currentLang][section]?.[value]) {
                    el.innerHTML = translations[currentLang][section][value];
                }
            });
        });
    }


    /* =========================================
       3. Scroll Reveal Animation
       ========================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger animation when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // observer.unobserve(entry.target); // Optional: Trigger only once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));


    /* =========================================
       4. Email Clipboard Feature (UX)
       ========================================= */
    const emailBtn = document.getElementById('btn-email');

    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent opening default mail client

            const email = "ignacioelicetche@gmail.com";

            navigator.clipboard.writeText(email).then(() => {
                const originalContent = emailBtn.innerHTML;

                // Visual feedback for user
                emailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                emailBtn.style.borderColor = '#4AF626';
                emailBtn.style.color = '#4AF626';

                // Reset button state after 2 seconds
                setTimeout(() => {
                    emailBtn.innerHTML = originalContent;
                    emailBtn.style.borderColor = '';
                    emailBtn.style.color = '';
                }, 2000);
            });
        });
    }

});