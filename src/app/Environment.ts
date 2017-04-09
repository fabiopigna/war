import { NewQuadTree } from './NewQuadTree';
import { GBounds, GSize } from './shapes/Geometry';
import { Unit } from './units/Unit';
import { Container } from 'pixi.js';
import { TextureLibrary } from './graphics/TextureLibrary';
export class Environment {

    public stage: Container;
    public quadTree: NewQuadTree<Unit>;
    public worldBounds: GBounds;

    constructor(public map: Map<string, Unit>, public textureLibrary: TextureLibrary) {

    }


    public addUnit(unit: Unit): void {
        this.stage.addChild(unit.getContainer());
        this.map.set(unit.id, unit);
    }

    public removeUnit(unit: Unit): void {
        this.stage.removeChild(unit.getContainer());
        this.map.delete(unit.id);
    }
}

export let noop: () => {};