import { GBounds } from '../../shapes/GBounds';
import { Environment } from '../../environment/Environment';
import { Soldier } from '../soldier/Soldier';
import { Unit } from '../Unit';
import { Container } from "pixi.js";
export class Wall extends Unit {

    private wallContainer: Container;

    constructor(env: Environment, bounds: GBounds) {
        super(env, 'wall');
        this.x = bounds.x;
        this.y = bounds.y;
        this.width = bounds.width;
        this.height = bounds.height;
    }

    public updateLogic(delta: number): void {
    }

    public getContainer(): Container {
        return this.wallContainer;
    }

    public takeHit(): void {
    }

    public canBeTargetOf(soldier: Soldier): boolean {
        return false;
    }
}