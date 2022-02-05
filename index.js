const customExpress = require("./config/customExpress")

const conexao = require("./infraestutura/conexao")

const Tabelas = require ("./infraestutura/tabelas")

conexao.connect(erro => {
    if(erro) {
        console.log(erro)
    }else{
        console.log("conectado com sucesso")
        
        Tabelas.init(conexao)

        const app = customExpress()
        
        app.listen(3000, () => ('servidor rodando'))

    }

})

