import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import SnackOrBoozeApi from "./Api";
import "./FoodMenu.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem
} from "reactstrap";



function Details({items, setItems}){
    const {type}  = useParams();
    
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function getType() {
        if(type === "snacks"){
            let data = await SnackOrBoozeApi.getSnacks();
            setItems(data);
        } else if (type === "drinks"){
            let data = await SnackOrBoozeApi.getDrinks();
            setItems(data);
        }
        setIsLoading(false);
      }
      getType();
    }, [type]);
    
    if (isLoading) {
      return <p>Loading &hellip;</p>;
    }
    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <section className="col-md-6">
                <Card>
                    <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        Menu
                    </CardTitle>
                    <h1 className="text-center">{type === "snacks" ? "Snacks" : "Drinks"}</h1>
                    {items.map((thing) => (
                        <Link to={`/${type}/${thing.id}`}>
                        <div key={thing.id} className="mb-3 text-center">
                        
                        <h2>{thing.name}</h2>
                        
                        </div>
                        </Link>
                    ))}
                    <Link to={"/add-item"}>Add Item</Link>
                </CardBody>
                </Card>
                </section>
            </div>
        </div>

    );
      
}

export default Details;