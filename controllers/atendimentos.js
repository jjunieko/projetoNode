const { append } = require('express/lib/response')
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => 
        Atendimento.lista(res)
    )
    /* res.send('servidor rodando, tudo ok , em atendimentos em GET')) */

    app.get('/atendimentos/:id', (req, res) =>{
        const id = parseInt(req.params.id)

        Atendimento.bucaPorId(id, res)

        /* res.send('OK') */
    })


    app.post('/atendimentos', (req, res)=> {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
        res.send("esta na rota de atendimento, realizandop um POST")}
        )

/*  atualização de varios itens */
        app.patch('/atendimentos/:id', (req, res)=>{
            const id = parseInt(req.params.id)
            const  valores = req.body


            Atendimento.altera(id, valores, res)
        })


        app.delete('/atendimentos/:id', (req, res)=> {
            const id = parseInt(req.params.id)

            Atendimento.deleta(id, res)
        })


    /*  atualizaçaão de apenas um item */
    app.put('/atendimentos/:id', (req, res) => {

            const id = parseInt(req.params.id)
            const valores = req.body 


            Atendimento.alteraUhm(id, valores, res)
        
    })
}