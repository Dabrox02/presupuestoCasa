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

export const paginaAnterior = (current_page) => {
    current_page > 1 ? current_page-- : current_page;
}

export const paginaSiguiente = (current_page, max_length) => {
    current_page < max_length ? current_page++ : current_page;
}