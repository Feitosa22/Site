let btnSend = document.querySelector("#btnSend");
let form = document.querySelector("#form");
let camposFrom = document.querySelectorAll(".formData");

function message(msg) {
  setTimeout(() => {
    btnSend.style.pointerEvents = "auto";
    form.style.pointerEvents = "auto";
  }, 5000);
  alertCustomizado1("feedback", msg);
  Spinner("btnSend", "Enviar");
}

function limparCampos() {
  document.querySelectorAll(".formData").forEach((campo) => {
    campo.value = "";
  });
}

function erroForm(msgError, localDoErro) {
  document.getElementById(`${localDoErro}`).classList.add("erroForm");
  document.querySelector(`label[for="${localDoErro}"]`).textContent = msgError;
}

function removeErroOnFocus() {
  document.addEventListener(
    "focus",
    (event) => {
      if (event.target.classList.contains("erroForm")) {
        event.target.classList.remove("erroForm");
        document.querySelector(`label[for="${event.target.id}"]`).textContent =
          "";
      }
    },
    true
  );
}

removeErroOnFocus();

function validarFormulario() {
  let params = {
    sendername: document.querySelector("#sendername").value,
    replyto: document.querySelector("#replyto").value,
    subject: document.querySelector("#subject").value,
    msg: document.querySelector("#message").value,
  };

  if (!params.sendername) {
    erroForm("Nome obrigatório!", "sendername");
    return;
  }

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(params.replyto) || !params.replyto) {
    erroForm("O email deve estar no formato email@exemplo.com", "replyto");
    return;
  }

  if (!params.subject) {
    erroForm("O assunto é obrigatório!", "subject");
    return;
  }

  if (!params.msg) {
    erroForm("A mensagem é obrigatória!", "message");
    return;
  }
  Spinner("btnSend");
  enviarFormulario(params);
}

async function enviarFormulario(params) {
  form.style.pointerEvents = "none";
  try {
    const response = await fetch("http://localhost:8080/enviar-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (response.ok) {
      message("Mensagem enviada com sucesso!");
    } else {
      throw new Error(data.message || "Erro desconhecido.");
    }
    limparCampos();
  } catch (error) {
    message("Erro ao enviar.\n Favor entrar em contato pelo whatsapp.");
    limparCampos();
  }
}
