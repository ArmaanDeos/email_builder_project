import { Button } from "../ui/button";

const ButtonElement = ({ style, content, url, outerStyle }) => {
  return (
    <a href={url} style={outerStyle}>
      <Button style={style}>{content}</Button>
    </a>
  );
};

export default ButtonElement;
