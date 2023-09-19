import { createTable } from "./module/tablePresupuesto.js";

const d = document;
const form = d.querySelector("#frm-caja");
const table = d.querySelector(".tabla-movimientos");

addEventListener("DOMContentLoaded", async (e) => {
    let res = await (await fetch("https://6509d045f6553137159c106b.mockapi.io/Prespuesto")).json();
    let tbody = createTable(res);
    table.insertAdjacentElement("beforeend", tbody);
})


form.addEventListener("submit", (e) => {

})

const btns = d.querySelectorAll("del-caja");
console.log(d);

btns.forEach((e) => {
    e.addEventListener("click", (e) => {
        console.log("hola");
    })
})

