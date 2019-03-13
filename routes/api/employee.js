var express = require('express');
var router = express.Router();

function initEmployee(db) {
  var empModel = require('./employeeModel')(db);

  //rutas a implementar
  // metodo     ruta                     body
  /*
     
     
      GET       /bycompany/:company
      GET       /byagerange/:min/:max
      GET       /bytag/:tag
      
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

  router.get('/byid/:id', (req, res, next)=>{
    empModel.getEmployeesById(req.params.id, (err, docs)=>{
        if(err){
            console.log(err);
            return res.status(500).json({"Error":"Error al obtener el empleado"});
        }
        return res.status(200).json(docs);
    }); //getThing by Id
}); //get by thing:id

router.put('/addtags/:id', (req, res, next)=>{

  empModel.addEmployeeATag((req.body.tags || '').split('|'), req.params.id, (err, rsult)=>{
      if(err){
          console.log(err);
          return res.status(500).json({"Error":"no se puede agregar tag"});
      }
      return res.status(200).json(rsult);
  }); // fin add tag to employees
}); // add tags


router.get('/bytag/:tag', (req, res, next)=>{
  empModel.getEmployeesByTag((req.params.tag || '').split('_'), (err, docs)=>{
      if(err){
          console.log(err);
          return res.status(500).json({"Error":"No se encontro el documento con tags"});
      }else{
          return res.status(200).json(docs);
      }
  }); // GET by tag
}); //get by tag

router.delete('/delete/:id', function(req, res, next){
  var _id = req.params.id;
  empModel.removeEmployee(_id, (err, result)=>{
      if(err){
          console.log(err);
          return res.status(500).json({"error":"No se pudo eliminar"});
      }
      return res.status(200).json(result);
  }); //deleteById
}); //DELETE
  
  return router;
}

module.exports = initEmployee;
