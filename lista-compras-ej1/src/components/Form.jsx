import React, { useState, useEffect } from 'react';
import { data } from "../data";
import ShoppingList from '../components/ShoppingList';
const Form = () => {
    const [shoppingList, setShoppingList] = useState({})
    const [shoppingListElements, setShoppingListElements] = useState([])

    //setteando manzana ya que sin usar onChange en el select ya esta seleccionada esa
    useEffect(() => {
        setShoppingList({ shoppingList: "Manzana" });
    }, []);

    const handleChange = e => setShoppingList({ [e.target.name]: e.target.value });
    //console.log(shoppingList);
    
    const handleClick = e => {  
        //obteniendo el precio del producto a partir del nombre      
        let {price} = data.find((product)=>{
            return product.name === shoppingList.shoppingList; 
        });
        
        //agregando el elemento a los demas
        setShoppingListElements([...shoppingListElements, { shoppingList: shoppingList.shoppingList, price }]);
        

        let total = price * 1;
        let subtotalInputsToTotal = document.getElementsByClassName('subtotalInput');
        for (let i = 0; i < subtotalInputsToTotal.length; i++) {
            total += parseFloat(subtotalInputsToTotal[i].value);
        }

        
        let h3Total = document.getElementById('total');
        h3Total.innerText = "Total: $" + total;
    }

    const deleteElement = indice => {
        const newElements = [...shoppingListElements]
        newElements.splice(indice, 1)
        setShoppingListElements(newElements)
        
        updateTotal(indice)
    }

    const updateTotal=(indice)=>{
        let totalA = 0.00;
        let subtotalInputsToTotalA = document.getElementsByClassName('subtotalInput');
        console.log(subtotalInputsToTotalA);

        for (let j = 0; j < subtotalInputsToTotalA.length; j++) {
            if (subtotalInputsToTotalA[j].name != indice){
                totalA += parseFloat(subtotalInputsToTotalA[j].value);
            }
            
        }

        console.log(totalA)
        let h3TotalA = document.getElementById('total');
        h3TotalA.innerText = "Total: $" + totalA;
    }

    return (
        <>
            <div class='container'>
                <form onSubmit={e => e.preventDefault()}>

                    <div class="row g-3">
                        <div class="col-auto">
                            <label for="formGroupExampleInput" class="form-label">Elemento de compra</label>
                        </div>
                        <div class="col-auto">
                        
                            <div class="form-floating">
                                <select name="shoppingList" class="form-select" id="" onChange={handleChange}>

                                    {data.map(product => (
                                        <option value={product.name} id={product.price}>{product.name}</option>
                                    ))}

                                </select>
                                <label for="floatingSelect">Producto</label>
                            </div>

                        </div>
                        <div class="col-auto">                            
                            <button onClick={handleClick} type="submit" class="btn btn-primary mb-3">Agregar</button>
                        </div>
                    </div>

                    
                    
                </form>
                <br /><br /><br />
                {
                    shoppingListElements.map((value, index) => (<ShoppingList shoppingList={value.shoppingList} index={index} price={value.price} deleteElement={deleteElement} />))
                }

                <h3 id="total">Total: $0.00</h3>

            </div>




        </>
    );
}
export default Form
