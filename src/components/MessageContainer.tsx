import { Fragment, useContext, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

import Loading from "@/components/Loading";
import { Message } from "@/interfaces";
import { MessageContext } from "@/store/MessageProvider";

import Empty from "./Empty";
import style from "./MessageContainer.module.scss";

const MessageContainer = () => {
  const { messages, isTyping, lastMessageRef } = useContext(MessageContext);
  const focusRef = useRef<HTMLDivElement>(null);
  const isEmpty = messages.length <= 0;

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  if (isEmpty) return <Empty />;

  return (
    <div className={style["message-container"]}>
      <div className={style.message}>
        {messages?.map((v: Message, i: number) => {
          const messageSize = messages.length;
          const isLastMessage = i === messageSize - 1;
          const isSecondLastMessage = i === messageSize - 2;
          const isUserMessage = messageSize % 2 !== 0;
          const showFocus = isUserMessage ? isLastMessage : isSecondLastMessage;
          return (
            <Fragment key={i}>
              {messageSize > 2 && showFocus && <span ref={focusRef} />}
              <div className={style[v.role]}>
                <ReactMarkdown>{v.content?.trim() || ""}</ReactMarkdown>
              </div>
            </Fragment>
          );
        })}

        {isTyping && (
          <div className={style["assistant"]}>
            <Loading />
          </div>
        )}

        <span ref={lastMessageRef} />
      </div>
    </div>
  );
};

export default MessageContainer;
