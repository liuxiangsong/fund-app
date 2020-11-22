import { ipcMain } from 'electron';
import FundApi from '@/plugins/fundApi'
import Dao from '@/plugins/dao'


ipcMain.handle('get-fund-data', async (event, fundCode) => {
  const fundApi = new FundApi(fundCode)
  const result = await fundApi.getFundAllInfo()
  return result;
});

ipcMain.handle('search-fund-data', async (event, queryString): Promise<FundSearchResult[] | undefined> => {
  const fundApi = new FundApi()
  const result = await fundApi.searchFund(queryString)
  return result;
});

ipcMain.handle('find-data-from-db', async (event, options): Promise<any[] | undefined> => {
  const dao = new Dao()
  const result = await dao.findData(options)
  return result;
});
