import { TurretConfig } from './TurretConfig';
import { MoveConfig } from '../soldier/movement/MoveConfig';
import { IUnitConfig } from '../IUnitConfig';
import { GVector } from '../../shapes/GVector';
import { Army } from '../army/Army';
import { Texture } from 'pixi.js';

export class TankConfig extends MoveConfig implements IUnitConfig {
    public type: string = 'tank';
    public isGroundable: boolean = true;
    public isTargetable: boolean = true;
    public textures: Texture[];
    public armyKey: string;
    public rotationSpeed: number = 0.2;
    public rotationTollerance: number = 0.2;
    public isHuman: boolean = false;
    public frameNumber: number = 7;
    public turretConfig: TurretConfig;

}