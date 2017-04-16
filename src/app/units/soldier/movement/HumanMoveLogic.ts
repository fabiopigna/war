import { Environment } from '../../../environment/Environment';
import { GAngle } from '../../../shapes/GAngle';
import { GBounds } from '../../../shapes/GBounds';
import { GPoint } from '../../../shapes/GPoint';
import { GVector } from '../../../shapes/GVector';
import { IGroundableUnit } from '../../IGroundableUnit';
import { IUnit } from '../../IUnit';
import { IMoveLogic } from './IMoveLogic';
import { MoveConfig } from './MoveConfig';
export class HumanMoveLogic implements IMoveLogic {


    private unit: IGroundableUnit;
    private env: Environment;
    private angle: GAngle;
    private speed: GVector;
    private target: GPoint;
    private config: MoveConfig;

    constructor(env: Environment, unit: IGroundableUnit, moveConfig: MoveConfig) {
        this.env = env;
        this.unit = unit;
        this.config = moveConfig;
        this.speed = moveConfig.defaultSpeed;
        this.angle = new GAngle(0);
    }

    public updateLogic(delta: number): void {
        if (this.isArrived()) return;
        let velocity: GVector = this.angle.mul(this.speed);
        let maybeBounds: GBounds = this.unit.getGroundBounds().copy().sum(velocity);
        let collision: IUnit[] = this.env.groundableQuadTree.colliding(maybeBounds, this.unit);
        if (collision.isEmpty()) {
            this.unit.moveBy(velocity);
        }
    }

    public setTarget(point: GPoint): void {
        this.target = point;
        this.angle = GAngle.from(this.unit.getGroundBounds().bottomCenter, this.target);
    }

    private isArrived(): boolean {
        return !this.target || this.target.isClose(this.unit.getGroundBounds().bottomCenter, this.config.tollerance)
    }



}