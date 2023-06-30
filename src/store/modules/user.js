import getUserTempId from "@/utils/userTempid";
import { reqLogin, reqUserInfo } from '@api/user'
import { getToken, setToken, removeToken } from '@/utils/token'
const state = {
  userTempId: getUserTempId(),
  // 开始就获取本地存储的token
  token: getToken(),
  userInfo: {}
};
const mutations = {
  // 第一个参数为state配置项,第二个为actions提交过来的数据
  set_token(state, payload) {
    // 把请求数据里面的token放入到state里面的token里面
    state.token = payload.token
    // 当修改state里面的token的时候,也修改本地存储的token
    setToken(payload.token)
  },

  // 把用户信息保存到state里面的userInfo里面,payload就是actions里面传来的result
  set_userInfo(state, payload) {
    state.userInfo = payload
  },

  // 清除token,把vuex里面的token清空,并且删除本地存储的token
  clear_Token(state) {
    state.token = ""
    state.userInfo = {}
    removeToken()
  }
};

const actions = {
  // 异步请求登录,第一个参数为阉割版的store,第二个为要传入的参数
  async getToken({ commit }, payload) {
    try {
      // 获取到登录的信息
      const result = await reqLogin(payload)
      // 提交给mutations里面
      commit('set_token', result)
      // ('登录成功')
    } catch (e) {
      alert('登录失败')
    }

  },

  // 请求用户信息
  async getUserInfo({ commit }) {
    try {
      // 获取到用户信息
      const result = await reqUserInfo()
      // 发送给ser_userInfo,并且携带参数result
      commit('set_userInfo', result)
    }
    catch (e) {
      this.$message.error('请求用户信息失败')
    }
  }
};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true,
};
