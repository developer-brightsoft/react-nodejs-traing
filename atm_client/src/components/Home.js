import React, {useState, useContext, useEffect} from 'react'
import { AtmContext } from './context/AtmContext';
import {Container, Row, Col, Button, Modal, Form} from 'react-bootstrap';
import Loading from './share/Loading';
import Card from './card/Card'
import CardQueue from './card/CardQueue';
import '../App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
    const {getAtm, postAtm, addPeople} = useContext(AtmContext)

    const [atm, setAtm] = useState()
    const [queue, setQueue] = useState()
    const [processedClient, setProcessedClient] = useState()
    const [loading, setLoading] = useState(true)
    const [bank, setBank] = useState({
        name: ''
    })
    const [people, setPeople] = useState({
        namePeople: '',
        transaction: ''
    }) 

    const [show, setShow] = useState(false);
    const [showFormPeople, setShowFormPeople] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseFormPeoPle = () => setShowFormPeople(false);
    const handleShowFormPeoPle = () => setShowFormPeople(true);

    const {name} = bank;
    const {namePeople, transaction} = people;

    const onChangeForm = event => {
        setBank({
            ...bank, [event.target.name]: event.target.value
        })
    }
    const onChangePeopleForm = event => {
        setPeople({
            ...people, [event.target.name]: event.target.value
        })
    }

    // get atm
    useEffect(() => {
        const interval = setInterval(() => {
            getAtm()
            .then((data)=> {
                setAtm(data.atm)
                setQueue(data.queue)
                setProcessedClient(data.processedClient)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                setLoading(false)
            })
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    // add atm
    const handlePostAtm = async event => {
        event.preventDefault()

        if (!name){
            return toast.error('Name is required !')
        }

        if (name.length < 2){
            return toast.warning('Name is too short !')
        }

        postAtm(bank)   
            .then((data) => {
                setAtm(data)
                setBank({name:''})
                toast.success('add atm success !')
            })
            .catch((err)=> {
                toast.error(err.message)
            })
        
    }

    // add people
    const handleAddPeople = async event => {
        event.preventDefault()

            if(!namePeople){
                return toast.error('Name is required !')
            }

            if (namePeople.length < 2){
                return toast.warning('People name is too short !')
            }

            if(!transaction){
                return toast.error('Transaction is required !')
            }

            if(transaction > 100 || transaction < 1){
                return toast.error('Transaction valid in the range 1 > 100')
            }

            addPeople(people)
                .then((data) => {
                    toast.success(data.message)
                })
                .catch((err)=> {
                    toast.error(err.message)
                })
    }


    return (
        <Container className='home'>
            <Row>
                <Col xs={8}>
                    <Button className='btn_add' size="sm" onClick={handleShow}>Add new ATM</Button>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Add new ATM</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handlePostAtm}>
                            <Modal.Body>
                                    <Form.Group as={Row} className="mb-3" controlId="name">
                                        <Form.Label column sm="2">
                                            Name
                                        </Form.Label>
                                        <Col sm="10">
                                        <Form.Control type="text" placeholder="Bank ..." name = 'name' value = {name} onChange={onChangeForm}/>
                                        </Col>
                                    </Form.Group>
                            
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type='submit' onClick={handleClose} variant="primary">Add</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                 
                    <Button className='btn_add' size="sm" onClick={handleShowFormPeoPle}>Add new People</Button>
                    <Modal
                        show={showFormPeople}
                        onHide={handleCloseFormPeoPle}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                        <Modal.Title>Add new People</Modal.Title>
                        </Modal.Header>
                        <Form onSubmit={handleAddPeople}>
                            <Modal.Body>
                                    <Form.Group as={Row} className="mb-3" controlId="namePeople">
                                        <Form.Label column sm="2">
                                            Name
                                        </Form.Label>
                                        <Col sm="10">
                                        <Form.Control type="text" placeholder="People ..." name = 'namePeople' value = {namePeople} onChange={onChangePeopleForm}/>
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="transaction">
                                        <Form.Label column sm="2">
                                            Transaction
                                        </Form.Label>
                                        <Col sm="10">
                                        <Form.Control type="number" 
                                                      placeholder="0123456 ..." 
                                                      onKeyDown={e => /[\+\-\.\,]$/.test(e.key) && e.preventDefault()}
                                                      name = 'transaction' 
                                                      value = {transaction} 
                                                      onChange={onChangePeopleForm}/>
                                        </Col>
                                    </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseFormPeoPle}>
                                Close
                            </Button>
                            <Button type='submit' onClick={handleCloseFormPeoPle} variant="primary">Add</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                    <div className=' card_wraps'>
                        {
                            !!atm && (
                               atm && atm.map(item => (
                                    <div key={item.id}>
                                        <Card props = {item}/>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </Col>
                <Col xs={4}>
                    <h4>Queue</h4>
                    <div className='queue_list'>
                        {
                            !queue ? (
                                <div className = 'quete'>No waiting clients in queue.</div>
                            ):(
                                queue.map(item => (
                                    <div key={item.id}>
                                        <CardQueue props = {item}/>
                                    </div>
                                ))
                            )
                        }
                    </div>
                </Col>
            </Row>
            <Row className='mt-5'>
                <h3>Processed client</h3>
                <div>
                    {
                        loading ? (
                            <Loading/>
                        ):(
                            <div>
                                {processedClient}
                            </div>
                        )
                    }
                </div>
            </Row>
            <ToastContainer />
        </Container>
    )
}
