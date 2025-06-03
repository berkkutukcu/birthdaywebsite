// Başlangıç ekranı ve oyun elemanları
const startScreen = document.getElementById('startScreen');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startRose = document.getElementById('startRose');
const customCursor = document.getElementById('customCursor');
const transitionOverlay = document.getElementById('transitionOverlay');
const creditText = document.getElementById('creditText');
const specialText = document.getElementById('specialText');
const dialogueContainer = document.getElementById('dialogueContainer');
const dialogueText = document.getElementById('dialogueText');
const readyButton = document.getElementById('readyButton');
const questionContainer = document.getElementById('questionContainer');

// F11 tuşu kontrolü
// let isFullscreen = false;
// document.addEventListener('keydown', (e) => {
//     if (e.key === 'F11') {
//         isFullscreen = true;
//     }
// });

// Tam ekran butonu
const fullscreenNotice = document.getElementById('fullscreenNotice');
const fullscreenButton = document.getElementById('fullscreenButton');
fullscreenButton.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
});

// İmleç takibi
let isCursorVisible = true;
document.addEventListener('mousemove', (e) => {
    if (isCursorVisible) {
        customCursor.style.display = 'block';
        customCursor.style.left = (e.clientX - 25) + 'px';
        customCursor.style.top = (e.clientY - 25) + 'px';
    }
});

// Özel imleci ayarla
customCursor.src = 'El.png';
customCursor.style.display = 'block';

// Yazı yazma efekti
function typeText(element, text, speed = 50) {
    // Fotoğrafları devre dışı bırak
    document.querySelectorAll('.question-image').forEach(img => img.classList.add('disabled'));
    let i = 0;
    element.textContent = '';
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(interval);
                // Fotoğrafları tekrar aktif et
                document.querySelectorAll('.question-image').forEach(img => img.classList.remove('disabled'));
                resolve();
            }
        }, speed);
    });
}

// Titreme efekti
function shakeScreen() {
    dialogueContainer.classList.add('shake');
    setTimeout(() => {
        dialogueContainer.classList.remove('shake');
    }, 500);
}

// Resim tıklama olayları
document.querySelectorAll('.question-image').forEach(img => {
    img.addEventListener('click', async () => {
        if (img.dataset.correct === 'true') {
            dialogueText.classList.remove('error');
            await typeText(dialogueText, "Berk: Güzel ilk soruyu bildin");
            setTimeout(async () => {
                dialogueText.textContent = '';
                await typeText(dialogueText, "Berk: şimdi ikinci soru, hangisini rüyanda gördün?");
                // Eski resimleri tamamen kaldır
                const imagesContainer = document.getElementById('imagesContainer');
                imagesContainer.innerHTML = '';
                // Yeni resimleri ekle (Soru2_1.png doğru cevap)
                const soru2 = [
                    {src: 'Soru2_1.png', alt: 'Rüya 1', correct: true},
                    {src: 'Soru2_2.png', alt: 'Rüya 2', correct: false},
                    {src: 'Soru2_3.png', alt: 'Rüya 3', correct: false}
                ];
                soru2.forEach(imgData => {
                    const imgEl = document.createElement('img');
                    imgEl.src = imgData.src;
                    imgEl.alt = imgData.alt;
                    imgEl.className = 'question-image';
                    imgEl.dataset.correct = imgData.correct;
                    imagesContainer.appendChild(imgEl);
                });
                // Yeni resimler için tıklama olaylarını tekrar ekle
                document.querySelectorAll('.question-image').forEach(img => {
                    img.addEventListener('click', async () => {
                        if (img.dataset.correct === 'true') {
                            // Doğru cevap: ekranı temizle, final sorusunu göster
                            imagesContainer.innerHTML = '';
                            dialogueText.textContent = '';
                            document.getElementById('finalQuestionContainer').style.display = 'block';
                            await typeText(dialogueText, "Berk: Son Soru, benim aklımdan geçen ilk sayııyı kutucuğa yaz.");
                        } else {
                            // Hata mesajı ve animasyonları temizle
                            dialogueText.classList.remove('error');
                            dialogueText.textContent = '';
                            dialogueContainer.classList.remove('shake');
                            await typeText(dialogueText, "Berk: SEN SILA DEĞİL MİSİN YOKSA???");
                            shakeScreen();
                            dialogueText.classList.add('error');
                        }
                    });
                });
            }, 2000);
        } else {
            // Hata mesajı ve animasyonları temizle
            dialogueText.classList.remove('error');
            dialogueText.textContent = '';
            dialogueContainer.classList.remove('shake');
            await typeText(dialogueText, "Berk: SEN SILA DEĞİL MİSİN YOKSA???");
            shakeScreen();
            dialogueText.classList.add('error');
        }
    });
});

