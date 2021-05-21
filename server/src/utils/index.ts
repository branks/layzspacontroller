import { Request } from 'express';
import { DeviceStatus, DeviceInfo } from '../../../types/types';

export const checkParams = (req: Request) => (key: string) => {
  if (!req.body[key]) {
    throw new Error(`Missing ${key}`);
  }
}

export const cleanDeviceInfo = (info: DeviceInfo): DeviceInfo => ({
  device_name: info.device_name,
  did: info.did,
  id: info.id,
});

export const cleanDeviceStatus = (status: DeviceStatus) : DeviceStatus => ({
  filter_power: status.filter_power,
  heat_power: status.heat_power,
  heat_temp_reach: status.heat_temp_reach,
  locked: status.locked,
  power: status.power,
  temp_now: status.temp_now,
  temp_set: status.temp_set,
  temp_set_unit: status.temp_set_unit === '摄氏' ? 'C' : (status.temp_set_unit === '华氏' ? 'F' : status.temp_set_unit),
  wave_power: status.wave_power,
});
