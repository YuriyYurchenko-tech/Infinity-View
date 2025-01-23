const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FloorType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FloorType.init({
    img: DataTypes.STRING,
    img2: DataTypes.STRING,
    floorDiapason: DataTypes.STRING,
    building: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'FloorType',
  });
  return FloorType;
};
