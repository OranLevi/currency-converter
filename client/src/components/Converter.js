import { BsArrowLeftRight } from 'react-icons/bs';

const Converter = () => {
    return (
        <div className="bg-light shadow rounded border border-3 col-lg-6 col-md-8 col-sm-8 col-10 mt-5 m-auto converter-center">
            <Rates />
            <ConverterRow />
        </div>
    );
}

const Rates = () => {
    return (
        <div className="text-center">
            <h2>1.00 USD = 4.4425 MYR</h2>
            <h3>Date: Wed, 22 Feb 2023</h3>
        </div>
    );
}

const ConverterRow = () => {
    return (
        <form>
        <div className="mt-3 px-4">
            <div className="container">
                <h5>Amount:</h5>
                <input type="number" className="form-control" placeholder="Enter Amount" required />

                <div className="row pt-3 d-flex justify-content-center text-center">
                    <DropDownMenu curreny="USD" name="From:" />
                    <div className="col-4 d-flex flex-column align-items-center justify-content-center">
                        <BsArrowLeftRight size={40} />
                    </div>
                    <DropDownMenu curreny="MRY" name="To:" />
                </div>

                <div className="d-grid pt-5">
                    <button className="btn btn-primary" type="submit">Convert</button>
                </div>
            </div>
        </div>
        </form>
    );
}

const DropDownMenu = (props) => {
    return (
        <div className="col-4">
            <h5>{props.name}</h5>
            <div className="dropdown ">
                <a className="btn btn-light btn-outline-secondary dropdown-toggle col-md-12" href="/#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    {props.curreny}
                </a>

                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li><a className="dropdown-item" href="/#">USD</a></li>
                    <li><a className="dropdown-item" href="/#">MRY</a></li>
                    <li><a className="dropdown-item" href="/#">EUR</a></li>
                </ul>
            </div>
        </div>
    );
}

export default Converter;