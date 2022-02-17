const title = document.querySelector("h1");
const messageContainer = document.getElementById("message");

const stepsContainer = document.getElementById("steps-container");
const steps = document.querySelectorAll(".step");

const progress = document.getElementById("progress-bar");
const btnContainer = document.getElementById("buttons-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const submitBtn = document.getElementById("submit");
const reducedMotion =
  window.matchMedia("(prefers-reduced-motion)").matches ||
  window.matchMedia("(prefers-reduced-motion: reduced)").matches;

let curStep = 1;

function nextStep() {
  if (curStep === steps.length) return;
  curStep >= 1 && curStep < steps.length && curStep++;
}

function prevStep() {
  if (curStep === 1) return;
  curStep--;
}

function checkStep() {
  prevBtn.disabled = curStep === 1 ? true : false;
  nextBtn.disabled = curStep === steps.length ? true : false;

  if (curStep === steps.length) {
    submitBtn.style.opacity = 1;
    submitBtn.style.pointerEvents = "all";
    submitBtn.style.transform = "translateY(0)";
    prevBtn.style.transform = "translateX(-60px)";
    nextBtn.style.transform = "translateX(60px)";
  } else {
    submitBtn.style.opacity = 0;
    submitBtn.style.pointerEvents = "none";
    submitBtn.style.transform = "translateY(-20px)";
    prevBtn.style.transform = "translateX(0)";
    nextBtn.style.transform = "translateX(0)";
  }
}

function updateProgress() {
  steps.forEach((step, i) => {
    if (i < curStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });

  const activeSteps = document.querySelectorAll(".active");

  progress.style.width = `${
    ((activeSteps.length - 1) / (steps.length - 1)) * 100
  }%`;
}

function handleClick({ target }) {
  const clicked = target.closest("button");
  if (!clicked) return;
  const clickedBtn = clicked.innerText;

  if (clickedBtn === "NEXT") {
    nextStep();
  } else if (clickedBtn === "PREV") {
    prevStep();
  } else if (clickedBtn === "SUBMIT") {
    handleSubmit();
    return;
  }
  checkStep();
  updateProgress();
}

function handleSubmit() {
  stepsContainer.style.opacity = 0;
  btnContainer.style.opacity = 0;
  title.style.opacity = 0;
  if (!reducedMotion) {
    stepsContainer.style.transform = "translateY(100px)";
    btnContainer.style.transform = "translateY(150px)";
    title.style.transform = "translateY(200px)";
  }

  if (!reducedMotion) {
    setTimeout(() => {
      messageContainer.style.display = "block";
      setTimeout(() => {
        messageContainer.style.opacity = 1;
        messageContainer.style.transform = "translateY(-50px)";
      }, 100);
    }, 365);
  } else {
    setTimeout(() => {
      messageContainer.style.transform = "translateY(-100px)";
      messageContainer.style.display = "block";
      setTimeout(() => {
        messageContainer.style.opacity = 1;
      }, 100);
    }, 100);
  }
}

btnContainer.addEventListener("click", handleClick);
