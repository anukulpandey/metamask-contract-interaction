import React, { useState, useEffect } from 'react';
import { providers,Contract, ethers } from 'ethers';
import { abi } from './abi';
import { address } from './address';
import "./App.css"
import SwitchToBSCButton from './components/SwitchToBSC';

function App() {
  const [contract, setContract] = useState();
  const [contractParams,setContractParams] = useState({'amountIn':0,'reserveIn':0,'reserveOut':0});
  const [displayBscBtn, setDisplayBscBtn] = useState(false);

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
      console.log(_contract)
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        console.log(accounts)
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        if(chainId!='0x38')setDisplayBscBtn(true);
      } catch (error) {
        console.log(error)
      }
      setContract(_contract);
    }
    initNFTContract();
  }, []);

  const changeHandler=(e)=>{
const prevContractState = contractParams;
prevContractState[e.target.id]=parseInt(e.target.value);
setContractParams(prevContractState);
  }

  const handleQuery=async()=>{
    try {
      const res = await contract.getAmountOut(contractParams.amountIn,contractParams.reserveIn,contractParams.reserveOut);
      const result =parseInt(res,16)
      alert(`The result of query is ${result}`)
    } catch (error) {
      console.log('error',error)
    }
  }

  return (
    <div className='app'>
      <h1>Pancakeswap Router V2 BSC Chain</h1>
      {contract ? <div className='contractInit'>
        <p>Contract connected: {contract.address}</p>
        <label htmlFor="amountIn">Amount In</label>
        <input type="number" name="amountIn" min={0} id="amountIn" onChange={changeHandler} />
        <label htmlFor="reserveIn">Reserve In</label>
        <input type="number" name="reserveIn" min={0} id="reserveIn"  onChange={changeHandler} />
        <label htmlFor="reserveOut">Reserve Out</label>
        <input type="number" name="reserveOut" min={0}  id="reserveOut" onChange={changeHandler} />
        <button onClick={handleQuery}>Query</button>
        {displayBscBtn?  
        <SwitchToBSCButton/>:<></>
      }
        </div> : <p>Connecting to contract...</p>}
    </div>
  );
}

export default App;
