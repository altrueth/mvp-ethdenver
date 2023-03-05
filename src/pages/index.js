import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';

import { useWeb3React } from "@web3-react/core"
import NavigationBar from "../components/navigationbar"
import MyHead from "../components/head"
import { utils } from "../components/utils";
import copyIcon from "../../public/copy-icon.svg"

import Link from 'next/link';
import Image from 'next/image';

import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from '@/styles/Home.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { active } = useWeb3React()

  const whatToDonate = ['Staking Rewards', 'DeFi Yields', 'Passively']
  const [index, setIndex] = useState(0)
  const [donations, setDonations] = useState([])

  useEffect(() => {
    // Update the state every 3 seconds
    const interval = setInterval(() => {
      // Loop through indices of array modulus its length
      setIndex((index + 1) % whatToDonate.length)
    }, 3000)

    var d = JSON.parse(window.localStorage.getItem("donations"))
    setDonations(d);

    // Clean up
    return (() => clearInterval(interval)) 
  }, [])

  function copyToClipboard(event, donation) {
    event.preventDefault();
    navigator.clipboard.writeText(donation.splitContract)
  }

  return (
    <>
      <MyHead />
      <main className={styles.main}>
        <NavigationBar />

        {active
          ?
          <Container className="min-vh-100">
            <h1>Dashboard</h1>
            {donations
              ? <Table striped>
                <thead>
                  <tr>
                    <td className={styles.bold}>Organization</td>
                    <td className={`center ${styles.bold}`}>Percentage</td>
                    <td className={`center ${styles.bold}`}>Contract</td>
                    <td className={`center ${styles.bold}`}>Active</td>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.splitContract}>
                      <td>{donation.orgName}</td>
                      <td className="center">{donation.percentage}%</td>
                      <td className="center">
                        {utils.truncateAddress(donation.splitContract)}&nbsp;&nbsp;
                        <a href="#" onClick={(e)=>copyToClipboard(e, donation)}>
                          <Image src={copyIcon} width="15" height="15" alt="Copy to clipboard"/>
                        </a>
                      </td>
                      <td className="center">✅</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              : <p>You don&apos;t have any active donations yet.</p>
            }
            <Link href="/donate" passHref>
              <Button variant="success" className="mt-5">Stake & Donate</Button>
            </Link>
          </Container>
          :
          <Container className="mb-auto">
            <Row>
              <h1 className={inter.className}>
                <div className={styles.floatleft}>Donate&nbsp;</div>
                <TextTransition springConfig={presets.gentle} className={styles.floatleft}>
                  {whatToDonate[index]}
                </TextTransition>
              </h1>
            </Row>
            <Row>
              <p className={styles.heroParagraph}>Charitable donations on autopilot. Pledge to Giving What We Can, choose the causes you care most about and see your impact grow over time.</p>
            </Row>
          </Container>
        }

        
      </main>
    </>
  )
}
