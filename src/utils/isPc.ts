function IsPC() {
  const { userAgent } = navigator;
  const Agents = [
    "Android",
    "iPhone",
    "SymbianOS",
    "Windows Phone",
    "iPad",
    "iPod",
  ];
  let flag = true;
  for (let i = 0; i < Agents.length; i++) {
    if (userAgent.indexOf(Agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

export { IsPC };
