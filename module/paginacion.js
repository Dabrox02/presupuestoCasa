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

export const paginaAnterior = (table_config) => {
    table_config.current_page > 1 ? table_config.current_page-- : table_config.current_page;
}

export const paginaSiguiente = (table_config) => {
    table_config.current_page < table_config.max_page ? table_config.current_page += 1 : table_config;
}