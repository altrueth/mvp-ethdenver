import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import { useWeb3React } from "@web3-react/core"
import NavigationBar from "../components/navigationbar"
import MyHead from "../components/head"

import Link from 'next/link';

import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';

import styles from '@/styles/Home.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { active } = useWeb3React()

  const whatToDonate = ['Staking Rewards', 'DeFi Yields', 'Passively']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    // Update the state every 3 seconds
    const interval = setInterval(() => {
      // Loop through indices of array modulus its length
      setIndex((index + 1) % whatToDonate.length)
    }, 3000)

    // Clean up
    return (() => clearInterval(interval)) 
  })

  return (
    <>
      <MyHead />
      <main className={styles.main}>
        <NavigationBar />

        {active
          ?
          <Container className="min-vh-100">
            <h1>Dashboard</h1>
            <p>You don&apos;t have any active donations yet.</p>
            <Link href="/donate" passHref>
              <Button variant="success">Stake & Donate</Button>
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
