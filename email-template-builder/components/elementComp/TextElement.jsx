const TextElement = ({ style, content, textarea, outerStyle }) => {
  return (
    <div className="w-full">
      <h2 style={style}>{textarea}</h2>
    </div>
  );
};

export default TextElement;
