const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = 5001;

const dataShortened = [];

app.get("/api/github", async (req, res) => {
  const url = "https://api.github.com/users/feitosa22/repos";

  try {
    const response = await axios.get(url);
    if (dataShortened.length == 0) {
      response.data.forEach((element) => {
        let object = {
          name: element.full_name.split("/").pop().replace("-", " "),
          urlIMG: element.description,
          homepage: element.homepage,
        };
        dataShortened.push(object);
      });
    }
    res.json(dataShortened);
  } catch (error) {
    console.error("Erro ao carregar Dados:", error.message);
    res.status(500).json({ error: "Erro ao buscar os dados do GitHub" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
