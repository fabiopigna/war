import { Texture } from 'pixi.js';

export class SpriteConfig {

    public body: Texture[] = [];
    public outerWidth: number;
    public outerHeight: number;
    public innerWidth: number;
    public innerHeight: number;

    public rotationFramesPath: string;
    public rotationFrames: number = 0;
    public moveFramesPath: string;
    public moveFrames: number;


    constructor(outerWidth: number, outerHeight: number, innerWidth: number, innerHeight: number) {
        this.outerWidth = outerWidth;
        this.outerHeight = outerHeight;
        this.innerWidth = innerWidth;
        this.innerHeight = innerHeight;
    }
}