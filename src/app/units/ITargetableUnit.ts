import { GBounds } from '../shapes/GBounds';
import { Soldier } from './soldier/Soldier';
import { IUnit } from './IUnit';
export interface ITargetableUnit extends IUnit {

    canBeHit(): boolean;
    takeHit(): void;
    canBeTargetOf(soldier: Soldier): boolean;
    getTargetableBounds():GBounds;

}

export class ITargetableUnitTyper {

    public static isTargetableUnit(unit: IUnit): unit is ITargetableUnit {
        return unit.config.isTargetable;
    }
}