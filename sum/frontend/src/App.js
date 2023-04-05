import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { Web3Client } from "./web3Client";

function App() {
  const [integerA, setIntegerA] = useState(0);
  const [integerB, setIntegerB] = useState(0);
  const [result, setResult] = useState("...");

  const web3Client = new Web3Client();

  const handleIntegerA = (e) => {
    setIntegerA(e.target.value);
  };

  const handleIntegerB = (e) => {
    setIntegerB(e.target.value);
  };

  const handleSubmit = () => {
    web3Client
      .submit(parseInt(integerA), parseInt(integerB))
      .then(async (operationId) => {
        const event = await web3Client.listenEvent(operationId);
        setResult(event.data);
      });
  };

  return (
    <Container className="p-3">
      <h1 className="header">Welcome To Massa Sum Smart-Contract Example</h1>

      <Alert key="primary" variant="primary">
        This DApp requires{" "}
        <Alert.Link href="https://github.com/massalabs/thyra/">
          Thyra
        </Alert.Link>{" "}
        to run on your computer.
      </Alert>

      <Form>
        <Form.Group className="mb-3" controlId="formIntA">
          <Form.Label>Integer A</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="4294967295"
            onChange={handleIntegerA}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formIntB">
          <Form.Label>Integer B</Form.Label>
          <Form.Control
            type="number"
            min="0"
            max="4294967295"
            onChange={handleIntegerB}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <p>The result is {result}</p>
    </Container>
  );
}

export default App;
