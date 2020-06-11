import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    const token = req.cookies.token; //Obtendremos la cookie de la petición
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if(error){
                res.status(401).json({
                    message: "No tienes permisos para usar este recurso"
                });
            }else{
                next();
            }
        })
    }else{
        res.status(401).json({
            message: "No tienes permisos para usar este recurso"
        });
    }
}