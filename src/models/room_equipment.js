module.exports = (sequelize, DataTypes) => {
  const RoomsEQ = sequelize.define('Room_Equipments', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bedNumber: DataTypes.INTEGER,
    teapot: DataTypes.BOOLEAN,
    tv: DataTypes.BOOLEAN,
    balcony: DataTypes.BOOLEAN,
    fridge: DataTypes.BOOLEAN,
    free_beverages: DataTypes.BOOLEAN
  })

  return RoomsEQ
}
