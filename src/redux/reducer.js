export const piIps = (state = [], action) => {
  if (action.type === "ips") {
    return action.payload;
  } else {
    return state;
  }
};


export const currentIp = (state = "", action) => {
  if (action.type === "ip") {
    return action.payload;
  } else {
    return state;
  }
};