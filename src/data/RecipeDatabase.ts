import BaseDB from "./BaseDatabase";
import moment from "moment";

export default class RecipeDB extends BaseDB {
  static tableName = "Cookenu_Recipes";

  async createRecipe(
    id: string,
    title: string,
    description: string,
    creator_id: string
  ) {
    await this.getConnection()
      .insert({
        id,
        title,
        description,
        creation_date: moment().format("YYYY-MM-DD"),
        creator_id,
      })
      .into(RecipeDB.tableName);

    await this.destroyConnection();
  }

  async getRecipeById(id: string) {
    const result = await this.getConnection().raw(`
            SELECT *
            FROM ${RecipeDB.tableName}
            WHERE ${RecipeDB.tableName}.id = "${id}"
        `);
    await this.destroyConnection();

    return result[0][0];
  }
}
