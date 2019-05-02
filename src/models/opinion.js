module.exports = (sequelize, DataTypes) => {
  const Opinions = sequelize.define('Opinions', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    reservationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reservations',
        key: 'id'
      }
    },
    rating: {
      type: DataTypes.ENUM,
      values: ['0', '1', '2', '3', '4', '5']
    },
    text: DataTypes.STRING
  })

  Opinions.associate = (models) => {
    Opinions.hasOne(models.Users)
  }
  Opinions.associate = (models) => {
    Opinions.hasOne(models.Reservations)
  }
  return Opinions
}
