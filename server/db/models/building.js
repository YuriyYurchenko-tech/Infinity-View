const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Building extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Appartment, Floor }) {
      // define association here
      this.hasMany(Appartment, { foreignKey: 'buildingId' });
    }
  }
  Building.init(
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      floorQuantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Building',
    },
  );
  return Building;
};
