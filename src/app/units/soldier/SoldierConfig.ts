import { IUnitConfig } from '../IUnitConfig';
import { MoveConfig } from './movement/MoveConfig';
import { GVector } from '../../shapes/GVector';
import { Army } from '../army/Army';
import { Texture } from 'pixi.js';

export class SoldierConfig extends MoveConfig implements IUnitConfig {
    public type: string = 'soldier';
    public isGroundable: boolean = true;
    public isTargetable: boolean = true;
    public textures: Texture[];
    public armyKey: string;
    public rotationSpeed: number = 0.2;
    public rotationTollerance:number = 0.2;
    public isHuman: boolean = false;
    public frameNumber: number = 24;

}