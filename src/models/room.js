module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roomNumber: {
      type: DataTypes.INTEGER,
      unique: true
    },
    roomFloor: DataTypes.INTEGER,
    type: DataTypes.STRING,
    roomArea: DataTypes.FLOAT,
    cost: DataTypes.DECIMAL(10, 2),
    equipment: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RoomEquipments',
        key: 'id'
      }
    }
  })

  Rooms.associate = (models) => {
    Rooms.hasOne(models.RoomEquipments)
  }
  return Rooms
}
