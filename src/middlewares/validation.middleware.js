export const validate = (schema) => {
    return ( req , res , next) => {
        const { error , value } = schema.validate( req.body , {
            abortEarly: false, // i use this because it will return all validation error 
            stripUnknown: true, // it will remove unknown field
        } );

        if( error ) {
            return res.status( 400 ).json({
                errors: error.details.map(err => err.message), 
            });
        }
        req.body = value;
        next();
    };
};