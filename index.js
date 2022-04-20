const express = require('express')
const app = express()
const mysql = require('mysql2')
const porta = 8080

const connection = mysql.createConnection({
    host:'localhost',
    user:'root'
})


let sql = 'CREATE DATABASE PWBE_ALUNO'
connection.query(sql, function(err, result){
    if(err) throw err
    console.log('Foi')
})
