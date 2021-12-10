export const getCurrentTimeFormated = () => {
  const currentTime = new Date();

  return `${currentTime.toLocaleDateString()} - ${currentTime.toLocaleTimeString()}`;
};

export const getCurrentYear = () => {
  const currentTime = new Date();

  return currentTime.getFullYear();
};
