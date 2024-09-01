import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ItemListContainer } from './components/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Provider } from './contexts/CartContext';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { NotFound } from './components/NotFound';

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <NavBar />
                <main>
                    <Routes>
                        <Route path="/" element={<ItemListContainer />} />
                        <Route path="/category/:id" element={<ItemListContainer />} />
                        <Route path="/item/:id" element={<ItemDetailContainer />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}

export default App;




