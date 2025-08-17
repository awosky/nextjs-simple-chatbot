import { Button, Col, Row, Space, Typography } from "antd";
import Image from "next/image";
import { useState } from "react";

import DropdownMenu from "@/components/DropdownMenu";

import ModalInfo from "./ModalInfo";
import style from "./Navbar.module.scss";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={style.navbar}>
      <Row justify="space-between" align="middle" wrap={false}>
        <Col>
          <Space size={12}>
            <Button
              type="text"
              className={style.logo}
              onClick={() => setOpen(!open)}
            >
              <Image src="/images/logo.png" width={48} height={48} alt="Logo" />
            </Button>
            <div className={style.text}>
              <Typography.Title level={1} className={style.title}>
                Simple Chatbot
              </Typography.Title>
              <Typography.Paragraph className={style.description}>
                Powered by Google AI
              </Typography.Paragraph>
            </div>
          </Space>
        </Col>
        <Col>
          <DropdownMenu setOpen={setOpen} />
        </Col>
      </Row>
      <ModalInfo open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
