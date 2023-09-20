export const mostrarPagina = (elementos, paginaActual, elementosPorPagina) => {
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const elementosPagina = [...elementos].slice(inicio, fin);

    // Limpiar el contenido anterior
    const contenedor = document.querySelector("tbody");
    contenedor.innerHTML = "";

    // Mostrar los elementos de la página actual
    elementosPagina.forEach((e) => {
        contenedor.insertAdjacentElement("beforeend", e);
    });
}
