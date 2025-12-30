// =========================================================================
// MÓDULO DE RENDERIZAÇÃO E ROTEAMENTO (router.js)
// =========================================================================

const appContent = document.getElementById('app-content');

// =========================================================================
// HELPER: UNIFICAÇÃO DE DADOS
// =========================================================================

// Função para obter todos os dados combinados (Santos + Novos Cadastros)
// Garante que, se novosCadastros não estiver definido ainda, não quebre o código.
function getAllData() {
    const mainData = (typeof santosData !== 'undefined') ? santosData : {};
    const extraData = (typeof novosCadastros !== 'undefined') ? novosCadastros : {};
    return { ...mainData, ...extraData };
}

// =========================================================================
// LÓGICA DO CARROSSEL (SLIDESHOW)
// =========================================================================

let heroImages = [];
let sliderIntervalId = null;
let currentImageIndex = 0;
const slideDuration = 8000; 

function initializeHeroImages() {
    // Lista manual das imagens que você solicitou
    // Certifique-se de que elas estão dentro da pasta "Imagens"
    const imagensDoSlider = [
        './Imagens/brasao.png',
        './Imagens/brasA.png',
        './Imagens/Manual.png', // Nova imagem adicionada
    ];
    
    // Inicializa o array heroImages apenas se ele estiver vazio
    if (heroImages.length === 0) {
        heroImages = imagensDoSlider;
    }
}

function startHeroSlider() {
    // 1. Limpa o intervalo anterior (se houver)
    if (sliderIntervalId) {
        clearInterval(sliderIntervalId);
    }

    const sliderContainer = document.getElementById('hero-slider');
    
    // Inicializa as imagens (agora usando a lista fixa)
    initializeHeroImages();

    if (!sliderContainer || heroImages.length === 0) return;

    // 2. Cria e injeta todos os elementos de imagem no contêiner
    // Classes w-full, h-full e object-cover garantem que a imagem ocupe o slider todo
    sliderContainer.innerHTML = heroImages.map((url, index) => 
        `<img 
            src="${url}" 
            alt="Imagem de Fundo ${index + 1}" 
            class="slider-image w-full h-full object-cover object-center absolute inset-0" 
            data-index="${index}"
        >`
    ).join('');
    
    const imageElements = Array.from(sliderContainer.querySelectorAll('.slider-image'));
    if (imageElements.length === 0) return;

    currentImageIndex = 0;
    
    // 3. Função para alternar as imagens
    function nextSlide() {
        // Remove a classe 'active' da imagem atual
        imageElements.forEach(img => img.classList.remove('active'));
        
        // Calcula o próximo índice
        currentImageIndex = (currentImageIndex + 1) % imageElements.length;
        
        // Adiciona a classe 'active' à próxima imagem
        imageElements[currentImageIndex].classList.add('active');
    }

    // Define a primeira imagem como ativa
    imageElements[currentImageIndex].classList.add('active');

    // 4. Inicia o temporizador
    sliderIntervalId = setInterval(nextSlide, slideDuration);
}

// =========================================================================
// FUNÇÕES DE RENDERIZAÇÃO
// =========================================================================

