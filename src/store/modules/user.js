import getUserTempId from "@/utils/userTempId";
const state = {
  userTempId: getUserTempId(),
};
const mutations = {};
const actions = {};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
