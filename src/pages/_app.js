import '@/styles/globals.css'
import { StrictMode } from 'react'
import { Web3ReactProvider } from '@web3-react/core'
import { ethers } from 'ethers'

function getLibrary(provider) {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};

export default function App({ Component, pageProps }) {
  return (
    <StrictMode>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </StrictMode>
  )
}
