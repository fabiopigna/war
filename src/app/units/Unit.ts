import { Sprite, Container } from 'pixi.js';
import { GBounds } from '../shapes/Geometry';
import { Environment } from '../Environment';
import { getRandomid } from './RandomId';
import { TextureLibrary } from '../graphics/TextureLibrary';
export abstract class Unit extends GBounds {



    public id: string;
    public type: string;
    public canBeHit: boolean;


    constructor(public env: Environment, type: string) {
        super();
        this.type = type;
        this.canBeHit = true;
        this.id = type + getRandomid();
        this.env.map.set(this.id, this);
    }


    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public abstract updateLogic(delta: number): void;
    public abstract getContainer(): Container;
    public abstract takeHit():void;
}