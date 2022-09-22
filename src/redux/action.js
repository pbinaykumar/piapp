export const selectedIps = (ips) => {
  return (dispatch) => {
    dispatch({
      type: "ips",
      payload: ips,
    });
  };
};

export const setCurrentIp = (ip) => {
  return (dispatch) => {
    dispatch({
      type: "ip",
      payload: ip,
    });
  };
};

