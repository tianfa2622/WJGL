// eslint-disable-next-line no-unused-vars
import { get } from '@/utils/http'

// 获取呈批件五天以上未办结数信息
export const searchfiveNotTransferred = () => get('/api/homePage/fiveDayCpjNumber')
// 获取呈批件十天以上未办结数信息
export const searchtenNotTransferred = () => get('/api/homePage/tenDayCpjNumber')
// 获取呈批件未办结总数信息
export const searchNotTransferredSum = () => get('/api/homePage/CptNumberCount')
// 获取呈批件已办结数量信息
export const searchYesTransferredNum = () => get('/api/homePage/CptAccomPlishe')
// 获取呈批件未审核数信息
export const searchNotAuditNum = () => get('/api/homePage/CptBanliOne')
// 获取呈批件已审核数信息
export const searchYesAuditNum = () => get('/api/homePage/CptBanliZero')
// 获取呈批件已退回数信息
export const searchReturnedNum = () => get('/api/homePage/CptBanliTwo')
// 获取呈批件未签收数信息
export const searchNotSignforNum = () => get('/api/homePage/CptFileStatus')

// 获取上级来文五天以上未办结数量信息
export const searchfiveDaySjlwNumber = () => get('/api/homePage/fiveDaySjlwNumber')
// 获取上级来文十天以上未办结数量信息
export const searchtenDaySjlwNumber = () => get('/api/homePage/tenDaySjlwNumber')
// 获取上级来文未签收数量
export const searchSjlwFileStatusOne = () => get('/api/homePage/SjlwFileStatusOne')
// 获取上级来文已签收数量
export const searchSjlwFileStatusZero = () => get('/api/homePage/SjlwFileStatusZero')
// 获取上级来文未办结总数
export const searchSjlwNumberCount = () => get('/api/homePage/SjlwNumberCount')

// 获取平级和下级来文五天以上未办结数量信息
export const searchfiveDayPjXjlwNumber = () => get('/api/homePage/fiveDayPjXjlwNumber')
// 获取平级和下级来文十天以上未办结数量
export const searchtenDayPjxjlwNumber = () => get('/api/homePage/tenDayPjxjlwNumber')
// 获取平级和下级来文未签收数量
export const searchPjxjlwFileStatusOne = () => get('/api/homePage/PjxjlwFileStatusOne')
// 获取平级和下级来文已签收数量
export const searchPjxjlwFileStatusZero = () => get('/api/homePage/PjxjlwFileStatusZero')
// 获取平级和下级来文未办结总数
export const searchPjxjlwNumberCount = () => get('/api/homePage/PjxjlwNumberCount')

// 获取群众来信五天以上未办结数量信息
export const searchfiveDayQzlxNumber = () => get('/api/homePage/fiveDayQzlxNumber')
// 获取群众来信十天以上未办结数量
export const searchtenDayQzlxNumber = () => get('/api/homePage/tenDayQzlxNumber')
// 获取群众来信未签收数量
export const searchQzlxFileStatusOne = () => get('/api/homePage/QzlxFileStatusOne')
// 获取群众来信已签收数量
export const searchQzlxFileStatusZero = () => get('/api/homePage/QzlxFileStatusZero')
// 获取群众来信未办结总数
export const searchQzlxNumberCount = () => get('/api/homePage/QzlxNumberCount')

// 获取其他五天以上未办结数量
export const searchfiveDayQtNumber = () => get('/api/homePage/fiveDayQtNumber')
// 获取其他十天以上未办结数量
export const searchtenDayQtNumber = () => get('/api/homePage/tenDayQtNumber')
// 获取其他未签收数量
export const searchQtFileStatusOne = () => get('/api/homePage/QtFileStatusOne')
// 获取其他已签收数量
export const searchQtFileStatusZero = () => get('/api/homePage/QtFileStatusZero')
// 获取其他未办结总数
export const searchQtNumberCount = () => get('/api/homePage/QtNumberCount')

// 没有
// 获取未到期应办数信息
export const searchUnexpiredNum = () => get('/api/homePage/fiveDayCpjNumber')
// 获取未办结总数信息
export const searchinnumerableTotal = () => get('/api/homePage/fiveDayCpjNumber')
// 获取提案超期应办数信息
export const searchProposalOverdueNum = () => get('/api/homePage/fiveDayCpjNumber')
// 获取提案未到期应办数信息
export const searchProposalUnexpiredNum = () => get('/api/homePage/fiveDayCpjNumber')
// 获取提案未办结总数信息
export const searchProposalinnumerableTotal = () => get('/api/homePage/fiveDayCpjNumber')
