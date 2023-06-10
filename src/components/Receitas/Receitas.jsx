export default function CardReceitas({emissao, validade, dr}){
    return(
        <a className="flex items-center my-6 mx-auto justify-between py-3 px-24 w-[1084px] h-11 bg-[#F5FFFE] border border-primary rounded-lg hover:bg-[#d2eee4]" href="/receitas?receita=1">
          <p>Emissão: {emissao}</p>
          <p>Validade: {validade}</p>
          <p>Dr(a) {dr}</p>
        </a>
    )
}