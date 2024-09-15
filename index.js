import express from "express";
import dotenv from "dotenv";
import Connection from "./database/db.js";
import router from "./router/route.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'https://blogospheree.netlify.app/login',
}));
app.options('*', cors()); // Respond to preflight requests

app.use(bodyParser.json({ extended: "true" }));
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.text({ extended: "true" }));
app.use("/", router);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
const USERNAME = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
Connection(USERNAME, PASSWORD);
