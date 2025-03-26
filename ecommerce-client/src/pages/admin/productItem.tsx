import { useEffect, useState } from "react"
import { IProduct } from "../../models/product"
import { Link, useParams } from "react-router";
import { useProducts } from "../../hooks/useProduct";
import "../adminObject.css"

export const ProductItem = () => {

    const [product, setProduct] = useState<IProduct>()
    const {isLoading, error, fetchProductByIdHandler} = useProducts();
    const param = useParams();

    useEffect (()=> {
        if(!param.id) return;
        fetchProductByIdHandler(+param.id).then((data)=>setProduct(data))
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    // See product details. Be able to update and delete them
    return(
    <>
            <div className="object-container">
                <ul>
            <li>Product name: {product?.name}</li>
            <li>Product id: {product?.id}</li>
            <li>Description: {product?.description}</li>
            <li>Price: {product?.price}</li>
            <li>Category: {product?.category}</li>
            <li>Stock: {product?.stock}</li>
            <li>Created at: {product?.created_at}</li>
            <li>
                <div className="img-container">
                    <img src={product?.image} alt={product?.name} />
                </div>
            </li>
            </ul>
            <Link to="/admin/productItems">Back to products</Link>
            </div>
    </>
    )
}