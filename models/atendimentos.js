const conexao = require('../infraestutura/conexao')

class Atendimento{
    adiciona(atendimento) {

        const sql = 'INSERT INTO Atendimentos SET ?'


        conexao.query( sql, atendimento, (erro, resultados) => {
                if(erro) {
                    console.log(erro)
                }else{ 
                    console.log("deu certo criar a query no banco" , resultados)
                }
        })
        
    }
}

module.exports = new Atendimento