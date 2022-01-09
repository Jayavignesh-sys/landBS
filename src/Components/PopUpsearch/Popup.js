import React from 'react'
import './Pop-up.css'
import { Carousel } from 'react-bootstrap';
import Mapbuyer from '../Map-buyer/mapbuyer';

export default function PopUp({trigger, setTrigger, curr_property}) {
    console.log(trigger);
    
    return (trigger) ? (
        <div className='mainP'>
            <div className='popstart'>
                <div className='cancel'>
                    <button className='btn btn-dark' style={{right: 0}} onClick={()=>{setTrigger(false)}}>Close</button>
                </div>
                <div className='p1'>
                    <div className='p2'>
                        <div className='p2l'>
                            <Carousel className='d-block'>
                                {console.log("curr_property inside if loop : ", curr_property)}
                                {curr_property.property.url.map((element) => (
                                    <Carousel.Item >
                                        <img src={element} alt="First slide" className='imgitem'/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                        <div className='p2r'>
                            <Mapbuyer lati={curr_property.property.lat} long={curr_property.property.lng}/>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                            <p>{curr_property.zone}</p>
                        </div>   
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}
