import { CaretLeft, Check, CreditCard, PaypalLogo } from "@phosphor-icons/react"
import Logo from "../../img/logoPawsy.svg"
import PixIcon from "../../img/pix_icon.png"
import ButtonFormPayment from "../buttons/ButtonFormPayment"
import { HeaderLandingPage } from "../header/Header"
import InputMask from "react-input-mask"
import { useState } from "react"

const PLANS_DB = [
    {
        price: 1.00,
        name: "Pawsy Basic",
        qntInstallments: 12,
        installments: 1.00
    },
    {
        price: 2.00,
        name: "Pawsy +",
        qntInstallments: 12,
        installments: 2.00
    },
    {
        price: 3.00,
        name: "Pawsy Ultra",
        qntInstallments: 2,
        installments: 3.00
    }
]


export default function Payment({ idPayment, planScreen }) {
    const style = {
        position: "stick",
        top: 0,
        background: "#fff"
    }

    return (
        <main
            className="flex min-h-screen justify-between"
        >
            <HeaderLandingPage style={style} />

            <form
                className="max-w-4xl w-full py-24 px-8 flex flex-col gap-8 mx-auto"
                onSubmit={e => preventDefault(e)}
            >
                <button
                    onClick={() => planScreen(false)}
                    className="flex gap-2 items-center"
                >
                    <CaretLeft />
                    Voltar
                </button>
                <div
                    className="w-full border border-pawsy-green bg-green-50 rounded-lg p-4 flex justify-between items-center"
                >
                    <h2
                        className="text-[2rem] font-baloo2 font-semibold"
                    >
                        {
                            PLANS_DB[idPayment].name
                        }
                    </h2>

                    <div
                        className="flex flex-col items-end"
                    >
                        <strong
                            className="text-lg"
                        >
                            até {
                                PLANS_DB[idPayment].qntInstallments
                            }x de R${
                                PLANS_DB[idPayment].installments
                            }
                        </strong>
                        <span
                            className="text-base"
                        >
                            à vista R$ {
                                PLANS_DB[idPayment].price
                            }
                        </span>
                    </div>
                </div>

                <section
                    className="flex flex-col gap-6"
                >
                    <strong
                        className="text-2xl font-semibold"
                    >
                        Deseja adicionar um cupom?
                    </strong>

                    <div
                        className="flex gap-2"
                    >
                        <input
                            type="text"
                            className="rounded-lg border-2 border-pawsy-green py-1 px-6 uppercase text-center text-emerald-800 font-bold w-64"
                            placeholder="Cupom"
                            maxLength={10}
                        />
                        <button
                            className="py-2 px-6 rounded-lg bg-pawsy-green text-white font-lato font-semibold"
                            type="button"
                        >
                            APLICAR
                        </button>
                    </div>
                </section>

                <SectionPaymentOption />

                <button
                    type="submit"
                    className="w-full bg-pawsy-green text-xl rounded-lg py-2 text-white font-bold"
                >
                    CONFIRMAR PAGAMENTO
                </button>
            </form>

            <div className="bg-banner_payment bg-green-300 min-w-[40%] bg-no-repeat bg-cover flex justify-center items-center sticky top-0">
                <img
                    src={Logo}
                    className="w-3/4"
                    draggable={false}
                />
            </div>
        </main>
    )
}



