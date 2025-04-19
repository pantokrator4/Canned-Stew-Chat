import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { getChatAC } from "./model/chatReducer";
import { chatApi, gameServerAndPlayersInfo } from "./api/chatApi";
import { getServerAndPlayersInfoAC } from "./model/playersReducer";
import arrowUp from "./assets/arrowUp2.png";


function App() {
  const chatState = useAppSelector((state) => state.chatReducer);
  const playersList = useAppSelector((state) => state.playersReducer);
  const dispatch = useAppDispatch();

  const getMessagesAndPlayers = () => {
    const getChat = fetch(chatApi());
    const getServerAndPlayersInfo = fetch(gameServerAndPlayersInfo);

    Promise.all([getChat, getServerAndPlayersInfo])
      .then((res) => Promise.all(res.map((r) => r.json())))
      .then((res) => {
        dispatch(getChatAC({ response: res[0] }));
        dispatch(getServerAndPlayersInfoAC({ response: res[1] }));
      });
  };

  useEffect(() => {
    getMessagesAndPlayers()

    const intId = setInterval(() => {
      getMessagesAndPlayers()
    }, 60000);

    return () => {
      clearInterval(intId);
    };
  }, []);

  return (
    <div className="appWrapper">
      <aside className="asideWrapper">
        <h2>Players Online</h2>
        <ul className="playersListStyle">
          {playersList.length > 0 ? (
            playersList.map((player) => (
              <li className="playerStyle" key={player.uuid}>
                <a
                  className="nameStyle"
                  target="_blank"
                  href={`https://steamcommunity.com/profiles/${player.steamID}`}
                >
                  {player.displayName}
                </a>
              </li>
            ))
          ) : (
            <span>Players list is empty</span>
          )}
        </ul>
      </aside>
      <main>
        <h2>In Game Chat</h2>
        <ul className="messagesWrapper">
          {chatState.length > 0 ? (
            chatState.map((mess) => (
              <li key={mess.uuid} className="messageStyle">
                <div>
                  <span className="nameStyle">{mess.name}</span>: {mess.text}
                </div>
                <span className="timeStyle">{mess.time}</span>
              </li>
            ))
          ) : (
            <span className="messageStyle">Chat is empty</span>
          )}
        </ul>
      </main>
      {/* <button
        className="upButtonStyle"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <img className="arrowUpStyle" src={arrowUp} />
      </button> */}
    </div>
  );
}

export default App;
