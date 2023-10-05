const express = require('express');
const Router = express.Router();

const {getData, addData, acceptStudent} = require('../controllers/facultyControllers');

Router.route('/getFacultyData').post(getData);
Router.route('/addFacultyData').post(addData);
Router.route('/acceptStudent').put(acceptStudent);

module.exports = Router;