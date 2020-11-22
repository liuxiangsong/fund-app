import request from './request';
import dayjs from 'dayjs'

class FundApi {
  private fundCode
  constructor(fundCode: string = '') {
    this.fundCode = fundCode
  }

  /**
   * 基金查询
   * @param queryString 查询字符串
   */
  async searchFund(queryString: string): Promise<FundSearchResult[] | undefined> {
    const url = `https://danjuanapp.com/djapi/v2/search?key=${queryString}&xq_access_token=c2974070ad952835feab798d5278f70696c9f25c&source=index`;
    const res: any = await request(encodeURI(url));
    if (res.result_code === 0) {
      return res.data.items.map((i: any) => ({
        code: i.scode,
        name: i.sname,
        type: i.stype,
        yieldOfLastYear: i.yield
      }))
    }
  }
  /**
   * 获取基金的全部信息
   */
  async getFundAllInfo(): Promise<FundInfo | undefined> {
    let promiseList: Promise<any>[] = []
    promiseList.push(this.getFundBaseInfo())
    promiseList.push(this.getFundManagers())
    promiseList.push(this.getFundPosition())
    let values: any[] = await Promise.all(promiseList)
    if (values.some(v => !v || v.length < 1)) {
      return
    }
    return { baseInfo: values[0], managers: values[1], position: values[2] }
  }

  /**
   * 获取基金基本信息
   */
  async getFundBaseInfo(): Promise<FundBaseInfo | undefined> {
    try {
      const url = `https://danjuanapp.com/djapi/fund/${this.fundCode}`;
      const res: any = await request(url);
      if (res.result_code === 0) {
        const { data } = res;
        const result = {
          code: data.fd_code,
          name: data.fd_name,
          fundCompany: data.keeper_name,
          foundDate: data.found_date,
          foundType: data.op_fund.fund_tags.map((t: any) => t.name).join('-'),
          managerName: data.manager_name,
          fundSize: data.totshare,
          rating: Number(data.rating),
          netValue: Number(data.fund_derived.unit_nav)
        };
        // console.log('getFundInfo :>> ', result);
        return result;
      }
    } catch (ex) {
      console.log('getFundBaseInfo() ex :>> ', ex);
    }
  };

  /**
   * 获取基金经理信息
   */
  async getFundManagers(): Promise<FundManagers | undefined> {
    try {
      const url = `https://danjuanapp.com/djapi/fund/manager/history?fd_code=${this.fundCode}`;
      const res: any = await request(url);
      if (res.result_code === 0) {
        const result = {
          fundCode: this.fundCode,
          managers: res.data.items.map((i: any) => ({
            name: i.name,
            inaugurationDate: dayjs(i.post_date).format('YYYY-MM-DD'),
            resignDate: i.resi_date ? dayjs(i.resi_date).format('YYYY-MM-DD') : '',
            activeStauts: i.post_status === 1 ? '在职' : '离职',
            tenureDuration: i.cp_term,
            yieldRate: i.cp_rate.toFixed(2) + '%'
          }))
        }
        // console.log('getFundManagers :>> ', result);
        return result
      }
    } catch (ex) {
      console.log('getFundManagers() ex:>> ', ex);
    }
  };

  /**
   * 获取基金持仓信息
   */
  async getFundPosition(): Promise<FundPosition | undefined> {
    try {
      const url = `https://danjuanapp.com/djapi/fund/detail/${this.fundCode}`;
      const res: any = await request(url);
      if (res.result_code === 0) {
        const data = res.data.fund_position
        const result = {
          fundCode: this.fundCode,
          stockPercent: data.stock_percent,
          bondPercent: data.bond_percent,
          cashPercent: data.cash_percent,
          otherPercent: data.other_percent,
          sourceMark: data.source_mark,
          endDate: data.enddate,
          mainStockPercent: data.stock_list.map((s: any) => s.percent).reduce((t: number, cur: number) => t + cur, 0),
          stockList: data.stock_list.map((s: any) => ({
            name: s.name,
            code: s.code,
            percent: s.percent
          })),
          bondList: data.bond_list.map((s: any) => ({
            name: s.name,
            code: s.code,
            percent: s.percent
          })),
        }
        // console.log('getFundPosition :>> ', result);
        return result;
      }
    } catch (ex) {
      console.log('getFundPosition() ex :>> ', ex);
    }
  };
}

export default FundApi;
