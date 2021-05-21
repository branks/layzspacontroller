import axios from 'axios';
import { DeviceInfo, DeviceStatus, OnlineStatus } from '../../../types/types';

export const getAccountInfo = async (): Promise<DeviceInfo[]> => {
  const accountInfo = await axios.get('http://localhost:3000/api/info');
  return accountInfo.data as DeviceInfo[];
}

export const getOnlineStatus = async (did: string): Promise<any> => {
  const onlineState = await axios.get(`http://localhost:3000/api/device/${did}/online`);
  return onlineState.data.data as OnlineStatus;
}

export const getDeviceStatus = async (did: string): Promise<any> => {
  const accountInfo = await axios.get(`http://localhost:3000/api/device/${did}/status`);
  return accountInfo.data as DeviceStatus;
}

export const setDeviceTemp = async (did: string, temp: number): Promise<void> => {
  await axios.post(`http://localhost:3000/api/device/${did}/setTemp`, { temp });
}
