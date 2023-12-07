import { useState } from "react";
import Payment from "../../components/payment/payment";
import Plans from "../../components/payment/plans";
import useTopToScreen from "../../hook/useTopToScreen";



export default function PlansPage() {
    useTopToScreen()

    const [ isPlan, setIsPlan ] = useState(0)
    const [ showPlanScreen, setShowPlanScreen ] = useState(false)

    return (
        <>
            {
                !showPlanScreen 
                ? <Plans
                    planScreen={setShowPlanScreen}
                    isPlan={setIsPlan}
                /> 
                : <Payment 
                    idPayment={isPlan} 
                    planScreen={setShowPlanScreen} 
                />
            }
        </>
    )
}
