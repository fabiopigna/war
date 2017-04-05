import { GBounds, GSize } from './shapes/Geometry';
import { Unit } from './units/Unit';
import { Container } from 'pixi.js';
import { TextureLibrary } from './graphics/TextureLibrary';
import * as Quadtree from 'quadtree-lib';
export class Environment {

    public stage: Container;
    public quadTree: Quadtree<Unit>;
    public worldBounds: GBounds;

    constructor(public map: Map<string, Unit>, public textureLibrary: TextureLibrary) {

    }


    public addUnit(unit: Unit): void {
        this.stage.addChild(unit.getContainer());
        this.map.set(unit.id, unit);
        if (unit.canBeHit) {
            this.quadTree.push(unit, true);
        }
    }

    public removeUnit(unit: Unit): void {
        this.stage.removeChild(unit.getContainer());
        this.map.delete(unit.id);
        if (unit.canBeHit) {
            this.quadTree.remove(unit);
        }
    }
}

export let noop: () => {};