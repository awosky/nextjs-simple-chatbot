import {
  ClearOutlined,
  InfoCircleOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useContext } from "react";

import { MessageContext } from "@/store/MessageProvider";

import style from "./DropdownMenu.module.scss";

const DropdownMenu = () => {
  const { resetMessage } = useContext(MessageContext);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Info Chatbot",
      icon: <InfoCircleOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Clear Chat",
      icon: <ClearOutlined />,
      onClick: () => resetMessage(),
    },
  ];

  return (
    <Dropdown
      overlayClassName={style.dropdown}
      menu={{ items }}
      placement="bottomRight"
      arrow
    >
      <Button className={style.menu} type="text" icon={<MoreOutlined />} />
    </Dropdown>
  );
};

export default DropdownMenu;
