// 上报方式
export const sourceOptions = [
  {
    label: '上传',
    value: 1
  },
  {
    label: '系统录入',
    value: 2
  },
  {
    label: '死亡补发病',
    value: 3
  },
  {
    label: '死因库导入死亡补发病',
    value: 4
  }
]

// 上报渠道
export const reportTypeOptions = [
  {
    label: '登记处',
    value: 1
  },
  {
    label: '医院',
    value: 2
  }
]
// 登记卡状态
export const cardOverallStatus = [
  {
    label: '已作废',
    value: 2
  },
  {
    label: '已汇编',
    value: 4
  },
  {
    label: '未汇编',
    value: 5
  }
]
// 账号状态
export const statusOptions = [
  {
    label: '禁用',
    value: 0
  },
  {
    label: '启用',
    value: 1
  }
]
// IARC标准
export const IARCStandard = [
  {
    id: '0',
    name: '0.仅有死亡证明书'
  },
  {
    id: '1',
    name: '1.临床'
  },
  {
    id: '2',
    name: '2.X线、CT、超声波、内窥镜等'
  },
  {
    id: '3',
    name: '3.探查性手术/尸检 (无病理)'
  },
  {
    id: '4',
    name: '4.生化、免疫、肿瘤标记物'
  },
  {
    id: '5',
    name: '5.细胞学、血片'
  },
  {
    id: '6',
    name: '6.病理(继发)'
  },
  {
    id: '7',
    name: '7.病理(原发)'
  },
  {
    id: '8',
    name: '8.尸检(有病理)'
  },
  {
    id: '9',
    name: '9.不详'
  }
]
// 肿瘤状态
export const compilationTumorStatusOptions = [
  {
    label: '确认肿瘤',
    value: 1
  },
  {
    label: '确认非肿瘤',
    value: 2
  }
]
// 失访状态
export const compilationLossStatusOptions = [
  {
    label: '未失访',
    value: 0
  },
  {
    label: '确认失访',
    value: 1
  }
]
// 一致性校验状态
export const verifyOptions = [
  {
    label: '未校验',
    value: 0
  },
  {
    label: '正常',
    value: 1
  },
  {
    label: '错误',
    value: 3
  },
  {
    label: '警告',
    value: 2
  }
]
