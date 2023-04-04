export const timerFormat = (seconds: number) => {
  const min = Math.floor(seconds / 60000);
  const sec = Math.floor((seconds % (1000 * 60)) / 1000);

  return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
};
