import { ipcRenderer } from 'electron';

export async function getFundData(fundCode: string) {
  const result = await ipcRenderer.invoke('get-fund-data', fundCode);
  console.log('ipcrenderer data>>', result);
}

export function test() {
  console.log('object');
}
//
