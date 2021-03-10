// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : 'us-cdbr-east-03.cleardb.com',
      user : 'b89a01f0f96ce8',
      password : '19ab8067',
      database : 'heroku_cf2beb55738e241'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
