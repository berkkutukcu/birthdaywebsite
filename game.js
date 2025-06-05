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
    if (isCursorVisible && !document.getElementById('startScreen').classList.contains('slide-out')) {
        customCursor.style.display = 'block';
        customCursor.style.left = (e.clientX - 25) + 'px';
        customCursor.style.top = (e.clientY - 25) + 'px';
    }
});

// Özel imleci ayarla
customCursor.src = 'El.png';
customCursor.style.display = 'none'; // Başlangıçta gizli olsun

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
            // Hide question container before transition
            questionContainer.style.display = 'none';
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
                // Show question container only after new images are added
                questionContainer.style.display = 'block';
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
    // Ekranı siyah yap
    document.body.style.backgroundColor = 'black';
    document.getElementById('afterVideoContainer').style.display = 'none';
    const blackout = document.getElementById('blackout');
    blackout.style.display = 'block';
    blackout.style.opacity = '1';
    // Ses dosyasını oynat
    const doorSound = new Audio('taktak.mp3');
    doorSound.play();
    // Ses bittikten sonra TAK TAK TAK yazısını ve Kapıyı Aç butonunu göster
    setTimeout(() => {
        const dialogContainer = document.getElementById('dialogContainer');
        dialogContainer.style.display = 'block';
        document.getElementById('dialogText').textContent = 'TAK TAK TAK';
        document.getElementById('openDoorButton').style.display = 'block';
    }, 1000); // 1 saniye bekle
});

// Kapıyı Aç butonuna tıklandığında WASD oyununu başlat
document.getElementById('openDoorButton').addEventListener('click', () => {
    document.getElementById('dialogContainer').style.display = 'none';
    startGame(); // WASD oyununu başlat
});

// Diyalog sistemi
const dialogBox = {
    x: 50,
    y: 50,
    width: window.innerWidth - 100,
    height: 100,
    padding: 20,
    isVisible: false,
    currentDialog: 0,
    dialogSpeed: 50,
    dialogs: [
        { speaker: "Sıla", text: "Ne oldu alacaklı gibi kapıyı çalıyosun" },
        { speaker: "Berk", text: "SILA SILA HARİKA BİR ŞEY KEŞFETTİM" },
        { speaker: "Sıla", text: "Ne keşfettin" },
        { speaker: "Berk", text: "BURADA ANLATAMAM BENİMLE GELMELİSİN" },
        { speaker: "Sıla", text: "Ama bugün.." },
        { speaker: "Berk", text: "ÇABUK GEL YOLDA ANLATIRIM" }
    ],
    currentText: "",
    isTyping: false,
    lastUpdateTime: 0,
    dialogTimeout: null,
    waitingForSpace: false,
    showInstruction: true
};

// Spike resmi için
const spikeImage = new Image();
spikeImage.src = 'Spike.png';
let isSpikePlaced = false;
let isExplosionReady = false;
let explosionRadius = 0;
const maxExplosionRadius = Math.max(canvas.width, canvas.height) * 2;
let isFinalDialogueShown = false; // Son diyalogun gösterilip gösterilmediğini takip etmek için

// Karakter animasyonları için yeni değişkenler
let isCharacterFlying = false;
let characterRotation = 0;
let characterScale = 1;
let isCharacterDisappearing = false;
let isSecondCharacterFlying = false;
let secondCharacterRotation = 0;
let secondCharacterScale = 1;
let isSecondCharacterDisappearing = false;

// Diyalog kutusunu çiz
function drawDialogBox() {
    if (!dialogBox.isVisible) return;

    // Arka plan
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(dialogBox.x, dialogBox.y, dialogBox.width, dialogBox.height);
    
    if (dialogBox.showInstruction) {
        // Başlangıç talimatı
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("Berk'le konuşmak için space'e bas", 
            dialogBox.x + dialogBox.width / 2, 
            dialogBox.y + dialogBox.height / 2 - 15);
        
        // WASD talimatı
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText("WASD tuşları ile hareket et", 
            dialogBox.x + dialogBox.width / 2, 
            dialogBox.y + dialogBox.height / 2 + 15);
    } else {
        // Konuşmacı adı
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        ctx.fillText(dialogBox.dialogs[dialogBox.currentDialog].speaker + ":", 
            dialogBox.x + dialogBox.padding, 
            dialogBox.y + dialogBox.padding + 20);

        // Diyalog metni
        ctx.font = '18px Arial';
        ctx.fillStyle = 'white';
        ctx.fillText(dialogBox.currentText, 
            dialogBox.x + dialogBox.padding, 
            dialogBox.y + dialogBox.padding + 50);

        // Space tuşu talimatı
        if (dialogBox.waitingForSpace) {
            ctx.font = '16px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.textAlign = 'center';
            ctx.fillText("Devam etmek için space'e bas", 
                dialogBox.x + dialogBox.width / 2, 
                dialogBox.y + dialogBox.height - 10);
        }
    }
    ctx.restore();
}

