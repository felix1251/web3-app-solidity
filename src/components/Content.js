import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../styles/content.scss";
// import Stories from "./Stories";
import Lixtagram from "../abis/Lixtagram.json"
import Card from "./Card";
import Web3 from "web3";
import CardSkeleton from "./CardSkeleton"
const ipfsUrl = "https://ipfs.io/ipfs/"

const Content = () => {
  const [publicPost, setPublicPost] = useState([])
  const [lixtagram, setLixtagram] = useState(null)
  const user = useSelector(state => state.user.currUser)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
      if (user?.name) {
        setLoading(true)
        try {
          window.web3 = new Web3(window.ethereum)
          var web3 = window.web3
          const networkId = await web3.eth.net.getId();
          const networkData = Lixtagram.networks[networkId];
          const lixtagram = new web3.eth.Contract(Lixtagram.abi, networkData.address);
          const post = await lixtagram.methods.getViewPost().call()
          setLixtagram(lixtagram)
          setPublicPost(post)
          setLoading(false)
        } catch (error) {
          console.log(error.message)
          setLoading(true)
        }
      }
    }
    load()
  }, [user])

  return (
    <div className="content">
      {user?.name?
        <>
          {publicPost.map((p) => (
            <Card
              key={p.id}
              ownerAdr={p.owner}
              ownerName = {p.ownerName}
              storyBorder={false}
              lixtagram={lixtagram}
              image={ipfsUrl + p.imgIpfsHash}
              postId={p.id}
              comments={p.comments}
              likes={p.likers}
              // likedByText="dadatlacak"
              // likedByNumber={89}
              time={p.timestamp}
            />
          ))}
        </>
        :
        <CardSkeleton />
      }
    </div>
  );
}

export default Content;
