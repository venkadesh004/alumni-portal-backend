const express = require('express');
const Router = express.Router();

const {getData, addData, editProfile, addChat, getStudents} = require('../controllers/alumniControllers');

Router.route('/getAlumniData').post(getData);
Router.route('/addAlumniData').post(addData);
Router.route('/editAlumniData').put(editProfile);
Router.route('/addChat').put(addChat);
Router.route('/getStudents').post(getStudents);

module.exports = Router;