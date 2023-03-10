import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useContext, useRef } from "react";

import { MessageContext } from "@/store/MessageProvider";

import style from "./InputMessage.module.scss";

const InputMessage = () => {
  const { submitMessage } = useContext(MessageContext);
  const inputRef = useRef<HTMLDivElement>(null);

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
