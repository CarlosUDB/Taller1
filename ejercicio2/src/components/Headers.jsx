import { useState, useEffect } from "react";
import React from "react";
import { data } from "../data";

export const Header = ({ allProducts, setAllProducts, total, countProducts, setCountProducts, setTotal, }) => {
    useEffect(() => {
        actualizarTotal();
    }, [])
    const [active, setActive] = useState(false);

    const manejarCambio = e => {
        let subTotal = document.getElementById(e.target.name);
        //console.log(subTotal);
        let cantidad = e.target.value;
        let { price } = data.find((product) => {
            return product.id == e.target.name;
        })
        //console.log(price);
        subTotal.value = price * cantidad;
        actualizarTotal();
    }

    const actualizarTotal = () => {
        let subtotales = document.getElementsByClassName("subTotalInput");
        let totalVenta = 0.00;
        for (let i = 0; i < subtotales.length; i++) {
            totalVenta += parseFloat(subtotales[i].value);
        }
        if(subtotales){
            document.getElementById("total-pagar").innerText = "Total: $" + totalVenta;
        }
        
    }
    const onDeleteProduct = product => {
        const results = allProducts.filter(
            item => item.id !== product.id
        );



        setTotal(total - product.price * product.quantity);
        setCountProducts(countProducts - product.quantity);
        setAllProducts(results);
    };

    const onCleanCart = () => {
        setAllProducts([]);
        setTotal(0);
        setCountProducts(0);
    };
    return (
        <header>
            <h1>Cafe Himalaya</h1>
            <div className="container-icon">
                <div className="container-cart-icon" onClick={() => setActive(!active)}>
                    <img src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png" alt="carrito" className="icon-cart" />

                    <div className="count-products">
                        <span id="contador-productos">{countProducts}</span>

                    </div>

                </div>

                <div className={`container-cart-products ${active ? ' ' : 'hidden-cart'} `}>

                    {allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product'
                                        key={product.id}>
                                        <div className='info-cart-product'>
                                            <figure>
                                                <img src={product.urlImg} alt={product.name} height={60} width={60} />
                                            </figure>
                                            <input type="number" name={product.id} defaultValue={1} min={1} step={1} style={{ width: 3 + 'em', height: 2 + 'em' }} onChange={manejarCambio}></input>
                                            <p
                                                className='titulo-producto-carrito'>
                                                {product.name}
                                            </p>
                                            <input type="text" className="subTotalInput" id={product.id} value={1 * product.price} style={{ width: 3 + 'em', height: 2 + 'em' }} ></input>
                                        </div>
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                                            alt="cerrar"
                                            className="icon-close"
                                            onClick={() => onDeleteProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className='cart-total'>

                                
                            </div>
                            <button className='btn-clear-all'
                                onClick={onCleanCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <div>
                            <p className='cart-empty'>El carrito está vacío</p>
                            <div className='cart-total'>
                                <h3 id="total-pagar">Total 0.00</h3>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </header>
    );
};