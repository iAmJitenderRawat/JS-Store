import "./App.css";
import { AllRoutes } from "./components/AllRoutes";
import { Navbar } from "./components/Navbar";
import { Footer } from "./pages/Footer";
import { CartProvider } from "react-use-cart";

function App() {
  return (
    <div>
      <CartProvider>
        <Navbar />
        <AllRoutes />
        <Footer />
      </CartProvider>
    </div>
  );
}

export default App;
