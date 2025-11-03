import { sub } from 'date-fns'

/**
 * 通知数据数组
 * 包含模拟的通知信息，如发送者信息、消息内容和时间等
 */
const notifications = [{
  id: 1,
  unread: true,
  sender: {
    name: '张伟',
    email: 'zhangwei@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=2'
    }
  },
  body: 'sent you a message',
  date: sub(new Date(), { minutes: 7 }).toISOString()
}, {
  id: 2,
  sender: {
    name: '李娜'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { hours: 1 }).toISOString()
}, {
  id: 3,
  unread: true,
  sender: {
    name: '王强',
    email: 'wangqiang@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=3'
    }
  },
  body: 'sent you a message',
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 4,
  sender: {
    name: '刘洋',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=4'
    }
  },
  body: 'added you to a project',
  date: sub(new Date(), { hours: 3 }).toISOString()
}, {
  id: 5,
  sender: {
    name: '陈磊',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=5'
    }
  },
  body: 'abandonned cart',
  date: sub(new Date(), { hours: 7 }).toISOString()
}, {
  id: 6,
  sender: {
    name: '杨丽',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=6'
    }
  },
  body: 'purchased your product',
  date: sub(new Date(), { days: 1, hours: 3 }).toISOString()
}, {
  id: 7,
  unread: true,
  sender: {
    name: '黄敏',
    email: 'huangmin@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'sent you a message',
  date: sub(new Date(), { days: 2 }).toISOString()
}, {
  id: 8,
  sender: {
    name: '周杰',
    email: 'zhoujie@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'requested a refund',
  date: sub(new Date(), { days: 5, hours: 4 }).toISOString()
}, {
  id: 9,
  unread: true,
  sender: {
    name: '吴芳',
    email: 'wufang@example.com'
  },
  body: 'sent you a message',
  date: sub(new Date(), { days: 6 }).toISOString()
}, {
  id: 10,
  sender: {
    name: '徐磊'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 6 }).toISOString()
}, {
  id: 11,
  sender: {
    name: '孙超'
  },
  body: 'abandonned cart',
  date: sub(new Date(), { days: 7 }).toISOString()
}, {
  id: 12,
  sender: {
    name: '胡军'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 9 }).toISOString()
}, {
  id: 13,
  sender: {
    name: '黄敏',
    email: 'huangmin@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 10 }).toISOString()
}, {
  id: 14,
  sender: {
    name: '周杰',
    email: 'zhoujie@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 11 }).toISOString()
}, {
  id: 15,
  sender: {
    name: '吴芳'
  },
  body: 'purchased your product',
  date: sub(new Date(), { days: 12 }).toISOString()
}, {
  id: 16,
  sender: {
    name: '徐磊',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=16'
    }
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 13 }).toISOString()
}, {
  id: 17,
  sender: {
    name: '孙超'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 14 }).toISOString()
}, {
  id: 18,
  sender: {
    name: '胡军'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 15 }).toISOString()
}, {
  id: 19,
  sender: {
    name: '黄敏',
    email: 'huangmin@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 16 }).toISOString()
}, {
  id: 20,
  sender: {
    name: '周杰',
    email: 'zhoujie@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'purchased your product',
  date: sub(new Date(), { days: 17 }).toISOString()
}, {
  id: 21,
  sender: {
    name: '吴芳'
  },
  body: 'abandonned cart',
  date: sub(new Date(), { days: 17 }).toISOString()
}, {
  id: 22,
  sender: {
    name: '徐磊'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 18 }).toISOString()
}, {
  id: 23,
  sender: {
    name: '孙超'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 19 }).toISOString()
}, {
  id: 24,
  sender: {
    name: '胡军',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=24'
    }
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 20 }).toISOString()
}, {
  id: 25,
  sender: {
    name: '黄敏',
    email: 'huangmin@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=8'
    }
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 20 }).toISOString()
}, {
  id: 26,
  sender: {
    name: '周杰',
    email: 'zhoujie@example.com',
    avatar: {
      src: 'https://i.pravatar.cc/128?u=9'
    }
  },
  body: 'abandonned cart',
  date: sub(new Date(), { days: 21 }).toISOString()
}, {
  id: 27,
  sender: {
    name: '吴芳'
  },
  body: 'subscribed to your email list',
  date: sub(new Date(), { days: 22 }).toISOString()
}]

/**
 * 导出通知数据的事件处理函数
 * @returns 返回包含所有通知数据的数组
 */
export default eventHandler(async () => {
  return notifications
})
