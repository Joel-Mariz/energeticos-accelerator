const input = require('fs')
  .readFileSync('stdin', 'utf-8')
  .split(';')
  .map(string => string.replace('\r\n', '').trim())

let nomeCliente = input.shift(),
  qtdProdutos = input.shift(),
  totImpostos = 0,
  totMercadorias = 0

const aliquotas = new Map([
    ['IMCS', 18],
    ['IPI', 4],
    ['PIS', 1.86],
    ['CONFINS', 8.54]
  ]),
  valorUnitario = 4.5

console.log('IMPRIMINDO NOTA FISCAL...')
setTimeout(() => {
  for (let i = 1; i <= input.length++; i++) {
    console.log(`
* ENERGETICOS ACCELERATOR DISTRIBUIDORA *
=========================================
Cliente N°${i}: ${nomeCliente.toLocaleUpperCase()}
Quantidade fornecida: ${qtdProdutos} Unidades
=========================================
--------------- tributação --------------`)
    let total = 0
    for (let key of aliquotas.keys()) {
      let calc = (valorUnitario * qtdProdutos * aliquotas.get(key)) / 100
      console.log(`${key}: ${formatBRL(calc)}`)
      total += calc
    }
    console.log(`Total: ${formatBRL(valorUnitario * qtdProdutos + total)}`)
    totImpostos += total
    totMercadorias += qtdProdutos * valorUnitario

    nomeCliente = input.shift()
    qtdProdutos = input.shift()
  }

  console.log(`\n-------------- DADOS GERAIS -------------\n
Total Impostos: ${formatBRL(totImpostos)}
Total Mercadorias: ${formatBRL(totMercadorias)}
Total Geral: ${formatBRL(totImpostos + totMercadorias)}\n`)
}, 2000)

function formatBRL(string) {
  return string.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
