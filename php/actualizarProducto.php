<?php
require_once "config.php";
$valido['success']=array('success'=>false,'mensaje'=>"");

if($_POST){
    $id=$_POST['id'];
    $a=$_POST['nombre'];
    $b=$_POST['precio'];
    $c=$_POST['cantidad'];
    $d=$_POST['proovedor'];
    $e=$_POST['unidad'];
    $f=$_POST['categoria'];

    $sql = "UPDATE producto SET nombre='$a', precio='$b', cantidad='$c', proovedor='$d', unidad='$e', categoria='$f' WHERE id=$id";

    if($cx->query($sql)){
       $valido['success']=true;
       $valido['mensaje']="SE ACTUALIZO CORRECTAMENTE";
    }else{
        $valido['success']=false;
       $valido['mensaje']="ERROR AL ACTUALIZAR EN BD"; 
    }
    
}else{
$valido['success']=false;
$valido['mensaje']="ERROR AL GUARDAR";
}

echo json_encode($valido);
?>
