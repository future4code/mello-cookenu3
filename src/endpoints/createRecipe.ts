import { Request, Response } from "express";
import IdGenerator from "../services/IdGenerator";
import TaskDB from "../data/RecipeDatabase";
import Authenticator from "../services/Authenticator";
import UserDB from "../data/UserDatabase";
import RecipeDB from "../data/RecipeDatabase";

export default async function createRecipe(req: Request, res: Response) {
  try {
    const token = req.headers.auth as string;
    const tokenData = Authenticator.getTokenData(token);

    const userDatabase = new UserDB();

    const { title, description } = req.body;
    const id = IdGenerator.execute();

    const creatorId = await userDatabase.getUserById(tokenData.id);

    if (!title || !description) {
      throw new Error('"Title" and "description" are mandatory!');
    }

    await new RecipeDB().createRecipe(id, title, description, creatorId.id);

    res.status(200).send({
      message: "Nova receita adicionada!",
    });
  } catch (error) {
    res.status(400).send({
      message: error.sqlMessage || error.message,
    });
  }
}
