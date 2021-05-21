import { useEffect, useState } from 'react';
import { getAccountInfo } from './api';
import { DeviceInfo } from '../../types/types';
import Device from './device/device';
import styles from './app.module.scss';

const App = () => {
  const [devices, setDevices] = useState<DeviceInfo[]>([]);
  const [refresh, setLatestRefresh] = useState<number>(0);

  const get = async () => {
    const info = await getAccountInfo();
    setDevices(info);
  };

  useEffect(() => {
    get();
  }, [refresh]);

  return (
    <div className={styles.deviceListWrapper}>
      <div className={styles.topBar}>
        <h1 className={styles.header}>My Tubs</h1>
        <div>
          <button onClick={() => setLatestRefresh(refresh + 1)}>Refresh</button>
        </div>
      </div>
      <div>
        {devices.map((device: DeviceInfo) => (
          <Device
            key={`${device.did}_${refresh}`}
            device={device}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
