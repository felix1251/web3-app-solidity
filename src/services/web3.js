import Web3 from 'web3';
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    //this.setState({ loading: false })
    window.web3 = new Web3(window.ethereum)
    window.ethereum.request({ method: 'eth_requestAccounts' })
    window.ethereum.on('chainChanged', () => { window.location.reload() })
    window.ethereum.on('accountsChanged', () => { window.location.reload() })  
}
else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //this.setState({ loading: false })
    window.web3 = new Web3(window.web3.currentProvider)
    window.ethereum.request({ method: 'eth_requestAccounts' })
    window.ethereum.on('chainChanged', () => { window.location.reload() })
    window.ethereum.on('accountsChanged', () => { window.location.reload() })   
}
const web3 = new Web3(window.web3);

export default web3;