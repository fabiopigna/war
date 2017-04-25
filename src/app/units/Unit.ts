import { DebugUnit } from './world/DebugUnit';
import { Subject } from 'rxjs/Rx';
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

    private debugUnit: DebugUnit;


    constructor(env: Environment, config: IUnitConfig) {
        this.env = env;
        this.config = config;
        this.type = config.type;
        this.id = this.type + getRandomid();
        this.env.map.set(this.id, this);
        if (this.env.isDebug) {
            this.debugUnit = new DebugUnit(this.env, this);
        }
    }


    public abstract updateLogic(delta: number): void;
    public abstract getContainer(): Container;

    public destroy(): void {
        if (this.env.isDebug) {
           this.debugUnit.destroy();
        }
    };

}