// Diyalog metnini güncelle
function updateDialog() {
    if (!dialogBox.isVisible) return;

    const currentTime = Date.now();
    const currentDialog = dialogBox.dialogs[dialogBox.currentDialog];

    if (!dialogBox.isTyping) {
        // Yeni diyalog başlat
        dialogBox.isTyping = true;
        dialogBox.currentText = "";
        dialogBox.lastUpdateTime = currentTime;
        typeNextChar();
    }
}

// Bir sonraki karakteri yaz
function typeNextChar() {
    if (!dialogBox.isVisible || !dialogBox.isTyping) return;

    const currentDialog = dialogBox.dialogs[dialogBox.currentDialog];
    
    if (dialogBox.currentText.length < currentDialog.text.length) {
        dialogBox.currentText += currentDialog.text[dialogBox.currentText.length];
        dialogBox.dialogTimeout = setTimeout(typeNextChar, dialogBox.dialogSpeed);
    } else {
        // Diyalog tamamlandı, space tuşu bekle
        dialogBox.waitingForSpace = true;
        
        // Son diyalogdan sonra Berk'i hareket ettir
        if (currentBackground === 1) {
            character2.isMoving = true;
            character2.targetX = canvas.width / 2; // Ekranın ortasına git
            character2.facingRight = true;
        }
    }
}

// Space tuşu kontrolü
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && dialogBox.isVisible) {
        if (dialogBox.showInstruction) {
            // Başlangıç talimatından diyaloga geç
            dialogBox.showInstruction = false;
            dialogBox.isTyping = false;
            updateDialog();
        } else if (dialogBox.waitingForSpace) {
            // Bir sonraki diyaloğa geç
            dialogBox.currentDialog++;
            dialogBox.isTyping = false;
            dialogBox.waitingForSpace = false;
            if (dialogBox.currentDialog >= dialogBox.dialogs.length) {
                dialogBox.isVisible = false;
                // Diyalog bittiğinde Berk'i hareket ettir
                if (currentBackground === 1) {
                    character2.isMoving = true;
                } else if (currentBackground === 2) {
                    character2.isMoving = true;
                    character2.speed = character.speed * 3; // Sıla'nın hızının 3 katı
                    character2.facingRight = true; // Sağa bak
                } else if (currentBackground === 3 && !isFinalDialogueShown) {
                    character2.isMoving = true;
                }
            } else {
                updateDialog();
            }
        }
    }
});

// Resmi yükle
const characterImage1 = new Image();
const characterImage2 = new Image();
const character2Image1 = new Image();
const character2Image2 = new Image();
const backgroundImage = new Image();
const backgroundImage2 = new Image();
const backgroundImage3 = new Image();
const backgroundImage4 = new Image();
const backgroundImage5 = new Image(); // Yeni arkaplan resmi

// Resim yükleme işlemleri
let imagesLoaded = 0;
const totalImages = 9; // Toplam resim sayısını 9'a çıkardık
let isBackground2Loaded = false;
let isBackground3Loaded = false;
let isBackground4Loaded = false;
let isBackground5Loaded = false;

function checkAllImagesLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        console.log('Tüm resimler yüklendi');
        isBackground2Loaded = true;
        isBackground3Loaded = true;
        isBackground4Loaded = true;
        isBackground5Loaded = true;
    }
}

// Resimleri yükle
characterImage1.onload = checkAllImagesLoaded;
characterImage2.onload = checkAllImagesLoaded;
character2Image1.onload = checkAllImagesLoaded;
character2Image2.onload = checkAllImagesLoaded;
backgroundImage.onload = checkAllImagesLoaded;
backgroundImage2.onload = function() {
    console.log('Arkaplan_2 yüklendi');
    isBackground2Loaded = true;
    checkAllImagesLoaded();
};
backgroundImage3.onload = function() {
    console.log('Arkaplan_3 yüklendi');
    isBackground3Loaded = true;
    checkAllImagesLoaded();
};
backgroundImage4.onload = function() {
    console.log('Arkaplan_4 yüklendi');
    isBackground4Loaded = true;
    checkAllImagesLoaded();
};
backgroundImage5.onload = function() {
    console.log('Arkaplan_5 yüklendi');
    isBackground5Loaded = true;
    checkAllImagesLoaded();
};

