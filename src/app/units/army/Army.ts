import { GPoint } from '../../shapes/GPoint';
import { GBounds } from '../../shapes/GBounds';
import { Environment } from '../../environment/Environment';
import { SoldierConfig } from '../soldier/SoldierConfig';
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
            this.env.updateQuadTree();
            let soldier: Soldier = new Soldier(this.env, this.config);
            do {
                let point: GPoint = new GPoint(Math.random() * bounds.width, Math.random() * bounds.height);
                soldier.setPosition(bounds.x + point.x, bounds.y + point.y);
            } while (!this.env.groundableQuadTree.colliding(soldier.getBounds(), soldier).isEmpty());
            soldier.start();
            this.soldiers.push(soldier);
        }
    }
}