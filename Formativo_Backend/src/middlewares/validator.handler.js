
function validatorHandler(schema, property) {
    return (req,res,next) =>{
        const data = req[property]; 
        const { error }= schema.validate(data, { abortEarly: false});
        if (error) {
            const validationErrors = error.details.map((detail) => ({
              field: detail.context.key,
              message: detail.message,
            }));
      
            // Devuelve un objeto de error personalizado
            return res.status(400).json({
              error: 'Validation error',
              details: validationErrors,
            });
          }
      
        next();
    }
    
}

  
export default validatorHandler ;