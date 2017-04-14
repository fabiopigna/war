import { SoldierConfig } from '../soldier/SoldierConfig';
import { GBounds, GPoint } from '../../shapes/Geometry';
import { Environment } from '../../Environment';
import { Unit } from '../Unit';
import { getRandomid } from '../RandomId';
import { TextureLibrary } from '../../graphics/TextureLibrary';
import { Soldier } from '../soldier/Soldier';
export class Army {

    public env: Environment
    public soldiers: Soldier[];
    public config: SoldierConfig;

    constructor(env: Environment, config: SoldierConfig) {
        this.env = env;
        this.soldiers = [];
        this.config = config;
    }

    public createSoldiers(total: number, bounds: GBounds): void {
        for (let i = 0; i < total; i++) {
            let soldier: Soldier = new Soldier(this.env, this.config);
            let point: GPoint = new GPoint(Math.random() * bounds.width, Math.random() * bounds.height);
            soldier.setPosition(bounds.x + point.x, bounds.y + point.y);
            soldier.keepInside(this.env.worldBounds);
            soldier.start();
            this.soldiers.push(soldier);
        }
    }
}