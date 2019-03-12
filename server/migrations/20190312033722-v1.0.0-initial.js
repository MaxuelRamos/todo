module.exports = {
  async up(db) {
    // TODO write your migration here. Return a Promise (and/or use async & await).
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    await db.collection('users').insert([{"email": "suporte@ponto.com", "password": "$2b$10$dRPZywHBatSJ30RCSYa6AOT76fUy/UscZGRMhFYgy5T54Ld4thNRG", "role": "ADMIN"}])
  },

  down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // return db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