characterImage1.src = 'Foto1_1.png';
characterImage2.src = 'Foto1_2.png';
character2Image1.src = 'Foto2_1.png';
character2Image2.src = 'Foto2_2.png';
backgroundImage.src = 'Arkaplan_1.png';
backgroundImage2.src = 'Arkaplan_2.png';
backgroundImage3.src = 'Arkaplan_3.png';
backgroundImage4.src = 'Arkaplan_4.png';
backgroundImage5.src = 'Arkaplan_5.png';
console.log('Arkaplan_4 yükleniyor...');
backgroundImage4.onerror = function() {
    console.error('Arkaplan_4 yüklenirken hata oluştu!');
};

// Resim yüklendiğinde boyutları ayarla
characterImage1.onload = function() {
    // Orijinal en-boy oranını koru
    const aspectRatio = characterImage1.width / characterImage1.height;
    character.width = 100; // Genişliği 100 piksel yap
    character.height = character.width / aspectRatio; // Yüksekliği orana göre ayarla
    character2.width = 100; // İkinci karakter için de aynı boyutları kullan
    character2.height = character2.width / aspectRatio;
    checkAllImagesLoaded();
};

// Karakter özellikleri
const character = {
    x: 150, // X ekseninde 150. piksel
    y: 0, // Başlangıçta 0, resizeCanvas'ta güncellenecek
    width: 100, // Başlangıç genişliği
    height: 100, // Başlangıç yüksekliği
    speed: 5,
    color: '#FF69B4', // Pembe renk
    currentImage: 1, // Hangi resmin gösterileceğini takip etmek için
    animationSpeed: 200, // Animasyon hızı (milisaniye)
    lastAnimationTime: 0, // Son animasyon değişim zamanı
    facingRight: true // Başlangıçta sağa bakıyor
};

// İkinci karakter özellikleri
const character2 = {
    x: 250, // Ana karakterin 100 piksel sağında
    y: 0, // Başlangıçta 0, resizeCanvas'ta güncellenecek
    width: 100,
    height: 100,
    currentImage: 1,
    animationSpeed: 200,
    lastAnimationTime: 0,
    facingRight: false, // Başlangıçta sola bakıyor
    speed: 5, // Hareket hızı (Sıla ile aynı)
    isMoving: false, // Hareket durumu
    isVisible: true, // Görünürlük durumu
    targetX: null // Hedef X koordinatı
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
    const currentImage = character.currentImage === 1 ? characterImage1 : characterImage2;
    
    ctx.save();
    
    if (isCharacterFlying) {
        // Uçma ve dönme animasyonu
        ctx.translate(character.x, character.y);
        ctx.rotate(characterRotation * Math.PI / 180);
        ctx.scale(characterScale, characterScale);
        
        if (character.facingRight) {
            ctx.scale(-1, 1);
            ctx.drawImage(currentImage, 
                -character.width / 2,
                -character.height / 2,
                character.width,
                character.height
            );
        } else {
            ctx.drawImage(currentImage, 
                -character.width / 2,
                -character.height / 2,
                character.width,
                character.height
            );
        }
    } else {
        // Normal çizim
        if (character.facingRight) {
            ctx.translate(character.x, character.y);
            ctx.scale(-1, 1);
            ctx.drawImage(currentImage, 
                -character.width / 2,
                -character.height / 2,
                character.width,
                character.height
            );
        } else {
            ctx.drawImage(currentImage, 
                character.x - character.width / 2,
                character.y - character.height / 2,
                character.width,
                character.height
            );
        }
    }
    
    ctx.restore();

    // İsmi yaz
    if (!isCharacterDisappearing) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Sıla', character.x, character.y - character.height/2 - 10);
        ctx.restore();
    }
}

// İkinci karakteri çiz
function drawCharacter2() {
    if (!character2.isVisible) return;

    const currentImage = character2.currentImage === 1 ? character2Image1 : character2Image2;
    
    ctx.save();
    
    if (isSecondCharacterFlying) {
        // Uçma ve dönme animasyonu
        ctx.translate(character2.x, character2.y);
        ctx.rotate(secondCharacterRotation * Math.PI / 180);
        ctx.scale(secondCharacterScale, secondCharacterScale);
        
        if (character2.facingRight) {
            ctx.scale(-1, 1);
            ctx.drawImage(currentImage, 
                -character2.width / 2,
                -character2.height / 2,
                character2.width,
                character2.height
            );
        } else {
            ctx.drawImage(currentImage, 
                -character2.width / 2,
                -character2.height / 2,
                character2.width,
                character2.height
            );
        }
    } else {
        // Normal çizim
        if (character2.facingRight) {
            ctx.translate(character2.x, character2.y);
            ctx.scale(-1, 1);
            ctx.drawImage(currentImage, 
                -character2.width / 2,
                -character2.height / 2,
                character2.width,
                character2.height
            );
        } else {
            ctx.drawImage(currentImage, 
                character2.x - character2.width / 2,
                character2.y - character2.height / 2,
                character2.width,
                character2.height
            );
        }
    }
    
    ctx.restore();

    // İsmi yaz
    if (!isSecondCharacterDisappearing) {
        ctx.save();
        ctx.globalAlpha = 0.5;
        ctx.font = '20px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText('Berk', character2.x, character2.y - character2.height/2 - 10);
        ctx.restore();
    }
}

