import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import User from "../models/User.js" 
import { Op } from "sequelize"
// For body validation
import { UserSchema } from "../schemas/UserSchema.js"
import zod from "zod"

// Load the .env variable
import dotenv from 'dotenv';
dotenv.config();


class UserController {
    /**
     * REGISTER
     * Register the user and provide a token for the usser authentication 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns new user instance and token (status 201)
     * 
     * in case of error 
     * @returns status(400, 500) + message + error (detailed information)
     */
    static async register(req, res) {
        try {
            const { 
                name, 
                lastname, 
                email, 
                password, 
                isAdmin 
            } = UserSchema.parse(req.body)
            
            // Check if there is an existing user with the given email
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: 'A user with this email already exist' });
            }

            // Crypt the password to be unrecognizable
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({ 
                name, 
                lastname, 
                email, 
                password: hashedPassword, 
                isAdmin:((isAdmin)?isAdmin:false) 
            });

            const token = jwt.sign(
                { 
                    userId: newUser.id, 
                    isAdmin: newUser.isAdmin 
                }, 
                process.env.SECRET, 
                { expiresIn: '2h' });

            return res.status(201).json({ user: newUser, token });
        } 

        catch(error) {
            console.log("Error captured in register controller: ", error)
            // Error in schema validation
            if(error instanceof zod.ZodError) {
                return res.status(400).json({ 
                    message: 'Données d\'entrée non valides', 
                    errors: error.errors })
            }
            res.status(500).json({
                message: error.message
            })
        } 
    }




    /**
     * LOGIN
     * Log the user and provide a token for the user future use in the app
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns User and token (status 200)
     * 
     * in case of error
     * @return status(404) if there are no user with the given email
     * @return status(401) if the credential were wrong
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Look for the user z=with the email provided
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'User not found, please verify your email.' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Password incorrect.' });
            }

            // Generate a token with the current authenticated user
            const token = jwt.sign(
                { 
                    userId: user.id, 
                    isAdmin: user.isAdmin 
                }, 
                process.env.SECRET, 
                { expiresIn: '2h' });

            res.json({ user, token });
        } catch (error) {
            console.error('Error captured in login controller :', error); 
            if (error instanceof zod.ZodError) {
                return res.status(400).json({ message: 'Données d\'entrée non valides', errors: error.errors });
            }
            res.status(500).json({ message: error.message });
        }
    }




    /**
     * GETUSER
     * 
     * @param {*} req 
     * @param {*} res
     * @return status(200) + user instance
     * 
     * in case of error
     * @return status(404) No user found with the id
     * @return status(500) something bad went wrong
     */
    static async getUser(req, res) {
        const { id } = req.params;
    
        try {
            // Look for the user with the given Id
            const user = await User.findOne({
                where:{id:id}
            })
        
            if (user){
                res.json(user)
            } else {
                res.status(404).json({message: "There's no user found."})
            }
            
        } catch (error) {
            console.log("Error captured in getUser controller :", error)
            res.status(500).json({ message: error.message });
        } 
    }



    
    /**
     * GETUSERBYNAME
     * 
     * @param {*} req 
     * @param {*} res
     * @return status(200) + user instance
     * 
     * in case of error
     * @return status(404) No user found with the id
     * @return status(500) something bad went wrong
     */
    static async getUserByName(req, res) {
        const { name } = req.params;
    
        try {
            // Look for all users with the given name
            const users = await User.findAll({
                where:{
                    name:{
                        [Op.like]: `%${name}%`
                    }, 
                    isAdmin: false
                }
            })
        
            if (users){
                res.json(users)
            } else {
                res.status(404).json({message: "No result found."})
            }
            
        } catch (error) {
            console.log("Error captured in getUser controller :", error)
            res.status(500).json({ message: error.message });
        } 
    }
}

export default UserController