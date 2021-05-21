import fetch from 'node-fetch';
import {
  AuthInfo, DeviceInfo, DeviceInfoRequest,
  TubAction, OnlineStatus, DeviceStatusRequest,
} from '../../../types/types';

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;
const AUTH_STRING = `email=${encodeURIComponent(EMAIL)}&password=${encodeURIComponent(PASSWORD)}`

export const getAccountInfo = async (): Promise<DeviceInfoRequest> => {
  const authResponse = await fetch('https://mobileapi.lay-z-spa.co.uk/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: AUTH_STRING,
  });

  if (authResponse.ok) {
    const json = await authResponse.json();
    const info = json as DeviceInfoRequest;
    return info;
  } else {
    console.error('Could not auth the user');
  }
}

export const doAction = async (action: TubAction, did: DeviceInfo['did'], apiToken: AuthInfo['api_token'], extraString?: string): Promise<DeviceInfo | OnlineStatus | DeviceStatusRequest> => {
  const authString = `did=${did}&api_token=${apiToken}`;

  const authResponse = await fetch(`https://mobileapi.lay-z-spa.co.uk/v1/gizwits/${action}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `${authString}${extraString ? `&${extraString}` : ''}`,
  });

  if (authResponse.ok) {
    const json = await authResponse.json();
    const info = json as DeviceInfo | OnlineStatus | DeviceStatusRequest;
    return info;
  } else {
    console.error('Could not auth the user');
  }
}
