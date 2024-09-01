import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ItemListContainer } from './components/ItemListContainer'
import { ItemDetailContainer } from './components/ItemDetailContainer'
import { NavBar } from './components/NavBar'
import { Provider } from './contexts/CartContext'
import { Cart } from './components/Cart'

function App() {
  

  return (
    <Provider>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<ItemListContainer />} />
        <Route path="/category/:id" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={404} />
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App


