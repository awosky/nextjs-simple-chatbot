import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useContext, useRef } from "react";
import { isMobile } from "react-device-detect";

import { MessageContext } from "@/store/MessageProvider";
import useOnScreen from "@/utils/useOnScreen";

import style from "./InputMessage.module.scss";

const InputMessage = () => {
  const { submitMessage, lastMessageRef } = useContext(MessageContext);
  const inputRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(lastMessageRef);

  const onFocus = () => {
    if (isMobile && isVisible) {
      setTimeout(
        () => lastMessageRef.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = () => {
    if (inputRef.current && inputRef.current.innerHTML) {
      const message = inputRef.current.innerHTML;
      submitMessage(message);
      inputRef.current.innerHTML = "";
    }
  };

  return (
    <div className={style["input-message"]}>
      <Row
        className={style.wrapper}
        justify="space-between"
        align="middle"
        wrap={false}
      >
        <Col flex="auto">
          <div
            ref={inputRef}
            className={style.input}
            contentEditable="true"
            data-ph="Message"
            onKeyDown={(e) => onKeyDown(e)}
            onFocus={() => onFocus()}
          ></div>
        </Col>
        <Col>
          <Button
            className={style.button}
            type="text"
            icon={<SendOutlined />}
            onClick={onSubmit}
          />
        </Col>
      </Row>
    </div>
  );
};

export default InputMessage;
