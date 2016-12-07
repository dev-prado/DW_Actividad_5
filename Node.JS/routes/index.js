var express = require('express');
var connection = require('../connection');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// GET asignaturas JSON
router.get('/asignaturas/json', function(req, res) {
  connection.query('SELECT * FROM asignaturas', function(err, rows, fields) {
    if (err) throw err;
    res.jsonp({data: rows});
  });
});

router.post('/asignaturas/editar', function(req, res) {
  var codigo = req.body.codigo;
  var nombre = req.body.nombre;
  var cantidad_alumnos = req.body.cantidad_alumnos;
  var mensaje = 'La asignatura se ha editado satisfactoriamente.';

  if(codigo.length == 0) {
    mensaje = 'Debes seleccionar el código de la asignatura a editar.';
  } else if(nombre.length == 0) {
    mensaje = 'Debes ingresar un nombre a la asignatura que deseas editar.';
  } else if (cantidad_alumnos.length == 0 || isNaN(parseInt(cantidad_alumnos))) {
    mensaje = 'Debes ingresar un numero a la asignatura que deseas editar.';
  } else {
    connection.query('UPDATE asignaturas SET nombre=\'' + nombre + '\', cantidad_alumnos = \'' + cantidad_alumnos + '\' WHERE codigo = \'' + codigo + '\'');
  }

  res.jsonp({mensaje: mensaje});
});

router.post('/asignaturas/agregar', function(req, res) {
  var codigo = req.body.codigo;
  var nombre = req.body.nombre;
  var cantidad_alumnos = req.body.cantidad_alumnos;
  var mensaje = 'La asignatura se ha agregado satisfactoriamente.';
  connection.query('SELECT codigo FROM asignaturas WHERE codigo = \'' + codigo + '\'', function(err, rows, fields) {
  if (err) throw err;
  if(rows.length > 0) {
      res.status(500).jsonp({error: 'El código de asignatura ya existe.'});
    }
  });

  if(codigo.length == 0) {
    mensaje = 'Debes seleccionar el código de la asignatura a agregar.';
  } else if(nombre.length == 0) {
    mensaje = 'Debes ingresar un nombre a la asignatura que deseas agregar.';
  } else  if (cantidad_alumnos.length == 0 || isNaN(parseInt(cantidad_alumnos))) {
    mensaje = 'Debes ingresar un numero de alumnos a la asignatura que desear agregar.' + cantidad_alumnos.length + ' ' + isNaN(parseInt(cantidad_alumnos));
  } else {
    connection.query('INSERT INTO asignaturas(codigo, nombre, cantidad_alumnos) VALUES(\'' + codigo + '\', \'' + nombre + '\', \'' + cantidad_alumnos + '\')');
  }

  res.jsonp({mensaje: mensaje});
});

router.post('/asignaturas/eliminar', function(req, res) {
  var id = req.body.id;
  connection.query('DELETE FROM asignaturas WHERE codigo = \'' + id + '\' LIMIT 1');
  res.jsonp({mensaje: 'Asignatura eliminada satisfactoriamente.'});
});
module.exports = router;
