import { DebuggerData } from './DebuggerData';
import * as moment from 'moment'
export enum BrakeMode {
  Coast = 0,
  Brake = 1,
  Hold = 2,
  Invalid = 2147483647,
}
export enum EncoderUnits {
  Degrees = 0,
  Rotations = 1,
  Counts = 2,
  Invalid = 2147483647,
}

export enum MotorFault {
  NoFaults = 0x00,
  OverTemperature = 0x01,
  DriverFault = 0x02,
  OverCurrent = 0x04,
  DriverOverCurrent = 0x08,
}

export enum MotorFlag {
  None = 0x00,
  Busy = 0x01,
  ZeroVelocity = 0x02,
  ZeroPosition = 0x04,
}

export enum Gearset {
  None = 0,
  Red = 100,
  Green = 200,
  Blue = 600,
  Invalid = 2147483647,
}

export enum ZeroPositionFlag {
  Zero = 1,
  NotZero = 0,
}
export interface IMotorDebuggerData extends DebuggerData {
  params: {
    actualVelocity?: number;
    brakeMode?: BrakeMode;
    currentDraw?: number;
    currentLimit?: number;
    direction?: number;
    efficiency?: number;
    encoderUnits?: EncoderUnits;
    faults?: number;
    flags?: number;
    gearing?: Gearset;
    position?: number;
    power?: number;
    targetPosition?: number;
    targetVelocity?: number;
    temperature?: number;
    torque?: number;
    voltage?: number;
    zeroPositionFlag?: ZeroPositionFlag;
  };
}

export interface IHistory { name: string; values: number[][]; }
export interface HistoricParam<T> {
  value: T;
  history: Array<{ time: number, value: T }>;
}
export class MotorDebuggerDataWithHistory implements DebuggerData {
  public id: string;
  public type: string;
  public params: {
    actualVelocity?: HistoricParam<number>;
    brakeMode?: BrakeMode,
    currentDraw?: HistoricParam<number>;
    currentLimit?: number,
    direction?: number,
    efficiency?: HistoricParam<number>;
    encoderUnits?: EncoderUnits,
    faults?: number,
    flags?: number,
    gearing?: Gearset,
    position?: HistoricParam<number>;
    power?: HistoricParam<number>;
    targetPosition?: HistoricParam<number>;
    targetVelocity?: HistoricParam<number>;
    temperature?: number,
    torque?: HistoricParam<number>;
    voltage?: HistoricParam<number>;
    zeroPositionFlag?: ZeroPositionFlag,
  };

  constructor(data: IMotorDebuggerData) {
    this.id = data.id;
    this.type = data.type;
    this.params = {};

    this.addToHistory(data)
  }

  public addToHistory(data: IMotorDebuggerData) {
    // tslint:disable-next-line:forin
    const currentTime = moment.now()
    for (const paramKey in data.params) {
      const incomingParamValue = data.params[paramKey]
      if (!this.params[paramKey]) {
        this.params[paramKey] = {
          value: 0,
          history: []
        } as HistoricParam<any>
      }

      const historicParam = (this.params[paramKey] as HistoricParam<any>);

      historicParam.value = incomingParamValue;
      historicParam.history.push({
        time: currentTime,
        value: incomingParamValue
      })

      if(historicParam.history.length > 200) {
        historicParam.history.shift()
      }
    }
  }
}
