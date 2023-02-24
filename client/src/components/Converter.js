import { BsArrowLeftRight } from 'react-icons/bs';
import Axios from "axios";
import { useState } from 'react';
import currencies from '../data/currencies';

const Converter = () => {

    /* State variables related to button clicks */
    const [isError, setIsError] = useState(false);
    const [isClickConvert, setIsClickConvert] = useState(false);
    const [isClickedExchange, setIsClickedExchange] = useState(false);

    /* State variables related to selected currencies */
    const [selectedCurrenyFrom, setSelectedCurrenyFrom] = useState("");
    const [selectedCurrenyTo, setSelectedCurrenyTo] = useState("");

    /* State variables related to conversion results */
    const [lastUpdate, setLastUpdate] = useState("");
    const [amountInput, setAmountInput] = useState();
    const [amountTotal, setAmountTotal] = useState(0);

    /* State variables related to display to user */
    const [currenyFromDisplay, setCurrenyFromDisplay] = useState("");
    const [currenyToDisplay, setCurrenyToDisplay] = useState("");
    const [currenyAmountToDisplay, setCurrenyAmountToDisplay] = useState("");
    const [errorMessage, setErrorMessage] = useState("")

    const handleCurrencyChangeFrom = (event) => {
        setSelectedCurrenyFrom(event.target.value);
    };

    const handleCurrencyChangeTo = (event) => {
        setSelectedCurrenyTo(event.target.value);
    };

    const handleClickExchange = () => {
        setIsClickedExchange(true);
        setTimeout(() => {
            setIsClickedExchange(false);
        }, 200);
        setSelectedCurrenyFrom(selectedCurrenyTo);
        setSelectedCurrenyTo(selectedCurrenyFrom);
    }

    function convertButton(event) {
        event.preventDefault();
        setIsError(false);
        if (!amountInput || !selectedCurrenyFrom || !selectedCurrenyTo) {
            setIsError(true);
            setErrorMessage("Please fill in all fields")
            return;
        }

        Axios.get(`http://localhost:3001/getData/${selectedCurrenyFrom}/${selectedCurrenyTo}`, {
            selectedCurrenyFrom: selectedCurrenyFrom,
            selectedCurrenyTo: selectedCurrenyTo
        })
            .then(response => {
                const data = response.data;
                const dateObj = new Date(data.time_last_update_utc);
                const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

                setLastUpdate(formattedDate);
                setAmountTotal(amountInput * data.conversion_rates[selectedCurrenyTo]);
                setCurrenyFromDisplay(selectedCurrenyFrom);
                setCurrenyToDisplay(selectedCurrenyTo);
                setCurrenyAmountToDisplay(data.conversion_rates[selectedCurrenyTo]);
                setIsClickConvert(true);
            })
            .catch(error => {
                console.error(error);
                setIsError(true);
                setErrorMessage("Check your internet connection and try again")
            });
    }

    const Error = (props) => {
        return (
            <div className="alert alert-danger">
                <strong>Error!</strong> {props.errorMessage}
            </div>
        );
    }

    const RatesRow = () => {
        return (
            <div className="text-center">
                <h3>1.00 {currenyFromDisplay} = {currenyAmountToDisplay} {currenyToDisplay}</h3>
                <h1>Amount: {amountTotal} {currenyToDisplay}</h1>
                <p className='text-center mt-2'>Last Updated: {lastUpdate}</p>
            </div>
        );
    }

    const ConverterRow = () => {
        return (
            <div className="mt-3 px-4">
                <div className="container">
                        <h5>Amount:</h5>
                        <input type="number" value={amountInput} onChange={(event) => { setAmountInput(event.target.value) }} className="form-control" placeholder="Enter Amount" autoFocus/>

                        <div className="row pt-3 d-flex justify-content-center text-center">
                            <DropDownMenu currency={selectedCurrenyFrom} currencies={currencies} handleCurrencyChange={handleCurrencyChangeFrom} name="From:" />
                            <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                                <BsArrowLeftRight className={isClickedExchange ? 'clicked' : ''} size={40} color={isClickedExchange ? 'blue' : ''} onClick={handleClickExchange} />
                            </div>
                            <DropDownMenu currency={selectedCurrenyTo} currencies={currencies} handleCurrencyChange={handleCurrencyChangeTo} name="To:" />
                        </div>
                        <div className="d-grid pt-5">
                            <button onClick={convertButton} className="btn btn-primary" type="submit">Convert</button>
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
                            return <li key={index}><button className="dropdown-item" onBlur={props.handleCurrencyChange} value={item}>{item}</button></li>
                        })}

                    </ul>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-light shadow rounded border border-3 col-lg-6 col-md-8 col-sm-8 col-10 mt-5 m-auto converter-center">
            {isError && <Error errorMessage={errorMessage} />}
            {isClickConvert && <RatesRow />}
            <ConverterRow />
        </div>
    );
}

export default Converter;