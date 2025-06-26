import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
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


function ChosenItem() {
    const { type, item } = useParams();
    const [chosenItem, setChosenItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      async function getItem() {
        console.log("type:", type);
        console.log("item:", item);
        let data = [];
  
        if (type === "snacks") {
          data = await SnackOrBoozeApi.getSnacks();
        } else if (type === "drinks") {
          data = await SnackOrBoozeApi.getDrinks();
        }


        console.log("ids in data:", data.map(i => i.id));
  
        const found = data.find(i => i.id === item);
        console.log("found:", found);
        setChosenItem(found);
        
        setIsLoading(false);
      }
  
      getItem();
    }, [type, item]);
  
    if (isLoading) return <p>Loading &hellip;</p>;
    if (!chosenItem) return <p>Item not found.</p>;

    return (
        <section>
          <Card>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                {chosenItem.name}
              </CardTitle>
              <CardText className="font-italic">{chosenItem.description}</CardText>
              <p>
                <b>Recipe:</b> {chosenItem.recipe}
              </p>
              <p>
                <b>Serve:</b> {chosenItem.serve}
              </p>
            </CardBody>
          </Card>
        </section>
      );

  }
  
  export default ChosenItem;
  
  