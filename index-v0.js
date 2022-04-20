const { strictEqual } = require('assert')
const express = require('express')
const { connect } = require('http2')
const app = express()
const mysql = require('mysql2')
const porta = 3000
let index
let params
const colunas = ['id','nome','cpf','matricula']

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'teste_um'
})

app.use(express.json())

let table = 'DADOS'

const select = () => {
    return `SELECT * FROM ${table}`
}
const selectItem = () => {
    return `SELECT * FROM ${table} WHERE ID = ${index}`
}
inputaItem = (data) => {
    return `INSERT INTO ${table} (${colunas[0]},${colunas[1]},${colunas[2]},${colunas[3]}) VALUES (null, "${data[colunas[1]]}",${data[colunas[2]]},"${data[colunas[3]]}")`
    //coluna has all items from the database, and data gets all
    //req.body items, so [data[colunas[1]]] is the data that you 
    //put on req.body in 'nome' fields.
}

function deleteItem(){
    return `DELETE FROM ${table} WHERE ID = ${index}`
}


app.get('/', (req, res) => {
    connection.query(select(), function(err, result){
        if(err) throw err
        res.send(result)
    })
})

app.get('/:id', (req, res) => {
    index = req.params.id
    connection.query(selectItem(), function(err, result){
        if(err) throw err
        res.send(result)
    })
})

app.post('/', (req, res) => {
    let inputData = req.body
    console.log(inputData)
    connection.query(inputaItem(inputData), (err, result) => {
        if(err) throw err
        res.send('PORRA PORRA CARALHO, TO DESCONTROLADO')
    })
})

app.delete('/:id', (req, res) => {
    index = req.params.id
    connection.query(deleteItem(), (err, result) => {
        if(err) throw err
        res.send('FOI BB')
    })
})

app.put("/:id", (req, res) => {
    index = req.params.id
    for (let params in req.body){
        let sql = `UPDATE ${table} set ${params} = "${req.body[params]}" where id = ${index}`
        connection.query(sql, (err, result) => {
            if (err) throw err
            res.send('PRONTOOOOOOOOOO')
        })
    }
})



app.listen(porta, () => {console.log("Rodando")})