// Canvas boyutlarını ayarla
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Karakterlerin Y pozisyonunu ekranın ortasına ayarla
    character.y = canvas.height / 2;
    character2.y = canvas.height / 2;
}

// Oyun durumu
let isGameRunning = false;
let currentBackground = 1; // 1: Arkaplan_1.png, 2: Arkaplan_2.png, 3: Arkaplan_3.png, 4: Arkaplan_4.png, 5: Arkaplan_5.png
let background5Offset = 0; // Arkaplan_5 için kaydırma değeri
let background5AnimationComplete = false; // Animasyon tamamlandı mı?
let textOpacity = 0; // Yazı şeffaflığı
let textY = -100; // Yazının Y pozisyonu (başlangıçta ekranın üstünde)
let stars = []; // Yıldız efektleri için dizi
let showStars = false; // Yıldızları gösterme kontrolü

// Karakteri hareket ettir
function moveCharacter() {
    // Diyalog aktifse hareket etmesin
    if (dialogBox.isVisible) return;

    let isMoving = false;
    const sectionHeight = canvas.height / 3;
    
    if (!isCharacterFlying) {
        if (keys.w && character.y > sectionHeight + character.height / 2) {
            character.y -= character.speed;
            isMoving = true;
        }
        if (keys.s && character.y < sectionHeight * 2 - character.height / 2) {
            character.y += character.speed;
            isMoving = true;
        }
        if (keys.a && character.x > character.width / 2) {
            character.x -= character.speed;
            isMoving = true;
            character.facingRight = false;
        }
        if (keys.d && character.x < canvas.width - character.width / 2) {
            character.x += character.speed;
            isMoving = true;
            character.facingRight = true;
        }

        // Ekranın sağına ulaştığında
        if (character.x >= canvas.width - character.width / 2) {
            // Ekranı karart
            const blackout = document.getElementById('blackout');
            blackout.style.display = 'block';
            blackout.style.transition = 'opacity 2s ease-in-out';
            blackout.style.opacity = '1';
            
            // Sadece Arkaplan_1'den Arkaplan_2'ye geçerken "2 Saat Sonra" yazısını göster
            if (currentBackground === 1) {
                const timeText = document.createElement('div');
                timeText.id = 'timeText';
                timeText.style.position = 'fixed';
                timeText.style.top = '50%';
                timeText.style.left = '50%';
                timeText.style.transform = 'translate(-50%, -50%)';
                timeText.style.color = 'white';
                timeText.style.fontSize = '3em';
                timeText.style.fontFamily = 'Arial, sans-serif';
                timeText.style.zIndex = '10000';
                timeText.style.opacity = '0';
                timeText.style.transition = 'opacity 1s ease-in-out';
                timeText.textContent = '2 Saat Sonra';
                document.body.appendChild(timeText);

                // Yazıyı yavaşça göster
                setTimeout(() => {
                    timeText.style.opacity = '1';
                    // 3 saniye sonra yeni sahneye geç
                    setTimeout(() => {
                        blackout.style.opacity = '0';
                        timeText.style.opacity = '0';
                        // Arka planı değiştir
                        currentBackground = 2;
                        console.log('Arka plan değişiyor:', currentBackground);
                        
                        // Karakterleri başlangıç pozisyonuna getir
                        character.x = 150;
                        character.y = canvas.height / 2;
                        character2.x = 250;
                        character2.y = canvas.height / 2;
                        character2.isVisible = true;
                        character2.isMoving = true;
                        character2.speed = 1;
                        character.speed = 2;
                        
                        // Diyalogu başlat
                        dialogBox.dialogs = [
                            { speaker: "Sıla", text: "ÇOK YORULDUM BERK" },
                            { speaker: "Berk", text: "Çok az kaldı dayan" },
                            { speaker: "Sıla", text: "NEDEN 2 SAATTİR YÜRÜYORUZ ANLATMADIN BİLE" },
                            { speaker: "Berk", text: "Süpriz dedim ya.." },
                            { speaker: "Sıla", text: "BUGÜNÜN ÖNEMİNİ BİLE HATİRLAMIYOSUN" },
                            { speaker: "Berk", text: "Aaa kurban bayramın kutlu olsun" },
                            { speaker: "Sıla", text: ".." },
                            { speaker: "Berk", text: "Söz değicek şöyle yapalım mı.. SON GİDEN ÇÜRÜK YUMURTA" },
                            { speaker: "Sıla", text: "HEYY" }
                        ];
                        dialogBox.currentDialog = 0;
                        dialogBox.isVisible = true;
                        dialogBox.showInstruction = false;
                        dialogBox.isTyping = false;
                        updateDialog();
                        
                        // Oyunu yeniden başlat
                        isGameRunning = true;
                        gameLoop();
                    }, 3000);
                }, 1000);
            } else if (currentBackground === 2) {
                // Arkaplan_2'den Arkaplan_3'e geçiş
                setTimeout(() => {
                    blackout.style.opacity = '0';
                    // Arka planı değiştir
                    currentBackground = 3;
                    console.log('Arka plan değişiyor:', currentBackground);
                    
                    // Karakterleri Arkaplan_3 için özel başlangıç pozisyonlarına getir
                    character.x = 600; // Sıla için X = 600
                    character.y = canvas.height / 2; // Y haritanın ortasında
                    character2.x = 1300; // Berk için X = 1300
                    character2.y = canvas.height / 2; // Y haritanın ortasında
                    character2.isVisible = true;
                    character2.isMoving = false;
                    character2.facingRight = false;
                    character2.speed = 5; // Normal hızına geri döndür
                    
                    // Yeni diyalogları ayarla
                    dialogBox.dialogs = [
                        { speaker: "Berk", text: "Burası bir yeraltı üssü" },
                        { speaker: "Berk", text: "İçerde sakladığım bir şey var ama kapının anahtarını kaybettim" },
                        { speaker: "Berk", text: "yani.. PATLATMAMIZ LAZIM" },
                        { speaker: "Berk", text: "Şimdi ben Spike'ı kuracağım sen de patlat tamam mı?" },
                        { speaker: "Sıla", text: "off ben buraya girmek istemiyorum." },
                        { speaker: "Berk", text: "Neden" },
                        { speaker: "Sıla", text: "KAPLUMBAĞA DEDEN" },
                        { speaker: "Berk", text: ".." },
                        { speaker: "Sıla", text: "HADİ PATLATALIM" }
                    ];
                    dialogBox.currentDialog = 0;
                    dialogBox.isVisible = true;
                    dialogBox.showInstruction = false;
                    dialogBox.isTyping = false;
                    updateDialog();
                    
                    // Oyunu yeniden başlat
                    isGameRunning = true;
                    gameLoop();
                }, 2000);
            }
            
            // Oyunu durdur
            isGameRunning = false;
        }

        // X=1300'e ulaşma kontrolü (Arkaplan_4 için)
        if (character.x >= 1300 && currentBackground === 4) {
            isCharacterFlying = true;
            character.facingRight = true;
            // Uçma animasyonunu başlat
            const flyInterval = setInterval(() => {
                if (character.x < 1600) {
                    character.x += 5;
                }
                if (character.y > 550) {
                    character.y -= 2;
                }
                // Dönme animasyonu
                characterRotation += 5;
                
                // Karakterlerin uçma animasyonu tamamlandığında
                if (character.x >= 1600 && character.y <= 550) {
                    clearInterval(flyInterval);
                    isCharacterDisappearing = true;
                    // Küçülme animasyonu
                    const disappearInterval = setInterval(() => {
                        characterScale -= 0.05;
                        if (characterScale <= 0) {
                            clearInterval(disappearInterval);
                            character.isVisible = false;
                            // Berk'in diyaloğunu başlat
                            dialogBox.dialogs = [
                                { speaker: "Berk", text: "BEN DE GELİYORUM SILAA" }
                            ];
                            dialogBox.currentDialog = 0;
                            dialogBox.isVisible = true;
                            dialogBox.isTyping = false;
                            updateDialog();
                            
                            // Berk'in uçma animasyonunu başlat
                            setTimeout(() => {
                                isSecondCharacterFlying = true;
                                character2.facingRight = true;
                                const flyInterval2 = setInterval(() => {
                                    if (character2.x < 1600) {
                                        character2.x += 5;
                                    }
                                    if (character2.y > 550) {
                                        character2.y -= 2;
                                    }
                                    // Dönme animasyonu
                                    secondCharacterRotation += 5;
                                    
                                    // Hedefe ulaşıldığında
                                    if (character2.x >= 1600 && character2.y <= 550) {
                                        clearInterval(flyInterval2);
                                        isSecondCharacterDisappearing = true;
                                        // Küçülme animasyonu
                                        const disappearInterval2 = setInterval(() => {
                                            secondCharacterScale -= 0.05;
                                            if (secondCharacterScale <= 0) {
                                                clearInterval(disappearInterval2);
                                                character2.isVisible = false;
                                                // Arkaplan_5'e geçiş
                                                const blackout = document.getElementById('blackout');
                                                blackout.style.display = 'block';
                                                blackout.style.opacity = '1';
                                                
                                                setTimeout(() => {
                                                    currentBackground = 5;
                                                    background5Offset = 0;
                                                    background5AnimationComplete = false;
                                                    blackout.style.opacity = '0';
                                                    
                                                    // Oyunu devam ettir
                                                    isGameRunning = true;
                                                    gameLoop();
                                                }, 2000);
                                            }
                                        }, 50);
                                    }
                                }, 16);
                            }, 2000);
                        }
                    }, 50);
                }
            }, 16);
        }
    }

    // Animasyon kontrolü
    if (isMoving) {
        const currentTime = Date.now();
        if (currentTime - character.lastAnimationTime > character.animationSpeed) {
            character.currentImage = character.currentImage === 1 ? 2 : 1;
            character.lastAnimationTime = currentTime;
        }
    } else {
        character.currentImage = 1;
    }
}

