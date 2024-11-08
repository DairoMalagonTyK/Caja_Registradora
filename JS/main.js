// Función para formatear los números con separadores de miles
function formatearNumero(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Función para mostrar el precio y la imagen del producto seleccionado
function mostrarPrecio() {
    const productoSelect = document.getElementById("producto");
    const precioUnitarioDiv = document.getElementById("precioUnitario");
    const productoSeleccionadoDiv = document.getElementById("productoSeleccionado");
    const imagenProducto = document.getElementById("imagenProducto");

    if (productoSelect.value) {
        const { precio, imagen } = productoSelect.options[productoSelect.selectedIndex].dataset;
        precioUnitarioDiv.innerHTML = `Precio unitario: $${formatearNumero(precio)}`;
        productoSeleccionadoDiv.innerHTML = `Producto: ${productoSelect.options[productoSelect.selectedIndex].text.split(" - ")[0]}`;
        imagenProducto.src = `./IMG/${imagen}`;
        imagenProducto.style.display = 'block';
    } else {
        precioUnitarioDiv.innerHTML = "";
        productoSeleccionadoDiv.innerHTML = "";
        imagenProducto.style.display = 'none';
    }
}

// Función para calcular el total según la cantidad
function calcularTotal() {
    const cantidad = document.getElementById("cantidad").value;
    const productoSelect = document.getElementById("producto");
    const totalDiv = document.getElementById("total");

    if (!productoSelect.value || cantidad <= 0) {
        const mensaje = !productoSelect.value ? 'Producto no seleccionado' : 'La cantidad no puede ser 0';
        Swal.fire({ icon: 'warning', title: mensaje, text: 'Por favor, seleccione un producto y cantidad válidos.' });
        totalDiv.innerHTML = "";
        return;
    }

    const precio = productoSelect.options[productoSelect.selectedIndex].dataset.precio;
    totalDiv.innerHTML = `Total: $${formatearNumero(cantidad * precio)}`;
}

// Función para agregar la compra al registro
function comprar() {
    const productoSelect = document.getElementById("producto");
    const cantidad = document.getElementById("cantidad").value;
    const totalDiv = document.getElementById("total").innerHTML;
    const registroComprasTextarea = document.getElementById("registroCompras");
    const totalCompraDiv = document.getElementById("totalCompra");

    if (!productoSelect.value || cantidad <= 0) {
        const mensaje = !productoSelect.value ? 'Producto no seleccionado' : 'La cantidad no puede ser 0';
        Swal.fire({ icon: 'warning', title: mensaje, text: 'Por favor, seleccione un producto y cantidad válidos.' });
        return;
    }

    const productoTexto = productoSelect.options[productoSelect.selectedIndex].text.split(" - ")[0];
    const totalProducto = totalDiv.split("$")[1].replace(/,/g, "").trim(); // Asegurarse de que el total sea un número

    // Agregar el producto al registro de compras
    registroComprasTextarea.value += `${cantidad} x ${productoTexto} = $${formatearNumero(totalProducto)}\n`;

    // Calcular el total acumulado de todas las compras
    let totalAcumulado = parseFloat(totalCompraDiv.innerHTML.split("$")[1].replace(/,/g, "")) || 0;
    totalAcumulado += parseFloat(totalProducto);
    totalCompraDiv.innerHTML = `Total acumulado: $${formatearNumero(totalAcumulado)}`;

    // Mostrar SweetAlert de confirmación de compra
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: `Has comprado ${cantidad} unidad(es) de ${productoTexto}. Total: $${formatearNumero(totalProducto)}`,
        confirmButtonText: 'Aceptar'
    });

    // Limpiar campos
    borrar();
}

// Función para borrar los campos de producto y cantidad
function borrar() {
    document.getElementById("producto").selectedIndex = 0;
    document.getElementById("precioUnitario").innerHTML = "";
    document.getElementById("productoSeleccionado").innerHTML = "";
    document.getElementById("cantidad").value = 0;
    document.getElementById("total").innerHTML = "";
    ocultarImagen();
}

// Función para borrar el registro de compras y el total acumulado
function borrarRegistro() {
    document.getElementById("registroCompras").value = "";
    document.getElementById("totalCompra").innerHTML = "Total acumulado: $0";
    ocultarImagen();
}

// Función para ocultar la imagen del producto
function ocultarImagen() {
    document.getElementById("imagenProducto").style.display = 'none';
}
