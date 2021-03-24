
const Campground = require('../models/campground');


module.exports.index = async (req,res, next ) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
    };


    module.exports.renderNewForm = (req,res) => {
      
        res.render('campgrounds/new');
    };

    module.exports.createCampground = async (req,res, next) => {

   
        const campground = new Campground(req.body.campground);
        campground.images = req.files.map( f => ({ url: f.path, filename : f.filename}));
        campground.author = req.user._id;
        await campground.save();
        console.log(campground);
        req.flash('success', 'you made it') 
       
        res.redirect(`/campgrounds/${campground._id}`);
    
    };


    module.exports.showCampground = async (req,res )=>  { 
        const campground = await Campground.findById(req.params.id).populate({ 
            path : 'reviews',
            populate : {
            path : 'author'
        }
    
    }).populate('author');
        console.log(campground);
        res.render('campgrounds/show', { campground });
    }; 
     
     

    module.exports.editCampground = async (req,res) => { 
        const campground = await Campground.findById(req.params.id);
    
    
        if(!campground) { 
            req.flash('error', 'You can not find campgrounds');
            return res.redirect('/campgrounds');
        }
    
        res.render('campgrounds/edit', { campground });
    
    };
    
    

    module.exports.newCampground = async (req,res, next)=> { 
    
        const {id } =req.params;
        const campground =  await Campground.findByIdAndUpdate(id,{ ...req.body.campground } ,{new : true})
        const imgs = campground.images.req.files.map(f => ({ url: f.path, filename : f.filename}));
        campground.images.push(...imgs);
        await campground.save();
    
        req.flash('success', 'You have successfully done');
        res.redirect(`/campgrounds/${campground._id}`);
    }; 


    module.exports.deleteCampground = async (req,res, next)=> { 
        const { id} = req.params;
       await Campground.findByIdAndDelete(id);
       req.flash('success', 'You have successfully deleted review')
       
        res.redirect('/campgrounds');
    };
    
    
