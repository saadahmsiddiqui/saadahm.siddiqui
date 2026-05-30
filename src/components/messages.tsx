import { useCallback, useEffect, useState } from "react";
import { getMessages, sendMessage } from "../lib/messages";

const backgrounds = [
  "bg-[#FF007F]",
  "bg-[#FF6B00]",
  "bg-[#39FF14]",
  "bg-[#00FFFF]",
  "bg-[#8E3CCB]",
  "bg-[#0033FF]",
  "bg-[#FFD400]",
  "bg-[#FF00FF]",
  "bg-[#87C830]",
  "bg-[#FF2A2A]",
] as const;

function Message({ by, message, date, background }: Message) {
  const classes = `w-8 h-8 ${background} text-white flex items-center justify-center rounded-md`;

  return (
    <div className="flex gap-3 items-start">
      <div className={classes}>*</div>
      <div className="max-w-[300px] break-normal">
        <p className="font-medium text-zinc-800">{message}</p>
        <p className="text-xs text-zinc-500">
          {date.toLocaleDateString("en-GB")} • {by}
        </p>
      </div>
    </div>
  );
}

function getRandomBackgroundColor() {
  return backgrounds[Math.floor(Math.random() * backgrounds.length)];
}

type Message = {
  by: string;
  date: Date;
  message: string;
  background: string;
};

export default function Messages() {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [messagesList, setMessagesList] = useState<Message[]>([]);

  const updateMessageList = useCallback(() => {
    getMessages().then((data) => {
      setMessagesList(
        data.map(
          (
            d: Omit<Message & { created_at: string }, "date" | "background">,
          ) => {
            return {
              by: d.by,
              message: d.message,
              background: getRandomBackgroundColor(),
              date: new Date(d.created_at),
            };
          },
        ),
      );
    });
  }, [setMessagesList]);

  useEffect(() => {
    updateMessageList();
  }, [updateMessageList]);

  const onClickAddMessage = useCallback(() => {
    if (name.length > 50 || text.length > 255) {
      alert("I only support short names(50) and messages(255) on my site :)");
      return;
    }

    if (name.length > 0 && text.length > 0) {
      sendMessage(name, text).then(() => {
        updateMessageList();
      });
    }
  }, [name, text, updateMessageList]);

  return (
    <>
      <h2 className="text-xs uppercase text-zinc-400">Messages</h2>

      {messagesList.length > 0 ? (
        <div className="h-50 overflow-y-scroll flex flex-col gap-4">
          {messagesList.map((m) => (
            <Message {...m} />
          ))}
        </div>
      ) : (
        <div className="h-50 flex justify-center items-center">
          <span className="text-zinc-400">No messages so far!</span>
        </div>
      )}

      <div className="text-white rounded-lg flex flex-col mt-6">
        <label className="text-zinc-400 my-1" htmlFor="">
          Name
        </label>
        <input
          value={name}
          onChange={(evt) => {
            evt.stopPropagation();
            setName(evt.target.value);
          }}
          type="text"
          className="p-3 text-zinc-600 h-7 w-full rounded-md border border-zinc-400 outline-none"
        />
        <label className="text-zinc-400 my-1" htmlFor="">
          Message ({text.length}&nbsp;/&nbsp;255)
        </label>
        <textarea
          value={text}
          onChange={(evt) => {
            evt.stopPropagation();
            setText(evt.target.value);
          }}
          id="short-message"
          className="p-2 h-20 text-zinc-600 w-full rounded-md border border-zinc-400 outline-none"
        ></textarea>
        <button
          onClick={(evt) => {
            evt.stopPropagation();
            onClickAddMessage();
          }}
          className="my-3 bg-rose-500 py-2 rounded-md shadow-sm"
        >
          Post
        </button>
      </div>
    </>
  );
}
