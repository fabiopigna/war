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
    private speed: GVector;
    private targetPoint: GPoint;
    private config: MoveConfig;

    private targetAngle: GAngle;
    private moveStep: number;

    constructor(env: Environment, unit: IGroundableUnit, moveConfig: MoveConfig) {
        this.env = env;
        this.unit = unit;
        this.config = moveConfig;
        this.speed = moveConfig.defaultSpeed;
        this.moveStep = 0;
    }

    public updateLogic(delta: number): void {
        if (this.isArrived()) {
            this.moveStep = 0;
            return;
        };
        let targetAngle: GAngle = GAngle.from(this.unit.getGroundBounds().bottomCenter, this.targetPoint);
        this.unit.getAngle().rotateTo(targetAngle, this.config.rotationSpeed);
        if (this.unit.getAngle().isClose(targetAngle, this.config.rotationTollerance)) {
            let velocity: GVector = this.unit.getAngle().mul(this.speed);
            let maybeBounds: GBounds = this.unit.getGroundBounds().copy().sum(velocity);
            let collision: IUnit[] = this.env.groundableQuadTree.colliding(maybeBounds, this.unit);
            if (collision.isEmpty()) {
                this.unit.moveBy(velocity);
                this.moveStep = this.moveStep+0.15;
            }
        }
    }

    public setTarget(point: GPoint): void {
        this.targetPoint = point;
    }

    public getMoveStep(): number {
        return Math.floor(this.moveStep % 5);
    }

    private isArrived(): boolean {
        return !this.targetPoint || this.targetPoint.isClose(this.unit.getGroundBounds().bottomCenter, this.config.tollerance);
    }
}