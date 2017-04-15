import { GBounds } from '../../shapes/GBounds';
import { Wall } from './Wall';
import { Unit } from '../Unit';
import { WorldConfig } from './WorldConfig';
import { Environment } from '../../environment/Environment';
import { Container, Rectangle, interaction } from "pixi.js";
export class World extends GBounds {

    private bounds: GBounds;
    private container: Container;
    private env: Environment;

    constructor(env: Environment, config: WorldConfig, container: Container) {
        super();
        this.env = env;

        this.x = 0;
        this.y = 0;
        this.width = config.width;
        this.height = config.height;

        this.container = container;
        this.container.position.set(0, 0);
        this.container.width = this.width;
        this.container.height = this.height;
        this.container.interactive = true;
        this.container.hitArea = new Rectangle(this.x, this.y, this.width, this.height);
        this.container.on('pointerdown', (event: interaction.InteractionEvent) => this.env.selection.onClick(event));
        this.getSegments().map(bounds => new Wall(this.env, bounds)).forEach(wall => this.env.map.set(wall.id, wall));

    }

    public addUnit(unit: Unit): void {
        this.container.addChild(unit.getContainer());
        this.env.map.set(unit.id, unit);
    }

    public removeUnit(unit: Unit): void {
        this.container.removeChild(unit.getContainer());
        this.env.map.delete(unit.id);
    }

}