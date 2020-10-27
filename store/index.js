export const state = () => ({
  user: {},
  messages: [],
  users: [],
  snackbar: false
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setSnackbar(state, value) {
    state.snackbar = value;
  },
  clearData(state) {
    state.user = {};
    state.messages = [];
    state.users = [];
  },
  SOCKET_newMessage(state, message) {
    state.messages.push(message);
  },
  SOCKET_updateUsers(state, users) {
    state.users = users;
  }
};
