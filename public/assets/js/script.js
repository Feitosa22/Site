const menuItemsNav = [
  {
    text: "Início",
    link: "/",
    icon: "/public/assets/images/home.svg",
  },
  {
    text: "Sobre",
    link: "/sobre",
    icon: "/public/assets/images/about.svg",
  },
  {
    text: "Projetos",
    link: "/projetos",
    icon: "/public/assets/images/skills.svg",
  },
  {
    text: "Contato",
    link: "/contato",
    icon: "/public/assets/images/email.svg",
  },
];

const menuItemsFooter = [
  {
    link: "https://wa.me/5511981222710",
    icon: "/public/assets/images/whatsapp2.svg",
    iconHover: "/public/assets/images/whatsapp2Green.svg",
    color: "#25D366",
  },
  {
    link: "https://www.linkedin.com/in/feitosa22",
    icon: "/public/assets/images/linkedin2.svg",
    iconHover: "/public/assets/images/linkedin2Blue.svg",
    color: "#0A66C2",
  },
  {
    link: "https://www.facebook.com/feitosa22a",
    icon: "/public/assets/images/facebook.svg",
    iconHover: "/public/assets/images/facebookBlue.svg",
    color: "#1877F2",
  },
  {
    link: "https://www.instagram.com/feitosa22a",
    icon: "/public/assets/images/instagramBlack.svg",
    iconHover: "/public/assets/images/instagram.svg",
    color:
      "linear-gradient(45deg, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)",
  },
  {
    link: "https://www.youtube.com/@Feitosa22a",
    icon: "/public/assets/images/youtubeBlack.svg",
    iconHover: "/public/assets/images/youtube.svg",
    color: "#FF0000",
  },
  ,
  {
    link: "https://github.com/feitosa22",
    icon: "/public/assets/images/github2.svg",
    iconHover: "/public/assets/images/github2Gray.svg",
    color: "#181717",
  },
];
const main = document.querySelector("main");
const header = document.querySelector("header");
const footer = document.querySelector("footer");

async function gerarMenu() {
  const menuHTML = menuItemsNav
    .map(
      (item) =>
        `<a href="${item.link}" class="btnMenu"><span>${item.text}</span><img src="${item.icon}"></img></a>`
    )
    .join("");
  const navHTML = `<nav>${menuHTML}</nav>`;
  header.innerHTML = navHTML;
}

async function gerarbtnTema() {
  const temaCache = localStorage.getItem("tema");
  if (temaCache) {
    main.insertAdjacentHTML("beforeend", temaCache);
    return;
  }
  const btnHTML = `
  <div id="tema">
    <input id="checkbox" name="checkbox" type="checkbox" />
    <label class="label" for="checkbox"></label>
  </div>
`;

  main.insertAdjacentHTML("beforeend", btnHTML);
  localStorage.setItem("tema", btnHTML);
}

function gerarFooter() {
  const footerHTML = menuItemsFooter
    .map(
      (item) =>
        `<a href="${item.link}" class="iconsFooter">
          <img src="${item.icon}" data-hover="${item.iconHover}" data-hover1="${item.icon}"/>          
        </a>`
    )
    .join("");

  let menuFooter = `<ul>${footerHTML}</ul>`;

  localStorage.setItem("footerHTML", menuFooter);

  footer.innerHTML = menuFooter;
}

window.onload = function () {
  const menuItems = document.querySelectorAll(".btnMenu");
  const currentPage = window.location.pathname.split("/").pop();
  menuItems.forEach((item) => {
    if (item.getAttribute("href") === `${"/" + currentPage}`) {
      item.classList.add("active");
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  gerarFooter();
  gerarMenu();
  gerarbtnTema();

  const checkbox = document.getElementById("checkbox");
  const estadoCheckbox = localStorage.getItem("checkboxEstado");

  if (estadoCheckbox === "true") {
    checkbox.checked = true;
  } else {
    checkbox.checked = false;
  }
  checkbox.addEventListener("change", function () {
    localStorage.setItem("checkboxEstado", checkbox.checked);
  });
});

function Spinner(target, currentContent) {
  if (!currentContent) {
    document.querySelector(`#${target}`).innerHTML =
      '<div class="spinner2"></div>';
    document.querySelector(`#${target}`).style.pointerEvents = "none";
    const spinner = document.querySelector(".spinner2");
    for (let i = 0; i < 12; i++) {
      const div = document.createElement("div");
      div.classList.add("line");
      spinner.appendChild(div);
    }
    return;
  }
  document.querySelector(`#${target}`).innerHTML = currentContent;
}

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

document.addEventListener("copy", (event) => {
  event.preventDefault();
});

function alertCustomizado1(target, msg) {
  document.querySelector(`#${target}`).innerHTML = `<label>
  <input type="checkbox" class="alertCheckbox" autocomplete="off"/>
  <div class="alert info">
    <span class="alertText">${msg}
    <br/>> Clique para Fechar <</span>
  </div>
</label>`;
}

let animationInterval;

function startAnimation() {
  document.querySelectorAll(".iconsFooter").forEach((target, index) => {
    let img = target.children[0];
    setTimeout(() => {
      const imagem1 = img.dataset.hover1;
      const imagem2 = img.dataset.hover;
      img.style.animation = " scale 1s ease-in-out";
      img.src = img.src.endsWith(imagem1) ? imagem2 : imagem1;
    }, index * 100);
    setTimeout(() => {
      img.style.animation = "none";
    }, 1200);
  });

  setTimeout(startAnimation, 12000);
}

startAnimation();
