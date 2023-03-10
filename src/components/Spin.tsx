import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Spin as SpinAntd } from "antd";

import style from "./Spin.module.scss";

const Spin = () => {
  return (
    <div className={style.spin}>
      <SpinAntd indicator={<Loading3QuartersOutlined spin />} spinning={true} />
    </div>
  );
};

export default Spin;
