import type { User } from '~/types'

const customers: User[] = [{
  id: 1,
  name: '张伟',
  email: 'zhangwei@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=1'
  },
  status: 'subscribed',
  location: '北京市'
}, {
  id: 2,
  name: '王芳',
  email: 'wangfang@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=2'
  },
  status: 'unsubscribed',
  location: '上海市'
}, {
  id: 3,
  name: '李娜',
  email: 'lina@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=3'
  },
  status: 'bounced',
  location: '广州市'
}, {
  id: 4,
  name: '刘强',
  email: 'liuqiang@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=4'
  },
  status: 'subscribed',
  location: '深圳市'
}, {
  id: 5,
  name: '陈杰',
  email: 'chenjie@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=5'
  },
  status: 'subscribed',
  location: '杭州市'
}, {
  id: 6,
  name: '杨丽',
  email: 'yangli@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=6'
  },
  status: 'subscribed',
  location: '成都市'
}, {
  id: 7,
  name: '黄磊',
  email: 'huanglei@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=7'
  },
  status: 'subscribed',
  location: '武汉市'
}, {
  id: 8,
  name: '吴洋',
  email: 'wuyang@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=8'
  },
  status: 'subscribed',
  location: '西安市'
}, {
  id: 9,
  name: '赵敏',
  email: 'zhaomin@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=9'
  },
  status: 'bounced',
  location: '南京市'
}, {
  id: 10,
  name: '周勇',
  email: 'zhouyong@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=10'
  },
  status: 'subscribed',
  location: '重庆市'
}, {
  id: 11,
  name: '徐超',
  email: 'xuchao@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=11'
  },
  status: 'subscribed',
  location: '天津市'
}, {
  id: 12,
  name: '孙莉',
  email: 'sunli@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=12'
  },
  status: 'unsubscribed',
  location: '苏州市'
}, {
  id: 13,
  name: '马军',
  email: 'majun@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=13'
  },
  status: 'unsubscribed',
  location: '青岛市'
}, {
  id: 14,
  name: '朱霞',
  email: 'zhuxia@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=14'
  },
  status: 'unsubscribed',
  location: '长沙市'
}, {
  id: 15,
  name: '胡敏',
  email: 'humin@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=15'
  },
  status: 'subscribed',
  location: '郑州市'
}, {
  id: 16,
  name: '林峰',
  email: 'linfeng@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=16'
  },
  status: 'subscribed',
  location: '大连市'
}, {
  id: 17,
  name: '何涛',
  email: 'hetao@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=17'
  },
  status: 'unsubscribed',
  location: '沈阳市'
}, {
  id: 18,
  name: '郭玲',
  email: 'guoling@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=18'
  },
  status: 'subscribed',
  location: '厦门市'
}, {
  id: 19,
  name: '罗斌',
  email: 'luobin@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=19'
  },
  status: 'bounced',
  location: '福州市'
}, {
  id: 20,
  name: '梁艳',
  email: 'liangyan@example.com',
  avatar: {
    src: 'https://i.pravatar.cc/128?u=20'
  },
  status: 'subscribed',
  location: '昆明市'
}]

export default eventHandler(async () => {
  return customers
})
