var ObjectID = require('mongodb').ObjectID;

function employeeModel(db){

  var lib = {};
  var empColl = db.collection('emps');

  lib.getEmployees = (handler)=>{
    
    empColl.find({}).toArray(
      (err, docs) => {
          if(err){
              handler(err, null);
          }else{
              handler(null, docs);
          }
      }
    ) // end ToArray
  } // end GetAllEmployees


  lib.getEmployeesById = (id, handler) => {
    
    empColl.find().project({"email":1, "phone":1, "name":1, "age":1})({"_id": new ObjectId(id)}, (err, doc)=>{
      if(err){
          handler(err, null);
      }else{
          handler(null, doc);
      }
  }); // find One    
  }//Get Employee By ID

  lib.getEmployeesByCompany = (company, handler) => {
    // implementar
    // solo mostrar name, email, company
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByAgeRange = (ageLowLimit, ageHighLimit, handler) => {
    //implementar
    // Mostrar todos los documento incluyendo los extremos
    // que esten entre las edades indicadas por los parametros
    // ageLowLimit y ageHighLimit
    // solo mostrar name, age, email
    return handler(new Error("No Implementado"), null);
  }

  lib.getEmployeesByTag = (tag, handler) => {
    //implementar
    // obtener todos los documentos que contenga 
    // al menos una vez el tag dentro del arreglo
    // tags
    // mostrar solo name, email, tags
    return handler(new Error("No Implementado"), null);
  }

  lib.addEmployeeATag = ( tag, id, handler) => {
    var curatedTags = Array.isArray(tag)? tag: [tag];
    var updateObject = {"$set":{"tags": curatedTags}};
    empColl.updateOne({"_id":ObjectId(id)}, updateObject, (err, rsult)=>{
        if(err){
            handler(err, null);
        }else{
            handler(null, rsult.result);
        }
    }); //updateOne    
  } // add tags to things

  lib.removeEmployee = (id, handler) => {
    //Implementar
    //Se requiere eliminar un documento de la colección
    return handler(new Error("No Implementado"), null);
  }

  lib.increaseAgeToAll = (ageDelta, handler) => {
    //Implementar
    //Se requiere modificar todos los documentos de la colección
    // incrementando age por la cantidad de ageDelta $inc
    return handler(new Error("No Implementado"), null);
  }
  return lib;
}

module.exports = employeeModel;
