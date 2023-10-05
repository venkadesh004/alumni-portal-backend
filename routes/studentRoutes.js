const express = require('express');
const Router = express.Router();

const {getData, addData, getAlumni} = require('../controllers/studentControllers');

Router.route('/getStudentData').post(getData);
Router.route('/addStudentData').post(addData);
Router.route('/getAlumni').get(getAlumni);

module.exports = Router;