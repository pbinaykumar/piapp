const ipReducer = (state = [], action) => {
  if (action.type === "ips") {
    return action.payload;
  } else {
    return state;
  }
};
export default ipReducer;

