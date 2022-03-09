import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import OtpModal from './components/OtpModal'
import './App.css';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("")
  const [inputs, setInputs] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /// Check metamask wallet is connected
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    
    if (!ethereum) {
      console.log("Make sure you have metamask!")
      return;
    }
    
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account)
      setCurrentAccount(account)
    } else {
      console.log("No authorized account found")
    }
  }

  /// Connect metamask wallet
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0])
      setCurrentAccount(accounts[0])

    } catch (error) {
      console.log(error)
    }
  }

  /// Handle input values
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  /// Send token function
  const sendTokens = async () => {
    handleClose();
    try {
      const { ethereum } = window;
      if (ethereum) {
        await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: currentAccount,
              to: inputs.address,  
              value: ethers.utils.parseEther(inputs.amount).toHexString(),
              gas: '21000',
           },                                                                                                                                                 
          ],
        })
        .then((txHash) => console.log(txHash))
        .catch((error) => console.error);
      } else {
        console.log("Ethereum object doesn't exist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  
    handleShow();
  }

  useEffect(() => {
    checkIfWalletIsConnected()  // Check wallet is connected
  }, [])

  /// Wallet connect button
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  /// Send token button
  const renderSendUI = () => (
    <input type="submit" className="cta-button send-tokens-button" value="SEND TOKENS"/>
  )

  return (
    <div className="App">
      <OtpModal show={show} handleClose={handleClose} inputs={inputs} handleChange={handleChange} sendTokens={sendTokens}/>
      <div className="container-fluid">
        <div className="header-container">
          <p className="header gradient-text mb-5">Problem 2: Fancy Form</p>

          <form onSubmit={handleSubmit} class="was-validated px-4">
            <div class="row mb-5  justify-content-center">
              <div class="col-lg-5">
                <label for="address" class="form-label">Eth address:</label>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="ETH Address" 
                  id="address" 
                  name="address" 
                  pattern="0x[A-Za-z0-9]{40}" 
                  value={inputs.address || ""} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="row mb-5  justify-content-center">
              <div class="col-lg-3">
                <label for="amount" class="form-label">Amount to send:</label>
                <input 
                  type="number" 
                  min="0" 
                  step="any" 
                  class="form-control" 
                  placeholder="Amount to send" 
                  id="amount" 
                  name="amount" 
                  value={inputs.amount || ""} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="row mb-5  justify-content-center">
              <div class="col-lg-4">
                <label for="mail" class="form-label">OTP Authentication:</label>
                <input 
                  type="email" 
                  class="form-control" 
                  placeholder="Enter your e-mail address"
                  id="mail" 
                  name="mail" 
                  value={inputs.mail || ""} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div class="row  justify-content-center">
              <div class="col-lg-4">
                  {currentAccount === "" ? renderNotConnectedContainer() : renderSendUI()}
              </div>
            </div>
          </form>
        </div>
        <div className="footer-container">
        </div>
      </div>
      <div className="circle1"></div>
      <div className="circle2"></div>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave4"></div>
    </div>
  );
}

export default App;
