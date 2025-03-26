import { useState } from "react"
import { IProduct, Product, updateProd } from "../models/product"
import { createProduct, deleteProduct, fetchProductByID, fetchProducts, updateProduct } from "../service/productService";

export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const fetchProductsHandler = async() => {
        setIsLoading(true);

        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch(error){
            setError("Problem fetching products")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const fetchProductByIdHandler = async(id:number) => {
        setIsLoading(true);

        try {
            return await fetchProductByID(id);
        } catch(error){
            setError("Problem fetching product")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const createProductHandler = async(payload:Product) => {
        setIsLoading(true);

        try {
            return await createProduct(payload);
        } catch(error){
            setError("Problem creating product")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const updateProductHandler = async(id:number, payload:updateProd) => {
        setIsLoading(true);

        try {
            return await updateProduct(id, payload);
        } catch(error){
            setError("Problem updating product")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const deleteProductHandler = async(id:number) => {
        setIsLoading(true);

        try {
            await deleteProduct(id);
            const newProducts = products.filter(p => p.id !== id);
            setProducts(newProducts)
        } catch(error){
            setError("Problem fetching product")
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return { 
        products, 
        isLoading, 
        error, 
        fetchProductsHandler, 
        fetchProductByIdHandler,
        createProductHandler,
        updateProductHandler,
        deleteProductHandler
    }
}