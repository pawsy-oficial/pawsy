import Footer from "../../components/footer";
import { HeaderLandingPage } from "../../components/header/Header";
import styles from "./style.module.css"

function Terms() {
    const style = {
        position: "sticky",
        top: 0,
        boxShadow: "rgba(0,0,0,.2) 0 -2px 7px"
    }

    return (
        <>
            <HeaderLandingPage style={style} type="light" />

            <main
                className="max-w-6xl mx-auto flex gap-6 min-h-screen my-10 px-8"
            >
                <article
                    className="bg-white rounded-lg py-6 px-4 flex-1 max-w-2xl"
                >
                    <div
                        className="w-full flex flex-col gap-2 mb-8"
                    >
                        <h1
                            className="text-zinc-800 font-lato font-bold text-3xl"
                        >
                            Termos de uso
                        </h1>
                        <strong
                            className="text-primary"
                        >
                            Ultima atualização: {" "}
                            <time
                                className="text-zinc-500 font-lato text-sm font-normal"
                            >
                                Outubro de 2023
                            </time>
                        </strong>
                    </div>

                    <div
                        className="flex flex-col gap-3"
                    >
                        <p
                            className="text-zinc-800 leading-relaxed text-sm font-lato"
                        >
                            Pawsy, pessoa jurídica de direito privado descreve, através deste documento, as regras de uso do site www.pawsy.com.br e qualquer outro site, loja ou aplicativo operado pelo proprietário
                        </p>
                        <p
                            className="text-zinc-800 leading-relaxed text-sm font-lato"
                        >
                            Ao navegar neste website, consideramos que você está de acordo com os Termos de Uso abaixo.
                        </p>
                        <p
                            className="text-zinc-800 leading-relaxed text-sm font-lato"
                        >
                            Caso você não esteja de acordo com as condições deste contrato, pedimos que não faça mais uso deste website, muito menos cadastre-se ou envie os seus dados pessoais.
                        </p>
                        <p
                            className="text-zinc-800 leading-relaxed text-sm font-lato"
                        >
                            Se modificarmos nossos Termos de Uso, publicaremos o novo texto neste website, com a data de revisão atualizada. Podemos alterar este documento a qualquer momento. Caso haja alteração significativa nos termos deste contrato, podemos informá-lo por meio das informações de contato que tivermos em nosso banco de dados ou por meio de notificações.
                        </p>
                        <p
                            className="text-zinc-800 leading-relaxed text-sm font-lato"
                        >
                            A utilização deste website após as alterações significa que você aceitou os Termos de Uso revisados. Caso, após a leitura da versão revisada, você não esteja de acordo com seus termos, favor encerrar o seu acesso.
                        </p>
                    </div>

                    <ul
                        className="pl-5 flex flex-col gap-6 mt-8"
                    >
                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 1 - Usuário
                            </h2>
                            <p className={styles.p}>
                                A utilização deste website atribui de forma automática a condição de Usuário e implica a plena aceitação de todas as diretrizes e condições incluídas nestes Termos.
                            </p>
                        </li>
                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 2 - Adesão em conjunto com a Política de Privacidade
                            </h2>
                            <p className={styles.p}>
                                A utilização deste website acarreta a adesão aos presentes Termos de Uso e a versão mais atualizada da Política de Privacidade da Pawsy.
                            </p>
                        </li>
                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 3 - Condições de acesso
                            </h2>

                            <div
                                className="flex flex-col gap-3"
                            >
                                <p className={styles.p}>
                                    O acesso ao website da pawsy possui caráter gratuito epenas aos tutores, e exige prévia inscrição ou registro.
                                </p>
                                <p className={styles.p}>
                                    É de total responsabilidade do usuário fornecer apenas informações corretas, autênticas, válidas, completas e atualizadas, bem como não divulgar o seu login e senha para terceiros.
                                </p>
                                <p className={styles.p}>
                                    Partes deste website oferecem ao usuário a opção de publicar comentários em determinadas áreas. A Pawsy não consente com a publicação de conteúdos que tenham natureza discriminatória, ofensiva ou ilícita, ou ainda infrinjam direitos de autor ou quaisquer outros direitos de terceiros.
                                </p>
                                <p className={styles.p}>
                                    A publicação de quaisquer conteúdos pelo usuário deste website, incluindo mensagens e comentários, implica em licença não-exclusiva, irrevogável e irretratável, para sua utilização, reprodução e publicação pela Pawsy no seu website, plataformas e aplicações de internet, ou ainda em outras plataformas, sem qualquer restrição ou limitação.
                                </p>
                            </div>
                        </li>
                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 4 - Cookies
                            </h2>

                            <div
                                className="flex flex-col gap-3"
                            >
                                <p className={styles.p}>
                                    Informações sobre o seu uso neste website podem ser coletadas a partir de cookies. Cookies são informações armazenadas diretamente no computador que você está utilizando. Os cookies permitem a coleta de informações tais como o tipo de navegador, o tempo despendido no website, as páginas visitadas, as preferências de idioma, e outros dados de tráfego anônimos. Nós e nossos prestadores de serviços utilizamos informações para proteção de segurança, para facilitar a navegação, exibir informações de modo mais eficiente, e personalizar sua experiência ao utilizar este website, assim como para rastreamento online. Também coletamos informações estatísticas sobre o uso do website para aprimoramento contínuo do nosso design e funcionalidade, para entender como o website é utilizado e para auxiliá-lo a solucionar questões relevantes.
                                </p>
                                <p className={styles.p}>
                                    Caso não deseje que suas informações sejam coletadas por meio de cookies, há um procedimento simples na maior parte dos navegadores que permite que os cookies sejam automaticamente rejeitados, ou oferece a opção de aceitar ou rejeitar a transferência de um cookie (ou cookies) específico(s) de um site determinado para o seu computador. Entretanto, isso pode gerar inconvenientes no uso do website.
                                </p>
                                <p className={styles.p}>
                                    Caso não deseje que suas informações sejam coletadas por meio de cookies, há um procedimento simples na maior parte dos navegadores que permite que os cookies sejam automaticamente rejeitados, ou oferece a opção de aceitar ou rejeitar a transferência de um cookie (ou cookies) específico(s) de um site determinado para o seu computador. Entretanto, isso pode gerar inconvenientes no uso do website.
                                </p>
                            </div>
                        </li>
                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 5 - Propriedade Intelectual
                            </h2>

                            <div
                                className="flex flex-col gap-3"
                            >
                                <p className={styles.p}>
                                    Todos os elementos de Pawsy são de propriedade intelectual da mesma ou de seus licenciados. Estes Termos ou a utilização do website não concede a você qualquer licença ou direito de uso dos direitos de propriedade intelectual da pawsy ou de terceiros.
                                </p>
                            </div>
                        </li>

                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 6 - Prazos e alterações
                            </h2>

                            <div
                                className="flex flex-col gap-3"
                            >
                                <p className={styles.p}>
                                    O funcionamento deste website se dá por prazo indeterminado.
                                </p>
                                <p className={styles.p}>
                                    O website no todo ou em cada uma das suas seções, pode ser encerrado, suspenso ou interrompido unilateralmente por pawsy, a qualquer momento e sem necessidade de prévio aviso.
                                </p>
                            </div>
                        </li>
                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 7 - Dados pessoais
                            </h2>

                            <div
                                className="flex flex-col gap-3"
                            >
                                <p className={styles.p}>
                                    Durante a utilização deste website, certos dados pessoais serão coletados e tratados por Pawsy e/ou pelos Parceiros. As regras relacionadas ao tratamento de dados pessoais de pawsy estão estipuladas na Política de Privacidade.
                                </p>
                            </div>
                        </li>
                        <li
                            id="1"
                            className="pl-6"
                        >
                            <h2
                                className={styles.subTitle}
                            >
                                Seção 8 - Contato
                            </h2>

                            <div
                                className="flex flex-col gap-3"
                            >
                                <p className={styles.p}>
                                    Caso você tenha qualquer dúvida sobre os Termos de Uso, por favor, entre em contato pelo e-mail pawsyplataform@gmail.com
                                </p>
                            </div>
                        </li>
                    </ul>
                </article>

                {/* <nav
                    className="w-96 bg-white rounded-lg h-fit p-4"
                >
                    <a
                        href="#1"
                        rel="noopener noreferrer"
                    >
                        Primeiro tópico
                    </a>
                </nav> */}
            </main>

            <Footer />
        </>
    );
}

export default Terms;