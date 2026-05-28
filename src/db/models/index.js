const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    define: {
      schema: 'online_shop',
    }
  }
);

const SellerModel = require('./Seller');
const ProductModel = require('./Product');
const NotificationModel = require('./Notification');

const Seller = SellerModel(sequelize);
const Product = ProductModel(sequelize);
const Notification = NotificationModel(sequelize);

Seller.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
Product.belongsTo(Seller, { foreignKey: 'sellerId', as: 'seller' });

const db = {
  sequelize,
  Sequelize,
  Seller,
  Product,
  Notification,
};

module.exports = db;
