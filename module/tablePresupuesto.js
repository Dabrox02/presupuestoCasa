export const createTable = (data) => {
    let tbody = document.createElement("TBODY");
    let rows = data.map(e => `
    <tr>
        <td>${e.id}</td>
        <td>${e.caja}</td>
        <td>${e.valor}</td>
        <td>
            <input type="button" class="del-caja" value="x" data-del="${e.id}">
        </td>
    </tr>`).join("");
    tbody.innerHTML = rows;
    return tbody;
}