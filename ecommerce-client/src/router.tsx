import { createBrowserRouter } from "react-router";
import { Layout } from "./pages/layout";
import { NotFound } from "./pages/notFound";
import { Home } from "./pages/home";
import { ProductsPage } from "./pages/productsPage";
import { ProductPage } from "./pages/productPage";
import { Orders } from "./pages/admin/orders";
import { OrderDetails } from "./pages/admin/order";
import { ProductItems } from "./pages/admin/productItems";
import { ProductItem } from "./pages/admin/productItem";
import { UpdateProductPage } from "./pages/update/updateProductPage";
import { CreateProduct } from "./pages/create/createProduct";
import { ShowCustomers } from "./pages/admin/showCustomers";
import { CustomerPage } from "./pages/admin/customerPage";
import { UpdateCustomerPage } from "./pages/update/updateCostumer";
import { CreateCustomerPage } from "./pages/create/createCostumer";
import { Cart } from "./pages/cart/cart";
import { OrderConfirmatin } from "./pages/cart/orderConfirmation";
import ProtectedRoutes from "./components/protectedRoute";
import { Login } from "./pages/login";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order-confirmation",
        element:<OrderConfirmatin />,
      },
      {
        path: "/login",
        element:<Login />,
      }
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes><Layout /></ProtectedRoutes>,
    errorElement: <NotFound />,
    children: [
      {
        path: "/admin",
        element: <Orders />,
      },
      {
        path: "/admin/customers",
        element: <ShowCustomers />,
      },
      {
        path: "/admin/showCustomers/customerPage/:id",
        element: <CustomerPage />,
      },
      {
        path: "/admin/customers/createCustomer",
        element: <CreateCustomerPage />,
      },
      {
        path: "/updateCustomerPage/:id",
        element: <UpdateCustomerPage />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/orders/orderDetails/:id",
        element: <OrderDetails />,
      },
      {
        path: "/admin/productItems",
        element: <ProductItems />,
      },
      {
        path: "/admin/productItems/productItem/:id",
        element: <ProductItem />,
      },
      {
        path: "/updateProductPage/:id",
        element: <UpdateProductPage />,
      },
      {
        path: "/admin/productItems/createProduct",
        element: <CreateProduct />,
      }
    ]}
]);
