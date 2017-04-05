import { Environment } from '../../Environment';
import { Unit } from '../Unit';
import { getRandomid } from '../RandomId';
import { TextureLibrary } from '../../graphics/TextureLibrary';
import { Soldier } from '../soldier/Soldier';
export class Army {

    public env: Environment
    public soldiers: Soldier[];

    constructor(env: Environment) {
        this.env = env;
        this.soldiers = [];
    }

    public createSoldiers(total: number): void {
        for (let i = 0; i < total; i++) {
            let soldier: Soldier = new Soldier(this.env);
            soldier.setPosition(Math.random() * this.env.worldBounds.width, Math.random() * this.env.worldBounds.height);
            soldier.start();
            this.soldiers.push(soldier);
        }
    }
}