function DataCreditCard() {
    return (
        <section
            className="flex flex-col gap-6"
        >
            <strong
                className="text-2xl font-semibold"
            >
                Dados do seu cartão
            </strong>

            <div
                className="flex flex-col gap-2"
            >
                <label
                    className="flex flex-col gap-1 leading-relaxed"
                >
                    Número do Cartão
                    <InputMask
                        mask={"9999 9999 9999 99999"}
                        maskChar={null}
                        // placeholder={"(MM/AA)"}
                        className="rounded-lg border-2 border-pawsy-green py-1 p-2 text-base flex-1"
                    />
                </label>

                <div
                    className="flex gap-5 justify-between"
                >
                    <label
                        className="flex flex-col flex-1 gap-1 leading-relaxed"
                    >
                        Data de expiração
                        <InputMask
                            mask={"99/99"}
                            maskChar={null}
                            placeholder={"(MM/AA)"}
                            className="rounded-lg border-2 border-pawsy-green py-1 p-2 text-base flex-1"
                        />
                    </label>
                    <label
                        className="flex flex-1 flex-col gap-1 leading-relaxed"
                    >
                        Código de segurança (CVV)
                        <InputMask
                            mask={"9999"}
                            maskChar={null}
                            placeholder={"XXXX"}
                            className="rounded-lg border-2 border-pawsy-green py-1 p-2 text-base flex-1"
                        />
                    </label>
                </div>

                <label
                    className="flex flex-col gap-1 leading-relaxed"
                >
                    Nome no cartão
                    <input
                        type="text"
                        className="rounded-lg border-2 border-pawsy-green p-2 text-base"
                    />
                </label>

                <label
                    className="flex flex-col gap-1 leading-relaxed"
                >
                    Parcelamento
                    <select
                        type="text"
                        className="rounded-lg border-2 border-pawsy-green p-2 text-base focus-within:border-pawsy-green"
                    >
                        <option value="1x">1x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">2x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">3x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">4x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">5x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">6x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">7x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">8x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">9x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">10x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">11x R$ 900,00, total R$ 900,00</option>
                        <option value="1x">12x R$ 900,00, total R$ 900,00</option>
                    </select>
                </label>

            </div>
        </section>
    )
}


function SectionPaymentOption({ idPayment }) {
    const [typePayment, setTypePayment] = useState(1)

    function OptionPayment() {
        switch (typePayment) {
            case "Cartão":
                return <DataCreditCard />
            case "PayPal":
                return (
                    <div
                        className="flex gap-3 items-center"
                    >
                        <div
                            className="w-10 h-10 rounded-full bg-pawsy-green/20 flex items-center justify-center"
                        >
                            <Check color="#22937E" size={32} weight="bold" />
                        </div>
                        <p>Você será redirecionado após a <strong>confirmação de pagamento</strong>.</p>
                    </div>
                )
            case "PIX":
                return (
                    <div
                        className="flex gap-3 items-center"
                    >
                        <div
                            className="w-10 h-10 rounded-full bg-pawsy-green/20 flex items-center justify-center"
                        >
                            <Check color="#22937E" size={32} weight="bold" />
                        </div>
                        <p>A chave Pix será gerada após a <strong>confirmação do pagamento</strong>.</p>
                    </div>
                )
        }
    }
    return (
        <>
            <section
                className="flex flex-col gap-6"
            >
                <strong
                    className="text-2xl font-semibold"
                >
                    Forma de pagamento
                </strong>

                <div
                    className="flex gap-10 justify-between"
                >
                    <ButtonFormPayment
                        icon={<CreditCard size={32} color="#22B77E" weight="fill" />}
                        typeForm="Cartão"
                        typePayment={setTypePayment}
                    />
                    <ButtonFormPayment
                        icon={<PaypalLogo size={32} color="#22B77E" weight="fill" />}
                        typeForm="PayPal"
                        typePayment={setTypePayment}
                    />
                    <ButtonFormPayment
                        icon={<img src={PixIcon} />}
                        typePayment={setTypePayment}
                        typeForm="PIX"
                    />
                </div>
            </section>
            <section
                className="flex flex-col gap-6"
            >
                <strong
                    className="text-2xl font-semibold"
                >
                    Digite seu CPF
                </strong>

                <InputMask
                    mask={"999.999.999-99"}
                    maskChar={null}
                    placeholder={"CEP"}
                    className="rounded-lg border-2 border-pawsy-green py-1 p-2 text-base w-fit"
                />
            </section>

            <OptionPayment />
        </>
    )
}