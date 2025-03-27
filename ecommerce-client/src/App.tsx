import { RouterProvider } from "react-router";
import "./App.css";
import { router } from "./router";
import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
