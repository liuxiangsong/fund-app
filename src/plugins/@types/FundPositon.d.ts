/**
 * @interface 基金持仓信息
 * @property {string} sourceMark -数据来源
 * @property {string} endDate -数据截止时间
 * @property {number} mainStockPercent -重仓持仓占比
 */
interface FundPosition {
  fundCode: string
  stockPercent: number
  mainStockPercent: number
  bondPercent: number
  cashPercent: number
  otherPercent: number
  sourceMark: string
  endDate: string
  stockList: StockInfo[]
  bondList: StockInfo[]
}

interface StockInfo {
  name: string
  code: string
  percent: Number

}
