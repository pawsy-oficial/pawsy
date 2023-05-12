export default function CardReceitas({emissao, validade, dr}){
    return(
        <a id="revenue1" href="/receitas?receita=1">
          <p>Emissão: {emissao}</p>
          <p>Validade: {validade}</p>
          <p>Dr(a) {dr}</p>
        </a>
    )
}