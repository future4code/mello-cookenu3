import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import testEndpoint from "./endpoints/testEndpoint";
import createRecipe from "./endpoints/createRecipe";
import getRecipeById from "./endpoints/getRecipeById";
import followNewUser from "./endpoints/followNewUser";
import unfollowUser from "./endpoints/unfollowUser";
import getUserByID from "./endpoints/getUserById";

/******************************************************************/

dotenv.config();

/******************************************************************/

const app = express();
app.use(express.json());

app.get("/test", testEndpoint);

app.get("/user/:id", getUserByID);
app.post("/recipe", createRecipe);
app.get("/recipe/:id", getRecipeById);
app.post("/user/follow", followNewUser);
app.post("/user/unfollow", unfollowUser);


const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