// İkinci karakteri hareket ettir
function moveCharacter2() {
    if (!character2.isMoving) return;

    if (currentBackground === 3) {
        // Berk'in özel hareketi
        if (character2.targetX) {
            // Hedef noktaya doğru hareket et
            const dx = character2.targetX - character2.x;
            if (Math.abs(dx) > 5) {
                character2.x += Math.sign(dx) * character2.speed;
                character2.facingRight = dx > 0;
            } else {
                // Hedefe ulaştı
                character2.x = character2.targetX;
                character2.isMoving = false;
                isSpikePlaced = true;
                
                // Spike yerleştirildikten sonra Berk'i X=100'e kaçır
                setTimeout(() => {
                    character2.isMoving = true;
                    character2.targetX = 100;
                    character2.facingRight = false;
                    
                    // Berk kaçtıktan sonra E tuşu ile patlatma talimatını göster
                    setTimeout(() => {
                        if (!isFinalDialogueShown) {
                            dialogBox.dialogs = [
                                { speaker: "Berk", text: "Sıla hadi yanıma gel" },
                                { speaker: "Berk", text: "E Tuşu ile patlatabilirsin." }
                            ];
                            dialogBox.currentDialog = 0;
                            dialogBox.isVisible = true;
                            dialogBox.isTyping = false;
                            updateDialog();
                            isExplosionReady = true;
                            isFinalDialogueShown = true;
                        }
                    }, 1000);
                }, 1000);
            }
        }
    } else {
        // Normal hareket mantığı
        if (dialogBox.isVisible && dialogBox.currentText.length > 0) {
            if (dialogBox.currentText === "ÇOK YORULDUM BERK") {
                character2.isMoving = false;
                character2.facingRight = false;
                return;
            }
            
            character2.x += character2.speed;
            character2.facingRight = true;
            if (character2.x >= 350) {
                character2.isMoving = false;
                character2.facingRight = false;
            }
        } else {
            character2.x += character2.speed;
            character2.facingRight = true;
        }
    }

    // Animasyon kontrolü
    const currentTime = Date.now();
    if (currentTime - character2.lastAnimationTime > character2.animationSpeed) {
        character2.currentImage = character2.currentImage === 1 ? 2 : 1;
        character2.lastAnimationTime = currentTime;
    }
}

