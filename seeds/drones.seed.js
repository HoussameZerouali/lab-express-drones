// Iteration #1
const mongoose = require('mongoose');
const droneModel = require('../models/Drone.model');

const MONGO_URI = "mongodb://localhost/lab-express-drones";

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
  ];


mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(async (x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return droneModel.deleteMany()
    
        
  })
    .then(() => {
        return droneModel.create(drones)
        console.log(drones.length + ' drones have been created')
    })
    .then(() => {
        mongoose.connection.close();
    })
    .catch((error) => {
        console.log(error)
    })
    .catch((error) => {
            console.log(error);
    })
    .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  })
    

