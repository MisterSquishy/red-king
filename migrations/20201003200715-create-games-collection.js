module.exports = {
  async up(db, client) {
    await db.createCollection("games")
  },

  async down(db, client) {
    await db.dropCollection("games")
  }
};