// Sayfa yüklendiğinde ve yeniden boyutlandırıldığında canvas'ı ayarla
window.addEventListener('load', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

// Oyun döngüsü
function gameLoop() {
    if (!isGameRunning) {
        isGameRunning = true;
    }
    
    // Canvas'ı temizle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Arkaplanı çiz
    if (currentBackground === 1) {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    } else if (currentBackground === 2) {
        ctx.drawImage(backgroundImage2, 0, 0, canvas.width, canvas.height);
    } else if (currentBackground === 3) {
        ctx.drawImage(backgroundImage3, 0, 0, canvas.width, canvas.height);
    } else if (currentBackground === 4) {
        if (backgroundImage4.complete) {
            ctx.drawImage(backgroundImage4, 0, 0, canvas.width, canvas.height);
        }
    } else if (currentBackground === 5) {
        if (backgroundImage5.complete) {
            // Arkaplan_5'i çiz ve animasyonu uygula
            if (!background5AnimationComplete) {
                background5Offset += 0.5;
                if (background5Offset >= 300) { // Kaydırma mesafesini 300'e düşürdük
                    background5Offset = 300;
                    background5AnimationComplete = true;
                }
            } else {
                // Animasyon tamamlandıktan sonra yazı animasyonlarını başlat
                if (textOpacity < 0.7) {
                    textOpacity += 0.01;
                }
                if (textY < 300) {
                    textY += 2;
                } else if (!showStars) {
                    showStars = true;
                }
            }
            
            // Arkaplanı çiz (ekranı tamamen doldur)
            const scale = Math.max(canvas.width / backgroundImage5.width, canvas.height / backgroundImage5.height);
            const scaledWidth = backgroundImage5.width * scale;
            const scaledHeight = backgroundImage5.height * scale;
            const x = (canvas.width - scaledWidth) / 2;
            
            ctx.drawImage(backgroundImage5, 
                x, background5Offset,
                scaledWidth, scaledHeight,
                0, 0,
                backgroundImage5.width, backgroundImage5.height
            );
            
            // Yıldızları güncelle ve çiz
            updateStars();
            stars.forEach(star => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();
                ctx.restore();
            });
            
            // "İyi ki Doğdun Sıla" yazısını çiz
            ctx.save();
            ctx.font = 'bold 4em Arial';
            ctx.fillStyle = `rgba(255, 255, 255, ${textOpacity})`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = 'black';
            ctx.shadowBlur = 10;
            ctx.fillText('İyi ki Doğdun Sıla', canvas.width / 2, textY);
            ctx.restore();
        }
    }
    
    // Karakterleri sadece Arkaplan_5'te çizme
    if (currentBackground !== 5) {
        // Karakteri hareket ettir
        moveCharacter();
        
        // İkinci karakteri hareket ettir
        moveCharacter2();
        
        // Karakterleri çiz
        drawCharacter();
        drawCharacter2();
    }
    
    // Spike'ı çiz
    if (isSpikePlaced) {
        ctx.drawImage(spikeImage, 
            canvas.width / 2 - spikeImage.width / 2,
            canvas.height / 2 - spikeImage.height / 2,
            spikeImage.width,
            spikeImage.height
        );
    }
    
    // Diyalog sistemini güncelle
    updateDialog();
    
    // Diyalog kutusunu çiz
    drawDialogBox();
    
    // Patlatma animasyonunu en son çiz (en üstte görünecek)
    if (explosionRadius > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, explosionRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
    }
    
    // Bir sonraki frame'i iste
    if (isGameRunning) {
        requestAnimationFrame(gameLoop);
    }
}

