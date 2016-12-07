<?php
if(!defined('BASEPATH')) exit('No direct script access allowed');

class Asignaturas_model extends CI_Model {

  public function __construct() {
    parent::__construct();
  }

  public function set_asignatura($cod, $nom, $can) {
    $data = array(
      'codigo' => $cod,
      'nombre' => $nom,
      'cantidad_alumnos' => $can
    );

    $this->db->insert('asignaturas', $data);
  }

  public function delete_asignatura($cod) {
    $data = array(
      'codigo' => $cod
    );

    $this->db->delete('asignaturas', $data);
  }

  public function update_asignatura($cod, $nom, $can) {
    $data = array(
      'nombre' => $nom,
      'cantidad_alumnos' => $can
    );

    $this->db->where('codigo', $cod);
    $this->db->update('asignaturas', $data);
  }

  public function get_asignaturas() {
    $this->db->select('*');
    $this->db->from('asignaturas');
    $this->db->order_by('codigo DESC');
    $query = $this->db->get();

    if($query->num_rows() > 0) {
      return $query;
    } else {
      return false;
    }
  }
}

?>
