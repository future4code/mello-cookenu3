import BaseDB from "./BaseDatabase";

export default class FollowsDB extends BaseDB {
  static tableName = "Cookenu_Follows";

  async followNewUser(id: string, user_id: string, follower_id: string) {
    await this.getConnection()
      .insert({
        id,
        user_id,
        follower_id,
      })
      .into(FollowsDB.tableName);

    await this.destroyConnection();
  }

  async unfollowUser(user_id: string, follower_id: string) {
    const result = await this.getConnection().raw(`
            DELETE FROM ${FollowsDB.tableName}
            WHERE user_id = "${user_id}" AND follower_id = "${follower_id}"
        `);
    console.log(user_id);
    console.log(follower_id);

    await this.destroyConnection();

    return result[0][0];
  }
}
