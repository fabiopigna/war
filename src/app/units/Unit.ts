import { IUnitConfig } from './IUnitConfig';
import { IUnit } from './IUnit';
import { GBounds } from '../shapes/GBounds';
import { Environment } from '../environment/Environment';
import { Soldier } from './soldier/Soldier';
import { Sprite, Container } from 'pixi.js';
import { getRandomid } from './RandomId';
import { TextureLibrary } from '../graphics/TextureLibrary';
export abstract class Unit implements IUnit {


    public id: string;
    public type: string;
    public env: Environment;
    public config: IUnitConfig;

    constructor(env: Environment, config: IUnitConfig) {
        this.env = env;
        this.config = config;
        this.type = config.type;
        this.id = this.type + getRandomid();
        this.env.map.set(this.id, this);
    }


    public abstract updateLogic(delta: number): void;
    public abstract getContainer(): Container;

}