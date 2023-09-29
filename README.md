## Autor
- [Jaider Steeven Mendoza Cardona](https://github.com/Dabrox02)

# Proyecto Presupuesto Casa
Este proyecto consiste en la integración de las tecnologias aprendidas con el fin de crear una aplicacion funcional que tenga la capacidad de consumir una Fake Api.

## Tecnologias
Para la concepción del proyecto se hizo uso de las siguientes tecnologias, las cuales se integraron para crear el proyecto:

- HTML (HyperText Markup Language)
- CSS (Cascading Style Sheets)
- Bootstrap
- JavaScript
- [MockApi](https://mockapi.io/)

## Requisitos Minimos
Hay algunos requisitos y consideraciones que el cliente debe tener en cuenta para garantizar una implementación exitosa de la aplicación web:

- Acceso a Internet
- Dispositivo Compatible
- Navegador Compatible:
  - [Mozilla Firefox](https://www.mozilla.org/es-ES/firefox/new/)
  - [Google Chrome](https://www.google.com/chrome/)

### Interaccion con la API MockAPI
MockAPI es una herramienta web que permite la creacion de APIs de prueba, para el desarrollo de este proyecto se utilizo una api cuya estructura de datos es la siguiente:

### Esquema de los datos
| Campo | Tipo      |
| ----- | --------- |
| id    | Object ID |
| caja  | STRING    |
| valor | NUMBER    |

***
**API URI:** `https://6509d045f6553137159c106b.mockapi.io/`

**Acceso a la API:**
Puedes acceder a la API a través del **endpoint** `presupuesto`:
```bash
https://6509d045f6553137159c106b.mockapi.io/presupuesto
```

## Uso de la Aplicación
Esta aplicacion web permite llevar un control de gastos, puedes agregar los ingresos y egresos que has tenido y te calculara el total de los mismos, tambien puedes editar y eliminarlos por si llegas a equivocarte.

### Como Ingresar datos
Para ingresar datos, selecciona el campo e ingresa el monto que deseas añadir, luego selecciona si es un ingreso o egreso y posteriormente dale en calcular.

<div align="center">
  <h3>Paso 1</h3>
  <img src="readmeAssets/INGRESAR_DATOS_1.png">
  <h3>Paso 2</h3>
  <img src="readmeAssets/INGRESAR_DATOS_2.png">
  <h3>Paso 3</h3>
  <img src="readmeAssets/INGRESAR_DATOS_3.png">
  <h3>Resultado</h3>
  <img src="readmeAssets/INGRESAR_DATOS_4.png">
</div>

### Eliminar Registro
Para eliminar un registro, selecciona el boton color **rojo** en la fila del registro que deseas eliminar y dale **clic**.

<div align="center">
  <h3>Paso 1</h3>
  <img src="readmeAssets/ELIMINAR_1.png">
  <h3>Resultado</h3>
  <img src="readmeAssets/ELIMINAR_2.png">
<div>

### Editar Registro
Para editar un registro, selecciona el boton color **azul** en la fila del registro que deseas editar y dale **clic**, posteriormente, introduce los nuevos datos y da clic en calcular.

<div align="center">
  <h3>Paso 1</h3>
  <img src="readmeAssets/EDITAR_1.png">
  <h3>Paso 2</h3>
  <img src="readmeAssets/EDITAR_2.png">
  <h3>Resultado</h3>
  <img src="readmeAssets/EDITAR_3.png">
<div>

### FIltrar registro
Para filtrar un registro, selecciona el campo **Id a buscar** e introduce el id del registro que deseas ver, dale a la tecla **ENTER** para buscarlo. 

<div align="center">
  <h3>Paso 1</h3>
  <img src="readmeAssets/FILTRAR_1.png">
  <h3>Resultado</h3>
  <img src="readmeAssets/FILTRAR_2.png">
<div>

### Moverse  entre paginas
Si existen muchos registros, pueden moverte utilizando los botones en la parte inferior de la tabla de registros.

<div align="center">
  <h3>Paso 1</h3>
  <img src="readmeAssets/PAGINACION_1.png">
  <h3>Resultado</h3>
  <img src="readmeAssets/PAGINACION_2.png">
<div>

## Resultado
<a href="https://dabrox02.github.io/proyecto-presupuesto-casa/" target="_blank">
    Click Aqui para Ver
    <img src="readmeAssets/RESULTADO.png">
</a>
