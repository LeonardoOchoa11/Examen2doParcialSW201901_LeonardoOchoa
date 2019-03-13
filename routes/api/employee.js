var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
      GET       /all
      GET       /byid/:id
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      POST      /addtag/:id              tag
      DELETE    /delete/:id
      POST      /makeolder               age
   */

  router.get('/all', (req, res, next) => {
    
    empModel.getEmployees(
      function(err, docs){
        if(err){
          console.log(err);
          return res.status(500).json({error: "Error al mostrar los empleados"});
        }
          return res.status(200).json(docs);
      }
    )
  });// Get All Employees

  
  return router;
}

module.exports = initEmployee;
