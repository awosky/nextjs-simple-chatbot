import { Modal, Typography } from "antd";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

import { INFO } from "@/constants";

import style from "./ModalInfo.module.scss";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalInfo = (props: Props) => {
  const { open, setOpen } = props;

  return (
    <Modal open={open} onCancel={() => setOpen(false)} centered footer={false}>
      <div className={style["modal-info"]}>
        <div className={style.logo}>
          <Image src="/images/logo.png" width={72} height={72} alt="Logo" />
        </div>
        <Typography.Paragraph className={style.text}>
          {INFO.DESCRIPTION}
        </Typography.Paragraph>
      </div>
    </Modal>
  );
};

export default ModalInfo;
