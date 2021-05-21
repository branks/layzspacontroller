import { useEffect, useState } from 'react';
import { DeviceInfo, DeviceStatus } from '../../../types/types';
import style from './device.module.scss';
import { getDeviceStatus, getOnlineStatus, setDeviceTemp } from '../api';
import cx from 'classnames';

type Props = {
  device: DeviceInfo;
}

type OnlineStatus = 'ONLINE' | 'OFFLINE' | 'UNKNOWN';

const Device = ({ device }: Props) => {
  const [onlineStatus, setOnlineStatus] = useState<OnlineStatus>('UNKNOWN');
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus>();
  const [expanded, setExpanded] = useState<boolean>(false);

  const getStatus = async () => {
    const status = await getDeviceStatus(device.did);
    setDeviceStatus(status);
  }

  const getOnline = async () => {
    const status = await getOnlineStatus(device.did);
    if (!status) {
      setOnlineStatus('OFFLINE');
      return;
    }
    setOnlineStatus('ONLINE');
    await getStatus();
  }

  const setTemp = async (temp: number) => {
    console.log('setting temp', temp);
    await setDeviceTemp(device.did, temp);
    getStatus();
  }

  useEffect(() => {
    getOnline();
  }, []);

  return (
    <div className={cx(style.device, { [style.expanded]: expanded })}>
      <button disabled={onlineStatus === 'UNKNOWN' || !deviceStatus} onClick={() => setExpanded(!expanded)}>
        <div className={style.title}>
          <h3>{device.device_name}</h3>
        </div>
        <div className={style.status}>
          <div>
            <span>Status: {onlineStatus}</span>
          </div>
          {deviceStatus && (
            <>
              <div>
                <span>Current temp: {deviceStatus.temp_now}{deviceStatus.temp_set_unit}</span>
              </div>
              <div>
                <span>Target temp: {deviceStatus.temp_set}{deviceStatus.temp_set_unit}</span>
              </div>
            </>
          )}
        </div>
        <div className={style.expandIndicator}>{expanded ? '^' : 'v'}</div>
      </button>
      <div className={style.deviceBottom}>
        <div className={style.tempSliderWrapper}>
          {/* <input type="range" value={deviceStatus?.temp_set} min={16} max={40} onChange={(e) => { setTemp(+e.currentTarget.value) }} /> */}
        </div>
        <pre>{JSON.stringify(deviceStatus, null, 2)}</pre>
      </div>
    </div>
  )
}

export default Device;
