import BaseDB from "./BaseDatabase";

export default class UserDB extends BaseDB {
  static tableName = "Cookenu_Users";

  async createUser(id: string, name: string, email: string, password: string) {
    await this.getConnection()
      .insert({ id, name, email, password })
      .into(UserDB.tableName);

    await this.destroyConnection();
  }

  async getUserByEmail(email: string) {
    const result = await this.getConnection()
      .select("*")
      .from(UserDB.tableName)
      .where({ email });

    await this.destroyConnection();

    return result[0];
  }

  async editUser(id: string, name: string, email: string) {
    let queryFields = [
      name && `name = "${name}"`,
      email && `email = "${email}"`,
    ];

    queryFields = queryFields.filter((field) => field); // remove valores undefined

    if (!queryFields.length) {
      throw new Error("Informe ao menos um valor para alterar");
    }

    await this.getConnection().raw(`
            UPDATE ${UserDB.tableName} 
            SET ${queryFields.join(",")}
            WHERE id = "${id}"
        `);

    await this.destroyConnection();
  }

  async getUserById(id: string) {
    const result = await this.getConnection().raw(`
            SELECT id, name, email FROM ${UserDB.tableName}
            WHERE id = "${id}"
        `);

    await this.destroyConnection();

    return result[0][0];
  }

  async deleteUserById(id: string) {
    const result = await this.getConnection().raw(`
            DELETE FROM ${UserDB.tableName}
            WHERE id = "${id}"
        `);

    await this.destroyConnection();

    return result[0][0];
  }

  async getAllTables() {
    const result = await this.getConnection().raw(`SHOW TABLES`);
    await this.destroyConnection();
    return result[0];
  }
}
