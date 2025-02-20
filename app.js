const express = require("express");
const dotenv = require('dotenv');
const { json } = require('express/lib/response');
const cookparser = require('cookie-parser');
const conexion = require("./databases/db");
const Pool = require("mysql/lib/Pool");
const pool = require("./databases/db");

const app = express();
const PORT = process.env.PORT || 3000
//Set Motor de Plantillas
app.set('view engine', 'ejs');

//Set Carpeta Publica para archivos estaticos
app.use(express.static('public'));

//Para Procesar datos enviados desde Forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Set Variables de Entorno
dotenv.config({ path: '/env/.env}' });

//Set Cookies
app.use(cookparser())

app.use('/', require('./routes/router'));

app.get('/', (req, res) => {
    res.render('login')
})



app.get('/api/entradas_act', (req, res) => {
    const producto = 'Filete De Lirio'

    pool.query('SELECT entradas_act.producto, 	sum(entradas_act.kilos_totales) as kilos_totales FROM 	entradas_act GROUP BY 	entradas_act.producto', (error, filas) => {

        console.log(filas)
        if (error) {
            throw error;
        } else {
            res.send(filas)
        }

    })
})




app.listen(PORT, () => {
    console.log('SERVER UP running', PORT);
}
)