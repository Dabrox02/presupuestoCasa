import { createTable } from "./module/tablePresupuesto.js";
import { mostrarPagina, paginaAnterior, paginaSiguiente } from "./module/paginacion.js";

const d = document;
const form = d.querySelector("#frm-caja");
const table = d.querySelector(".tabla-movimientos");
const btn_prev = d.querySelector("#btn-prev");
const btn_next = d.querySelector("#btn-next");
var config = {
    headers: { "content-type": "application/json" },
}
var table_config = {
    "current_page": 1,
    "length": 10,
    "max_page": 1
}
var filas;

addEventListener("DOMContentLoaded", async (e) => {
    let res = await (await fetch("https://6509d045f6553137159c106b.mockapi.io/Prespuesto")).json();
    let tbody = createTable(res);
    table.insertAdjacentElement("beforeend", tbody);
    let btns = d.querySelectorAll(".del-caja");

    btns.forEach((e) => {
        config["method"] = "DELETE";
        let valor = e.dataset.del;
        e.addEventListener("click", async (e) => {
            res = await (await fetch(`https://6509d045f6553137159c106b.mockapi.io/Prespuesto/${valor}`, config)).json();
            window.location.reload();
        })
    })

    filas = document.querySelectorAll(".fila");
    table_config.max_page = Math.ceil(filas.length / table_config.length);
    mostrarPagina(filas, table_config.current_page, table_config.length);
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    config["method"] = "POST";
    let data = Object.fromEntries(new FormData(e.target));
    if (!isNaN(Number(data.valor))) {
        config["body"] = JSON.stringify(data);
        let res = await fetch(`https://6509d045f6553137159c106b.mockapi.io/Prespuesto/`, config);
        window.location.reload();
    }
})

btn_prev.addEventListener("click", (e) => {
    paginaAnterior(table_config);
    mostrarPagina(filas, table_config.current_page, table_config.length);
});
btn_next.addEventListener("click", (e) => {
    paginaSiguiente(table_config);
    mostrarPagina(filas, table_config.current_page, table_config.length);
});