// Oyunu başlatma fonksiyonu
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
    
    // Karakterin başlangıç pozisyonunu ayarla
    character.x = 150;
    character.y = canvas.height / 2;
    
    // İkinci karakteri sıfırla
    character2.x = 250;
    character2.y = canvas.height / 2;
    character2.isMoving = false;
    character2.isVisible = true;
    character2.facingRight = false;
    
    // Diyalog sistemini başlat
    if (dialogBox.dialogTimeout) {
        clearTimeout(dialogBox.dialogTimeout);
    }
    dialogBox.isVisible = true;
    dialogBox.currentDialog = 0;
    dialogBox.currentText = "";
    dialogBox.isTyping = false;
    dialogBox.lastUpdateTime = Date.now();
    dialogBox.waitingForSpace = false;
    dialogBox.showInstruction = true;

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

// Ses dosyasını yükle
const doorSound = new Audio('taktak.mp3');

// Diyalog ve buton elementlerini seç
const dialogText = document.getElementById('dialogText');
const openDoorButton = document.getElementById('openDoorButton');

// Buton tıklandığında
openDoorButton.addEventListener('click', () => {
    // Ses dosyasını oynat
    doorSound.play();
    
    // Diyalog ve butonu gizle
    dialogText.style.display = 'none';
    openDoorButton.style.display = 'none';
    
    // Oyunu başlat
    startGame();
});

// E tuşu kontrolü
window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'e' && isExplosionReady) {
        console.log('E tuşuna basıldı, patlatma başlıyor');
        // Patlatma animasyonunu başlat
        isExplosionReady = false;
        explosionRadius = 0;
        
        // Patlatma animasyonu
        const explosionInterval = setInterval(() => {
            explosionRadius += 100; // Daha hızlı büyüme
            if (explosionRadius >= maxExplosionRadius * 2) { // Daha büyük maksimum yarıçap
                clearInterval(explosionInterval);
                console.log('Patlatma tamamlandı, Arkaplan_4\'e geçiliyor');
                // Arkaplan_4'e geç
                currentBackground = 4;
                // Patlatma animasyonunu sıfırla
                explosionRadius = 0;
                // Spike'ı temizle
                isSpikePlaced = false;
                
                // Karakterleri yeni pozisyonlara getir
                character.x = 300; // Sıla X=300
                character.y = canvas.height / 2 + 50; // Resmin ortasının biraz altında
                character2.x = 300; // Berk X=300
                character2.y = canvas.height / 2 - 50; // Resmin ortasının biraz üstünde
                character2.isVisible = true;
                character2.facingRight = true;
                
                // Yeni diyalogları başlat
                dialogBox.dialogs = [
                    { speaker: "Sıla", text: "Bu alet nedir" },
                    { speaker: "Berk", text: "BU BİR IŞINLANMA MAKİNESİ!" },
                    { speaker: "Sıla", text: "Işınlanma makinesi mi" },
                    { speaker: "Berk", text: "EVET BUNUNLA İSTEDİĞİMİZ YERE IŞINLANABİLİRİZ" },
                    { speaker: "Sıla", text: "Emin değilim güvenli mi bu" },
                    { speaker: "Berk", text: "merak etme her şeyi yazırladım" },
                    { speaker: "Berk", text: "Hadi önce sen, hemen arkandan geleceğim." }
                ];
                dialogBox.currentDialog = 0;
                dialogBox.isVisible = true;
                dialogBox.isTyping = false;
                updateDialog();
                
                // Oyunu devam ettir
                isGameRunning = true;
                gameLoop();
            }
        }, 16);
    }
});

