import { WallConfig } from './WallConfig';
import { GBounds } from '../../shapes/GBounds';
import { Environment } from '../../environment/Environment';
import { Soldier } from '../soldier/Soldier';
import { Unit } from '../Unit';
import { Container } from "pixi.js";
export class Wall extends Unit {

    private wallContainer: Container;

    constructor(env: Environment, bounds: GBounds) {
        super(env, new WallConfig());
        this.bounds = bounds;
    }

    public updateLogic(delta: number): void {
    }

    public getContainer(): Container {
        return this.wallContainer;
    }

}