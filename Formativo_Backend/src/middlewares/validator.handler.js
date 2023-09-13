import httpErrors from 'http-errors';
const { createError } = httpErrors;
function validatorHandler(schema, property) {
    return (req,res,next) =>{
        const data = req[property]; 
        const { error }= schema.validate(data, { abortEarly: false});
        if(error){
            return next(createError(400, error))
        }
        next();
    }
    
}

  
export default validatorHandler ;