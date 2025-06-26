import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SnackOrBoozeApi from "./Api";
import "./FoodMenu.css";

function NewItem({items, setItems, formData, setFormData}){

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
            
        }));
        
    }

    async function handleSubmit(e) {
        e.preventDefault(); 
        console.log("handleSubmit triggered");
        const newitem = formData.newItem;
        const type = formData.type.toLowerCase();
        const apiObj = {
            id: newitem.toLowerCase().replace(/\s+/g, "-"),
            name: newitem
            
        };

        let response;

        if(type === "snacks"){
            console.log("calling post snacks");
            response = await SnackOrBoozeApi.postSnacks(apiObj);
            console.log("posted");
    
        } else if (type === "drinks"){
            console.log("calling post drinks...")
            response = await SnackOrBoozeApi.postDrinks(apiObj);
            console.log("posted");
            
        } else {
            console.log("nope", type)
        }

        console.log(formData);

    }

    return (
        <div>
            <h1>Add something</h1>
            <form onSubmit={handleSubmit}>
                <input name="newItem" id="newItem" placeholder="item" value={formData?.newItem || ""} onChange={handleChange}></input>
                <select name="type" value={formData.type} onChange={handleChange}>
                    <option value="">-- Choose type --</option>
                    <option value="snacks">Snacks</option>
                    <option value="drinks">Drinks</option>
                </select>
                <button>Add Item</button>
            </form>
        </div>
    )
    
    
}

export default NewItem;