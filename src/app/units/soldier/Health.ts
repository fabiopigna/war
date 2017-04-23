import { Environment } from '../../environment/Environment';
import { IUnit } from '../IUnit';
import { Container, Graphics } from 'pixi.js';
export class Health {

    private healthBar: Container;
    private outerBar: Graphics;
    private maxLife: number = 50;
    private life: number = this.maxLife;

    constructor(env: Environment, unit: IUnit) {
        this.healthBar = new Container();
        this.healthBar.position.set(0, -2);
        this.outerBar = new Graphics();
        this.outerBar.beginFill(0x993300);
        this.outerBar.drawRect(8, 0, 16, 2);
        this.outerBar.endFill();
        this.healthBar.addChild(this.outerBar);
        unit.getContainer().addChild(this.healthBar);

    }

    public decrease(value: number): void {
        if (this.life > 0) {
            this.life -= value;
            this.outerBar.width = (this.life / this.maxLife) * 16;
        }
    }

    public isDead(): boolean {
        return this.life <= 0;
    }
}