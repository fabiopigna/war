import { IUnit } from './IUnit';
export interface IGroundableUnit extends IUnit {


}

export class IGroundableUnitTyper {

    public static isGroundableUnit(unit: IUnit): unit is IGroundableUnit {
        return unit.config.isGroundable;
    }
}