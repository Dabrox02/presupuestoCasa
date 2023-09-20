import { createTable } from "./module/tablePresupuesto.js";

const d = document;
const form = d.querySelector("#frm-caja");
const table = d.querySelector(".tabla-movimientos");
let config = {
    headers: { "content-type": "application/json" },
}

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
})


form.addEventListener("submit", (e) => {

})