// Arkaplan_4'ten Arkaplan_5'e geçiş için yeni fonksiyon
function transitionToBackground5() {
    // Ekranı karart
    const blackout = document.getElementById('blackout');
    blackout.style.display = 'block';
    blackout.style.opacity = '1';
    
    // 2 saniye sonra Arkaplan_5'e geç
    setTimeout(() => {
        currentBackground = 5;
        background5Offset = 0;
        background5AnimationComplete = false;
        blackout.style.opacity = '0';
        
        // Oyunu devam ettir
        isGameRunning = true;
        gameLoop();
    }, 2000);
}

// Karakterlerin uçma animasyonu tamamlandığında Arkaplan_5'e geç
if (character.x >= 1600 && character.y <= 550) {
    clearInterval(flyInterval);
    isCharacterDisappearing = true;
    // Küçülme animasyonu
    const disappearInterval = setInterval(() => {
        characterScale -= 0.05;
        if (characterScale <= 0) {
            clearInterval(disappearInterval);
            character.isVisible = false;
            // Berk'in diyaloğunu başlat
            dialogBox.dialogs = [
                { speaker: "Berk", text: "BEN DE GELİYORUM SILAA" }
            ];
            dialogBox.currentDialog = 0;
            dialogBox.isVisible = true;
            dialogBox.isTyping = false;
            updateDialog();
            
            // Berk'in uçma animasyonunu başlat
            setTimeout(() => {
                isSecondCharacterFlying = true;
                character2.facingRight = true;
                const flyInterval2 = setInterval(() => {
                    if (character2.x < 1600) {
                        character2.x += 5;
                    }
                    if (character2.y > 550) {
                        character2.y -= 2;
                    }
                    // Dönme animasyonu
                    secondCharacterRotation += 5;
                    
                    // Hedefe ulaşıldığında
                    if (character2.x >= 1600 && character2.y <= 550) {
                        clearInterval(flyInterval2);
                        isSecondCharacterDisappearing = true;
                        // Küçülme animasyonu
                        const disappearInterval2 = setInterval(() => {
                            secondCharacterScale -= 0.05;
                            if (secondCharacterScale <= 0) {
                                clearInterval(disappearInterval2);
                                character2.isVisible = false;
                                // Arkaplan_5'e geçiş
                                const blackout = document.getElementById('blackout');
                                blackout.style.display = 'block';
                                blackout.style.opacity = '1';
                                
                                setTimeout(() => {
                                    currentBackground = 5;
                                    background5Offset = 0;
                                    background5AnimationComplete = false;
                                    blackout.style.opacity = '0';
                                    
                                    // Oyunu devam ettir
                                    isGameRunning = true;
                                    gameLoop();
                                }, 2000);
                            }
                        }, 50);
                    }
                }, 16);
            }, 2000);
        }
    }, 50);
}

// Yıldız oluşturma fonksiyonu
function createStar(x, y) {
    return {
        x: x,
        y: y,
        size: Math.random() * 3 + 1, // 1-4 arası rastgele boyut
        opacity: Math.random() * 0.5 + 0.5, // 0.5-1 arası rastgele opaklık
        speed: Math.random() * 2 + 1, // 1-3 arası rastgele hız
        angle: Math.random() * Math.PI * 2, // Rastgele açı
        distance: Math.random() * 50 + 20 // 20-70 arası rastgele mesafe
    };
}

// Yıldızları güncelleme fonksiyonu
function updateStars() {
    if (!showStars) return;
    
    // Her frame'de yeni yıldız ekle
    if (Math.random() < 0.1) { // %10 ihtimalle yeni yıldız
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        const x = canvas.width / 2 + Math.cos(angle) * distance;
        const y = textY + Math.sin(angle) * distance;
        stars.push(createStar(x, y));
    }
    
    // Yıldızları güncelle
    for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.opacity -= 0.01; // Yavaşça sön
        
        if (star.opacity <= 0) {
            stars.splice(i, 1); // Sönen yıldızı kaldır
        }
    }
} 