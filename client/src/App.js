import './App.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Converter from './components/Converter';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Header />
      <Converter />
      <Footer />
    </>
  );
}

export default App;
