import { GBounds } from '../shapes/GBounds';
import { Environment } from '../environment/Environment';
import { Soldier } from './soldier/Soldier';
import { Sprite, Container } from 'pixi.js';
import { getRandomid } from './RandomId';
import { TextureLibrary } from '../graphics/TextureLibrary';
export abstract class Unit extends GBounds {



    public id: string;
    public type: string;
    public canBeHit: boolean;
    public env: Environment;

    constructor(env: Environment, type: string) {
        super();
        this.env = env;
        this.type = type;
        this.canBeHit = true;
        this.id = type + getRandomid();
        this.env.map.set(this.id, this);
    }


    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public getBounds(): GBounds {
        return this;
    }

    public abstract updateLogic(delta: number): void;
    public abstract getContainer(): Container;
    public abstract takeHit(): void;
    public abstract canBeTargetOf(soldier: Soldier): boolean;
}