import { useContext } from "react";

import InputMessage from "@/components/InputMessage";
import MessageContainer from "@/components/MessageContainer";
import Navbar from "@/components/Navbar";
import Spin from "@/components/Spin";
import { MessageContext } from "@/store/MessageProvider";

import style from "./Home.module.scss";

const Home = () => {
  const { isLoading } = useContext(MessageContext);

  if (isLoading) return <Spin />;

  return (
    <div className={style.home}>
      <Navbar />
      <MessageContainer />
      <InputMessage />
    </div>
  );
};

export default Home;
