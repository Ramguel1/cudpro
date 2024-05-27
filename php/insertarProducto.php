<?php
require_once "config.php";
$valido['success']=array('success'=>false,'mensaje'=>"error");

if($_POST){
    $a=$_POST['nombre'];
    $b=$_POST['precio'];
    $c=$_POST['cantidad'];
    $d=$_POST['proovedor'];
    $e=$_POST['unidad'];
    $f=$_POST['categoria'];

    $sql="INSERT INTO producto VALUES(null,'$a',$b,'$c','$d','$e','$f')";
    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="SE GUARDO CORRECTAMENTE";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL GUARDAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL GUARDAR";
}

echo json_encode($valido);
?>