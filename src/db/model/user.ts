import { Sequelize, DataTypes, Model } from 'sequelize';

export class User extends Model {
  public email: string;
  public password: string;
}

const schema = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export const initUser = (sequelize: Sequelize) => {
  User.init(schema, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    underscored: true,
    tableName: 'user',
  });
};
