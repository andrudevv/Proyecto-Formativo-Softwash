import Jwt  from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config/token.js';
import cookieParser from 'cookie-parser';


export const authRequired =(req, res, next)=>{
    cookieParser()(req,res,()=>{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({
            message: 'no esta autorizado su ingreso'});

            Jwt.verify(token, TOKEN_SECRET, (err, user)=>{
                if(err){ return res.status(403).json({
                    message: 'invalid token'
                })}
                req.user = user;
                next();
    })
    // const token = req.cookies.token;

    
})
    
}