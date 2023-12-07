import { CaretLeft, CreditCard, PaypalLogo } from "@phosphor-icons/react"
import Logo from "../../img/logoPawsy.svg"
import ButtonFormPayment from "../buttons/ButtonFormPayment"
import { HeaderLandingPage } from "../header/Header"

export default function Payment({ idPayment, planScreen }) {
    const style = {
        position: "absolute",
        background: "#fff"
    }

    return (
        <main
            className="flex min-h-screen"
        >
            <HeaderLandingPage style={style} />



            <div className="bg-banner_payment bg-green-300 min-w-[500px] bg-no-repeat bg-cover flex justify-center items-center">
                <img
                    src={Logo}
                    className="w-3/4"
                    draggable={false}
                />
            </div>

            <form
                className="w-full py-24 px-8 flex flex-col gap-8"
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
                        Pawsy +
                    </h2>

                    <div
                        className="flex flex-col items-end"
                    >
                        <strong
                            className="text-lg"
                        >
                            até 12x de R$9,00
                        </strong>
                        <span
                            className="text-base"
                        >
                            à vista R$ 100,00
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
                            icon={<CreditCard size={32} color="#22B77E" weight="duotone" />}
                            typeForm="Cartão"
                        />
                        <ButtonFormPayment
                            icon={<PaypalLogo size={32} color="#22B77E" weight="duotone" />}
                            typeForm="PayPal"
                        />
                        <ButtonFormPayment
                            // icon={<CreditCard size={32} color="#22B77E" weight="duotone" />}
                            typeForm="PIX"
                        />
                    </div>
                </section>

            </form>
        </main>
    )
}