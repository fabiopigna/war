import { Environment } from '../../../environment/Environment';
import { GAngle } from '../../../shapes/GAngle';
import { GBounds } from '../../../shapes/GBounds';
import { GPoint } from '../../../shapes/GPoint';
import { GVector } from '../../../shapes/GVector';
import { IUnit } from '../../IUnit';
import { Unit } from '../../Unit';
import { IMoveLogic } from './IMoveLogic';
import { MoveConfig } from './MoveConfig';
export class RandomMoveLogic implements IMoveLogic {


    private unit: IUnit;
    private env: Environment;
    private angle: GAngle;
    private speed: GVector;

    constructor(env: Environment, unit: IUnit, config: MoveConfig) {
        this.env = env;
        this.unit = unit;
        this.speed = config.defaultSpeed;
        this.angle = new GAngle(Math.random() * 2 * Math.PI);
    }


    public updateLogic(delta: number): void {
        let velocity: GVector = this.angle.mul(this.speed);
        let maybeBounds: GBounds = this.unit.getBounds().copy().sum(velocity);
        let collision: IUnit[] = this.env.groundableQuadTree.colliding(maybeBounds, this.unit);
        if (collision.isEmpty()) {
            this.unit.getBounds().sum(velocity);
        } else {
            this.angle = new GAngle(Math.random() * 2 * Math.PI);
        }
    }

    public setTarget(point: GPoint): void {
        // do nothings
    }
}