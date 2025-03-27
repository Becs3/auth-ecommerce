import { Link } from "react-router"
import "../style/adminPage.css"
import { useAuth } from "../hooks/useAuth";

export const AdminHeader = () => {
    const{logout} = useAuth();

    return(
        <>
            <div className="admin-navigation">
        <ul>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/customers">Customers</Link></li>
            <li><Link to="/admin/productItems">Products</Link></li>
            <li><Link to="/">E-shop</Link></li>
            <li><a onClick={logout}>Log out</a></li>
        </ul>
    </div>
    </>
    )
}