import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { defineStore } from 'pinia'
import usePermissionStore from './permission'
import useTagsViewStore from './tagsView'

const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: getToken(),
      name: '',
      avatar: '',
      introduction: '',
      roles: []
    }
  },
  getters: {},
  actions: {
    // user login
    login(userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then((response) => {
            const { data } = response
            this.token = data.token
            setToken(data.token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // get user info
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo(this.token)
          .then((response) => {
            const { data } = response

            if (!data) {
              reject('Verification failed, please Login again.')
            }

            const { roles, name, avatar, introduction } = data

            // roles must be a non-empty array
            if (!roles || roles.length <= 0) {
              reject('getInfo: roles must be a non-null array!')
            }
            this.roles = roles
            this.name = name
            this.avatar = avatar
            this.introduction = introduction
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // user logout
    logout() {
      const tagsView = useTagsViewStore()
      return new Promise((resolve, reject) => {
        logout(this.token)
          .then(() => {
            this.token = ''
            this.roles = []
            removeToken()
            resetRouter()

            // reset visited views and cached views
            // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
            tagsView.delAllViews(null)

            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // remove token
    resetToken() {
      return new Promise((resolve) => {
        this.token = token
        this.roles = []
        removeToken()
        resolve()
      })
    },

    // dynamically modify permissions
    async changeRoles(role) {
      const token = role + '-token'

      this.token = token
      setToken(token)

      const { roles } = await this.getInfo

      resetRouter()

      // generate accessible routes map based on roles
      const permission = usePermissionStore()
      const accessRoutes = await permission.generateRoutes(roles)
      // dynamically add accessible routes
      accessRoutes.forEach((item) => {
        router.addRoute(item)
      })
      const tagsView = useTagsViewStore()
      // reset visited views and cached views
      tagsView.delAllViews(null)
    }
  }
})

export default useUserStore
