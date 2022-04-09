import Lixtagram from "../abis/Lixtagram.json"
import Web3 from "web3";
import ipfs from "../services/ipfs";
import Resizer from "react-image-file-resizer";
import { Button, TextField } from "@material-ui/core";
import { useState } from "react";

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

function Upload() {
  const classes = styles
  const [imgIpfsHash, setImgIpfsHash] = useState("")
  const [description, setDescription] = useState("")
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const onSubmit = async (event) => {
    if (description !== "" && imgIpfsHash !== "") {
      event.preventDefault();
      window.web3 = new Web3(window.ethereum)
      var web3 = window.web3
      const networkId = await web3.eth.net.getId();
      const networkData = Lixtagram.networks[networkId];
      const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
      try {
        const accs = await web3.eth.getAccounts();
        await lixtagram.methods
          .createPost(description, imgIpfsHash)
          .send({
            from: accs[0],
            value: web3.utils.toWei("0.0002", "ether"),
          });
        setUploading(false)
        setDescription("")
      } catch (err) {
        console.log(err.message)
        setUploading(false)
      }
    }else{
      if(description === ""){
        alert("Description must not empty")
      }
    }
  };

  const compressFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(file, 2000, 2000, "JPEG", 75, 0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  const captureFile = async (event) => {
    event.preventDefault();
    setUploading(true)
    setMessage("Rendering Image..")
    const file = event.target.files[0];
    const img = await compressFile(file)
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(img);
    reader.onloadend = () => convertToBuffer(reader);
  };

  const convertToBuffer = async (reader) => {
    setMessage("Generating IPFS Hash...")
    const buffer = Buffer.from(reader.result);
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
