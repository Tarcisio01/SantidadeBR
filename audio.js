// =========================================================================
// MÓDULO DE CONTROLE DE ÁUDIO (audio.js)
// =========================================================================

let audioPlayer = null;
let isPlaying = false;

function initAudioControls() {
    audioPlayer = document.createElement('audio');
    audioPlayer.id = 'background-music';
    audioPlayer.loop = true;
    
    // IMPORTANTE: Substitua pela URL do áudio que deseja tocar
    audioPlayer.src = 'https://www.youtube.com/watch?v=NChn5ve5bQY'; // URL de exemplo
    
    document.body.appendChild(audioPlayer);
    createAudioControls();
    
    // Tenta reproduzir automaticamente (com tratamento de erro)
    /* CORREÇÃO: Esta é a causa do erro. Os navegadores bloqueiam o autoplay.
    A reprodução agora só começará quando o usuário clicar no botão play.
    
    setTimeout(() => {
        playAudio().catch(error => {
            console.log('Reprodução automática bloqueada. O usuário precisa interagir primeiro.');
        });
    }, 1000);
    */
}

function createAudioControls() {
    const audioControls = document.createElement('div');
    audioControls.className = 'audio-controls';
    audioControls.innerHTML = `
        <button id="play-pause-btn" class="audio-btn" aria-label="Tocar/Pausar áudio">
            <svg id="play-icon" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
            </svg>
            <svg id="pause-icon" class="w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
        </button>
        <button id="mute-btn" class="audio-btn" aria-label="Ativar/Desativar mudo">
            <svg id="volume-on-icon" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <svg id="volume-off-icon" class="w-5 h-5 hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
        </button>
    `;
    document.body.appendChild(audioControls);
    document.getElementById('play-pause-btn').addEventListener('click', togglePlayPause);
    document.getElementById('mute-btn').addEventListener('click', toggleMute);
}

async function playAudio() {
    if (audioPlayer) {
        try {
            await audioPlayer.play();
            isPlaying = true;
            updatePlayPauseButton();
        } catch (error) {
            console.error('Erro ao reproduzir áudio:', error);
            isPlaying = false;
            updatePlayPauseButton();
        }
    }
}

function pauseAudio() {
    if (audioPlayer) {
        audioPlayer.pause();
        isPlaying = false;
        updatePlayPauseButton();
    }
}

function togglePlayPause() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function toggleMute() {
    if (audioPlayer) {
        audioPlayer.muted = !audioPlayer.muted;
        updateMuteButton();
    }
}

function updatePlayPauseButton() {
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const playPauseBtn = document.getElementById('play-pause-btn');
    if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        playPauseBtn.classList.add('playing');
    } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        playPauseBtn.classList.remove('playing');
    }
}

function updateMuteButton() {
    const volumeOnIcon = document.getElementById('volume-on-icon');
    const volumeOffIcon = document.getElementById('volume-off-icon');
    if (audioPlayer.muted) {
        volumeOnIcon.classList.add('hidden');
        volumeOffIcon.classList.remove('hidden');
    } else {
        volumeOnIcon.classList.remove('hidden');
        volumeOffIcon.classList.add('hidden');
    }
}