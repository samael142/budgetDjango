import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../../context";
import { GetCurrentWeek } from "../utils/utils";


const ReportSettings = () => {

    const [queryData, setQueryData] = useState({ category: '', start: GetCurrentWeek().firstday, end: GetCurrentWeek().lastday, summ: '' })
    const { categories } = useContext(MainContext)
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        localStorage.setItem('reportCategory', queryData.category);
        localStorage.setItem('reportSumm', queryData.summ);
        navigate("/report/generated_report", { state: queryData })

    }

    useEffect(() => {
        if (localStorage.getItem('reportCategory') && localStorage.getItem('reportSumm')) {
            setQueryData({ ...queryData, category: localStorage.getItem('reportCategory'), summ: localStorage.getItem('reportSumm') })
        }
    }, [])


    return (
        <div>
            <br />
            <form onSubmit={handleSubmit}>
                <input
                    value={queryData.category}
                    onChange={e => setQueryData({ ...queryData, category: e.target.value })}
                    onFocus={(event) => { event.target.select() }}
                    type="text" className="form__control" list="category"
                    placeholder="Категория" required />
                <datalist id="category">
                    {categories.map((category) => <option value={category} key={category} />)}
                </datalist>
                <br />
                <input
                    onChange={e => setQueryData({ ...queryData, summ: e.target.value })}
                    onFocus={(event) => { event.target.select() }}
                    type="number" step="0.01" className="form__control" placeholder="Сумма для сравнения"
                    value={queryData.summ} required />
                <br />
                <div className="tr__upper">
                    <input
                        onChange={e => setQueryData({ ...queryData, start: e.target.value })}
                        className="form__control form__sm row__2" type="date"
                        value={queryData.start} />
                    <input
                        onChange={e => setQueryData({ ...queryData, end: e.target.value })}
                        className="form__control form__sm row__2" type="date"
                        value={queryData.end} />
                </div>
                <input type="submit" className="btn btn__green" value="Отправить" />
            </form>
        </div>
    )
}

export default ReportSettings;
