import { Environment } from '../../environment/Environment';
import { ITargetableUnit, ITargetableUnitTyper } from '../ITargetableUnit';
import { Graphics } from 'pixi.js';
import { GBounds } from '../../shapes/GBounds';
import { IGroundableUnit, IGroundableUnitTyper } from '../IGroundableUnit';
import { IUnit } from '../IUnit';
export class DebugUnit {

    env: Environment;
    unit: IUnit;
    targetRect: Graphics;
    groundRect: Graphics;


    constructor(env: Environment, unit: IUnit) {
        this.env = env;
        this.unit = unit;
        this.env.debug.map.set(this.unit.id, this);
    }

    public destroy(): void {
        this.env.debug.container.removeChild(this.groundRect);
        this.env.debug.container.removeChild(this.targetRect);
        this.env.debug.map.delete(this.unit.id);
    }

    public updateLogic(): void {

        if (IGroundableUnitTyper.isGroundableUnit(this.unit)) {
            this.checkGround(this.unit);
            let bounds: GBounds = this.unit.getGroundBounds();
            this.groundRect.position.set(bounds.x, bounds.y);
        }

        if (ITargetableUnitTyper.isTargetableUnit(this.unit)) {
            this.checkTarget(this.unit);
            let bounds: GBounds = this.unit.getTargetableBounds();
            this.targetRect.position.set(bounds.x, bounds.y);
        }
    }

    private checkGround(g: IGroundableUnit): void {
        if (!this.groundRect) {
            this.groundRect = new Graphics();
            this.env.debug.container.addChild(this.groundRect);
            let bounds: GBounds = g.getGroundBounds();
            this.groundRect.lineStyle(1, 0xff0000, 0.5);
            this.groundRect.drawRect(0, 0, bounds.width, bounds.height);
        }
    }

    private checkTarget(t: ITargetableUnit): void {
        if (!this.targetRect) {
            this.targetRect = new Graphics();
            this.env.debug.container.addChild(this.targetRect);
            let bounds: GBounds = t.getTargetableBounds();
            this.targetRect.lineStyle(1, 0x0000ff, 0.5);
            this.targetRect.drawRect(0, 0, bounds.width, bounds.height);
        }
    }
}