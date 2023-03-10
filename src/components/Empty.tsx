import { Button, Card, ConfigProvider, Typography } from "antd";
import Image from "next/image";
import { useContext } from "react";

import { INFO } from "@/constants";
import { MessageContext } from "@/store/MessageProvider";

import style from "./Empty.module.scss";

const Empty = () => {
  const { submitMessage } = useContext(MessageContext);

  return (
    <div className={style.empty}>
      <div>
        <Image src="/images/empty.svg" width={200} height={120} alt="empty" />
        <Card className={style.card}>
          <Typography.Paragraph className={style.text}>
            {INFO.INTRODUCTON}
          </Typography.Paragraph>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#128c7e",
              },
            }}
          >
            <Button
              type="primary"
              className={style.button}
              onClick={() => submitMessage("Hello")}
            >
              Say Hello
            </Button>
          </ConfigProvider>
        </Card>
      </div>
    </div>
  );
};

export default Empty;
