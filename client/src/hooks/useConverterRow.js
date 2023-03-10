import { useState } from 'react';
import { BsArrowLeftRight } from 'react-icons/bs';
import Axios from "axios";
import currencies from '../data/currencies';

const useConverterRow = () => {

    const [isClickedExchange, setIsClickedExchange] = useState(false);
    const [convertButtonText, setConvertButtonText] = useState("Convert");
    const [convertButtonDisable, setConvertButtonDisable] = useState(false);
    const [selectedCurrencyFrom, setSelectedCurrencyFrom] = useState("");
    const [selectedCurrencyTo, setSelectedCurrencyTo] = useState("");
    const [amountInput, setAmountInput] = useState();
    const [isErrorAlert, setIsErrorAlert] = useState(false);
    const [isClickConvert, setIsClickConvert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")
    const [currencyFromDisplay, setCurrencyFromDisplay] = useState("");
    const [currencyToDisplay, setCurrencyToDisplay] = useState("");
    const [currencyAmountToDisplay, setCurrencyAmountToDisplay] = useState("");
    const [amountTotal, setAmountTotal] = useState(0);
    const [lastUpdate, setLastUpdate] = useState("");

    const handleCurrencyChangeFrom = (event) => {
        setSelectedCurrencyFrom(event.target.value);
    };

    const handleCurrencyChangeTo = (event) => {
        setSelectedCurrencyTo(event.target.value);
    };

    const handleClickExchange = () => {
        setIsClickedExchange(true);
        setTimeout(() => {
            setIsClickedExchange(false);
        }, 200);
        setSelectedCurrencyFrom(selectedCurrencyTo);
        setSelectedCurrencyTo(selectedCurrencyFrom);
    }

    function convertButton(event) {
        event.preventDefault();

        setIsErrorAlert(false);
        if (!amountInput || !selectedCurrencyFrom || !selectedCurrencyTo) {
            setIsErrorAlert(true);
            setErrorMessage("Please fill in all fields")
            return;
        }

        setConvertButtonText("Loading.. Please Wait.")
        setConvertButtonDisable(true)

        Axios.get(`http://localhost:3001/getData/${selectedCurrencyFrom}/${selectedCurrencyTo}`, {
            selectedCurrencyFrom: selectedCurrencyFrom,
            selectedCurrencyTo: selectedCurrencyTo
        })
            .then(response => {
                const data = response.data;
                const dateObj = new Date(data.time_last_update_utc);
                const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

                setLastUpdate(formattedDate);
                setAmountTotal(amountInput * data.conversion_rates[selectedCurrencyTo]);
                setCurrencyFromDisplay(selectedCurrencyFrom);
                setCurrencyToDisplay(selectedCurrencyTo);
                setCurrencyAmountToDisplay(data.conversion_rates[selectedCurrencyTo]);
                setIsClickConvert(true);
                setConvertButtonText("Convert")
                setConvertButtonDisable(false)
            })
            .catch(error => {
                console.error(error);
                setIsErrorAlert(true);
                setErrorMessage("Check your internet connection and try again")
                setConvertButtonText("Convert")
                setConvertButtonDisable(false)
            });

    }

    const ConverterRow = () => {
        return (
            <div className="mt-3 px-4">
                <div className="container">
                    <h5>Amount:</h5>
                    <input type="number" value={amountInput} onChange={(event) => { setAmountInput(event.target.value) }} className="form-control" placeholder="Enter Amount" autoFocus />

                    <div className="row pt-3 d-flex justify-content-center text-center">
                        <DropDownMenu currency={selectedCurrencyFrom} currencies={currencies} handleCurrencyChange={handleCurrencyChangeFrom} name="From:" />
                        <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                            <BsArrowLeftRight className={isClickedExchange ? 'clicked' : ''} size={40} color={isClickedExchange ? 'blue' : ''} onClick={handleClickExchange} />
                        </div>
                        <DropDownMenu currency={selectedCurrencyTo} currencies={currencies} handleCurrencyChange={handleCurrencyChangeTo} name="To:" />
                    </div>
                    <div className="d-grid pt-5">
                        <button onClick={convertButton} disabled={convertButtonDisable} className="btn btn-primary" type="submit">{convertButtonText}</button>

                    </div>
                </div>
            </div>
        );
    }

    const DropDownMenu = (props) => {
        return (
            <div className="col-4">
                <h5>{props.name}</h5>
                <div className="dropdown ">

                    <button className="btn btn-light btn-outline-secondary dropdown-toggle col-md-12" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                        {props.currency}
                    </button>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                        {props.currencies.map((item, index) => {
                            return <li key={index}><button className="dropdown-item" onClick={props.handleCurrencyChange} value={item}>{item}</button></li>
                        })}

                    </ul>
                </div>
            </div>
        );
    }


    return {
        ConverterRow,
        isErrorAlert,
        isClickConvert,
        errorMessage,
        currencyFromDisplay,
        currencyToDisplay,
        currencyAmountToDisplay,
        amountTotal,
        lastUpdate
    };
}

export default useConverterRow;