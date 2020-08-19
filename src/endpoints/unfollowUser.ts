import { Request, Response } from "express";
import IdGenerator from "../services/IdGenerator";
import Authenticator from "../services/Authenticator";
import UserDB from "../data/UserDatabase";
import FollowsDB from "../data/FollowsDatabase";

export default async function unfollowUser(req: Request, res: Response) {
  try {
    const token = req.headers.auth as string;
    const tokenData = Authenticator.getTokenData(token);

    const userDatabase = new UserDB();

    const personToUnfollow = req.body.userToUnfollowId;
    const id = IdGenerator.execute();

    const user = await userDatabase.getUserById(tokenData.id);

    if (!personToUnfollow) {
      throw new Error('"userToUnfollowId" is mandatory!');
    }

    await new FollowsDB().unfollowUser(user.id, personToUnfollow);

    res.status(200).send({
      message: `Success! You are now unfollowing them`,
    });
  } catch (error) {
    res.status(400).send({
      message: error.sqlMessage || error.message,
    });
  }
}
