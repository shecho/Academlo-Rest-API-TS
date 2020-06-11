import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const signup = (req: Request, res: Response) => {
    let {name, password, email} = req.body;
    
    if(password && email){
        //Comprobar que el usuario no se encuentre registrado
        User.findOne({email: email}).then( user => {
            if(user){
                res.json({
                    message: "El usuario ya se encuentra registrado en el sistema"                    
                });
            }else{
                //Si no está registrado lo agregaremos en la BD
                bcrypt.hash(password, 10).then( hashPassword => {
                    const user = new User({
                        email: email,
                        password: hashPassword,
                        name: name,
                        cart: []
                    });
                    return user.save();
                }).then( result => {
                    const token = jwt.sign({result}, process.env.SECRET_KEY, {expiresIn: '1h'});
                    res.json({
                        message: "El usuario se ha registrado correctamente",
                        token: token
                    });
                }).catch( error => console.log(error));
            }
        });        
    }
}


const login = (req: Request, res: Response) => {
    let {email, password} = req.body;
    
    if(password && email){
        //Comprobar que el usuario no se encuentre registrado
        User.findOne({email: email}).then( user => {
            if(user){
                //Comparar la contraseña de la base de datos con la que recibimos del cliente                               
                bcrypt.compare(password, user.password).then( (resultado) => {
                    if(resultado){                        
                        const token = jwt.sign({user}, process.env.SECRET_KEY, {expiresIn: '10 days'});
                        res.cookie('token', token, {httpOnly: true});
                        res.json({
                            message: "Se ha iniciado sesión correctamente"                            
                        });
                    }else{
                        console.log("Credenciales incorrectas");
                        res.json({
                            message: "Las credenciales de acceso son incorrectas"                            
                        });
                    }
                }).catch( error => console.log(error));
            }else{
                res.json({
                    message: "El usuario no se encuentra registrado en nuestro sistema"
                });
            }
        });        
    }
}


export default {signup, login}