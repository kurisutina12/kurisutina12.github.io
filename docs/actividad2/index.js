let inventario = new Map();
const btnAgregar = document.getElementById("btnAgregar");
btnAgregar.addEventListener("click", agregarProducto);

function agregarProducto() {

    let id = document.getElementById("identificador").value;
    let nombre = document.getElementById("nombre").value;
    let cantidad = document.getElementById("cantidad").value;
    let fecha = document.getElementById("fecha").value;
    let costo = document.getElementById("costo").value;

    if (id === "") {
        mostrarAlerta("El ID es obligatorio");
        setTimeout(cerrarAlerta, 3000);
        return;
    }


    if (isNaN(cantidad) || cantidad <= 0) {
        mostrarAlerta("La cantidad debe ser mayor a 0");
        setTimeout(cerrarAlerta, 3000);
        return;
    }

    if (isNaN(costo) || costo <= 0) {
        mostrarAlerta("El costo debe ser mayor a 0");
        setTimeout(cerrarAlerta, 3000);
        return;
    }

    let producto = {
        nombre: nombre,
        cantidad: cantidad,
        fecha: fecha,
        costo: costo
    };

    inventario.set(id, producto);

    mostrarAlertaBien("Todo se agrego");
    setTimeout(cerrarAlerta, 3000);
    mostrarInventario();
}

function mostrarInventario(){

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    inventario.forEach((producto, id) => {
        lista.innerHTML += `
            <div>
                <strong>Identificador:</strong> ${id} <br>
                <strong>Nombre:</strong> ${producto.nombre} <br>
                <strong>Cantidad:</strong> ${producto.cantidad} <br>
                <strong>Fecha:</strong> ${producto.fecha} <br>
                <strong>Costo:</strong> ${producto.costo}
                <hr>
            </div>
        `;
    });
}

function mostrarAlerta(mensaje){
    let alerta = document.getElementById("miAlerta");
    let texto = document.getElementById("mensajeAlerta");

    texto.textContent = mensaje;
    alerta.style.display = "block";
}

function mostrarAlertaBien(mensaje){
    let alerta = document.getElementById("miAlerta2");
    let texto = document.getElementById("mensajeAlerta2");

    texto.textContent = mensaje;
    alerta.style.display = "block";
}

function cerrarAlerta(){
    document.getElementById("miAlerta").style.display = "none";
    document.getElementById("miAlerta2").style.display = "none";
}