// Hazırım butonuna tıklandığında
readyButton.addEventListener('click', async () => {
    readyButton.style.display = 'none';
    dialogueText.textContent = '';
    dialogueText.classList.remove('error');
    await typeText(dialogueText, "Berk: Hangisi senin Mouse'un?");
    questionContainer.style.display = 'block';
});

// Final soru kontrolü
const finalButton = document.getElementById('finalButton');
const finalInput = document.getElementById('finalInput');
const blackout = document.getElementById('blackout');
const sjsjText = document.getElementById('sjsjText');
const afterSJText = document.getElementById('afterSJText');
const finalVideo = document.getElementById('finalVideo');

finalButton.addEventListener('click', () => {
    if (finalInput.value === '31') {
        // Ekranı siyaha döndür
        blackout.style.display = 'block';
        setTimeout(() => {
            blackout.style.opacity = '1';
            setTimeout(() => {
                // SJSJ animasyonu başlasın
                sjsjText.style.display = 'block';
                sjsjText.style.whiteSpace = 'pre-wrap';
                sjsjText.textContent = '';
                let sjInterval;
                let sjCount = 0;
                let line = '';
                sjInterval = setInterval(() => {
                    line += 'SJ';
                    if (line.length >= 20) { // Her 10 SJ'den sonra yeni satıra geç
                        line += '\n';
                        sjsjText.textContent += line;
                        line = '';
                    } else {
                        sjsjText.textContent = sjsjText.textContent + 'SJ';
                    }
                    sjCount++;
                    if (sjCount > 100) { // Maksimum SJ sayısı
                        clearInterval(sjInterval);
                        setTimeout(() => {
                            sjsjText.textContent = '';
                            sjsjText.style.display = 'none';
                            // "Berk: Gülmedin mi yoksa?" yazısı okuma hızında
                            afterSJText.style.display = 'block';
                            typeText(afterSJText, 'Berk: Gülmedin mi yoksa?').then(() => {
                                setTimeout(() => {
                                    afterSJText.style.display = 'none';
                                    finalVideo.style.display = 'block';
                                    finalVideo.play();
                                }, 1000);
                            });
                        }, 500);
                    }
                }, 50); // Biraz yavaşlattım
            }, 2000);
        }, 10);
    }
});

finalVideo.addEventListener('ended', async () => {
    finalVideo.style.display = 'none';
    const afterVideoContainer = document.getElementById('afterVideoContainer');
    const afterVideoText = document.getElementById('afterVideoText');
    const startGameButton = document.getElementById('startGameButton');
    afterVideoContainer.style.display = 'block';
    afterVideoText.textContent = '';
    startGameButton.style.display = 'none';
    await typeText(afterVideoText, 'Berk: öhm');
    await new Promise(r => setTimeout(r, 500));
    afterVideoText.textContent = '';
    await typeText(afterVideoText, 'Berk: Bu seni kesin güldürmüştür. Artık Oyuna başlayabilirsin');
    startGameButton.style.display = 'inline-block';
});

document.getElementById('startGameButton').addEventListener('click', () => {
    // Ekrandaki her şeyi temizle, oyunu başlat
    document.getElementById('blackout').style.display = 'none';
    startGame();
});

// Oyun başlatma fonksiyonu
function startGame() {
    // Tüm giriş/kredi/overlay ekranlarını ve eski yazıları kesin olarak gizle ve temizle
    fullscreenNotice.style.display = 'none';
    document.getElementById('blackout').style.display = 'none';
    document.getElementById('afterVideoContainer').style.display = 'none';
    document.getElementById('dialogueContainer').style.display = 'none';
    document.getElementById('startScreen').style.display = 'none';
    transitionOverlay.style.display = 'none';
    creditText.style.display = 'none';
    specialText.style.display = 'none';
    
    // Ekstra: tüm yazı ve soru kutularını da temizle
    try { document.getElementById('afterVideoText').textContent = ''; } catch(e){}
    try { document.getElementById('sjsjText').textContent = ''; document.getElementById('sjsjText').style.display = 'none'; } catch(e){}
    try { document.getElementById('afterSJText').textContent = ''; document.getElementById('afterSJText').style.display = 'none'; } catch(e){}
    try { document.getElementById('finalQuestionContainer').style.display = 'none'; } catch(e){}
    try { document.getElementById('previousQuestionsContainer').innerHTML = ''; document.getElementById('previousQuestionsContainer').style.display = 'none'; } catch(e){}
    try { document.getElementById('questionContainer').style.display = 'none'; document.getElementById('imagesContainer').innerHTML = ''; } catch(e){}
    
    // Canvas'ı görünür yap
    canvas.style.display = 'block';
    
    // İmleci tamamen gizle
    isCursorVisible = false;
    customCursor.style.display = 'none';
    document.body.style.cursor = 'none';
    
    // Oyunu başlat
    gameLoop();
}

