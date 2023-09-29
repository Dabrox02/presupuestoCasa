import { createTable, calcularMovimientos, cargarTabla } from "./module/tablePresupuesto.js";
import { mostrarPagina, paginaAnterior, paginaSiguiente } from "./module/paginacion.js";

const d = document;
const $ = (e) => d.querySelector(e);
const input_search = d.querySelector("#inp-search");
const table = d.querySelector(".tabla-movimientos");
const ingresos = d.querySelector("#ingresos");
const egresos = d.querySelector("#egresos");
const total = d.querySelector("#total");

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
    await cargarTabla({
        "uri": `http://localhost:5855/presupuesto`,
        "table": table
    });

    filas = document.querySelectorAll(".fila");
    table_config.max_page = Math.ceil(filas.length / table_config.length);
    mostrarPagina(filas, table_config.current_page, table_config.length);
    let movimientos = calcularMovimientos(filas);
    ingresos.textContent = "$ " + (movimientos[0] ? movimientos[0] : "0");
    egresos.textContent = "$ " + (movimientos[1] ? movimientos[1] : "0");
    total.textContent = "$ " + (movimientos[2] ? movimientos[2] : "0");
})

d.addEventListener("submit", async (e) => {
    if (e.target.matches("#frm-caja")) {
        e.preventDefault();
        config["method"] = "POST";
        let data = Object.fromEntries(new FormData(e.target));
        if (!isNaN(Number(data.valor))) {
            config["body"] = JSON.stringify(data);
            let res = await fetch(`http://localhost:5855/presupuesto`, config);
            form.reset();
            window.location.reload();
        }
    }

    if (e.target.matches("#frm-edit")) {
        e.preventDefault();
        config["method"] = "PUT";
        let data = Object.fromEntries(new FormData(e.target));
        console.log(data);
        if (!isNaN(Number(data.valor))) {
            config["body"] = JSON.stringify(data);
            if (!form_edit.dataset.edit) return;
            let res = await fetch(`http://localhost:5855/presupuesto/${form_edit.dataset.edit}`, config);
            window.location.reload();
        }
    }
})

d.addEventListener("click", async (e) => {
    if (e.target.matches("#btn-prev")) {
        paginaAnterior(table_config);
        mostrarPagina(filas, table_config.current_page, table_config.length);
    }

    if (e.target.matches("#btn-next")) {
        paginaSiguiente(table_config);
        mostrarPagina(filas, table_config.current_page, table_config.length);
    }

    if (e.target.matches(".close-modal, .close-modal *")) {
        const dialogo = e.target.closest("dialog");
        $("#frm-edit").reset();
        $("#frm-edit").removeAttribute("data-edit");
        if (dialogo) $("#modal-edit").close();
    }

    if (e.target.matches(".del-caja, .del-caja *")) {
        let btn = e.target.closest(".del-caja");
        config["method"] = "DELETE";
        await fetch(`http://localhost:5855/presupuesto/${btn.dataset.del}`, {
            method: "DELETE"
        });
        window.location.reload();
    }

    if (e.target.matches(".edit-caja, .edit-caja *")) {
        let btn = e.target.closest(".edit-caja");
        $("#frm-edit").dataset.edit = btn.dataset.edit;
        let res = await (await fetch(`http://localhost:5855/presupuesto/${btn.dataset.edit}`)).json();
        $("#modal-edit").showModal();
    }
})


input_search.addEventListener("input", async (e) => {
    e.preventDefault();
    const valorInput = input_search.value;
    if (valorInput !== "") {
        await cargarTabla({
            "uri": `http://localhost:5855/presupuesto/${valorInput}`, "table": table
        });
    } else {
        await cargarTabla({
            "uri": `http://localhost:5855/presupuesto`, "table": table
        });
        mostrarPagina(filas, table_config.current_page, table_config.length);
    }
})