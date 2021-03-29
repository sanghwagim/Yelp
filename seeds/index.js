
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const {places, descriptors } = require('./seedHelpers')

const cities = require('./cities');


mongoose.connect('mongodb://localhost:27017/Yelp', {useNewUrlParser: true, useCreateIndex : true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("It has been connected")
});

const sample  = (array) =>  array[Math.floor(Math.random() * array.length)]



const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        console.log(i);
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) +10;
        console.log(random1000);
        const camp = new Campground ({ 
            author : '6041cb19c250d58639f5a4cb',
            location : `${cities[random1000].latitude}, ${cities[random1000].longitude}, ${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            
            description : "Source is built for use in small, low-traffic applications. For production uses, we recommend the official Unsplash API which has more robust features and supports high-traffic use cases.",
            price, 
            images : [{
                
                
                url: 'https://res.cloudinary.com/daf0wtfle/image/upload/v1616651161/YelpCamp/ihkeqkna9ii1epxlszis.jpg',
                filename: 'YelpCamp/ihkeqkna9ii1epxlszis'
          
                
            
        }]
    });

        console.log(camp);
        await camp.save();
    } 
}

seedDB();

// seedDB().then( () => {
// mongoose.connection.close();
// })




// for ( let i =0; i < 50; i++); {
//     const random1000 = Math.floor(Math.random() * 1000);
//     const camp = new Campground ({ 
//         location : `${cities[random1000].city}, ${cities[random1000].state}`,
//     })

//     await camp.save();