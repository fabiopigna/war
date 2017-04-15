import { World } from '../units/world/World';
import { EnvironmentConfig } from './EnvironmentConfig';
import { TextureLibrary } from '../graphics/TextureLibrary';
import { Unit } from '../units/Unit';
import { NewQuadTree } from '../NewQuadTree';
import { Container, Application, interaction, Rectangle } from 'pixi.js';
import { UnitSelection } from "app/environment/UnitSelection";

export class Environment {

    public stage: Container;
    public quadTree: NewQuadTree<Unit>;
    public selection: UnitSelection;
    public map: Map<string, Unit>
    public textureLibrary: TextureLibrary;
    public world: World;

    constructor(map: Map<string, Unit>, textureLibrary: TextureLibrary) {
        this.map = map;
        this.textureLibrary = textureLibrary;
        this.selection = new UnitSelection();
    }

    public updateQuadTree(): void {
        this.quadTree = new NewQuadTree<Unit>(this.world, 10);
        this.quadTree.insert(Array.from<Unit>(this.map.values()).filter(unit => unit.canBeHit));
    }

}

export let noop: () => {};