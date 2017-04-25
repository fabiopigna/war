import { GBounds } from '../shapes/GBounds';
import { IUnitConfig } from './IUnitConfig';
import { Container } from "pixi.js";
export interface IUnit {
    id: string;
    type: string;
    config: IUnitConfig;

    updateLogic(delta: number): void;
    getContainer(): Container;
    destroy(): void;
}