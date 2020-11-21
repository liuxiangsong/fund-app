
/**
 * @interface 基金经理信息
 */
interface FundManagers {
  fundCode: string
  managers: ManagerInfo[]
}
/**
 * @interface 基金经理详细信息
 */
interface ManagerInfo {
  name: string;
  inaugurationDate: string;
  resignDate: string;
  activeStauts: string;
  tenureDuration: string;
  yieldRate: string;
}
