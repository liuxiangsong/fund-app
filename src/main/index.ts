import { ipcMain } from 'electron';
import Dao from '@/plugins/dao'

ipcMain.handle('get-fund-data', async (event, fundCode) => {
  const dao = new Dao()
  // const result = await dao.updateFundData('110022')
  // if (!result) {
  //   return '数据更新失败！'
  // }
  const res = await dao.findData()
  // console.log('event,fundCode :>> ', event, fundCode);
  return 'msg from ipcMain' + JSON.stringify(res);
});
