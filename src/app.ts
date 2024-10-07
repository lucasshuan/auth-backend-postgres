import express from "express";
import routes from "./routes";
import cors from "cors";

require("dotenv").config();

const port = 3000;
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(express.json({ limit: "1mb" }));

app.use(routes);

app.listen(port, () => {
  console.log(`🚀 Iniciado em http://localhost:${port}/`);
  console.log(
    "📒 Documentação: https://documenter.getpostman.com/view/33172405/2sAXxLAtEU"
  );
});
