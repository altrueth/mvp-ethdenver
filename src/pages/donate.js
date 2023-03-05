import React, { useState } from 'react'
import { useWeb3React } from "@web3-react/core"
import { useSplitsClient } from '@0xsplits/splits-sdk-react'

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import InputGroup from 'react-bootstrap/InputGroup'

import MyHead from "../components/head"
import NavigationBar from "../components/navigationbar"
import { animeIcons } from '@/components/animations'
import { orgs } from "../components/orgs"

import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/Home.module.css'

export default function Donate() {
    const { account, library } = useWeb3React()
    const signer = library?.getSigner?.();

    const [percentage, setPercentage] = React.useState(10);
    const [charity, setCharity] = React.useState(null);
    const [submitForm, setSubmitForm] = React.useState(null);
    const [status, setStatus] = useState(animeIcons.START);
    const [splitter, setSplitter] = React.useState('Pending...');


    const splitsClient = useSplitsClient({
        chainId: 5,  // Goerli Ethereum Testnet
        provider: library,
        signer: signer,
    })

    const selectCharity = (selection) => {
        console.log('button clicked')
        setCharity(selection);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitForm(true);

        const args = {
            recipients: [
                {
                    address: orgs[charity - 1].address,
                    percentAllocation: parseInt(percentage)
                },
                {
                    address: account,
                    percentAllocation: 100 - parseInt(percentage)
                }
            ],
            distributorFeePercent: 0,
            controller: account
        }

        const response = await splitsClient.createSplit(args)
        console.log(response)
        setSplitter(response.splitId)
        
        const donation = {
            percentage: percentage,
            orgName: orgs[charity - 1].name,
            orgAddress: orgs[charity - 1].address
        }

        var donations = JSON.parse(localStorage.getItem("donations"))

        window.localStorage.setItem("donations", JSON.stringify(donations));

        alert('Transaction completed')

    }

    return (
        <>
            <MyHead />
            <main className={styles.main}>
                <NavigationBar />
                <Container className="min-vh-100">
                    {submitForm
                        ?
                        <>
                            <Row>
                                <Table>
                                    <tr>
                                        <td className={styles.bold}>Donor Address:</td>
                                        <td>{account}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.bold}>Percentage Donation:</td>
                                        <td>{percentage}%</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.bold}>Recipient Organization:</td>
                                        <td>{orgs[charity + 1].name}</td>
                                    </tr>
                                    <tr>
                                        <td className={styles.bold}>Recipient Address:</td>
                                        <td>{orgs[charity + 1].address}</td>
                                    </tr>
                                </Table>
                            </Row>
                            <Row>
                                <Col>
                                    <span>{status}</span>&nbsp; Deploy Split Contract
                                </Col>
                            </Row>
                            <Row className="pt-3">
                                <Table>
                                    <tr>
                                        <td className={styles.bold}>Splitter Contract:</td>
                                        <td>{splitter}</td>
                                    </tr>
                                </Table>
                            </Row>
                            <Link href="/" passHref>
                                <Button className="mt-5">Back</Button>
                            </Link>
                        </>
                        :
                        <>
                            <h1>Donate</h1>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md="6">
                                        <Form.Label className="pt-3">What percentage would you like to donate?</Form.Label>
                                        <Form.Group as={Row}>
                                            <Col xs="9">
                                                <Form.Range
                                                    value={percentage}
                                                    onChange={e => setPercentage(e.target.value)}
                                                />
                                            </Col>
                                            <Col xs="3">
                                                <InputGroup>
                                                    <Form.Control value={percentage} onChange={e => setPercentage(e.target.value)} />
                                                    <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                                                </InputGroup>
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                    
                                <Form.Label className="pt-5">What charity would you like to donate to?</Form.Label>
                                <Form.Group as={Row} className="pb-3">
                                    <Col md="3">
                                        <Card className={charity == 1 ? 'border-primary' : ''}>
                                            <Card.Img variant="top" src="https://www.guidestar.org/ViewEdoc.aspx?eDocId=8097656&approved=True" className="p-4" />
                                            <Card.Body>
                                                <Card.Title>Doctors Without Borders</Card.Title>
                                                <Card.Text>
                                                    Provide impartial medical relief to the victims of war, disease, and natural or man-made disaster, without regard to race, religion, or political affiliation.
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => selectCharity(1)}>Choose</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md="3">
                                        <Card className={charity == 2 ? 'border-primary' : ''}>
                                            <div className='d-flex justify-content-center ircImage'>
                                                <Card.Img variant="top" src="https://static.tgbwidget.com/organization_logo/331410c2-f30d-479a-a57a-5ad2c9e498f2.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>International Rescue Committee</Card.Title>
                                                <Card.Text>
                                                    IRC helps people affected by humanitarian crises—including the climate crisis—to survive, recover, and rebuild their lives and prosper.
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => selectCharity(2)}>Choose</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md="3">
                                        <Card className={charity == 3 ? 'border-primary' : ''}>
                                            <div className='d-flex justify-content-center hopeImage'>
                                                <Card.Img variant="top" src="https://static.tgbwidget.com/ProjectHOPE.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>Project HOPE</Card.Title>
                                                <Card.Text>
                                                    Project HOPE places power in the hands of local health care workers to save lives around the world. We work on the front lines of the world’s health challenges, partnering ...
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => selectCharity(3)}>Choose</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md="3">
                                        <Card className={charity == 4 ? 'border-primary' : ''}>
                                            <div className='d-flex justify-content-center childrenImage'>
                                                <Card.Img variant="top" src="https://www.guidestar.org/ViewEdoc.aspx?eDocId=7911901&approved=True" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>Save the Children</Card.Title>
                                                <Card.Text>
                                                    Save the Children believes every child deserves a future. In the United States and around the world, we work every day to give children a healthy start in life ...
                                                </Card.Text>
                                                <Button variant="primary" onClick={() => selectCharity(4)}>Choose</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Form.Group>
                                    
                                <Button variant="primary" type="submit" >
                                    Submit
                                </Button>
                            </Form>
                        </>
                    }
                </Container>
            </main>
        </>
    )
}