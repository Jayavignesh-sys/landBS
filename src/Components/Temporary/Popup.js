import React from 'react'
import './Pop-up.css'
import { Carousel } from 'react-bootstrap';
import Mapbuyer from '../Map-buyer/mapbuyer';

export default function PopUp({trigger, setTrigger, curr_property}) {
    return (trigger) ? (
        <div>
            <div className='popup'>
                <div className='popup-inner'>
                    <button onClick={()=>{setTrigger(false)}}>Close</button>
                    <div className='popup-content'>
                        <div className='left-stack'> 
                            <div className='Carousel-stack'>
                                <Carousel className='citemp'>
                                    {curr_property.url.map((element) => (
                                        <Carousel.Item>
                                            <img src={element} alt="First slide" className='d-block w-100'/>
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className='right-stack'>
                            <div className='right-det'>
                                    <Mapbuyer lati={curr_property.lat} long={curr_property.lng}/>
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
        </div>
    ) : "";
}
