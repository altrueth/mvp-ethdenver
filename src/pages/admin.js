import React, {useEffect, useState} from 'react';
import { orgs } from "../components/orgs"

export default function Admin() {

    const [donations, setDonations] = useState([])

    const percentage = 10;
    const charity = 1;

    const donation = {
        percentage: percentage,
        orgName: orgs[charity - 1].name,
        orgAddress: orgs[charity - 1].address,
        splitContract: '0xcBBfC0F4C8EF45aBd1704d737F64d302587436d1'
    }

    useEffect(() => {
        var d = JSON.parse(window.localStorage.getItem("donations"))
        if (typeof d !== 'undefined') {
            d = []
        }
        d.push(donation)

        window.localStorage.setItem("donations", JSON.stringify(d));
        setDonations(d)
    }, []);
        
    return (
        <p>{JSON.stringify(donations)}</p>
    )
}
