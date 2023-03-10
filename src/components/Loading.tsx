import style from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={style.loading}>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
      <div className={style.wave}></div>
    </div>
  );
};

export default Loading;
