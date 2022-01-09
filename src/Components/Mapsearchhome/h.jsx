import React from 'react'
import "./h.css";
import PopUp from "../PopUpsearch/Popup";
import {Card} from "antd";

export default function HS({nlocs}) {
  const [trigger, setTrigger] = React.useState(false);
  const [curr_property, setProperty] = React.useState({});
  console.log("nlocs received in hS: ", nlocs);
  return (
    <div className="Ho1">
        <div>
          <div className="card-stack1">
            {
              nlocs.map((property, index) => (
              <Card style={{ width: 300 }} id={index} className="card-items1" onClick={()=>{setTrigger(true);setProperty({property})}}>
                <img src={property.url[0]} className="card-item1"></img>
              </Card>
            ))}
          </div>
          <PopUp trigger={trigger} setTrigger={setTrigger} curr_property={curr_property}/>
        </div>
    </div>
  )
}
