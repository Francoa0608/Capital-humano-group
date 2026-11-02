/* Medición de botones para Google Analytics 4 (ID G-51VP3W7R5L).
   No se envían datos personales: solo qué botón se toca y en qué página. */
(function () {
    window.chgTrack = function (name, params) {
        try {
            if (window.gtag) gtag('event', name, Object.assign({ transport_type: 'beacon' }, params || {}));
        } catch (e) {}
    };

    function txt(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60); }

    document.addEventListener('click', function (e) {
        var el = e.target.closest && e.target.closest('a, button');
        if (!el) return;
        var pagina = (location.pathname.split('/').pop() || 'index.html');
        var href = el.getAttribute('href') || '';

        // Botones "Contratar Pack 1 / 2 / 3"
        if (el.classList.contains('btn-pack')) {
            chgTrack('click_contratar_pack', { pack: txt(el), pagina: pagina });
        }
        // Cualquier botón o enlace que abre WhatsApp
        if (/wa\.me|whatsapp\.com/.test(href)) {
            var boton = el.classList.contains('wa-float') ? 'Botón flotante' : (txt(el) || el.id);
            chgTrack('click_whatsapp', { boton: boton, pagina: pagina });
            return;
        }
        if (/postulate\.html/.test(href)) { chgTrack('click_postulate', { boton: txt(el), pagina: pagina }); return; }
        if (/pack-ideal\.html/.test(href)) { chgTrack('click_pack_ideal', { boton: txt(el), pagina: pagina }); return; }
        if (/^mailto:/.test(href)) { chgTrack('click_email', { pagina: pagina }); return; }

        // "Mediciones e Indicadores" dentro de cada pack
        if (el.classList.contains('accordion-trigger-btn')) {
            var card = el.closest('.pack-card');
            var h = card && card.querySelector('h3');
            chgTrack('ver_mediciones', { pack: h ? txt(h) : '', pagina: pagina });
        }
    }, true);
})();
