<script>
/* =========================
   ELEMENT REFERENCES
========================= */
const intro = document.getElementById("intro");
const introSound = document.getElementById("introSound");
const soundToggle = document.getElementById("soundToggle");

/* =========================
   INTRO LANGUAGE DATA
========================= */
const introText = {
  en: {
    title: "Richie’s A2Z Services",
    sub: "Krishnagiri"
  },
  ta: {
    title: "ரிச்சியின் A2Z சேவைகள்",
    sub: "கிருஷ்ணகிரி"
  }
};

/* =========================
   SITE LANGUAGE TOGGLE
========================= */
function setLang(lang){
  document.querySelectorAll("[data-en]").forEach(el=>{
    el.innerText = lang === "ta" ? el.dataset.ta : el.dataset.en;
  });
}

/* =========================
   INTRO LANGUAGE TOGGLE
========================= */
function setIntroLang(lang){
  const title = document.getElementById("introTitle");
  const sub = document.getElementById("introSub");
  if(title && sub){
    title.innerText = introText[lang].title;
    sub.innerText = introText[lang].sub;
  }
}

/* =========================
   SCROLL REVEAL (LUXURY)
========================= */
function handleReveal(){
  document.querySelectorAll(".reveal").forEach(el=>{
    if(el.getBoundingClientRect().top < window.innerHeight - 120){
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", handleReveal);

/* =========================
   INTRO CONTROL
========================= */
function skipIntro(){
  if(intro){
    intro.classList.add("hide");
    localStorage.setItem("introSeen", "yes");
  }
}

/* =========================
   SOUND CONTROL
========================= */
let soundEnabled = localStorage.getItem("sound") !== "off";

function toggleSound(){
  soundEnabled = !soundEnabled;
  localStorage.setItem("sound", soundEnabled ? "on" : "off");
  updateSoundIcon();
}

function updateSoundIcon(){
  if(soundToggle){
    soundToggle.innerText = soundEnabled ? "🔊" : "🔇";
  }
}

/* =========================
   ON PAGE LOAD
========================= */
window.addEventListener("load", ()=>{
  handleReveal();

  updateSoundIcon();

  // If intro already seen, skip completely
  if(localStorage.getItem("introSeen")){
    if(intro){
      intro.style.display = "none";
    }
    return;
  }

  // Play sound only if enabled
  if(soundEnabled && introSound){
    setTimeout(()=>{
      introSound.play().catch(()=>{});
    }, 600);
  }

  // Auto hide intro after animation
  setTimeout(()=>{
    skipIntro();
  }, 3500);
});
</script>

