// import Vue from 'vue';
import Datastore from 'nedb-promises';
import path from 'path';
import dayjs from 'dayjs'
import FundApi from './fundApi';

// https://www.w3cschool.cn/nedbintro/nedbintro-t9z327mh.html
// https://github.com/bajankristof/nedb-promises
class dao {
  private dbpath: string
  private db: Datastore
  constructor() {
    this.dbpath = path.join(process.cwd(), '/data.db');
    this.db = new Datastore({
      autoload: true, // 当数据存储被创建时，是否将数据自动从文件中加载到内存
      timestampData: true, // 自动生成时间戳
      filename: this.dbpath, // 数据存储文件路径
    });
  }

  /**
   * 查找数据
   * @param options 查询条件
   */
  async findData(options: object = {}): Promise<any[] | undefined> {
    try {
      // this.db.insert([{ fundCode: 8888, createDate: dayjs().add(5, 'day').format('YYYY-MM-DD') }])
      //   .then((res) => {
      //     console.log('res :>> ', res);
      //   });
      // db.find({ doc: '阿斯蒂芬3434',createDate:{ $gte : dayjs().format('YYYY-MM-DD')} })
      //   .then((res) => {
      //     console.log('resse3 :>> ', res);
      //   });
      let res = await this.db.find(options);
      // console.log('doc :>> ', res);
      return res;
    } catch (ex) {
      console.log('ex :>> ', ex);
    }
  }
  /**
   * 更新基金数据
   * @param fundCode 基金代码
   */
  async updateFundData(fundCode: string): Promise<boolean> {
    try {
      const isNeeded = await this.needAddFundData(fundCode)
      if (!isNeeded) {
        return true;
      }
      let doc = await this.createFundDoc(fundCode)
      if (!doc) {
        return false;
      }
      await this.db.insert(doc)
      return true
    } catch (ex) {
      console.log('updateFundData :>> ', ex);
      return false;
    }
  }

  /**
   * 创建基金数据文档
   * @param fundCode 基金代码
   */
  private async createFundDoc(fundCode: string) {
    const fundDoc = {
      fundCode,
      createDate: dayjs().format('YYYY-MM-DD'),
    }
    const fundApi = new FundApi(fundCode)
    const info = await fundApi.getFundAllInfo()
    if (!info) {
      console.log('获取基金信息失败');
      return null
    }

    const managersFlag = await this.needAddFundManagersData(info.managers)
    const positionFlag = await this.needAddFundPostionData(info.position)
    return [info.baseInfo, managersFlag ? info.managers : undefined, positionFlag ? info.position : undefined]
  }

  /**
  * 判断是否添加更新基金数据
  * @param fundCode 基金代码
  */
  private async needAddFundData(fundCode: string): Promise<boolean> {
    const result = await this.db.findOne({ fundCode, createDate: { $gt: dayjs().add(-1).format('YYYY-MM-DD') } })
    // console.log('result :>> ', result);
    return !result
  }

  /**
* 判断是否添加更新基金数据
* @param fundCode 基金代码
*/
  private async needAddFundManagersData(info: FundManagers): Promise<boolean> {
    const result: FundManagers = await this.db.findOne({ fundCode: info.fundCode })
    if (!result || result.managers.length != info.managers.length) {
      return true
    }
    // console.log('result :>> ', result);
    return false
  }

  /**
   * 判断是否添加更新基金持仓数据
   * @param position 基金持仓数据
   */
  private async needAddFundPostionData(position: FundPosition) {
    const result = await this.db.findOne({ fundCode: position.fundCode, endDate: position.endDate, stockPercent: position.stockPercent })
    return !result
  }
}

export default dao;
