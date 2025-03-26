import { FormEvent, useEffect, useState } from "react";
import { useProducts } from "../../hooks/useProduct"
import { Link, useNavigate, useParams } from "react-router";
import { IProduct } from "../../models/product";
import "../adminObject.css"

export const UpdateProductPage = () => {

    const [product, setProduct] = useState<IProduct>()
    const {isLoading, error, fetchProductByIdHandler, updateProductHandler} = useProducts();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=> {
        if(!params.id) return;
        fetchProductByIdHandler(+params.id).then((data) => setProduct(data))
    }, [])

    const handleChange =(e:FormEvent<HTMLInputElement>) => {
        if(!product) return;
        const target = e.currentTarget;
        if(target.name === "name")
            setProduct({...product, name: e.currentTarget.value})
        if(target.name === "price")
            setProduct({...product, price: +e.currentTarget.value})
        if(target.name === "category")
            setProduct({...product, category: e.currentTarget.value})
        if(target.name === "stock")
        setProduct({...product, stock: +e.currentTarget.value})

    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();

        if(!product) return;

        await updateProductHandler(product.id, {...product, price: product.price});
        navigate("/admin/productItems")
    
    }

    if (isLoading) return <p>Loading..</p>
    if (error) return <p>{error}</p>

    return(
        <>
        <div className="object-container">
        <p>Product name: {product?.name}</p>
        <form onSubmit={handleSubmit}>
            <input type="text"
            name="name"
            value={product?.name ?? ""} 
            onChange={handleChange}
            />
            <p>description: </p>
            <textarea
            name="description"
            value={product?.description ?? ""} 
            onChange={(e:FormEvent<HTMLTextAreaElement>) => {
                if(!product) return;
                    setProduct({...product, description: e.currentTarget.value})}
            }
            />
            <p>price:</p>
            <input type="number"
            name="price"
            value={product?.price ?? ""} 
            onChange={handleChange}
            />
            <p>category:</p>
            <input type="text"
            name="category"
            value={product?.category ?? ""} 
            onChange={handleChange}
            />
            <p>stock:</p>
            <input type="number"
            name="stock"
            value={product?.stock ?? ""} 
            onChange={handleChange}
            />
            <button type="submit">Update product</button>
        </form>
        <Link to="/admin/productItems">Back to products</Link>
        </div>
        </>
    )
}