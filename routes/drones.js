const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const MONGO_URI = "mongodb://localhost/lab-express-drones";

// require the Drone model here
const droneModel = require("../models/Drone.model")

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => {
    return droneModel.find();
  }).then((droneDocuments) => {
    res.render("drones/list", {
      drones: droneDocuments
    })
  }).catch((error) => {
    console.log(error)
  })
  .catch((error) => {
    console.log(error)
  })
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form')
});

router.post('/drones/create', (req, res, next) => {
  
  // Iteration #3: Add a new drone
  return droneModel.create(req.body)
  .then(() => {
    res.redirect('/drones')
  })
  .catch((error) => {
    res.redirect('/drones/create')
    console.log(error)
  })
  

});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  droneModel.findById(req.params.id)
    .then((result) => {
      res.render('drones/update-form', {
        drone: result
      })
    })
  
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  return droneModel.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/drones')
    })
    .catch((error) => {
      console.log(error)
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  return droneModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/drones')
    }).catch((error) => {
      console.log(error);
    })
});

module.exports = router;
