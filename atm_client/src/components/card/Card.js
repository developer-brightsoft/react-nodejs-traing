import React, {useContext, useState, useEffect} from 'react'
import { AtmContext } from '../context/AtmContext'
import Images from '../share/Image'
import '../../App.css'
import {Row, Col} from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Card(props) {
    const {removeAtm} = useContext(AtmContext)

     // remove atm
     const handleRemoveAtm = async() => {
         toast.info('Wait for the processing to finish')
        removeAtm(props.props.id)
            .then((data) => {
                if(data === true){
                    toast.success('remove atm success !')
                }
            })
    }
    return (
        <div className='card_atm'>
            <div>
                <div className='card_close' onClick={handleRemoveAtm}>
                    <img
                        src = {Images.ICON_CLOSE}
                        alt = 'close'
                    />
                </div>
                <div className='atm_img'>
                    <img
                        src = {Images.ICON_ATM}
                        alt = 'atm'
                    />
                </div>
                <div className='content'>
                    {props.props.status === 'Free'? (
                        <p className='free'>{props.props.status}</p>
                    ):(
                        <p>{props.props.status}</p>
                    )}
                    <h4>{props.props.name}</h4>
                </div>
            </div>
            <div className='card_content'>
                {props.props.status === 'Busy' && (
                    <Row>
                        <Col sm = {4} className='img_client'>
                            <img
                                src = {Images.ICON_CLIENT}
                                alt = 'client'
                            />  
                        </Col>
                        <Col sm = {8}> 
                            <h4>{props.props.client}</h4>
                            <div>Pending</div>
                            <div>transactions:{props.props.transaction}</div>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    )
}