function renderHomePage() {
    const allData = getAllData();
    // Tenta pegar o destaque, ou usa o primeiro item disponível como fallback
    const destaque = allData.freigalvao || Object.values(allData)[0];
    
    // Fallback caso não haja dados carregados
    if (!destaque) return '<div class="text-center py-20">Carregando dados...</div>';

    return `
        <section id="home" class="hero-background-container h-[70vh] flex items-center justify-center text-center fade-in relative overflow-hidden">
             
             <div id="hero-slider" class="absolute inset-0 z-0">
                 </div>
             
             <div class="absolute inset-0 bg-black bg-opacity-40 z-0"></div>

            <div class="relative z-10 max-w-4xl px-4 sm:px-6 lg:px-8">
                <h1 class="text-6xl sm:text-7xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                    A Santidade Inspira o Brasil
                </h1>
                <p class="text-xl sm:text-2xl text-gray-200 mb-10 font-medium max-w-2xl mx-auto drop-shadow-lg">
                    Explore as vidas inspiradoras de Santos, Beatos, Veneráveis e Servos de Deus.
                </p>
                <a href="#saint/freigalvao" class="btn-primary bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl transition duration-300 transform hover:scale-105 px-8 py-3 rounded-full font-bold">
                    DESCUBRA O SANTO DESTAQUE
                </a>
            </div>
        </section>

        <section class="py-16 bg-white responsive-padding">
            <div class="container mx-auto">
                <h2 class="heading-secondary text-center text-indigo-800 mb-12 text-3xl font-bold">
                    Caminhos da Fé
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="card-hover bg-white rounded-xl shadow-xl p-6 text-center border-t-4 border-indigo-500 cursor-pointer transform transition hover:-translate-y-2" onclick="window.location.hash='#santos'">
                        <h3 class="text-xl font-bold mb-2 text-gray-900">Santos</h3>
                        <p class="text-sm text-gray-600 mb-4">Canonizados, exemplo máximo de fé.</p>
                        <span class="text-indigo-600 font-bold text-sm">Ver Lista &rarr;</span>
                    </div>

                    <div class="card-hover bg-white rounded-xl shadow-xl p-6 text-center border-t-4 border-yellow-500 cursor-pointer transform transition hover:-translate-y-2" onclick="window.location.hash='#beatos'">
                        <h3 class="text-xl font-bold mb-2 text-gray-900">Beatos</h3>
                        <p class="text-sm text-gray-600 mb-4">Dignos de veneração em locais específicos.</p>
                        <span class="text-yellow-600 font-bold text-sm">Ver Lista &rarr;</span>
                    </div>

                    <div class="card-hover bg-white rounded-xl shadow-xl p-6 text-center border-t-4 border-gray-500 cursor-pointer transform transition hover:-translate-y-2" onclick="window.location.hash='#veneraveis'">
                        <h3 class="text-xl font-bold mb-2 text-gray-900">Veneráveis</h3>
                        <p class="text-sm text-gray-600 mb-4">Virtudes heroicas reconhecidas.</p>
                        <span class="text-gray-600 font-bold text-sm">Ver Lista &rarr;</span>
                    </div>

                    <div class="card-hover bg-white rounded-xl shadow-xl p-6 text-center border-t-4 border-red-500 cursor-pointer transform transition hover:-translate-y-2" onclick="window.location.hash='#servos'">
                        <h3 class="text-xl font-bold mb-2 text-gray-900">Servos de Deus</h3>
                        <p class="text-sm text-gray-600 mb-4">Início do processo de canonização.</p>
                        <span class="text-red-600 font-bold text-sm">Ver Lista &rarr;</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-16 bg-indigo-50 responsive-padding">
            <div class="container mx-auto">
                <h2 class="heading-secondary text-center text-indigo-800 mb-12 text-3xl font-bold">Destaque: Santo do Mês</h2>
                <div class="flex flex-col md:flex-row items-center bg-white rounded-xl shadow-2xl overflow-hidden">
                    <div class="md:w-1/3 h-full">
                        <img src="${destaque.imagem}" alt="Imagem de ${destaque.nome}" class="w-full h-full object-cover min-h-[300px]">
                    </div>
                    <div class="md:w-2/3 p-8 md:p-12">
                        <h3 class="text-3xl md:text-4xl font-extrabold text-indigo-700 mb-2">${destaque.nome}</h3>
                        <span class="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold px-3 py-1 rounded-full mb-6">${destaque.titulo}</span>
                        <div class="text-lg text-gray-700 mb-6 line-clamp-4">${destaque.bio.substring(0, 200)}...</div>
                        <a href="#saint/freigalvao" class="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition">
                            Ler Biografia Completa 
                            <svg class="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderListPage(title, color, categorySlug) {
    const allData = getAllData();

    // Filtra combinando todos os dados disponíveis
    const items = Object.entries(allData)
        .filter(([slug, data]) => data.categoria === categorySlug)
        .map(([slug, data]) => ({
            slug,
            ...data
        }));

    // HTML Seção Vazia
    if (items.length === 0) {
        return `
            <section id="${categorySlug}" class="py-12 md:py-20 bg-gray-50 min-h-[60vh] fade-in flex flex-col items-center justify-center">
                <div class="text-center max-w-2xl px-4">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-${color}-800 mb-6">${title}</h1>
                    <p class="text-xl text-gray-600 mb-8">Nenhum registro encontrado nesta categoria no momento.</p>
                    <a href="#home" class="inline-block px-6 py-3 bg-${color}-600 text-white rounded-lg hover:bg-${color}-700 transition">← Voltar para o Início</a>
                </div>
            </section>
        `;
    }

    // HTML Cards
    const cardsHtml = items.map(item => `
        <div class="card-hover bg-white rounded-xl shadow-lg border-t-4 border-${item.cor}-500 overflow-hidden flex flex-col h-full">
            <div class="p-6 text-center flex-grow flex flex-col items-center">
                <div class="w-32 h-32 mb-4 relative">
                    <img src="${item.imagem}" alt="${item.nome}" class="w-32 h-32 rounded-full object-cover border-4 border-${item.cor}-100 shadow-md">
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-1 leading-tight">${item.nome}</h3>
                <p class="text-sm text-${item.cor}-600 font-medium mb-4 uppercase tracking-wide">${item.titulo}</p>
                
                <div class="mt-auto">
                    <a href="#saint/${item.slug}" class="inline-block px-5 py-2 text-sm font-semibold text-white bg-${item.cor}-600 rounded-full hover:bg-${item.cor}-700 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Ler História
                    </a>
                </div>
            </div>
        </div>
    `).join('');

    return `
        <section id="${categorySlug}" class="py-12 md:py-20 bg-gray-50 min-h-[80vh] fade-in">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="text-center mb-12">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-${color}-800 mb-4">${title}</h1>
                    <div class="w-24 h-1 bg-${color}-500 mx-auto rounded"></div>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${cardsHtml}
                </div>
                
                <div class="mt-16 text-center">
                    <a href="#home" class="inline-flex items-center text-gray-600 font-semibold hover:text-${color}-700 transition duration-300">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Voltar para a Página Inicial
                    </a>
                </div>
            </div>
        </section>
    `;
}

// =========================================================================
// FUNÇÃO DE RENDERIZAÇÃO DE PÁGINA DE DETALHES
// =========================================================================

function renderSaintDetailPage(slug) {
    const allData = getAllData();
    const santo = allData[slug];

    if (!santo) {
        return `
            <section class="py-20 text-center container mx-auto px-4 min-h-[80vh] fade-in flex flex-col items-center justify-center">
                <h2 class="text-4xl font-bold text-gray-400 mb-4">Registro Não Encontrado</h2>
                <p class="text-gray-500 mb-8">O santo ou beato que você procura não está em nossa base de dados.</p>
                <a href="#home" class="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">Voltar ao Início</a>
            </section>
        `;
    }

    // --- Blocos Condicionais (Renderiza apenas se existir conteúdo) ---

    // 1. Milagres
    const milagresHtml = (santo.milagres && santo.milagres.length > 0) ? `
        <div class="mb-10">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="w-2 h-8 bg-${santo.cor}-500 mr-3 rounded-full"></span>
                Milagres Reconhecidos
            </h2>
            <ul class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-3">
                ${santo.milagres.map(m => `
                    <li class="flex items-start text-gray-700">
                        <svg class="w-5 h-5 text-${santo.cor}-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        <span>${m}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    ` : '';

    // 2. Relíquias
    const reliquiasHtml = santo.reliquias ? `
        <div class="mb-10">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="w-2 h-8 bg-${santo.cor}-500 mr-3 rounded-full"></span>
                Relíquias
            </h2>
            <div class="bg-gray-50 p-6 rounded-xl border-l-4 border-${santo.cor}-400 text-gray-700 italic">
                ${santo.reliquias}
            </div>
        </div>
    ` : '';

    // 3. Oração
    const oracaoHtml = santo.oracao ? `
        <div class="mb-10">
            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span class="w-2 h-8 bg-${santo.cor}-500 mr-3 rounded-full"></span>
                Oração Oficial
            </h2>
            <div class="p-8 bg-${santo.cor}-50 rounded-2xl shadow-inner border border-${santo.cor}-100 relative">
                <svg class="absolute top-4 left-4 w-8 h-8 text-${santo.cor}-200 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01712C7.91255 16 7.01712 16.8954 7.01712 18V21H2.01712V6.00002C2.01712 4.34316 3.36027 3.00002 5.01712 3.00002H19.0171C20.674 3.00002 22.0171 4.34316 22.0171 6.00002V21H14.017ZM12.017 18H9.01712V21H12.017V18Z"></path></svg>
                <div class="relative z-10 text-gray-800 leading-loose text-lg font-serif whitespace-pre-line text-center px-4">
                    ${santo.oracao}
                </div>
            </div>
        </div>
    ` : '';


    return `
        <section class="py-12 md:py-20 bg-white min-h-[80vh] fade-in">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                
                <nav class="text-sm font-medium mb-8 flex items-center flex-wrap">
                    <a href="#home" class="text-gray-500 hover:text-indigo-600 transition">Início</a>
                    <svg class="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <a href="#${santo.categoria}" class="text-gray-500 hover:text-indigo-600 capitalize transition">${santo.categoria}</a>
                    <svg class="w-4 h-4 mx-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                    <span class="text-${santo.cor}-600 font-bold truncate">${santo.nome}</span>
                </nav>

                <div class="border-b border-gray-100 pb-6 mb-10">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-2">${santo.nome}</h1>
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <p class="text-xl text-${santo.cor}-600 font-semibold">${santo.titulo}</p>
                        ${santo.data ? `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">📅 ${santo.data}</span>` : ''}
                    </div>
                </div>

                <div class="flex flex-col md:flex-row gap-10">
                    
                    <div class="md:w-1/3 flex-shrink-0">
                        <div class="sticky top-24">
                            <img src="${santo.imagem}" alt="Retrato de ${santo.nome}" class="w-full h-auto rounded-xl shadow-2xl object-cover mb-6 border-4 border-white ring-1 ring-gray-100">
                            
                            </div>
                    </div>

                    <div class="md:w-2/3">
                        
                        <div class="mb-10">
                            <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                                <span class="w-2 h-8 bg-${santo.cor}-500 mr-3 rounded-full"></span>
                                Biografia
                            </h2>
                            <div class="prose prose-indigo text-gray-700 leading-relaxed text-lg text-justify">
                                ${santo.bio} </div>
                        </div>

                        ${milagresHtml}
                        
                        ${reliquiasHtml}

                        ${oracaoHtml}
                        
                        <div class="mt-12 pt-8 border-t border-gray-200 text-center md:text-left">
                            <a href="#${santo.categoria}" class="inline-flex items-center text-indigo-600 font-bold hover:text-indigo-800 transition transform hover:-translate-x-1">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                Voltar para Lista de ${santo.categoria.charAt(0).toUpperCase() + santo.categoria.slice(1)}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// =========================================================================
// FUNÇÕES DE ROTEAMENTO E INICIALIZAÇÃO
// =========================================================================

function stopHeroSlider() {
    if (sliderIntervalId) {
        clearInterval(sliderIntervalId);
        sliderIntervalId = null;
    }
}

function handleRouteChange() {
    const hash = window.location.hash || '#home';
    const contentDiv = document.getElementById('app-content');
    
    if (!contentDiv) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Para o slideshow antes de renderizar
    stopHeroSlider(); 

    if (hash === '#home') {
        contentDiv.innerHTML = renderHomePage();
        startHeroSlider(); 
    } 
    else if (hash === '#santos') {
        contentDiv.innerHTML = renderListPage('Santos', 'indigo', 'santos');
    } 
    else if (hash === '#beatos') {
        contentDiv.innerHTML = renderListPage('Beatos', 'yellow', 'beatos');
    } 
    else if (hash === '#veneraveis') {
        contentDiv.innerHTML = renderListPage('Veneráveis', 'gray', 'veneraveis');
    }
    else if (hash === '#servos') {
        contentDiv.innerHTML = renderListPage('Servos de Deus', 'red', 'servos');
    } 
    else if (hash.startsWith('#saint/')) {
        const slug = hash.substring(7);
        contentDiv.innerHTML = renderSaintDetailPage(slug);
    } 
    else {
        contentDiv.innerHTML = renderHomePage();
        startHeroSlider();
    }
    
    updateNavActiveState(hash);
}

function updateNavActiveState(hash) {
    const links = document.querySelectorAll('.nav-link, .nav-link-mobile');
    const allData = getAllData(); // Pega dados para verificar categorias
    
    let activeHash = hash;

    // Lógica para iluminar o menu correto quando estiver em uma página de detalhes
    if (hash.startsWith('#saint/')) {
        const slug = hash.substring(7);
        const item = allData[slug];
        if (item) {
            // Se for um santo, ativa o menu #santos, se for venerável, ativa #veneraveis, etc.
            activeHash = `#${item.categoria}`; 
        }
    }

    links.forEach(link => {
        const href = link.getAttribute('href');
        
        if (href === activeHash) {
            link.classList.add('text-indigo-600', 'font-bold');
            link.classList.remove('text-gray-600');
        } else {
            link.classList.remove('text-indigo-600', 'font-bold');
            link.classList.add('text-gray-600');
        }
    });
}

function initRouter() {
    window.addEventListener('hashchange', handleRouteChange);
    // Dispara a rota inicial
    handleRouteChange();
}