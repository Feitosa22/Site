const card = document.querySelector(".cards");
let slidesLength = 0;
const nav = document.querySelector(".nav-auto");

async function fetchGitHub() {
  try {
    const response = await fetch(
      "https://api.github.com/users/feitosa22/repos"
    );
    if (!response.ok) {
      throw new Error(`Erro: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    let duplicarPrimeiroCard = data[0];
    data.push(duplicarPrimeiroCard);

    let htmlCard = "";
    let htmlBtn = "";

    data.forEach((item, index) => {
      if (item.name !== "Feitosa22") {
        htmlCard += `
          <div class="card" ">
            <img src="${item.description}" alt="Imagem de ${item.name.replace(
          "-",
          " "
        )}" />
            <span>${item.name}</span>
            <a href="${item.homepage}">Clique Aqui Para Ver Demo</a>
          </div>`;
        if (data.length !== index + 1) {
          htmlBtn += `<div class="auto-btn btn${slidesLength}" data-info="${slidesLength}"></div>`;
        }
        slidesLength++;
      }
    });

    nav.innerHTML = htmlBtn;
    localStorage.setItem("navProjects", htmlBtn);
    card.innerHTML = htmlCard;
    localStorage.setItem("cardProjects", htmlCard);
  } catch (error) {
    console.error("Erro ao buscar os dados:", error.message);
  }
}
fetchGitHub();
function primeiroAcesso() {
  const htmlCard = localStorage.getItem("cardProjects");
  const htmlBtn = localStorage.getItem("navProjects");
  if (htmlCard && htmlBtn) {
    nav.innerHTML = htmlBtn;
    card.innerHTML = htmlCard;
    return;
  }
}

let count = 0;
let countInfinite = 0;

slidesLength = card.childElementCount;
function moveSlide(step) {
  card.style.transition = "transform 1s ease-in-out";
  count++;

  if (step !== undefined) {
    count = step;
  }
  countInfinite = count;
  if (count == slidesLength - 1) {
    count = 0;
  }

  document.querySelectorAll(".auto-btn").forEach((element) => {
    element.classList.remove("active");
  });

  card.style.transform = `translateX(-${countInfinite * 95}%)`;

  document.querySelector(`.btn${count}`).classList.add("active");
  if (countInfinite == slidesLength - 1) {
    setTimeout(() => {
      card.style.transition = "none";
      card.style.transform = "translateX(0)";
    }, 920);
  }
}

let slideOnn = setInterval(moveSlide, 10000);
nav.addEventListener("click", (event) => {
  moveSlide(parseInt(event.target.getAttribute("data-info")));
});

let cor1 = "#a1a1aa";
let cor2 = "#1e1b4b";
let bordaProgresso = document.querySelector(".container ");
let valor = document.querySelector(".valor");
let countBorder = 0;
let countFinal = 360;
let segundos = 5;

setInterval(() => {
  segundos = Math.ceil(10 - parseInt(countBorder) / 36);
  countBorder += 1.8;
  //preferi essa soma pois são 360 graus
  bordaProgresso.style.background = `conic-gradient(${cor1} ${countBorder}deg, ${cor2} 0deg)`;
  valor.textContent = `${segundos}s`;

  if (parseInt(countBorder) === countFinal) {
    let temp = "";
    temp = cor1;
    cor1 = cor2;
    cor2 = temp;
    countBorder = 0;
    segundos = 5;
  }
}, 50);
