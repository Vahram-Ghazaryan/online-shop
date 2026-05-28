const db = require('./models');

async function syncDatabase() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.query('CREATE SCHEMA IF NOT EXISTS "online_shop";');
    await db.sequelize.sync({ force: true });
    console.log('Database synced successfully');
    process.exit(0);
  } catch (error) {
    console.error('Sync error:', error.message);
    process.exit(1);
  }
}

syncDatabase();
