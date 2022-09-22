export const selectedIps = (ips) => {
  return (dispatch) => {
    dispatch({
      type: "ips",
      payload: ips,
    });
  };
};

