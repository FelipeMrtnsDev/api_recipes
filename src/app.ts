import express from "express";
import recipesRoutes from "./routes/recipes.routes";

const app = express();

app.use(express.json());

app.use("/", recipesRoutes);

export default app;
