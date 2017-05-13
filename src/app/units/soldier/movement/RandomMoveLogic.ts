import { IGroundableUnit } from '../../IGroundableUnit';
import { Environment } from '../../../environment/Environment';
import { GAngle } from '../../../shapes/GAngle';
import { GBounds } from '../../../shapes/GBounds';
import { GPoint } from '../../../shapes/GPoint';
import { GVector } from '../../../shapes/GVector';
import { IUnit } from '../../IUnit';
import { IMoveLogic } from './IMoveLogic';
import { MoveConfig } from './MoveConfig';
export class RandomMoveLogic implements IMoveLogic {

    private unit: IGroundableUnit;
    private env: Environment;
    private config: MoveConfig;

    private targetAngle: GAngle;

    constructor(env: Environment, unit: IGroundableUnit, config: MoveConfig) {
        this.env = env;
        this.unit = unit;
        this.config = config;
        this.targetAngle = new GAngle(Math.random() * 2 * Math.PI);
    }

    public updateLogic(delta: number): void {
        let velocity: GVector = this.targetAngle.mul(this.config.defaultSpeed);
        let maybeBounds: GBounds = this.unit.getGroundBounds().copy().sum(velocity);
        let collision: IUnit[] = this.env.groundableQuadTree.colliding(maybeBounds, this.unit);
        if (collision.isEmpty()) {
            this.unit.getAngle().rotateTo(this.targetAngle, this.config.rotationSpeed);
            if (this.unit.getAngle().isClose(this.targetAngle, this.config.rotationTollerance)) {
                this.unit.moveBy(velocity);
            }
        } else {
            this.targetAngle = new GAngle(Math.random() * 2 * Math.PI);
        }
    }


    public setTarget(point: GPoint): void {
        // do nothings
    }

    public getMoveStep(): number {
       return 0;
    }
}