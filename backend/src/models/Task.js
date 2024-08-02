import { Model, DataTypes } from "sequelize"
import db from "../../config/db.js"

class Task extends Model {}

Task.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
      },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
{
    sequelize: db,
    tableName: "task",   
})



export default Task