module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define('Rooms', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    room_number: {
      type: DataTypes.INTEGER,
      unique: true
    },
    room_floor: DataTypes.INTEGER,
    type: DataTypes.STRING,
    room_area: DataTypes.FLOAT,
    cost: DataTypes.DECIMAL(10, 2),
    equipment: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Room_Equipments',
        key: 'id'
      }
    }
  })

  Rooms.associate = (models) => {
    Rooms.hasOne(models.Room_Equipments)
  }
  return Rooms
}
