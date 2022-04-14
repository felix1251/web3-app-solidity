import React from "react";
import { GalleryItem } from "../components/GalleryGrid";
import "../styles/gallery.scss"
const url = "https://ipfs.io/ipfs/"

export function Gallery(props) {
  const {userPost} = props
  return (
    <div className="grid">
      {userPost.map((item) => (
        <GalleryItem key={item.id} imgIpfsHash={url + item.imgIpfsHash} />
      ))}
    </div>
  );
}
