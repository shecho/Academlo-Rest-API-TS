import express from 'express';
import authController from '../controllers/auth';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);

router.post('/verify', (req, res) => {
    const token = req.body.token;
    
    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if(!error){
            res.json({
                message: "Token validado correctamente",
                decoded: decoded
            });
        }else{
            res.status(401).json({
                message: "Token incorrecto"
    
            });
        }
        
    });
});

export default router;