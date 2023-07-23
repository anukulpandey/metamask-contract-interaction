import React, { useState, useEffect } from 'react';
import { providers,Contract, ethers } from 'ethers';
import { abi } from './abi';
import { address } from './address';

function App() {
  const [contract, setContract] = useState();

  useEffect(() => {
    const connectMetaMask = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('connected to metamask')
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error('MetaMask not found');
      }
    };

    connectMetaMask();
  }, []);

  useEffect(() => {
    async function initNFTContract() {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const _contract = new Contract(address, abi, signer);
      const ownerAddress = '0x0B60Fdd11E852cd1191c298e8f7D3Fe4af919168';
      console.log(_contract)
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const tokens = await _contract.balanceOf(ethers.utils.getAddress('0x0B60Fdd11E852cd1191c298e8f7D3Fe4af919168'));
       console.log(tokens);
      } catch (error) {
        console.log(error)
      }
      setContract(_contract);
    }
    initNFTContract();
  }, []);

  return (
    <div>
      <h1>Pancakeswap Router V2 BSC Chain</h1>
      {contract ? <p>Contract connected: {contract.address}</p> : <p>Connecting to contract...</p>}
    </div>
  );
}

export default App;
