import { Button } from "../ui/button";

const ButtonElement = ({ style, content, url }) => {
  return (
    <div className="">
      <a href={url}>
        <Button style={style}>{content}</Button>
      </a>
    </div>
  );
};

export default ButtonElement;
