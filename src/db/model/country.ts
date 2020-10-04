import { Sequelize, DataTypes, Model } from 'sequelize';

export class Country extends Model {
  public name: string;
  public gmtOffset: number;
}

const schema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  gmtOffset: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

export const initCountry = (sequelize: Sequelize) => {
  Country.init(schema, {
    sequelize,
    createdAt: false,
    updatedAt: false,
    underscored: true,
    tableName: 'country',
  });
};
