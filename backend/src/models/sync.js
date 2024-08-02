import User from './User.js';
import Task from './Task.js';

// Define associations
Task.belongsTo(User, {
    foreignKey: "owner",
    constraints: false,
})

// Synchronise the database to the models
const dbSync = async () => {
  await User.sync();
  await Task.sync();
};

export { User, Task, dbSync };
