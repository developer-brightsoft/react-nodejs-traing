import React from 'react'
import Images from '../../assets/Image'
import { Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteAtm } from "../../store/actions/atm.actions"

export default function Card({ props }) {

    const handleRemoveAtm = async () => {
        toast.info('Wait for the processing to finish')
        await deleteAtm(props.id)
    }

    return (
        <div className='card_atm'>
            <div className='card_body'>
                <div className='card_close' onClick={handleRemoveAtm}>
                    <img
                        src={Images.ICON_CLOSE}
                        alt='close'
                    />
                </div>
                <div className='atm_img'>
                    <img
                        src={Images.ICON_ATM}
                        alt='atm'
                    />
                </div>
                <div className='content'>
                    {props.status === 'Free' ? (
                        <p className='free'>{props.status}</p>
                    ) : (
                        <p>{props.status}</p>
                    )}
                    <h4>{props.name}</h4>
                </div>
            </div>
            <div className='card_content'>
                {props.status === 'Busy' && (
                    <Row>
                        <Col sm={4} className='img_client'>
                            <img
                                src={Images.ICON_CLIENT}
                                alt='client'
                            />
                        </Col>
                        <Col sm={8}>
                            <h4>{props.client}</h4>
                            <div>Pending</div>
                            <div>transactions:{props.transaction}</div>
                        </Col>
                    </Row>
                )}
            </div>
        </div>
    )
}
