import { Col, Row, Space, Typography } from "antd";
import Image from "next/image";

import DropdownMenu from "@/components/DropdownMenu";

import style from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={style.navbar}>
      <Row justify="space-between" align="middle" wrap={false}>
        <Col>
          <Space size={12}>
            <Image
              className={style.logo}
              src="/images/logo.png"
              width={48}
              height={48}
              alt="Logo"
            />
            <div className={style.text}>
              <Typography.Title level={1} className={style.title}>
                Simple Chatbot
              </Typography.Title>
              <Typography.Paragraph className={style.description}>
                Powered by OpenAI
              </Typography.Paragraph>
            </div>
          </Space>
        </Col>
        <Col>
          <DropdownMenu />
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