// Gül tıklama olayını dinle
startRose.addEventListener('click', () => {
    customCursor.style.display = 'none';
    isCursorVisible = false;
    startIntro();
});

function startIntro() {
    // Tam ekran uyarısını gizle
    fullscreenNotice.style.display = 'none';
    // Başlangıç ekranını kaydır
    startScreen.classList.add('slide-out');
    // 2 saniye sonra siyah ekranı göster
    setTimeout(() => {
        startScreen.style.display = 'none';
        transitionOverlay.style.display = 'block';
        transitionOverlay.classList.add('active');
        // 2 saniye sonra kredi yazısını göster
        setTimeout(() => {
            creditText.classList.add('active');
            // 5 saniye sonra kredi yazısını gizle ve özel yazıyı göster
            setTimeout(() => {
                creditText.classList.remove('active');
                specialText.classList.add('active');
                // 4 saniye sonra özel yazıyı gizle ve ekranı beyaza döndür
                setTimeout(() => {
                    specialText.classList.remove('active');
                    transitionOverlay.classList.remove('active');
                    // 2 saniye sonra diyalog ekranını göster
                    setTimeout(async () => {
                        transitionOverlay.style.display = 'none';
                        dialogueContainer.style.display = 'block';
                        // Normal imleci geri getir
                        document.body.style.cursor = 'default';
                        // İlk diyalogu yaz
                        await typeText(dialogueText, "Berk: hmm senin gerçekten Sıla olduğunu anlamak için bir test yapmalıyım.");
                        // 2 saniye bekle
                        setTimeout(async () => {
                            dialogueText.textContent = '';
                            await typeText(dialogueText, "Berk: birinci soru için hazır mısın?");
                            readyButton.style.display = 'inline-block';
                        }, 2000);
                    }, 2000);
                }, 4000);
            }, 5000);
        }, 2000);
    }, 2000);
}

// Resmi yükle
const characterImage = new Image();
characterImage.src = 'Foto1.png';

// Resim yüklendiğinde boyutları ayarla
characterImage.onload = function() {
    // Orijinal en-boy oranını koru
    const aspectRatio = characterImage.width / characterImage.height;
    character.width = 100; // Genişliği 100 piksel yap
    character.height = character.width / aspectRatio; // Yüksekliği orana göre ayarla
};

// Karakter özellikleri
const character = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 100, // Başlangıç genişliği
    height: 100, // Başlangıç yüksekliği
    speed: 5,
    color: '#FF69B4' // Pembe renk
};

// Tuş durumlarını takip etmek için
const keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

// Tuş basma olaylarını dinle
window.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w': keys.w = true; break;
        case 'a': keys.a = true; break;
        case 's': keys.s = true; break;
        case 'd': keys.d = true; break;
    }
});

// Tuş bırakma olaylarını dinle
window.addEventListener('keyup', (e) => {
    switch(e.key.toLowerCase()) {
        case 'w': keys.w = false; break;
        case 'a': keys.a = false; break;
        case 's': keys.s = false; break;
        case 'd': keys.d = false; break;
    }
});

// Karakteri çiz
function drawCharacter() {
    ctx.drawImage(characterImage, 
        character.x - character.width / 2, 
        character.y - character.height / 2, 
        character.width, 
        character.height
    );
}

// Karakteri hareket ettir
function moveCharacter() {
    if (keys.w && character.y > character.height / 2) {
        character.y -= character.speed;
    }
    if (keys.s && character.y < canvas.height - character.height / 2) {
        character.y += character.speed;
    }
    if (keys.a && character.x > character.width / 2) {
        character.x -= character.speed;
    }
    if (keys.d && character.x < canvas.width - character.width / 2) {
        character.x += character.speed;
    }
}

// Oyun döngüsü
let isGameRunning = false;

function gameLoop() {
    if (!isGameRunning) {
        isGameRunning = true;
    }
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Karakteri hareket ettir
    moveCharacter();
    
    // Karakteri çiz
    drawCharacter();
    
    // Bir sonraki frame'i iste
    if (isGameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// Oyunu başlat
// gameLoop(); // Bu satırı kaldırıyoruz 