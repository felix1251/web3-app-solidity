import web3 from './web3';
import Lixtagram from '../abis/Lixtagram.json';

const lixtagram = new web3.eth.Contract(Lixtagram.abi, '0x1B87b160269dC7c1969e337ADc3018a280a559E4');

export default lixtagram;