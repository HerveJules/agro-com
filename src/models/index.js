import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import ENV from 'dotenv';
import configs from '../config/config';

ENV.config();

const basename = path.basename(__filename);

const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
  // sequelize = new Sequelize('postgres://fjwrmftmuubqtc:e7c757fff344bf84c2421a4e56f6f4859eae5ccb9249627fcd2e39ddbb4618d1@ec2-54-197-239-115.compute-1.amazonaws.com:5432/d1mf2npa4qqhqv')
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
  // sequelize = new Sequelize('postgres://fjwrmftmuubqtc:e7c757fff344bf84c2421a4e56f6f4859eae5ccb9249627fcd2e39ddbb4618d1@ec2-54-197-239-115.compute-1.amazonaws.com:5432/d1mf2npa4qqhqv')
}

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;