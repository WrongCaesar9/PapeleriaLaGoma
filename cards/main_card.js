/* Typewriter */
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('videoInvitacion');
    const texts = [
        { id: 'line1', text: 'Querida familia y amigos:' },
        { id: 'line2', text: 'Pronto dejaré atrás la niñez y abriré las alas hacia nuevos sueños.' },
        { id: 'line3', text: 'Gracias por acompañarme en este viaje.' },
        { id: 'line4', text: '<br>' },
        { id: 'line5', text: 'Ceremonia:' },
        { id: 'line6', text: 'Parroquia de San Buenaventura<br>a las 13:45 hrs' },
        { id: 'line7', text: 'Recepción:' },
        { id: 'line8', text: 'Boutique Y Regalos "Pablin"<br>a partir de las 16:00 hrs' },
        { id: 'line9', text: '<br>¡Tu presencia hará que este día sea inolvidable!' }
    ];

    let currentLine = 0;

    function typeLine() {
        if (currentLine >= texts.length) return;

        const current = texts[currentLine];
        const element = document.getElementById(current.id);
        const text = current.text;
        let index = 0;

        element.style.opacity = '1';

        function typeChar() {
            if (index < text.length) {
                // Manejar <br> como salto de línea
                if (text.substring(index, index + 4) === '<br>') {
                    element.innerHTML += '<br>';
                    index += 4;
                } else {
                    element.innerHTML += text[index];
                    index++;
                }
                setTimeout(typeChar, 50);
            } else {
                // Terminó esta línea, pasar a la siguiente
                currentLine++;
                setTimeout(typeLine, 500);
            }
        }

        typeChar();
    }

    // Esperar a que el video termine
    video.addEventListener('ended', function () {
        // Iniciar el typewriter cuando termine el video
        setTimeout(typeLine, 2500);
    });

    // Por si el video ya terminó o hay algún error
    if (video) {
        video.addEventListener('ended', startTypewriter);

        // También iniciar si el video ya terminó
        if (video.readyState >= 4 && video.currentTime >= video.duration - 0.1) {
            startTypewriter();
        }

        // Por si acaso el video falla, iniciar después de 2 segundos
        setTimeout(function () {
            if (!typewriterStarted) {
                startTypewriter();
            }
        }, 2000);

    } else {
        // Si no hay video, iniciar inmediatamente
        startTypewriter();
    }

});
/* Typewriter */



/* Carrousel 1*/
/* Reemplazo para $SELECTION_PLACEHOLDER$: inicializador que reconstruye el carrusel para un loop perfecto */

