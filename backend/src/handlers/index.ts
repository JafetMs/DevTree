import { Request, Response } from "express";
import slug from 'slug';
import { User } from "../models/User";
import { hashPasssword, checkPassword } from "../utils/auth"; // Assumed you have checkPassword
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request, res: Response) => {
    try {
        
        const { email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            const error = new Error('User already registered');
            return res.status(409).json({ error: error.message });
        }

        const handle = slug(req.body.handle, '');
        const handleExists = await User.findOne({ handle });

        if (handleExists) {
            const error = new Error('Username not available');
            return res.status(409).json({ error: error.message });
        }

        const user = new User(req.body);
        user.password = await hashPasssword(password);
        user.handle = handle; 
        
        await user.save();

        res.status(201).send('Account created successfully');

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            const error = new Error('User not found');
            return res.status(404).json({ error: error.message });
        }

        const isPasswordCorrect= await checkPassword(password, user.password);
        
        if (!isPasswordCorrect) {
            const error = new Error('Invalid password');
            return res.status(401).json({ error: error.message });
        }

        const token = generateJWT({id: user._id});

        res.send(token);
        // res.send('Authenticated successfully');

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }

}

export const getUser = async( req:Request, res:Response) => {
        console.log('getUser');
       const bearer =  req.headers.authorization;

       if (!bearer) {
            const error = new Error('No authorized')
            return res.status(401).json({error: error.message})
       }
        res.send('getUser');
    }