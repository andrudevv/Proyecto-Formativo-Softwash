

function validatorHandler(schema, property) {
    return (req,res,next) =>{
        const data = req[property]; 
        const { error }= schema.validate(data, { abortEarly: false});
        if(error){
            const errorDetails = error.details.map(detail => {
                return {
                    field: detail.context.key,
                    message: detail.message,
                };
            });
    
            return res.status(400).json(errorDetails);
        }
        next();
    }
    
}

  
export default validatorHandler ;