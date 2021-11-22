import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import Loading from "../components/Loading/Loading";
import Card from "../components/Card/Card";
import CardQueue from "../components/Card/CardQueue";
import { toast } from "react-toastify";
import { createAtm, createPerson, getATMs } from "../store/actions/atm.actions";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const atm = useSelector((state) => state.atm);
  const { ATMs, queue, processedClient } = atm;

  const [loading, setLoading] = useState(false);

  const [bank, setBank] = useState("");
  const [people, setPeople] = useState({
    namePeople: "",
    transaction: "",
  });

  const [show, setShow] = useState(false);
  const [showFormPeople, setShowFormPeople] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseFormPeoPle = () => setShowFormPeople(false);
  const handleShowFormPeoPle = () => setShowFormPeople(true);

  const { namePeople, transaction } = people;

  const onChangeForm = (event) => {
    setBank(event.target.value);
  };

  const onChangePeopleForm = (event) => {
    setPeople({
      ...people,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getATMs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // add atm
  const handlePostAtm = async (event) => {
    event.preventDefault();
    if (!bank) {
      return toast.error("Name is required");
    }
    if (bank.length < 2) {
      return toast.warning("Name is too short");
    }
    dispatch(createAtm({ name: bank }));
    setBank("");
  };

  // add people
  const handleAddPeople = async (event) => {
    event.preventDefault();

    if (!namePeople) {
      return toast.error("Name is required");
    }

    if (namePeople.length < 2) {
      return toast.warning("Person name is too short");
    }

    if (!transaction) {
      return toast.error("Transaction is required");
    }

    if (transaction > 100 || transaction < 1) {
      return toast.error("Transaction valid in the range 1 > 100");
    }

    await createPerson(people);
  };

  return (
    <Container className="home">
      <Row>
        <Col xs={12} md={8}>
          <Button className="btn_add" size="md" onClick={handleShow}>
            Add new ATM
          </Button>
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
                    <Form.Control
                      type="text"
                      placeholder="Enter bank name"
                      name="name"
                      value={bank}
                      onChange={onChangeForm}
                    />
                  </Col>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" onClick={handleClose} variant="primary">
                  Add
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>

          <Button className="btn_add" size="sm" onClick={handleShowFormPeoPle}>
            Add new People
          </Button>
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
                    <Form.Control
                      type="text"
                      placeholder="Enter person name"
                      name="namePeople"
                      value={namePeople}
                      onChange={onChangePeopleForm}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3" controlId="transaction">
                  <Form.Label column sm="2">
                    Transaction
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      placeholder="0123456 ..."
                      onKeyDown={(e) =>
                        /[\+\-\.\,]$/.test(e.key) && e.preventDefault()
                      }
                      name="transaction"
                      value={transaction}
                      onChange={onChangePeopleForm}
                    />
                  </Col>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseFormPeoPle}>
                  Close
                </Button>
                <Button
                  type="submit"
                  onClick={handleCloseFormPeoPle}
                  variant="primary"
                >
                  Add
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
          <div className=" card_wraps">
            {ATMs?.map((item) => (
              <div key={item.id}>
                <Card props={item} />
              </div>
            ))}
          </div>
        </Col>

        <Col xs={12} md={4}>
          <h4>Queue</h4>
          <div className="queue_list">
            {!queue ? (
              <div className="quete">No waiting clients in queue.</div>
            ) : (
              queue.map((item) => (
                <div key={item.id}>
                  <CardQueue props={item} />
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <h3>Processed client</h3>
        <div>{loading ? <Loading /> : <div>{processedClient}</div>}</div>
      </Row>
    </Container>
  );
}
