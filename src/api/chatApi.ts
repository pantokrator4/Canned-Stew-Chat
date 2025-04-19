export const chatApi = () => {
  const getDate = () => {
    const today = new Date();
    const yestarday = new Date(today);
    yestarday.setDate(today.getDate() - 1);

    return {
      endDateTime: today.toISOString().slice(0, 10) + "T20%3A00%3A00.000Z",
      startDateTime:
        yestarday.toISOString().slice(0, 10) + "T20%3A00%3A00.000Z",
    };
  };

  const fetchDate = getDate();

  return `/api/chat?gameServerUuid=02df66a5-57f1-49a6-8b8e-7951b247a98f&startDateTime=${fetchDate.startDateTime}&endDateTime=${fetchDate.endDateTime}`;
};

export const gameServerAndPlayersInfo = `/api/game-servers/02df66a5-57f1-49a6-8b8e-7951b247a98f`;