document.addEventListener('DOMContentLoaded', function () {
    // Esperar un poco para asegurarnos que el markup original ya esté presente
    setTimeout(() => {
        const gallery = document.getElementById('carouselGallery');
        if (!gallery) return;

        // Leer imágenes actuales (si existen) para reconstruir el carrusel
        const existingImgs = Array.from(gallery.querySelectorAll('.carousel-slide img'));
        if (existingImgs.length === 0) return;

        const imgs = existingImgs.map(img => ({ src: img.src, alt: img.alt || '' }));
        const n = imgs.length;

        // Construir nuevo HTML: clonamos primero y último para loop "seamless"
        const trackSlides = [];
        // clon último
        trackSlides.push(`<div class="carousel-slide"><img src="${imgs[n - 1].src}" alt="${imgs[n - 1].alt}"></div>`);
        // slides reales
        imgs.forEach(i => trackSlides.push(`<div class="carousel-slide"><img src="${i.src}" alt="${i.alt}"></div>`));
        // clon primero
        trackSlides.push(`<div class="carousel-slide"><img src="${imgs[0].src}" alt="${imgs[0].alt}"></div>`);

        gallery.innerHTML = `
                            <div class="carousel-track">
                                ${trackSlides.join('')}
                            </div>

                            <button class="carousel-btn prev" aria-label="Anterior">‹</button>
                            <button class="carousel-btn next" aria-label="Siguiente">›</button>

                            <div class="carousel-dots" aria-hidden="false"></div>
                        `;

        // Inicializar comportamiento con loop seamless
        const track = gallery.querySelector('.carousel-track');
        const slides = Array.from(gallery.querySelectorAll('.carousel-slide'));
        const btnPrev = gallery.querySelector('.carousel-btn.prev');
        const btnNext = gallery.querySelector('.carousel-btn.next');
        const dotsContainer = gallery.querySelector('.carousel-dots');

        let index = 0; // índice lógico (0..n-1) de las slides reales
        let isTransitioning = false;
        let autoplayId = null;

        // Crear dots para n slides reales
        for (let i = 0; i < n; i++) {
            const d = document.createElement('button');
            d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            d.dataset.index = i;
            d.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
            dotsContainer.appendChild(d);
        }
        const dots = Array.from(dotsContainer.children);

        // Ajustes iniciales: mover el track para mostrar la primera slide real (índice 1 en DOM por clon previo)
        function setTransition(enabled) {
            track.style.transition = enabled ? 'transform 0.5s ease' : 'none';
        }
        function updateTransform() {
            // track index = index + 1 (por clon al inicio)
            track.style.transform = `translateX(-${(index + 1) * 100}%)`;
            dots.forEach((dot, dIdx) => dot.classList.toggle('active', dIdx === index));
        }

        // Control de finalización de transición para resetear cuando saltamos a clon
        track.addEventListener('transitionstart', () => { isTransitioning = true; });
        track.addEventListener('transitionend', () => {
            isTransitioning = false;
            // Si estuvimos en el clon al principio (index === -1 -> último real)
            if (index < 0) {
                setTransition(false);
                index = n - 1;
                updateTransform();
                // forzar reflow antes de reactivar transición
                void track.offsetWidth;
                setTransition(true);
            } else if (index >= n) {
                setTransition(false);
                index = 0;
                updateTransform();
                void track.offsetWidth;
                setTransition(true);
            }
        });

        function goTo(i) {
            if (isTransitioning) return;
            index = i;
            // permitimos índices fuera de 0..n-1 para activar el efecto de clon (p.ej -1 o n)
            setTransition(true);
            updateTransform();
        }

        btnPrev.addEventListener('click', () => goTo(index - 1));
        btnNext.addEventListener('click', () => goTo(index + 1));

        dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.index))));

        // Autoplay
        function startAutoplay() {
            stopAutoplay();
            autoplayId = setInterval(() => goTo(index + 1), 4000);
        }
        function stopAutoplay() {
            if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
        }
        gallery.addEventListener('mouseenter', stopAutoplay);
        gallery.addEventListener('mouseleave', startAutoplay);

        // Touch (swipe)
        let startX = 0, moved = false;
        gallery.addEventListener('touchstart', e => {
            stopAutoplay();
            startX = e.touches[0].clientX;
            moved = false;
        }, { passive: true });
        gallery.addEventListener('touchmove', e => {
            const dx = e.touches[0].clientX - startX;
            if (Math.abs(dx) > 10) moved = true;
        }, { passive: true });
        gallery.addEventListener('touchend', e => {
            if (!moved) { startAutoplay(); return; }
            const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
            const dx = endX - startX;
            if (dx > 40) goTo(index - 1);
            else if (dx < -40) goTo(index + 1);
            startAutoplay();
        });

        // Inicializar estado
        setTransition(false);
        updateTransform(); // coloca en primer slide real
        void track.offsetWidth; // reflow
        setTransition(true);
        startAutoplay();

        // Reajustar en resize para mantener el cálculo si es necesario
        window.addEventListener('resize', () => {
            // reactivar transform basado en tamaño actual
            updateTransform();
        });
    }, 50);
});

/* Carrousel 2*/

