import { SpriteConfig } from '../../graphics/SpriteConfig';
import { IUnitConfig } from '../IUnitConfig';
import { MoveConfig } from './movement/MoveConfig';
import { GVector } from '../../shapes/GVector';
import { Army } from '../army/Army';
import { Texture } from 'pixi.js';

export class SoldierConfig extends MoveConfig implements IUnitConfig {
    public type: string = 'soldier';
    public isGroundable: boolean = true;
    public isTargetable: boolean = true;
    public spriteConfig: SpriteConfig;
    public armyKey: string;
    public isHuman: boolean = false;
    public frameNumber: number = 24;

}