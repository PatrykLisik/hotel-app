module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('ContactForms', {
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
    text: DataTypes.STRING
  })

  Form.associate = (models) => {
    Form.hasOne(models.Users)
  }
  return Form
}
