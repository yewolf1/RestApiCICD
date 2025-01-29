import express from "express";
import cors from "cors";
import { Router } from "express";
import { setTaskRoutes } from "./routes/taskRoutes";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

app.use(cors());
app.use(express.json());

// Servir les fichiers statiques pour le frontend
app.use(express.static(path.join(__dirname, "src")));

// Charger Swagger en YAML
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));

// Ajouter Swagger à `/api-docs`
app.use("/api-docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

console.log(
  "Swagger documentation available at: http://localhost:3000/api-docs/"
);

// Définition des routes API
const router = Router();
setTaskRoutes(router);
app.use("/api", router);

export default app;
