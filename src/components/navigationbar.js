import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useWeb3React } from "@web3-react/core"
import { connectors } from "../components/connectors"

import { utils } from "../components/utils";
import Identicon from "../components/identicon"
import styles from '@/styles/Home.module.css'


export default function NavigationBar() {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()

    const setProvider = (type) => {
        window.localStorage.setItem("provider", type);
    };

    useEffect(() => {
        const provider = window.localStorage.getItem("provider");
        if (provider) activate(connectors[provider]);
    });

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
        <Navbar className="justify-content-end mb-auto">
            <Container>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>

                        {active
                            ? <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    <div className={styles.idButton}>
                                        <Identicon />&nbsp;
                                        {utils.truncateAddress(account)}
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={disconnect}>Disconnect</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                            : <Button onClick={connect}>Connect Wallet</Button>}

                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}