import { GVector } from '../../../shapes/GVector';
import { GPoint } from '../../../shapes/GPoint';
import { SpriteConfig } from '../../../graphics/SpriteConfig';
import { TreeConfig } from './TreeConfig';
import { Environment } from '../../../environment/Environment';
import { World } from '../World';
import { Tree } from './Tree';
export class TreeBuilder {

    private world: World;
    private env: Environment;

    private oakConfig: TreeConfig;

    constructor(env: Environment, world: World) {
        this.env = env;
        this.world = world;
        this.oakConfig = new TreeConfig();
        this.oakConfig.spriteConfig = env.textureLibrary.world.oak;
    }

    public build(): void {

        let forestCount = 3;
        let treeCount = 6;
        for (let j = 0; j < forestCount; j++) {
            let forestCenter: GPoint = GPoint.fromRandom(this.world.getBounds());
            let forestRadius: number = 100 + Math.random() * 100;
            for (let i = 0; i < treeCount; i++) {
                this.buildTree(forestCenter, forestRadius);
            }
        }
    }

    private buildTree(center: GPoint, radius: number): void {
        this.env.updateQuadTree();
        let tree: Tree = new Tree(this.env, this.oakConfig);
        do {
            let point: GPoint = new GPoint(
                center.x + (radius - Math.random() * 2 * radius),
                center.y + (radius - Math.random() * 2 * radius));
            tree.moveTo(point);
        } while (!this.env.groundableQuadTree.colliding(tree.getGroundBounds(), tree).isEmpty());
    }

}