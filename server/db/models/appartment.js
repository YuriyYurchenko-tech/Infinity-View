const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appartment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Building }) {
      // define association here
      this.belongsTo(Building, { foreignKey: 'buildingId' });
    }
  }
  Appartment.init(
    {
      square: DataTypes.INTEGER,
      img: DataTypes.STRING,
      floor: DataTypes.INTEGER,
      roomsQuantity: DataTypes.INTEGER,
      deadline: DataTypes.STRING,
      price: DataTypes.INTEGER,
      buildingId: DataTypes.INTEGER,
      reservation: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Appartment',
    },
  );
  return Appartment;
};
