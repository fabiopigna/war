import { TankConfig } from '../tank/TankConfig';
import { Tank } from '../tank/Tank';
import { GSize } from '../../shapes/GSize';
import { GVector } from '../../shapes/GVector';
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
    public tanks: Tank[];

    constructor(env: Environment) {
        this.env = env;
        this.soldiers = [];
        this.tanks = [];
    }

    public createTanks(total: number, bounds: GBounds, config: TankConfig): void {
        for (let i = 0; i < total; i++) {
            this.env.updateQuadTree();
            let tank: Tank = new Tank(this.env, config);
            do {
                let vector: GVector = new GVector(Math.random() * bounds.width, Math.random() * bounds.height);
                tank.moveTo(bounds.topLeft.plus(vector));
            } while (!this.env.groundableQuadTree.colliding(tank.getGroundBounds(), tank).isEmpty());
            tank.start();
            this.tanks.push(tank);
        }
    }

    public createSoldiers(total: number, bounds: GBounds, config: SoldierConfig): void {
        for (let i = 0; i < total; i++) {
            this.env.updateQuadTree();
            let soldier: Soldier = new Soldier(this.env, config);
            do {
                let vector: GVector = new GVector(Math.random() * bounds.width, Math.random() * bounds.height);
                soldier.moveTo(bounds.topLeft.plus(vector));
            } while (!this.env.groundableQuadTree.colliding(soldier.getGroundBounds(), soldier).isEmpty());
            soldier.start();
            this.soldiers.push(soldier);
        }
    }
}