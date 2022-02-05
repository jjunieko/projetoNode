const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('servidor rodando, tudo ok , em atendimentos em GET'))


    app.post('/atendimentos', (req, res)=> {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
        res.send("esta na rota de atendimento, realizandop um POST")}
        )
}