import MyNavbar from './components/layout/header'
import MyCarousel from './components/layout/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ProductCard from './components/product/productcard';


function App() {

  return (
    <div className="App">
    <MyNavbar/>
    <MyCarousel/>
    <ProductCard/>
    </div>

  );
}

export default App;
