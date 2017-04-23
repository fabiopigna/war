import { Texture } from 'pixi.js';

export class TurretConfig {
    public type: string = 'turret';
    public textures: Texture[];
    public rotationSpeed: number = 0.2;
    public rotationTollerance: number = 0.2;
    public isHuman: boolean = false;
    public frameNumber: number = 7;
}