import { calcularMovimientos, mostrarBusqueda } from "./module/tablePresupuesto.js";
import { mostrarPagina, paginaAnterior, paginaSiguiente, limiteRegistros, calcularPagina } from "./module/paginacion.js";

const d = document;
const ls = localStorage;
const $ = (e) => document.querySelector(e);
const URI = "http://localhost:5855/presupuesto";
const table_config = {
    "current_page": 1,
    "length": 5,
    "max_page": 1
}

addEventListener("DOMContentLoaded", async (e) => {
    table_config.length = ls.getItem("length-entries") ? Number(ls.getItem("length-entries")) : 5;
    $("#limit-entries").value = ls.getItem("length-entries") ? Number(ls.getItem("length-entries")) : table_config.length;
    let filas = await (await fetch(URI)).json();
    calcularPagina(filas, table_config);
    mostrarPagina(filas, table_config.current_page, table_config.length);
    let movimientos = calcularMovimientos(filas);
    $("#ingresos").textContent = "$ " + (movimientos[0] ? movimientos[0] : "0");
    $("#egresos").textContent = "$ " + (movimientos[1] ? movimientos[1] : "0");
    $("#total").textContent = "$ " + (movimientos[2] ? movimientos[2] : "0");
})

d.addEventListener("click", async (e) => {
    if (e.target.matches("#btn-prev, #btn-prev *")) {
        paginaAnterior(table_config);
        let filas = await (await fetch(URI)).json();
        calcularPagina(filas, table_config);
        mostrarPagina(filas, table_config.current_page, table_config.length);
    }

    if (e.target.matches("#btn-next, #btn-next *")) {
        paginaSiguiente(table_config);
        let filas = await (await fetch(URI)).json();
        calcularPagina(filas, table_config);
        mostrarPagina(filas, table_config.current_page, table_config.length);
    }

    if (e.target.matches(".close-modal, .close-modal *")) {
        const dialogo = e.target.closest("dialog");
        $("#frm-edit").removeAttribute("data-edit");
        if (dialogo) dialogo.close();
    }

    if (e.target.matches(".del-caja, .del-caja *")) {
        let btn = e.target.closest(".del-caja");
        let valor = btn.dataset.del;
        await fetch(`${URI}/${valor}`, {
            method: "DELETE"
        });
        window.location.reload();
    }

    if (e.target.matches(".edit-caja, .edit-caja *")) {
        let btn = e.target.closest(".edit-caja");
        $("#frm-edit").dataset.edit = btn.dataset.edit;
        $("#modal-edit").showModal();
        let data = await (await fetch(`${URI}/${btn.dataset.edit}`)).json();
        d.querySelector("#monto-edit").value = data.valor;
        data.caja == "ingreso" ? d.querySelector("#radio-ingreso-edit").setAttribute("checked", "") : d.querySelector("#radio-egreso-edit").setAttribute("checked", "");
    }
})

d.addEventListener("submit", async (e) => {
    if (e.target.matches("#frm-caja")) {
        e.preventDefault();
        config["method"] = "POST";
        let data = Object.fromEntries(new FormData(e.target));
        if (!isNaN(Number(data.valor))) {
            config["body"] = JSON.stringify(data);
            let res = await fetch(URI, config);
            form.reset();
            window.location.reload();
        }
    }

    if (e.target.matches("#frm-edit")) {
        e.preventDefault();
        config["method"] = "PUT";
        let data = Object.fromEntries(new FormData(e.target));
        if (!isNaN(Number(data.valor))) {
            config["body"] = JSON.stringify(data);
            if (!$("#frm-edit").dataset.edit) return;
            let res = await fetch(`${URI}/${$("#frm-edit").dataset.edit}`, config);
            window.location.reload();
        }
    }

})

d.addEventListener("input", async (e) => {
    if (e.target.matches("#inp-search")) {
        e.preventDefault();
        const valorInput = e.target.value;
        if (valorInput !== "") {
            let data = await (await fetch(URI)).json();
            let elementos = data.filter((e) => String(e.id).startsWith(valorInput));
            mostrarBusqueda(elementos);
        } else {
            let filas = await (await fetch(URI)).json();
            mostrarPagina(filas, table_config.current_page, table_config.length);
        }
    }
})

d.addEventListener("change", async (e) => {
    if (e.target.matches("#limit-entries")) {
        ls.setItem("length-entries", e.target.value);
        limiteRegistros(table_config, e.target.value);
        let filas = await (await fetch(URI)).json();
        mostrarPagina(filas, table_config.current_page, table_config.length);
    }
})