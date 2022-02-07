const res = require('express/lib/response')
const moment = require('moment')

const conexao = require('../infraestutura/conexao')

class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)

        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: "Data deve ser maior ou igual data atual"
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: "Pelo menos 5 caracteres"
            }
        ]

        const erros = validacoes.filter(campo => campo.valido)
        const existemErros = erros.length

        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }

            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(atendimento)
                    // res.status(201).json(resultados)
                }
            })
        }

    }

    lista(res) {
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }else{
                res.status(200).json(resultados)
            }
        })
    }

    buscaPorId( ){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`
        const atendimento = resultados[0]
        conexao.query(sql, (erro) => {
            if(erro) {
                res.status(400).json(erro)
            }else{
                res.status(200).json(atendimento)
            }
        })
    }

    altera(id, valores, res) {
        if(valores.data) {
            valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = `UPDATE Atendimentos SET ? WHERE id=?` 

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }else{
                res.status(200).json(...valores , id) /*  de quem foi alterado */
                // res.status(200).json(resultados)
            }

        })
    }

    deleta(id, res) {
        const sql = `DELETE FROM Atendimentos WHERE id=?` 


        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                res.status(400).json(erro)
            }else{
                /* devolve id deletado em objeto({id}) , melhorar para client http */
                res.status(200).json({id})
                /* res.status(200).json(resultados) */
            }

        })
    }
    alteraUhm(id, valores, res){
        if(valores.data) {
            valores.data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
        }
        const sql = 'INSERT INTO EMPREGADOS(CODIGO, NOME, SALARIO, SECAO) VALUES(1, "HELBERT CARVALHO", 1.500, 1) INSERT INTO EMPREGADOS VALUES(1,"HELBERT CARVALHO",1500,1)'  /*  exemplo  */

            conexao.query(sql, [valores, id] , (erro, resuldados) =>{
                if(erro) {
                    res.status(400).json(erro)
                }else{
                    res.status(200).json(...valores , id) /*  de quem foi alterado */
                    // res.status(200).json(resultados)
                }
            })

    }
}

module.exports = new Atendimento