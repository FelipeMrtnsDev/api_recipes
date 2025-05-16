import{ Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

interface BasicMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface DetailedMeal extends BasicMeal {
  strInstructions: string;
  strCategory: string;
  strArea: string;
  [key: string]: any;
}

interface MealsListResponse {
  meals: BasicMeal[] | null;
}

interface MealDetailResponse {
  meals: DetailedMeal[] | null;
}

router.get("/recipes", async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get<MealDetailResponse>("https://www.themealdb.com/api/json/v1/1/search.php?s=");
    const result = response.data;

    if (!result.meals) {
      res.status(404).send("Nenhuma receita encontrada");
      return;
    }

    res.json(result);
  } catch {
    res.status(500).send("Erro ao buscar receitas");
  }
});

router.get("/recipes/ingredient/:ingredient", async (req: Request, res: Response): Promise<void> => {
  const ingredient = req.params.ingredient;

  try {
    const response = await axios.get<MealsListResponse>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const result = response.data;

    if (!result.meals) {
      res.status(404).send("Nenhuma receita com esse ingrediente");
    }

    res.json(result.meals);
  } catch {
    res.status(500).send("Erro ao buscar por ingrediente");
  }
});

router.get("/recipes/country/:country", async (req: Request, res: Response): Promise<void> => {
  const country = req.params.country;

  try {
    const response = await axios.get<MealsListResponse>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`
    );
    const result = response.data;

    if (!result.meals) {
      res.status(404).send("Nenhuma receita para esse país");
    }

    res.json(result.meals);
  } catch {
    res.status(500).send("Erro ao buscar por país");
  }
});

router.get("/recipes/category/:category", async (req: Request, res: Response): Promise<void> => {
  const category = req.params.category;

  try {
    const response = await axios.get<MealsListResponse>(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const result = response.data;

    if (!result.meals) {
      res.status(404).send("Nenhuma receita nessa categoria");
    }

    res.json(result.meals);
  } catch {
    res.status(500).send("Erro ao buscar por categoria");
  }
});

router.get("/recipe/:id", async (req: Request, res: Response): Promise<void> => {
  const id = req.params.id;

  try {
    const response = await axios.get<MealDetailResponse>(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const result = response.data;

    if (!result.meals || result.meals.length === 0) {
      res.status(404).send("Receita não encontrada");
      return
    }

    res.json(result.meals[0]);
  } catch {
    res.status(500).send("Erro ao buscar detalhes da receita");
  }
});

export default router;
