import recipesRoutes from "./routes/recipes.routes";
import cors from 'cors';
import express from 'express';

const app = express();
app.use(express.json())
app.use(cors());

app.use("/", recipesRoutes);

export default app;
