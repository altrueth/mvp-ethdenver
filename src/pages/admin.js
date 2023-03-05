import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'


import { orgs } from "../components/orgs"
import MyHead from "../components/head"


import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '@/styles/Home.module.css'


export default function Admin() {

    const [donations, setDonations] = useState([])

    const percentage = 10;
    const charity = 1;

    useEffect(() => {
        const d = JSON.parse(window.localStorage.getItem("donations"))
        setDonations(d);
    }, [])

    // const donation = {
    //     percentage: percentage,
    //     orgName: orgs[charity].name,
    //     orgAddress: orgs[charity].address,
    //     splitContract: '0xcBBfC0F4C8EF45aBd1704d737F64d302587436d1'
    // }

    const donation = {
        percentage: 15,
        orgName: 'Save the Children',
        orgAddress: '0x98fE6b33eb2ecf7875B3010879bFEA9d6c4CACEC',
        splitContract: '0x226736C7D26c914d7c4dbb6964e9a52C4Ad6004b'
    }

    function addEntry() {
        var d = JSON.parse(window.localStorage.getItem("donations"))
        console.log(d)
        if (typeof d === 'undefined') {
            d = []
        }
        console.log(d)
        d.push(donation)
        console.log(d)

        window.localStorage.setItem("donations", JSON.stringify(d));
        setDonations(d)
    }

    function removeLast() {
        var d = JSON.parse(window.localStorage.getItem("donations"))
        if (typeof d !== 'undefined') {
            d.pop();
        }
        window.localStorage.setItem("donations", JSON.stringify(d));
        setDonations(d)
    }
        
    return (
        <>
            <MyHead />
            <main className={styles.main}>
                <Container>
                    <Row>{JSON.stringify(donations, null, " ")}</Row>
                    <Button onClick={addEntry}>Add entry</Button>&nbsp;&nbsp;
                    <Button onClick={removeLast}>Remove Last</Button>
                </Container>
            </main>
        </>
    )
}
