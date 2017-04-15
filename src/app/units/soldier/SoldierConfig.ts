import { MoveConfig } from './movement/MoveConfig';
import { GVector } from '../../shapes/GVector';
import { Army } from '../army/Army';
import { Texture } from 'pixi.js';

export class SoldierConfig extends MoveConfig{
    public textures: Texture[];
    public armyKey: string;
    public rotationSpeed: number = 0.2;
    public isHuman: boolean = false;


}