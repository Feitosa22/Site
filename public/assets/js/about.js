const itensSkills = [
  { name: "HTML", icon: "/public/assets/images/html.svg", color: "#E44F26" },
  {
    name: "CSS",
    icon: "/public/assets/images/css.svg",
    color: "#1572B6",
  },
  {
    name: "JavaScript",
    icon: "/public/assets/images/js.svg",
    color: "#F7DF1E",
  },
  { name: "React", icon: "/public/assets/images/react.svg", color: "#00D8FF" },
  {
    name: "TailwindCss",
    icon: "/public/assets/images/tailwindcss.svg",
    color: "#44A8B3",
  },
  {
    name: "TypeScript",
    icon: "/public/assets/images/typescript.svg",
    color: "#3178C6",
  },
  { name: "NextJS", icon: "/public/assets/images/nextjs.svg", color: "black" },
  {
    name: "MongoDB",
    icon: "/public/assets/images/mongodb.svg",
    color: "#41A247",
  },
  {
    name: "NodeJs",
    icon: "/public/assets/images/nodejs.svg",
    color: "#8CC84B",
  },
];

let cards = document.querySelector("#cards");

let htmlContent = "";

itensSkills.forEach((item) => {
  if (item.name && item.color && item.icon) {
    htmlContent += `
      <div class="card ${item.color}" style="border-color: ${item.color};">
        <img src="${item.icon}" />
        <span style="background-color: ${item.color}; --after-border-color: ${item.color} transparent transparent transparent;">
          ${item.name}
        </span>
      </div>
    `;
  } else {
    console.warn(`Item incompleto: ${JSON.stringify(item)}`);
  }
});

cards.innerHTML = htmlContent;