document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('carouselGallery');
    if (!gallery) return;

    const track = gallery.querySelector('.carousel-track');
    const slides = Array.from(gallery.querySelectorAll('.carousel-slide'));
    const btnPrev = gallery.querySelector('.carousel-btn.prev');
    const btnNext = gallery.querySelector('.carousel-btn.next');
    const dotsContainer = gallery.querySelector('.carousel-dots');

    let index = 0;
    let autoplayId = null;

    // Crear dots
    slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.dataset.index = i;
        d.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
        dotsContainer.appendChild(d);
    });
    const dots = Array.from(dotsContainer.children);

    function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, dIdx) => dot.classList.toggle('active', dIdx === index));
    }

    btnPrev.addEventListener('click', () => goTo(index - 1));
    btnNext.addEventListener('click', () => goTo(index + 1));

    dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.index))));

    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        autoplayId = setInterval(() => goTo(index), 2000);
    }
    function stopAutoplay() {
        if (autoplayId) { clearInterval(autoplayId); autoplayId = null; }
    }
    gallery.addEventListener('mouseenter', stopAutoplay);
    gallery.addEventListener('mouseleave', startAutoplay);

    // Touch (swipe)
    let startX = 0, moved = false;
    gallery.addEventListener('touchstart', e => {
        stopAutoplay();
        startX = e.touches[0].clientX;
        moved = false;
    }, { passive: true });
    gallery.addEventListener('touchmove', e => {
        const dx = e.touches[0].clientX - startX;
        if (Math.abs(dx) > 10) moved = true;
    }, { passive: true });
    gallery.addEventListener('touchend', e => {
        if (!moved) { startAutoplay(); return; }
        const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX;
        const dx = endX - startX;
        if (dx > 40) goTo(index - 1);
        else if (dx < -40) goTo(index + 1);
        startAutoplay();
    });

    // Iniciar
    goTo(0);
    startAutoplay();

    // Mejora: recalcular transform si se cambia el tamaño (opcional)
    window.addEventListener('resize', () => goTo(index));


});





