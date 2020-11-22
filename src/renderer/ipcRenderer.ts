import { ipcRenderer } from 'electron';

export async function findDataFromDb(options: object = {}) {
  const result = await ipcRenderer.invoke('find-data-from-db', options);
  // console.log('ipcrenderer data>>', result);
  return result;
}

export async function getFundData(fundCode: string) {
  const result = await ipcRenderer.invoke('get-fund-data', fundCode);
  // console.log('ipcrenderer data>>', result);
  return result;
}

export async function getSearchFundData(queryString: string): Promise<FundSearchResult[]> {
  const result = await ipcRenderer.invoke('search-fund-data', queryString);
  // console.log('result :>> ', result);
  return result;
}
