import { TextureLibrary } from '../graphics/TextureLibrary';
import { Unit } from '../units/Unit';
import { GBounds } from '../shapes/Geometry';
import { NewQuadTree } from '../NewQuadTree';
import { Container } from 'pixi.js';
import { UnitSelection } from "app/environment/UnitSelection";

export class Environment {

    public stage: Container;
    public quadTree: NewQuadTree<Unit>;
    public worldBounds: GBounds;
    public selection: UnitSelection;

    constructor(public map: Map<string, Unit>, public textureLibrary: TextureLibrary) {
        this.selection = new UnitSelection();
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