document.addEventListener('DOMContentLoaded', function () {
    // Esperar un poco para asegurarnos que el markup original ya esté presente
    setTimeout(() => {
        const gallery2 = document.getElementById('carouselGallery2');
        if (!gallery2) return;

        // Leer imágenes actuales (si existen) para reconstruir el carrusel
        const existingImgs2 = Array.from(gallery2.querySelectorAll('.carousel-slide2 img'));
        if (existingImgs2.length === 0) return;

        const imgs2 = existingImgs2.map(img => ({ src: img.src, alt: img.alt || '' }));
        const n2 = imgs2.length;

        // Construir nuevo HTML: clonamos primero y último para loop "seamless"
        const trackSlides2 = [];
        // clon último
        trackSlides2.push(`<div class="carousel-slide2"><img src="${imgs2[n2 - 1].src}" alt="${imgs2[n2 - 1].alt}"></div>`);
        // slides reales
        imgs2.forEach(i => trackSlides2.push(`<div class="carousel-slide2"><img src="${i.src}" alt="${i.alt}"></div>`));
        // clon primero
        trackSlides2.push(`<div class="carousel-slide2"><img src="${imgs2[0].src}" alt="${imgs2[0].alt}"></div>`);

        gallery2.innerHTML = `
            <div class="carousel-track2">
                ${trackSlides2.join('')}
            </div>

            <button class="carousel-btn2 prev2" aria-label="Anterior">‹</button>
            <button class="carousel-btn2 next2" aria-label="Siguiente">›</button>

            <div class="carousel-dots2" aria-hidden="false"></div>
        `;

        // Inicializar comportamiento con loop seamless
        const track2 = gallery2.querySelector('.carousel-track2');
        const slides2 = Array.from(gallery2.querySelectorAll('.carousel-slide2'));
        const btnPrev2 = gallery2.querySelector('.carousel-btn2.prev2');
        const btnNext2 = gallery2.querySelector('.carousel-btn2.next2');
        const dotsContainer2 = gallery2.querySelector('.carousel-dots2');

        let index2 = 0; // índice lógico (0..n-1) de las slides reales
        let isTransitioning2 = false;
        let autoplayId2 = null;

        // Crear dots para n slides reales
        for (let i = 0; i < n2; i++) {
            const d = document.createElement('button');
            d.className = 'carousel-dot2' + (i === 0 ? ' active' : '');
            d.dataset.index = i;
            d.setAttribute('aria-label', 'Ir a imagen ' + (i + 1));
            dotsContainer2.appendChild(d);
        }
        const dots2 = Array.from(dotsContainer2.children);

        // Ajustes iniciales: mover el track para mostrar la primera slide real (índice 1 en DOM por clon previo)
        function setTransition2(enabled) {
            track2.style.transition = enabled ? 'transform 0.5s ease' : 'none';
        }
        function updateTransform2() {
            // track index = index + 1 (por clon al inicio)
            track2.style.transform = `translateX(-${(index2 + 1) * 100}%)`;
            dots2.forEach((dot, dIdx) => dot.classList.toggle('active', dIdx === index2));
        }

        // Control de finalización de transición para resetear cuando saltamos a clon
        track2.addEventListener('transitionstart', () => { isTransitioning2 = true; });
        track2.addEventListener('transitionend', () => {
            isTransitioning2 = false;
            // Si estuvimos en el clon al principio (index === -1 -> último real)
            if (index2 < 0) {
                setTransition2(false);
                index2 = n2 - 1;
                updateTransform2();
                // forzar reflow antes de reactivar transición
                void track2.offsetWidth;
                setTransition2(true);
            } else if (index2 >= n2) {
                setTransition2(false);
                index2 = 0;
                updateTransform2();
                void track2.offsetWidth;
                setTransition2(true);
            }
        });

        function goTo2(i) {
            if (isTransitioning2) return;
            index2 = i;
            // permitimos índices fuera de 0..n-1 para activar el efecto de clon (p.ej -1 o n)
            setTransition2(true);
            updateTransform2();
        }

        btnPrev2.addEventListener('click', () => goTo2(index2 - 1));
        btnNext2.addEventListener('click', () => goTo2(index2 + 1));

        dots2.forEach(dot => dot.addEventListener('click', () => goTo2(Number(dot.dataset.index))));

        // Autoplay
        function startAutoplay2() {
            stopAutoplay2();
            autoplayId2 = setInterval(() => goTo2(index2 + 1), 4000);
        }
        function stopAutoplay2() {
            if (autoplayId2) { clearInterval(autoplayId2); autoplayId2 = null; }
        }
        gallery2.addEventListener('mouseenter', stopAutoplay2);
        gallery2.addEventListener('mouseleave', startAutoplay2);

        // Touch (swipe)
        let startX2 = 0, moved2 = false;
        gallery2.addEventListener('touchstart', e => {
            stopAutoplay2();
            startX2 = e.touches[0].clientX;
            moved2 = false;
        }, { passive: true });
        gallery2.addEventListener('touchmove', e => {
            const dx = e.touches[0].clientX - startX2;
            if (Math.abs(dx) > 10) moved2 = true;
        }, { passive: true });
        gallery2.addEventListener('touchend', e => {
            if (!moved2) { startAutoplay2(); return; }
            const endX = (e.changedTouches && e.changedTouches[0]) ? e.changedTouches[0].clientX : startX2;
            const dx = endX - startX2;
            if (dx > 40) goTo2(index2 - 1);
            else if (dx < -40) goTo2(index2 + 1);
            startAutoplay2();
        });

        // Inicializar estado
        setTransition2(false);
        updateTransform2(); // coloca en primer slide real
        void track2.offsetWidth; // reflow
        setTransition2(true);
        startAutoplay2();

        // Reajustar en resize para mantener el cálculo si es necesario
        window.addEventListener('resize', () => {
            // reactivar transform basado en tamaño actual
            updateTransform2();
        });
    }, 50);
});
