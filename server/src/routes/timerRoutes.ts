import { Request, Response } from 'express';
import { getTimers, getTimer, deleteTimer, createTimer, updateTimer } from '../logic/timers';

export const getTimersRequest = async (req: Request, res: Response) => {
  const did = req.params.did;
  const timers = getTimers(did);
  res.send({ timers });
};

export const updateTimerRequest = async (req: Request, res: Response) => {
  const did = req.params.did;
  const timerId = +req.params.timerId;
  updateTimer(did, timerId, {

  });
  res.send();
};

export const getTimerRequest = async (req: Request, res: Response) => {
  const did = req.params.did;
  const timerId = +req.params.timerId;
  const timer = getTimer(did, timerId);
  res.send({ timer });
};

export const deleteTimerRequest = async (req: Request, res: Response) => {
  const did = req.params.did;
  const timerId = +req.params.timerId;
  deleteTimer(did, timerId);
  res.send();
}

export const createTimerRequest = async (req: Request, res: Response) => {
  const did = req.params.did;
  createTimer(did, {

  });
  res.send();
};
