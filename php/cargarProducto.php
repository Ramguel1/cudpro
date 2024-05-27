<?php
require_once "config.php";
header('content-Type: text/html; charset=utf-8');

$sql="SELECT * FROM producto";

$registro=array('data'=>array());
$res=$cx->query($sql);
if($res->num_rows>0){
    while ($row=$res->fetch_array()){
        $registro['data'][]=array($row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$row[6]);
    }
}
echo json_encode($registro);
?>