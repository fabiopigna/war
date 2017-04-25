import { Container } from 'pixi.js';
import { IUnit } from '../../IUnit';
export class DeathLogic {

    private unit: IUnit;

    constructor(unit: IUnit) {
        this.unit = unit;
    }

    public updateLogic(delta: number): void {
        let container: Container = this.unit.getContainer();
        container.pivot.set(container.width * 0.5, container.height);
        container.position.set(container.x + container.width * 0.5, container.y + container.height);
        if (container.rotation >= -Math.PI * 0.5) {
            container.rotation -= 0.1;
        } else {
            this.unit.destroy();
        }
        return;
    }
}