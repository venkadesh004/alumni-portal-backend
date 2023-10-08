const express = require('express');
const Router = express.Router();

const {getData, addData, getAlumni, getFilters, addChat, connectChat, getRequestedAlumni} = require('../controllers/studentControllers');

Router.route('/getStudentData').post(getData);
Router.route('/addStudentData').post(addData);
Router.route('/getAlumni').get(getAlumni);
Router.route('/getFilters').get(getFilters);
Router.route('/addChat').put(addChat);
Router.route('/connectChat').put(connectChat);
Router.route('/getRequestedAlumni').post(getRequestedAlumni);

module.exports = Router;