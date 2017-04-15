import { GPoint } from '../../../shapes/GPoint';
export interface IMoveLogic {
    setTarget(point: GPoint): void;
    updateLogic(delta: number): void;
}