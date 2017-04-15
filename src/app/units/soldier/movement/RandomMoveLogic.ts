import { MoveConfig } from './MoveConfig';
import { GPoint } from '../../../shapes/GPoint';
import { GBounds } from '../../../shapes/GBounds';
import { GAngle } from '../../../shapes/GAngle';
import { Environment } from '../../../environment/Environment';
import { Unit } from '../../Unit';
import { GVector } from '../../../shapes/GVector';
import { IMoveLogic } from './IMoveLogic';
export class RandomMoveLogic implements IMoveLogic {


    private unit: Unit;
    private env: Environment;
    private angle: GAngle;
    private speed: GVector;

    constructor(env: Environment, unit: Unit, config: MoveConfig) {
        this.env = env;
        this.unit = unit;
        this.speed = config.defaultSpeed;
        this.angle = new GAngle(Math.random() * 2 * Math.PI);
    }


    public updateLogic(delta: number): void {
        let velocity: GVector = this.angle.mul(this.speed);
        let maybeBounds: GBounds = this.unit.getBounds().copy().sum(velocity);
        let collision: Unit[] = this.env.quadTree.colliding(maybeBounds, this.unit);
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