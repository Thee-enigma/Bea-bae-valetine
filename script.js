const $ = (s) => document.querySelector(s);
const wait = (ms) => new Promise(r => setTimeout(r, ms));

function showStage(id){
  document.querySelectorAll(".stage").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if(el) el.classList.add("active");
}

function setMusicLevel(level){
  const music = $("#bgMusic");
  if(!music) return;
  music.volume = Math.max(0, Math.min(1, level));
}

document.addEventListener("DOMContentLoaded", () => {

  // ===== AUDIO =====
  const music = $("#bgMusic");
  const audioBtn = $("#audioBtn");
  let audioOn = false;

  audioBtn?.addEventListener("click", async () => {
    try{
      if(!audioOn){
        music.muted = false;
        setMusicLevel(0.85);
        await music.play();
        audioOn = true;
        audioBtn.textContent = "🔊 Music: ON (dramatic)";
      } else {
        music.pause();
        audioOn = false;
        audioBtn.textContent = "🔇 Tap for dramatic music";
      }
    } catch {
      audioBtn.textContent = "Tap again (browser being shy)";
    }
  });

  // ===== STAGE 1: DOG BUTTON =====
  const dogBtn = $("#dogBtn");
  function goStage2(){
    showStage("stage2");
    initStage2();
  }
  dogBtn?.addEventListener("click", goStage2);
  dogBtn?.addEventListener("touchstart", (e) => { e.preventDefault(); goStage2(); }, {passive:false});

  // ===== STAGE 1: UNLESS HACK =====
  const unlessBtn = $("#unlessBtn");
  const terminal = $("#terminal");
  const termLine = $("#termLine");
  const hackReveal = $("#hackReveal");
  const continueBtn = $("#continueBtn");

  const waLink = $("#waLink");
  const whatsappMsg = "I love you too, let’s hang out again sometime";
  if(waLink) waLink.href = "https://wa.me/?text=" + encodeURIComponent(whatsappMsg);

  async function typeInto(el, text, speed=22){
    if(!el) return;
    el.textContent = "";
    for(let i=0;i<text.length;i++){
      el.textContent += text[i];
      await wait(speed);
    }
  }

  unlessBtn?.addEventListener("click", async () => {
    unlessBtn.disabled = true;
    if(terminal) terminal.hidden = false;
    if(hackReveal) hackReveal.hidden = true;

    if(audioOn) setMusicLevel(0.95);

    const hackLines = [
      "Bypassing Platonic Protocol…",
      "Emotional Firewall Disabled…",
      "Yearning at Critical Levels…"
    ];

    for(const line of hackLines){
      await typeInto(termLine, line, 22);
      await wait(650);
      if(termLine) termLine.textContent = "";
    }

    if(terminal) terminal.hidden = true;
    if(hackReveal) hackReveal.hidden = false;
  });

  continueBtn?.addEventListener("click", () => {
    showStage("stage2");
    initStage2();
  });

  // ===== STAGE 2 YES/NO =====
  const yesBtn = $("#yesBtn");
  const noBtn = $("#noBtn");
  const noMsg = $("#noMessage");
  const stage2Meme = $("#stage2Meme");

  let noClicks = 0;
  const noMessages = [
    "Are you sure?",
    "Big Yahu is observing.",
    "Orbital strike warming up.",
    "Compliance failure detected.",
    "This is a government-regulated Valentine."
  ];

  function initStage2(){
    noClicks = 0;
    if(noMsg) noMsg.textContent = "";
    if(stage2Meme) stage2Meme.hidden = true;
    if(noBtn){
      noBtn.style.position = "";
      noBtn.style.left = "";
      noBtn.style.top = "";
    }
  }
  window.initStage2 = initStage2; // keep available

  yesBtn?.addEventListener("click", () => showStage("stage3"));

  noBtn?.addEventListener("click", () => {
    noClicks++;

    if(noClicks === 1){
      if(stage2Meme) stage2Meme.hidden = false;
      if(noMsg) noMsg.textContent = noMessages[0];
      return;
    }

    if(noBtn){
      noBtn.style.position = "absolute";
      const pad = 14;
      const maxX = window.innerWidth - noBtn.offsetWidth - pad;
      const maxY = window.innerHeight - noBtn.offsetHeight - pad;
      noBtn.style.left = Math.max(pad, Math.random() * maxX) + "px";
      noBtn.style.top  = Math.max(pad, Math.random() * maxY) + "px";
    }

    const msgIndex = Math.min(noClicks-1, noMessages.length-1);
    if(noMsg) noMsg.textContent = noMessages[msgIndex];

    if(noClicks >= 6){
      if(noMsg) noMsg.textContent = "⚡ You have been striked by the Big Yahu.";
      setTimeout(() => showStage("stage3"), 900);
    }
  });

  // ===== STAGE 3 -> 4 =====
  $("#stage3NextBtn")?.addEventListener("click", () => {
    showStage("stage4");
    runDevotionMonologue();
  });

  // ===== STAGE 4 MONOLOGUE =====
  const devotionText = $("#devotionText");
  const devotionLines = [
    "The things I would do for love…",
    "Take a bullet.",
    "from the floor",
    "Jump in front of a train",
    "track",
    "Catch a grenade.",
    "while it still has a safety pin.",    
    "FaceTime on 1% battery.",
    "Challenge destiny itself.",
    "Fight everyone on earth.",
    "Except Satoru Gojo."
  ];

  let devotionRunning = false;

  async function runDevotionMonologue(){
    if(devotionRunning || !devotionText) return;
    devotionRunning = true;
    devotionText.innerHTML = "";

    for(const line of devotionLines){
      const p = document.createElement("p");
      p.textContent = line;
      devotionText.appendChild(p);

      if(line === "…") await wait(1100);
      else if(line === "Except Satoru Gojo.") await wait(1600);
      else await wait(900);
    }

    devotionRunning = false;
    showStage("stage5");
    initSwipe();
  }

  // ===== STAGE 5 SWIPE =====
  const swipeDeck = $("#swipeDeck");
  const panels = [
    { title: "There’s a lot of fish in the sea." },
    { title: "I’ve never been much of a fisherman." },
    { title: "I’m okay with liking you and you not liking me back." },
    { title: "It’s like an open prison that I refuse to leave.", small: "Voluntary incarceration. Emerald edition." }
  ];

  let panelIndex = 0;
  let swipeInited = false;

  function renderPanel(){
    if(!swipeDeck) return;
    const p = panels[panelIndex];
    swipeDeck.innerHTML = `
      <div class="swipe-panel">
        <h3>${p.title}</h3>
        ${p.small ? `<small>${p.small}</small>` : ""}
      </div>
    `;
  }

  function nextPanel(){
    panelIndex++;
    if(panelIndex >= panels.length){
      showStage("stage6");
      return;
    }
    renderPanel();
  }

  function initSwipe(){
    if(swipeInited || !swipeDeck) return;
    swipeInited = true;

    panelIndex = 0;
    renderPanel();

    let startX=0, startY=0, tracking=false;

    swipeDeck.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      startX=t.clientX; startY=t.clientY;
      tracking=true;
    }, {passive:true});

    swipeDeck.addEventListener("touchend", (e) => {
      if(!tracking) return;
      tracking=false;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if(Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) nextPanel();
    });

    swipeDeck.addEventListener("click", nextPanel);
  }

  // ===== STAGE 6 MEMES ONE BY ONE =====
  const memeImg = $("#memeImg");
  const memeCap = $("#memeCap");
  const prevMemeBtn = $("#prevMemeBtn");
  const nextMemeBtn = $("#nextMemeBtn");

  const memes = [
    { src: "asssets/images/hii%20ni%20yako.png", cap: "Exhibit A: Unprovoked yearning incident." },
    { src: "asssets/images/wolf%20pointing%20meme.png", cap: "Exhibit B: Emotional OSHA violation." },
    { src: "asssets/images/leg%20day.png", cap: "Exhibit C: Astronomical downness confirmed." }
  ];

  let memeIndex = 0;

  function renderMeme(){
    if(!memeImg || !memeCap) return;
    memeImg.src = memes[memeIndex].src;
    memeCap.textContent = memes[memeIndex].cap;
  }

  prevMemeBtn?.addEventListener("click", () => {
    memeIndex = (memeIndex - 1 + memes.length) % memes.length;
    renderMeme();
  });

  nextMemeBtn?.addEventListener("click", () => {
    memeIndex = (memeIndex + 1) % memes.length;
    renderMeme();
  });

  renderMeme();

  // ===== STAGE 6 -> FINAL LETTER =====
  $("#toFinalBtn")?.addEventListener("click", () => {
    showStage("stage7");
    startTypewriter();
  });

  // ===== TYPEWRITER =====
  const typewriter = $("#typewriter");
  let typing = false;

  const finalLetter = `To my Valentine, Beatitude, you fulfilled my dream of being manipulated by a gilr called Wambui.
  i'll say less in this letter than i feel, but know that my feelings are big and they are real.
  Wishing you a happy Valentine's Day filled with laughter, love, and all the things that make your heart smile.s

Of all the words you'll ever hear, remember this: life is likely just the right length to need therapy.
May you stay seriously silly
May you be wickedly kind.
May you be brilliantly dumb, sometimes stupidly bright.
May your certainty always leave room for doubt.
May your weirdness be the norm.
May the coolest thing about you always be your warmth.

May you be powerfully vulnerable — or at least mightily soft.
May you be a contradiction and yet, somehow, perfectly whole.

Whether you are any, none, or all of the above…

Above all, may you know that you are loved.
`;

  async function startTypewriter(){
    if(typing || !typewriter) return;
    typing = true;
    typewriter.textContent = "";
    for(let i=0;i<finalLetter.length;i++){
      typewriter.textContent += finalLetter[i];
      await wait(18);
    }
    typing = false;
  }

});