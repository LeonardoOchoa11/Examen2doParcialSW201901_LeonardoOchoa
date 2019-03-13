var express = require('express');
var router = express.Router();

function initApi(db){
  var employeeRoutes = require('./api/employee')(db);
  router.use('/employee', employeeRoutes);
  return router;
}

module.exports = initApi;
