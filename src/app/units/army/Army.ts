import { SoldierConfig } from '../soldier/SoldierConfig';
import { GPoint } from '../../shapes/Geometry';
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

    public createSoldiers(total: number): void {
        for (let i = 0; i < total; i++) {
            let soldier: Soldier = new Soldier(this.env, this.config);
            let point: GPoint = new GPoint(Math.random() * this.env.worldBounds.width, Math.random() * this.env.worldBounds.height);
            soldier.setPosition(point.x, point.y);
            soldier.keepInside(this.env.worldBounds);
            soldier.start();
            this.soldiers.push(soldier);
        }
    }
}