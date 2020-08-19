import { Request, Response } from "express";
import UserDB from "../data/UserDatabase";

export default async function testEndpoint(req: Request, res: Response) {
    try {
        const tables = await new UserDB().getAllTables()

        res
            .status(200)
            .send(tables);
    } catch (error) {
        res
            .status(400)
            .send(error.message);
    }
}