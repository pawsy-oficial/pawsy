import { useState } from "react"

const dataBase = ["2023-06-01", "2023-06-15", "2023-06-15", "2023-06-12", "2019-08-02", "2023-08-24"]
const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026]

export default function Calendar() {
    const date = new Date()
    const today = date.getDate()
    const currentMonth = date.getMonth()
    const currentYear = date.getFullYear()
    const [monthSelect, setMonthSelect] = useState(currentMonth)
    const [yearSelect, setYearSelect] = useState(years.indexOf(currentYear))


    // function heandleCalendar() {
    //     const selectedMonth = parseInt(selectMonth.options[selectMonth.selectedIndex].value)
    //     const selectedYear = parseInt(selectYear.options[selectYear.selectedIndex].value)
    //     // clearCalendar()
    //     // const data = {
    //     //     month: selectedMonth,
    //     //     year: selectedYear
    //     // }
    //     // RenderBoxDay(data)
    // }

    return (
        <div className="p-4 rounded-2xl bg-white flex flex-col gap-4">
            <header className="flex gap-2 font-extrabold">
                <select id="selectMonth" onChange={e => setMonthSelect(parseInt(selectMonth.options[selectMonth.selectedIndex].value))}>
                    {
                        months.map((month, index) => {
                            // console.log(month, currentMonth);
                            return(
                                <option value={index} selected={months.indexOf(month) == currentMonth && true}>{month}</option>
                            )
                        })
                    }
                </select>
                <select id="selectYear" onChange={e=> setYearSelect(parseInt(selectYear.options[selectYear.selectedIndex].value))}>
                    {
                        years.map((year, index) => {
                            return(
                                <option value={index} selected={year == currentYear && true}>{year}</option>
                            )
                        })
                    }
                </select>
            </header>
            <main className="grid grid-cols-7 justify-items-center gap-2">

                <span className="box-calendar week">D</span>
                <span className="box-calendar week">S</span>
                <span className="box-calendar week">T</span>
                <span className="box-calendar week">Q</span>
                <span className="box-calendar week">Q</span>
                <span className="box-calendar week">S</span>
                <span className="box-calendar week">S</span>

                <RenderBoxDay month={monthSelect} year={yearSelect} today={today} currentMonth={currentMonth} currentYear={currentYear}/>
            </main>
        </div>
    )
}


function RenderBoxDay({month, year, today, currentMonth, currentYear}) {
    const lastDayOfMonth = new Date(years[year], parseInt(month) + 1, 0).getDate()
    const firstDayOfWeek = new Date(years[year], parseInt(month), 1).getDay()
    let calendar = []
    let control = 0

    console.log(month, year);
    
    for (let i = 1; i <= lastDayOfMonth; i++) {
        let dateFormat = `${years[year]}-${(month+1).toString().padStart(2,0)}-${i.toString().padStart(2,0)}`

        // adicionar os ultimos dias do mes anterior
        while (control != firstDayOfWeek) {
            let ultimoDiaDoMesAnterior = new Date(years[year], parseInt(month), 0).getDate()
            let dataDay = {
                date: ultimoDiaDoMesAnterior - control,
                class: "last-month",
                status: "disabled"
            }
            calendar.unshift(dataDay)
            control++
        }

        let dataDay = {
            date: i,
            class: "",
            highlighted: false
        }

        // destacar o dia atual
        if (today == i && month == currentMonth && years[year] == currentYear) {
            dataDay.class = "today"
        }

        // destacar dias especificos
        if(dataBase.indexOf(dateFormat) >= 0){
            dataDay.highlighted = true
        }

        // empurrando tudo pra dentro do array calendar
        calendar.push(dataDay)
    }

    control = 0 // var de controle de estado

    // add os primeiros dias do proximo mes
    while (calendar.length < 35) {
        // 1 mes (padrao) => 35 quadrados => 28/29/30/31 fica reservado para os dias do mes 
        let dataDay = {
            date: control + 1,
            class: "last-month",
            status: "disabled"
        }
        calendar.push(dataDay)
        control++
    }

    return calendar.map((day) =>{
        // console.log("ok");
        return <BoxDay day={day} year={year} month={month}/>
    })
    // return calendar.map(day =>{
    //     const t = {
    //         day: day,
    //         month: month,
    //         year: year
    //     }
    //     return BoxDay(t)
    // })
}

function BoxDay({day, year, month}) {
    const idGenerator = `date-${years[year]}-${(month + 1).toString().padStart(2, 0)}-${day.date.toString().padStart(2, 0)}`
    // console.log(i);
    return (
        <label className="box-calendar">
            <input type="radio" name="day" disabled={day.status} />
            <div className={`${day.class} day ${day.highlighted && "active"}`} id={idGenerator}>
                {day.date}
            </div>
        </label>
    )
}