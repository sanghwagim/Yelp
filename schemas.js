
const Joi= require('joi');

// const validateCampground = (req, res, next) => { 
//     const CampgroundSchema = Joi.object({
//             campground : Joi.object({
//            title : Joi.string().required(),
//            price: Joi.number().required().min(0),
//            image : Joi.string().required(),
//            location : Joi.string().required(),
//            description : Joi.string().required()

//        }).required()
//    });

   
//    const { error} = CampgroundSchema.validate(req.body);
//    if(error) { 
//        const msg = error.details.map(el => el.message).join(',')
//        throw new ExpressError(msg, 400);
//         } else { 
//             next();
//         }

//     }
 

    module.exports.CampgroundSchema = Joi.object({
        campground : Joi.object({
       title : Joi.string().required(),
       price: Joi.number().required().min(0),
    //    image : Joi.string().required(),
       location : Joi.string().required(),
       description : Joi.string().required()

   }).required(),
   deleteImages : Joi.array()
});


module.exports.reviewSchema = Joi.object({ 
    review : Joi.object({

        rating : Joi.number().required(),
        body : Joi.string().required()
    }).required()


});