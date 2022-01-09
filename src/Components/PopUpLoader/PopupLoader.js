import React from 'react'
import './Pop-up-loader.css'
import { Carousel } from 'react-bootstrap';
import Mapbuyer from '../Map-buyer/mapbuyer';
import { Spinner } from 'react-bootstrap';

export default function PopupLoader({loader, setLoader}) {
    return (loader) ? (
        <div className="mainP1">
            <div className='popstart1'>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div> 
        </div>
    ) : "";
}
