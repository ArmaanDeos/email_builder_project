const HeaderLogoElement = ({ imageUrl, style, outerStyle }) => {
  return (
    <div className="" style={outerStyle}>
      <img src={imageUrl} alt="logo" style={style} />
    </div>
  );
};

export default HeaderLogoElement;
