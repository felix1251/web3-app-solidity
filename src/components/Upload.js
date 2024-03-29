import Lixtagram from "../abis/Lixtagram.json"
import Web3 from "web3";
import ipfs from "../services/ipfs";
import Resizer from "react-image-file-resizer";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ipfsUrl = "https://ipfs.io/ipfs/"

const styles = {
  container: {
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
  },
  button: {
    backgroundColor: "black",
    color: "white",
    marginTop: "10px"
  },
  post: {
    backgroundColor: "purple",
    color: "white",
    marginTop: "10px"
  },
  input: {
    width: 300
  },
  header: {
    marginBottom: "10px",
    fontWeight: 700
  }
}

function Upload(props) {
  const {onClose} = props
  const classes = styles
  const history = useHistory()
  const [imgIpfsHash, setImgIpfsHash] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault();
    window.web3 = new Web3(window.ethereum)
    var web3 = window.web3
    const networkId = await web3.eth.net.getId();
    const networkData = Lixtagram.networks[networkId];
    const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
    const checkIfHashExist = await lixtagram.methods.checkIfImageExist(imgIpfsHash).call();
    if (description !== "" && imgIpfsHash !== "" && !checkIfHashExist) {
      try {
        const accs = await web3.eth.getAccounts();
        await lixtagram.methods
          .createPost(description, imgIpfsHash)
          .send({
            from: accs[0],
            value: web3.utils.toWei("0.001", "ether"),
          });
        setUploading(false)
        setImgIpfsHash("")
        setDescription("")
        onClose(false)
        history.push("/profile")
      } catch (err) {
        console.log(err.message)
        setUploading(false)
      }
    }else{
      if(description === ""){
        alert("Description must not empty")
      }else if(checkIfHashExist){
        alert("This image is already owned or exist in the network")
      }
    }
  };

  // const compressFile = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(file, 2000, 2000, "JPEG", 100, 0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "blob"
  //     );
  //   });

  const captureFile = async (event) => {
    event.preventDefault();
    setUploading(true)
    const file = event.target.files[0];
    const imageSizeInMb = file.size/(1024**2)
    if(imageSizeInMb < 3){
      setMessage("Rendering Image..")
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => convertToBuffer(reader);
    }else{
      alert("image to large, maximum allowed is 3 mb")
    }
  };

  const convertToBuffer = async (reader) => {
    const buffer = Buffer.from(reader.result);
    setMessage("Generating IPFS Hash...")
    const ipfsHash = await ipfs.add(buffer);
    setImgIpfsHash(ipfsHash[0].hash)
    setUploading(false)
    setMessage("")
  };

  // console.log("hash", imgIpfsHash)
  return (
    <div style={classes.container}>
      <header style={classes.header}>Upload Image</header>
      {imgIpfsHash !== "" ?
        <>
          <img
            style={{ width: "300px", marginBottom: "10px" }}
            src={ipfsUrl + imgIpfsHash}
            alt=""
          />
          <div style={{ marginBottom: "10px" }} >If photo doesn't show click<a href={ipfsUrl + imgIpfsHash} rel="noopener noreferrer" target="_blank">{" "}Here(IPFS Link)</a></div>
        </>
        :
        <img
          style={{ width: "300px", border: "1px solid grey", marginBottom: "10px" }}
          src={"https://freepikpsd.com/file/2019/10/placeholder-image-png-5-Transparent-Images.png"}
          alt=""
        />
      }

      <TextField id="outlined-basic" label="Description..." multiline rows={2} variant="outlined" style={classes.input} onChange={e => setDescription(e.target.value)} />
      {imgIpfsHash ?
        <Button variant="contained" component="span" style={classes.post} size="small" onClick={onSubmit}>
          Post
        </Button>
        :
        <>
          <input
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            disabled={uploading}
            accept="image/png, image/jpg, image/jpeg"
            onChange={(event) => captureFile(event)}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span" style={classes.button} size="small">
              {uploading ? message : "Select Photo"}
            </Button>
          </label>
        </>
      }
    </div>
  );
}

export default Upload;
