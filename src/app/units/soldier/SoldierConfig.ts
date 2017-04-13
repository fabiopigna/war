import { Army } from '../army/Army';
import { Texture } from 'pixi.js';

export class SoldierConfig {
    public textures: Texture[];
    public armyKey: string;
    public rotationSpeed: number = 0.2;
}