import { createTable, calcularMovimientos, cargarTabla } from "./module/tablePresupuesto.js";
import { mostrarPagina, paginaAnterior, paginaSiguiente } from "./module/paginacion.js";

const d = document;
const URI = "https://6509d045f6553137159c106b.mockapi.io/presupuesto";
const form = d.querySelector("#frm-caja");
const form_edit = d.querySelector("#frm-edit");
const input_search = d.querySelector("#inp-search");
const modal_edit = d.querySelector("#modal-edit");
const btn_close_modal = d.querySelectorAll(".close-modal");
const table = d.querySelector(".tabla-movimientos");
const btn_prev = d.querySelector("#btn-prev");
const btn_next = d.querySelector("#btn-next");
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
        "uri": URI,
        "table": table
    });
    let btns_del = d.querySelectorAll(".del-caja");
    let btns_edit = d.querySelectorAll(".edit-caja");

    btns_del.forEach((e) => {
        config["method"] = "DELETE";
        let valor = e.dataset.del;
        e.addEventListener("click", async (e) => {
            await fetch(`${URI}/${valor}`, config);
            window.location.reload();
        })
    })

    btns_edit.forEach((e) => {
        let valor = e.dataset.edit;
        e.addEventListener("click", async (j) => {
            form_edit.dataset.edit = e.dataset.edit;
            modal_edit.showModal();
        })
    })

    btn_close_modal.forEach((e) => {
        e.addEventListener("click", (j) => {
            const dialogo = j.target.closest("dialog");
            form_edit.reset();
            form_edit.removeAttribute("data-edit");
            if (dialogo) modal_edit.close();
        })
    })


    filas = document.querySelectorAll(".fila");
    table_config.max_page = Math.ceil(filas.length / table_config.length);
    mostrarPagina(filas, table_config.current_page, table_config.length);
    let movimientos = calcularMovimientos(filas);
    ingresos.textContent = "$ " + (movimientos[0] ? movimientos[0] : "0");
    egresos.textContent = "$ " + (movimientos[1] ? movimientos[1] : "0");
    total.textContent = "$ " + (movimientos[2] ? movimientos[2] : "0");
})

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    config["method"] = "POST";
    let data = Object.fromEntries(new FormData(e.target));
    if (!isNaN(Number(data.valor))) {
        config["body"] = JSON.stringify(data);
        let res = await fetch(URI, config);
        form.reset();
        window.location.reload();
    }
})

form_edit.addEventListener("submit", async (e) => {
    e.preventDefault();
    config["method"] = "PUT";
    let data = Object.fromEntries(new FormData(e.target));
    console.log(data);
    if (!isNaN(Number(data.valor))) {
        config["body"] = JSON.stringify(data);
        if (!form_edit.dataset.edit) return;
        let res = await fetch(`${URI}/${form_edit.dataset.edit}`, config);
        window.location.reload();
    }
})

input_search.addEventListener("input", async (e) => {
    e.preventDefault();
    const valorInput = input_search.value;
    if (valorInput !== "") {
        await cargarTabla({
            "uri": `${URI}/${valorInput}`, "table": table
        });
    } else {
        await cargarTabla({
            "uri": URI, "table": table
        });
        mostrarPagina(filas, table_config.current_page, table_config.length);
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