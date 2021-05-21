import { Request, Response } from 'express';
import { getAccountInfo, doAction } from '../logic/api';
import { checkParams, cleanDeviceInfo, cleanDeviceStatus } from '../utils';
import { SetTempRequest, DeviceInfo, DeviceStatusRequest } from '../../../types/types'

export const getInfo = async (req: Request, res: Response) => {
  const accountInfo = await getAccountInfo();
  const devices: DeviceInfo[] = accountInfo.devices.map(cleanDeviceInfo);
  res.send(devices);
};

export const getOnlineStatus = async (req: Request, res: Response) => {
  const accountInfo = await getAccountInfo();
  const did = req.params.did;
  const actionResp = await doAction('is_online', did, accountInfo.data.api_token);
  res.send(actionResp);
}

export const getStatus = async (req: Request, res: Response) => {
  const did = req.params.did;
  const accountInfo = await getAccountInfo();
  const actionResp = await doAction('status', did, accountInfo.data.api_token) as DeviceStatusRequest;
  res.send(cleanDeviceStatus(actionResp.data.attr));
};

export const setTemp = async (req: Request, res: Response) => {
  const did = req.params.did;
  const check = checkParams(req);
  try {
    check('temp');
  } catch (e) {
    res.status(422);
    res.send({
      status: 422,
      message: e.msg,
    });
  }
  const body = req.body as SetTempRequest;

  const accountInfo = await getAccountInfo();
  await doAction('temp_set', did, accountInfo.data.api_token, `&temperature=${body.temp}`);
  res.send('Ok!');
};
