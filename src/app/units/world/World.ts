import { IGroundableUnit, IGroundableUnitTyper } from '../IGroundableUnit';
import { IUnitConfig } from '../IUnitConfig';
import { getRandomid } from '../RandomId';
import { IUnit } from '../IUnit';
import { GBounds } from '../../shapes/GBounds';
import { Wall } from './Wall';
import { Unit } from '../Unit';
import { WorldConfig } from './WorldConfig';
import { Environment } from '../../environment/Environment';
import { Container, Rectangle, interaction } from "pixi.js";
export class World implements IUnit {
    public id: string = 'world' + getRandomid();
    public type: string;
    public config: IUnitConfig;

    private bounds: GBounds;
    private container: Container;
    private env: Environment;

    constructor(env: Environment, config: WorldConfig, container: Container) {
        this.env = env;
        this.config = config;
        this.type = config.type;
        this.bounds = GBounds.from(0, 0, config.width, config.height);
        this.container = container;
        this.container.position.set(0, 0);
        this.container.width = this.bounds.width;
        this.container.height = this.bounds.height;
        this.container.interactive = true;
        this.container.hitArea = new Rectangle(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
        this.container.on('pointerdown', (event: interaction.InteractionEvent) => this.env.selection.onClick(event));
        this.bounds.getSegments().map(bounds => new Wall(this.env, bounds)).forEach(wall => this.env.map.set(wall.id, wall));
        this.env.map.set(this.id, this);
    }

    public getBounds(): GBounds {
        return this.bounds;
    }

    public addUnit(unit: IUnit): void {
        let container = unit.getContainer();
        container.name = unit.id;
        this.container.addChild(container);
        this.env.map.set(unit.id, unit);
    }

    public removeUnit(unit: IUnit): void {
        this.container.removeChild(unit.getContainer());
        this.env.map.delete(unit.id);
    }

    public updateLogic(delta: number): void {

        this.container.children.timsort((d0, d1) => {
            let u0 = this.env.map.get(d0.name);
            let u1 = this.env.map.get(d1.name);
            if (IGroundableUnitTyper.isGroundableUnit(u0) && IGroundableUnitTyper.isGroundableUnit(u1)) {
                return u0.getGroundBounds().bottom - u1.getGroundBounds().bottom;
            }
            return 0;

        });
    }

    public getContainer(): Container {
        return this.container;
    }

    public destroy(): void {

    }

}