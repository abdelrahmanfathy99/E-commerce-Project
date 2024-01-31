import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from './components/main/ProductList.jsx';
import ProductAdd from './components/main/ProductAdd.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProductList />} />
        <Route path='/add-product' element={<ProductAdd />} />
      </Routes>
    </Router>
  );
}

export default App;
