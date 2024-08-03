import express from "express"
import cors from "cors"
import db from "../config/db.js"
import { dbSync } from "./models/sync.js"

// Load the .env variable
import dotenv from 'dotenv';
dotenv.config();

// Import routes
import userRoute from "./routes/UserRoute.js"
import taskRoute from "./routes/TaskRoute.js"

const app = express()
const PORT = process.env.PORT || 3000;


// Cors configuration
app.use(cors())
app.use(express.json());


// Referencing route
const routePrefix = "/api"

app.use(routePrefix, userRoute)
app.use(routePrefix, taskRoute)


const startServer = async () => {
    try {
        await db.authenticate();
        console.log('Database connection established.');
    
        // Sync models
        await dbSync();
        console.log('Models synchronized.');
    
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
  
startServer();