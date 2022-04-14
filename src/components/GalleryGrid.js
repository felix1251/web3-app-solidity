import "../styles/galleryGrid.scss"
export function GalleryItem(props) {
  const {imgIpfsHash} = props
  return (
    <div className="wrap">
      <img className="post" alt="gallery-post" src={imgIpfsHash} />
    </div>
  );
}
