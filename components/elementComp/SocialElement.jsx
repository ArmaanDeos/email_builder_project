const SocialElement = ({ icon, socialIcons, option, style, outerStyle }) => {
  return (
    <div className="" style={outerStyle}>
      {socialIcons.map((item, index) => {
        return (
          <a href={item.url} key={index} style={style} className="mr-2">
            <img src={item.icon} alt="image" style={style} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialElement;
