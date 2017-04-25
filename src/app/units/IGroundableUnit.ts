import { GAngle } from '../shapes/GAngle';
import { GPoint } from '../shapes/GPoint';
import { GVector } from '../shapes/GVector';
import { GBounds } from '../shapes/GBounds';
import { IUnit } from './IUnit';
export interface IGroundableUnit extends IUnit {

    getGroundBounds(): GBounds;
    moveBy(vector: GVector): void;
    moveTo(point: GPoint): void;
    getAngle():GAngle;

}

export class IGroundableUnitTyper {

    public static isGroundableUnit(unit: IUnit): unit is IGroundableUnit {
        return unit.config.isGroundable;
    }
}