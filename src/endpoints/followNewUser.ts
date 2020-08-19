import { Request, Response } from "express";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
import UserDB from "../data/UserDatabase";
import RecipeDB from "../data/RecipeDatabase";
import FollowsDB from "../data/FollowsDatabase";

export default async function followNewUser(req: Request, res: Response) {
  try {
    const token = req.headers.auth as string;
    const tokenData = Authenticator.getTokenData(token);

    const userDatabase = new UserDB();

    const followerId = req.body.userToFollowId;
    const id = IdGenerator.execute();

    const user = await userDatabase.getUserById(tokenData.id);

    if (!followerId) {
      throw new Error('"Follower_id" is mandatory!');
    }

    await new FollowsDB().followNewUser(id, user.id, followerId);

    res.status(200).send({
      message: `Success! You are now following them`,
    });
  } catch (error) {
    res.status(400).send({
      message: error.sqlMessage || error.message,
    });
  }
}
