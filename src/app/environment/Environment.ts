import { ITargetableUnit, ITargetableUnitTyper } from '../units/ITargetableUnit';
import { IGroundableUnit, IGroundableUnitTyper } from '../units/IGroundableUnit';
import { IUnit } from '../units/IUnit';
import { World } from '../units/world/World';
import { EnvironmentConfig } from './EnvironmentConfig';
import { TextureLibrary } from '../graphics/TextureLibrary';
import { Unit } from '../units/Unit';
import { NewQuadTree } from '../NewQuadTree';
import { Container, Application, interaction, Rectangle } from 'pixi.js';
import { UnitSelection } from "app/environment/UnitSelection";

export class Environment {

    public stage: Container;
    public groundableQuadTree: NewQuadTree<IGroundableUnit>;
    public targetableQuadTree: NewQuadTree<ITargetableUnit>;
    public selection: UnitSelection;
    public map: Map<string, IUnit>
    public textureLibrary: TextureLibrary;
    public world: World;

    constructor(map: Map<string, IUnit>, textureLibrary: TextureLibrary) {
        this.map = map;
        this.textureLibrary = textureLibrary;
        this.selection = new UnitSelection();
    }

    public updateQuadTree(): void {
        let units: IUnit[] = Array.from(this.map.values());
        
        let targetables: ITargetableUnit[] = units.reduce((result, unit) => result.concat(ITargetableUnitTyper.isTargetableUnit(unit) ? [unit] : []), []);
        this.targetableQuadTree = new NewQuadTree<ITargetableUnit>(this.world.getBounds(), 10);
        this.targetableQuadTree.insert(targetables);

        let groundables: IGroundableUnit[] = units.reduce((result, unit) => result.concat(IGroundableUnitTyper.isGroundableUnit(unit) ? [unit] : []), []);
        this.groundableQuadTree = new NewQuadTree<IGroundableUnit>(this.world.getBounds(), 10);
        this.groundableQuadTree.insert(groundables);
    }

}

export let noop: () => {};