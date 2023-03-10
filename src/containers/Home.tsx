import InputMessage from "@/components/InputMessage";
import MessageContainer from "@/components/MessageContainer";
import Navbar from "@/components/Navbar";

import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={style.home}>
      <Navbar />
      <MessageContainer />
      <InputMessage />
    </div>
  );
};

export default Home;
