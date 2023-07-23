import React from 'react';

class SwitchToBSCButton extends React.Component {
  async switchToBSC() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
            console.log(accounts)
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x38' }],
          });
        } else {
          console.log('Please connect your wallet to switch networks.');
        }
      } else {
        console.log('Metamask is not installed. Please install it to proceed.');
      }
    } catch (error) {
      console.error('Error while switching network:', error);
    }
  }

  render() {
    return (
      <button onClick={() => this.switchToBSC()} className='switchToBSC'>Switch to BSC</button>
    );
  }
}

export default SwitchToBSCButton;
