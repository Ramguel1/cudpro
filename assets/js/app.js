var btnGuardar=document.getElementById('btnguardar');

btnGuardar.onclick=async()=>{
    //Recopilar datos
let nombre=document.getElementById('nombre').value;
let precio=document.getElementById('precio').value;
let cantidad=document.getElementById('cantidad').value;
let proovedor=document.getElementById('proovedor').value;
let unidad=document.getElementById('unidad').value;
let categoria=document.getElementById('categoria').value;

//Validar campos vacíos
if(nombre.trim()=="" || precio.trim()=="" || cantidad.trim()=="" || proovedor.trim()==""|| unidad.trim()==""||categoria.trim()==""){
    Swal.fire({
        title: "ERROR", 
        text:"Tienes campos vacíos",
        icon: "error"
    });
    return;
}

//ENCAPSULAR DATOS
let datos=new FormData();
datos.append("nombre",nombre);
datos.append("precio",precio);
datos.append("cantidad",cantidad);
datos.append("proovedor",proovedor);
datos.append("unidad",unidad);
datos.append("categoria",categoria);

//PETICION Y RESPUESTA
let respuesta=await fetch("php/insertarProducto.php",{method:'POST',body:datos});
let json=await respuesta.json();

if(json.success==true){
    Swal.fire({title: "¡REGRISTRO ÉXITOSO!",text: json.mensaje,icon: "success"});
    limpiar();
    cargarProductos();
}else{
    Swal.fire({title: "ERROR",text: json.mensaje,icon: "error"});
}
}

const cargarProductos =async()=>{
    let respuesta=await fetch("php/cargarProducto.php");
    let json=await respuesta.json();
    let tablaHTML = ``
    let index = 0;
    json.data.forEach(item => {
        tablaHTML += `
        <tr>
        <td>${item[0]}</td>
        <td>${item[1]}</td>
        <td>${item[2]}</td>
        <td>${item[3]}</td>
        <td>${item[4]}</td>
        <td>${item[5]}</td>
        <td>${item[6]}</td>
        <td><button class="btn btn-danger" onclick="eliminar(${item[0]})">DEL</button></td>
        <td><button class="btn btn-success" onclick="editar(${item[0]})" data-bs-toggle="modal" data-bs-target="#actualizarR">EDIT</button></td>
        </tr>`
    });
    document.getElementById("listaProductos").innerHTML=tablaHTML;

}

const eliminar = async (id) => {
    Swal.fire({
        title: "¿Estás seguro de eliminar este producto?",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
        confirmButtonColor: '#20c997',
        denyButtonText: "No estoy seguro"

    }).then ( async (result) => {
        if (result.isConfirmed) {
            let contactoid = new FormData();
            contactoid.append('id', id);

            let respuesta = await fetch("php/eliminarProducto.php", {
                method: 'POST',
                body: contactoid
            });
            let json = await respuesta.json();

            if (json.success == true) {
                Swal.fire({
                    title: "¡Se eliminó con éxito!", text: json.mensaje, icon: "success"});
            } else {
                Swal.fire({
                    title: "ERROR", text: json.mensaje, icon: "error"});
            }
            cargarProductos();
            Swal.fire("Contacto eliminado", "", "success");
        }
    });
}


 const editar =async(id)=>{
    let contactoid = new FormData();
    contactoid.append('id', id);
    let respuesta = await fetch("php/editarProducto.php", {
        method: 'POST',
        body: contactoid
    });
    let json = await respuesta.json();
    
    document.querySelector("#id").value=json.id;
    document.querySelector("#enombre").value=json.nombre;
    document.querySelector("#eprecio").value=json.precio;
    document.querySelector("#ecantidad").value=json.cantidad;
    document.querySelector("#eproovedor").value=json.proovedor;
    document.querySelector("#eunidad").value=json.unidad;
    document.querySelector("#ecategoria").value=json.categoria;
 }
 
 const actualizarProducto = async()=>{
   var id= document.querySelector("#id").value;
   let nombre=document.getElementById('enombre').value;
   let precio=document.getElementById('eprecio').value;
   let cantidad=document.getElementById('ecantidad').value;
   let proovedor=document.getElementById('eproovedor').value;
   let unidad=document.getElementById('eunidad').value;
   let categoria=document.getElementById('ecategoria').value;

   if(nombre.trim()=="" || precio.trim()=="" || cantidad.trim()=="" || proovedor.trim()==""|| unidad.trim()==""||categoria.trim()==""){
       Swal.fire({
           title: "ERROR", 
           text:"Tienes campos vacíos",
           icon: "error"
       });
       return;
   }

    let datos=new FormData();
datos.append("id",id);
datos.append("nombre",nombre);
datos.append("precio",precio);
datos.append("cantidad",cantidad);
datos.append("proovedor",proovedor);
datos.append("unidad",unidad);
datos.append("categoria",categoria);

//PETICION Y RESPUESTA
let respuesta=await fetch("php/actualizarProducto.php",{method:'POST',body:datos});
let jsoon=await respuesta.json();
document.querySelector("#actualizarR").click();
if(jsoon.success==true){
    Swal.fire({title: "¡ACTUALIZACION ÉXITOSA!",text: jsoon.mensaje,icon: "success"
    });
}else{
    Swal.fire({title: "ERROR",text: jsoon.mensaje,icon: "error"
    });
}
cargarProductos();
}


const limpiar =()=>{
    let nombre=document.getElementById('nombre');
    let precio=document.getElementById('precio');
    let cantidad=document.getElementById('cantidad');
    let proovedor=document.getElementById('proovedor');
    let unidad=document.getElementById('unidad');
    let categoria=document.getElementById('categoria');

nombre.value="";
precio.value="";
cantidad.value="";
proovedor.value="";
unidad.value="";
categoria.value="";
}
