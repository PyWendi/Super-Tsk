import { Model, DataTypes } from "sequelize"
import db from "../../config/db.js"

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
},
{
    sequelize: db,
    tableName: "user",   
    timestamps: false 
})

export default User;