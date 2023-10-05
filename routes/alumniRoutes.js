const express = require('express');
const Router = express.Router();

const {getData, addData, editProfile} = require('../controllers/alumniControllers');

Router.route('/getAlumniData').post(getData);
Router.route('/addAlumniData').post(addData);
Router.route('/editAlumniData').put(editProfile);

module.exports = Router;