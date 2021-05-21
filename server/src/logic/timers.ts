import { getConfig, updateConfig} from '../config';
import { Timer, TimerMap, Week, Day } from '../../../types/types';
import { getAccountInfo } from './api';

const DAYS_OF_WEEK: Week = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

export const getTimers = (did?: string): TimerMap => {
  const config = getConfig();
  return config.devices[did].timers;
};

const getTime = (): { day: Day; hour: Timer['hour']; minute: Timer['minute'] } => {
  const time = new Date();
  return {
    hour: time.getHours(),
    minute: time.getMinutes(),
    day: DAYS_OF_WEEK[time.getDay() - 1],
  }
}

const doTimer = (timer: Timer) => {
 // TODO
}

export const checkTimers = async () => {
  const info = await getAccountInfo();
  const time = getTime();

  info.devices.forEach((device) => {
    const timers = getTimers(device.did);
    Object.values(timers).forEach((timer) => {
      if (timer.day.includes(time.day)) {
        doTimer(timer);
      }
    })
  })
};

export const updateTimer = (did: string, timerId: number, newTimer: Timer) => {
  const config = getConfig();
  config.devices[did].timers[timerId] = newTimer;
  updateConfig(config);
};

export const getTimer = (did: string, timerId: number) => {
  const config = getConfig();
  return config.devices[did].timers[timerId];
};

export const createTimer = (did: string, timer: Timer) => {
  const deviceArray = getTimers(did);
  const sorted = Object.keys(deviceArray).map(x => +x).sort();
  let newId: number;
  if (sorted.length) {
    newId = sorted[sorted.length - 1] + 1;
  } else {
    newId = 0;
  }

  const config = getConfig();
  config.devices[did].timers[newId] = timer;
  updateConfig(config);
};

export const deleteTimer = (did: string, timerId: number) => {
  const config = getConfig();
  delete config.devices[did].timers[timerId];
  updateConfig(config);
}
