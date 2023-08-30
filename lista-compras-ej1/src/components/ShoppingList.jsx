import React, { useState } from 'react';
import { data } from "../data";


const ShoppingList = ({ shoppingList, index, price, deleteElement}) => {

	let subtotal = 0.00;

	const calculateTotal = e => {
		let { price } = data.find((product) => {
			return product.name === e.target.name;
		});		
		
		subtotal = e.target.value * price;

		let subtotalInputs = document.getElementsByName(e.target.id);
		subtotalInputs[0].value = subtotal;

		let total = 0.00;
		let subtotalInputsToTotal = document.getElementsByClassName('subtotalInput');
		for (let i = 0; i < subtotalInputsToTotal.length; i++) {
			total += parseFloat(subtotalInputsToTotal[i].value);
		}

		let h3Total = document.getElementById('total');
		h3Total.innerText = "Total: $" + total;
		
	}


	return (
		<>			

			<div class="row">
				<div class="col">
					<label for="formGroupExampleInput" class="form-label">{shoppingList} : {price}</label>
				</div>
				<div class="col">
					<input type="number" defaultValue="1" name={shoppingList} min="1" step="1" class="form-control" onChange={calculateTotal} id={index} />

					<label class="form-label" >Cantidad</label>
				</div>
				
				<div class="col">
					<input type="text" className="subtotalInput form-control" name={index} value={1*price} readOnly/>
				</div>

				<div class="col">

					<button type="submit" class="btn btn-danger mb-3" onClick={() => deleteElement(index)} >Eliminar</button>
				</div>

				

			</div>
			
		</>

		
	);
}
export default ShoppingList