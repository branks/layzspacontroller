export type DeviceInfo = {
  id: number;
  did: string;
  device_name: string
}

export type DeviceStatus = {
  power: number;
  temp_set_unit: '摄氏' | '华氏' | 'C' | 'F';
  temp_now: number;
  wave_power: number;
  locked: number;
  filter_power: number;
  temp_set: number;
  heat_temp_reach: number;
  heat_power: number;
}

export type OnlineStatus = boolean;

export type AuthInfo = {
  api_token: string,
}

export type DeviceInfoRequest = {
  data: AuthInfo;
  devices: DeviceInfo[];
}

export type DeviceStatusRequest = {
  data: {
    attr: DeviceStatus;
  };
};

export type TubAction = 'temp_set' | 'status' | 'is_online';

export type SetTempRequest = {
  temp: number;
}

type Day = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export type Week = Day[];

export type Timer = {
  temp?: number;
  wave?: boolean;
  heat?: boolean;
  filter?: boolean;
  day?: Week;
  hour?: number;
  minute?: number;
}

export type TimerMap = { [key: number]: Timer };

export type Config = {
  devices?: {
    [did: string]: {
      timers: TimerMap;
    }
  }
}
