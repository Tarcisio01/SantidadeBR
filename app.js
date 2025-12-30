// =========================================================================
// MÓDULO PRINCIPAL (app.js)
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // INICIALIZAÇÃO DO ROUTER
    // =====================================================
    if (typeof initRouter === 'function') {
        initRouter();
    } else {
        console.error(
            'Erro: initRouter não foi encontrado. Verifique se router.js foi carregado antes do app.js.'
        );
    }

    // =====================================================
    // MENU MOBILE
    // =====================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) {
        console.warn('Menu mobile não encontrado no DOM.');
        return;
    }

    // Acessibilidade básica
    mobileMenuBtn.setAttribute('aria-controls', 'mobile-menu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

    // Funções utilitárias
    const openMenu = () => {
        mobileMenu.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMenu = () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };

    const toggleMenu = () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        isHidden ? openMenu() : closeMenu();
    };

    // Clique no botão do menu
    mobileMenuBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    // Fecha ao clicar em um link do menu
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link-mobile');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Fecha ao clicar fora do menu
    document.addEventListener('click', (event) => {
        if (
            !mobileMenu.contains(event.target) &&
            !mobileMenuBtn.contains(event.target)
        ) {
            closeMenu();
        }
    });

    // Fecha o menu ao trocar de rota (SPA / hash)
    window.addEventListener('hashchange', () => {
        closeMenu();
    });

});
