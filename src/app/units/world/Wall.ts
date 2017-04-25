import { GAngle } from '../../shapes/GAngle';
import { GPoint } from '../../shapes/GPoint';
import { GVector } from '../../shapes/GVector';
import { IGroundableUnit } from '../IGroundableUnit';
import { WallConfig } from './WallConfig';
import { GBounds } from '../../shapes/GBounds';
import { Environment } from '../../environment/Environment';
import { Soldier } from '../soldier/Soldier';
import { Unit } from '../Unit';
import { Container } from "pixi.js";
export class Wall extends Unit implements IGroundableUnit {

    private wallContainer: Container;
    private bounds: GBounds;

    constructor(env: Environment, bounds: GBounds) {
        super(env, new WallConfig());
        this.bounds = bounds;
    }

    public getAngle(): GAngle {
        return undefined;
    }

    public getContainer(): Container {
        return this.wallContainer;
    }

    public getGroundBounds(): GBounds {
        return this.bounds;
    }

    public moveBy(vector: GVector): void {
    }

    public updateLogic(delta: number): void {
    }

    public moveTo(point: GPoint): void {

    }

    public destroy(): void { }
}