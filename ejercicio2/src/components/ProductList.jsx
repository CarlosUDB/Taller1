import React from "react";
import {data} from "../data";

export const ProductList=({
    allProducts, 
    setAllProducts, 
    total, 
    countProducts,
    setCountProducts,
    setTotal,
})=>{

    const onAddProduct = product => {
        if(allProducts.find(item => item.id === product.id)){
            const products = allProducts.map(item => 
                item.id === product.id
                ? { ...item, quantity:item.quantity + 1}:
                 item
                 );
                 setTotal(total + product.price * product.quantity);
                 setCountProducts(countProducts + product.quantity);
                 return setAllProducts([...products]);
        }
        setTotal(total + product.price * product.quantity);
        setCountProducts(countProducts + product.quantity);
        setAllProducts([...allProducts, product]);
        
    };

    return(
        <div className="container-items">
            {data.map(product=>(
                <div className="item" key={product.id}>
                    <figure>
                        <img src={product.urlImg} alt={product.name}/>
                    </figure>
                    <div className="info-product">
                        <h2>{product.name}</h2>
                        <h3>{product.desc}</h3>
                        <p className="price">${product.price}</p>
                        <button className="btn-add-cart" onClick={()=>onAddProduct(product)}>Añadir al carrito</button>
                    </div>
                </div>
            ))}
        </div>
    );
};