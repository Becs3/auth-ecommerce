import { Link } from "react-router"
import "../style/adminPage.css"

export const AdminHeader = () => {

    return(
        <>
            <div className="admin-navigation">
        <ul>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/customers">Customers</Link></li>
            <li><Link to="/admin/productItems">Products</Link></li>
            <li><Link to="/">E-shop</Link></li>
        </ul>
    </div>
    </>
    )
}