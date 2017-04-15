import { GPoint } from '../../../shapes/GPoint';
import { GBounds } from '../../../shapes/GBounds';
import { MoveConfig } from './MoveConfig';
import { GVector } from '../../../shapes/GVector';
import { GAngle } from '../../../shapes/GAngle';
import { Environment } from '../../../environment/Environment';
import { Unit } from '../../Unit';
import { IMoveLogic } from './IMoveLogic';
export class HumanMoveLogic implements IMoveLogic {


    private unit: Unit;
    private env: Environment;
    private angle: GAngle;
    private speed: GVector;
    private target: GPoint;
    private config: MoveConfig;

    constructor(env: Environment, unit: Unit, moveConfig: MoveConfig) {
        this.env = env;
        this.unit = unit;
        this.config = moveConfig;
        this.speed = moveConfig.defaultSpeed;
        this.angle = new GAngle(0);
    }

    public updateLogic(delta: number): void {
        if (this.isArrived()) return;
        let velocity: GVector = this.angle.mul(this.speed);
        let maybeBounds: GBounds = this.unit.getBounds().copy().sum(velocity);
        let collision: Unit[] = this.env.quadTree.colliding(maybeBounds, this.unit);
        if (collision.isEmpty()) {
            this.unit.getBounds().sum(velocity);
        }
    }

    public setTarget(point: GPoint): void {
        this.target = point;
        this.angle = GAngle.from(this.unit.bottomCenter, this.target);
    }

    private isArrived(): boolean {
        return !this.target || this.target.isClose(this.unit.bottomCenter, this.config.tollerance)
    }



}