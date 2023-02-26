import { motion, AnimatePresence } from 'framer-motion';
import useConverterRow from '../hooks/useConverterRow';

const Converter = () => {

    const { ConverterRow,
        isErrorAlert,
        isClickConvert,
        errorMessage,
        currencyFromDisplay,
        currencyToDisplay,
        currencyAmountToDisplay,
        amountTotal,
        lastUpdate } = useConverterRow()

    const RatesRow = () => {
        return (
            <div className="text-center">
                <h3>1.00 {currencyFromDisplay} = {currencyAmountToDisplay} {currencyToDisplay}</h3>
                <h1>Conversion result: {amountTotal} {currencyToDisplay}</h1>
                <p className='text-center mt-2'>Last Updated: {lastUpdate}</p>
            </div>
        );
    }

    const Error = (props) => {
        return (
            <div className="alert alert-danger">
                <strong>Error!</strong> {props.errorMessage}
            </div>
        );
    }

    return (
        <div className="bg-light shadow rounded border border-3 col-lg-6 col-md-8 col-sm-8 col-10 mt-5 m-auto converter-center">
            <AnimatePresence>
                {isErrorAlert && (<motion.div initial={{ opacity: 0, y: '100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '100%' }}  > <Error errorMessage={errorMessage} /> </motion.div>)}
            </AnimatePresence>
            <AnimatePresence>
                {isClickConvert && (<motion.div initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }} > <RatesRow /> </motion.div>)}
            </AnimatePresence>
            <ConverterRow />
        </div>
    );
}

export default Converter;