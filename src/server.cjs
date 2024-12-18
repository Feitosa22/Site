const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

app.post("/enviar-email", (req, res) => {
  const { sendername, replyto, subject, msg } = req.body;
  function temCaracteresEspeciais(valor) {
    const regex = /[!@#$%^&*(),.?":{}|<>]/g;
    return regex.test(valor);
  }
  function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }
  if (
    !sendername ||
    temCaracteresEspeciais(sendername) ||
    !replyto ||
    validarEmail(replyto) ||
    !subject ||
    subject.length > 50 ||
    !msg ||
    msg.length > 200
  ) {
    res.status(422).json({ message: "Erro nos dados!" });
    return;
  }
  const paramsServer = {
    to: process.env.GMAIL_USER,
    subject: subject,
    text: `Nome:${sendername}\nEmail:${replyto}\nMensagem:${message}\n`,
  };

  transporter.sendMail(paramsServer, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).json({ message: "Erro ao enviar e-mail", error });
    } else {
      res.json({
        message: "Mensagem enviada com sucesso!",
        response: info.response,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
