const ImageElement = ({ style, imageUrl, outerStyle }) => {
  return (
    <div className="" style={outerStyle}>
      <img src={imageUrl} alt="image" style={style} />
    </div>
  );
};

export default ImageElement;
