//controller.js
import bcrypt from 'bcryptjs';
import { pool } from './db_connect.js';
//Signup
export const signupRouter = async (req, res) => {
    const { email, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const result = await pool.query('INSERT INTO userdata (email, phoneNumber, password) VALUES ($1, $2, $3) RETURNING id', [email, phoneNumber, hashedPassword]);
        res.status(201).send(`User ${result.rows[0].id} created successfully`);
    } 
    catch (error) {
        console.error('Error creating user:', error);
        res.status(400).send('Error creating user');
    }
};


//LogIn
export const loginRouter = async (req, res) => {
    const { email, password } = req.body;
    
    try{
        console.log('Email:', email);
        const result = await pool.query('SELECT * FROM userdata WHERE email = $1', [email]);
        console.log('Query result:', result.rows);
        if (result.rows.length === 0) {
            return res.status(401).send('Invalid email or password');
        }
        const user = result.rows[0];
        console.log('User data:', user);
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log('Password validation:', isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }
        req.session.userId = user.id;
        res.send('Login successful');
    } 
    catch (error) {
        console.error('Error logging in:', error);
        res.status(400).send('Error logging in: ' + error.message); // Send error message for debugging
    }
};
