import React, { useEffect, useState } from 'react';
import TextTransition, { presets } from "react-text-transition";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

import { useWeb3React } from "@web3-react/core"
import { connectors } from "../components/connectors"
import Head from 'next/head'
import Image from 'next/image'
import { toHex, truncateAddress } from "./utils";

import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import 'bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [index, setIndex] = useState(0)
  const whatToDonate = ['Staking Rewards', 'DeFi Yields', 'Passively']

  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider]);
  }, []);

  useEffect(() => {
    // Update the state every 3 seconds
    const interval = setInterval(() => {
      // Loop through indices of array modulus its length
      setIndex((index + 1) % whatToDonate.length)
    }, 3000)

    // Clean up
    return (() => clearInterval(interval)) 
  })

  async function connect() {
    activate(connectors.injected);
    setProvider("injected");
  }

  const refreshState = () => {
    window.localStorage.setItem("provider", undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Nav className="justify-content-end" activeKey="/home">
          <Nav.Item>

            {active
              ? <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {truncateAddress(account)}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={disconnect}>Disconnect</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>


              : <Button onClick={connect}>Connect Wallet</Button>}

          </Nav.Item>
        </Nav>


        <Container>
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

        
      </main>
    </>
  )
}
