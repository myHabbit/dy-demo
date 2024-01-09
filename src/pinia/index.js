import { defineStore } from 'pinia'

const usePiniaStore = defineStore('content', {
  state: () => {
    return {
      isfold: 0,
      isDark: false,
      navlist: [
        {
          id: 1,
          title: "人员管理",
          icon: "icon-renyuan",
          path: "/person",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
        {
          id: 2,
          title: "项目管理",
          icon: "icon-project-o",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
        {
          id: 3,
          title: "标签管理",
          icon: "icon-biaoqian",
          path: "/skill",
          text: [
            { title: "技能标签管理", path: "/skill/skillTag" }
          ],
        },
        {
          id: 4,
          title: "权限管理",
          icon: "icon-quanxianyuechi",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
        {
          id: 5,
          title: "区域管理",
          icon: "icon-fuwuquyu",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
        {
          id: 6,
          title: "结算系统",
          icon: "icon-jiesuanzhongxin",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
        {
          id: 7,
          title: "试题管理",
          icon: "icon-shiti",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
        {
          id: 8,
          title: "其他功能",
          icon: "icon-qita",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
        {
          id: 9,
          title: "用户中心",
          icon: "icon-yonghu",
          text: [
            { title: "资源池", path: "/person/pesourcePool" },
            { title: "人员列表", path: "/person/personnelList" },
          ],
        },
      ],

      skillTagList: JSON.parse(localStorage.getItem('skillTagList')) || [{ id: 1, type: "技能标签", name: "java" }]
    }
  },
  getters: {},
  actions: {
    setBreadCrumb: function (filterParam) {
      return this.navlist.filter(item => {
        return item.text.some(textItem => textItem.path == filterParam)
      });
    },
    setSkillTag: function (skillTag) {
      this.skillTagList.push(skillTag)
      localStorage.setItem('skillTagList', JSON.stringify(this.skillTagList))
    },
    deleteSkillTag: function (id) {
      const ID = this.skillTagList.map(item => item.id).indexOf(id)
      this.skillTagList.splice(ID, 1)
    }
  }

})
export default usePiniaStore