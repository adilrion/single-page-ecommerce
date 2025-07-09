import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
          <CartSidebar />
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;