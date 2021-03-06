/**
 * @interface 基金信息
 * @property {string} code -代码
 * @property {string} name -名称
 * @property {string} foundType -基金类型
 * @property {number} rating -晨星评级
 * @property {number} netValue -当前净值
 */
declare interface FundBaseInfo {
  code?: string;
  name?: string;
  fundCompany?: string;
  foundDate?: string;
  foundType?: string;
  managerName?: string;
  fundSize?: string;
  rating?: number;
  netValue?: number
}
