import { GAngle } from '../../../shapes/GAngle';
import { GVector } from '../../../shapes/GVector';
import { IGroundableUnit } from '../../IGroundableUnit';
import { GPoint } from '../../../shapes/GPoint';
import { GBounds } from '../../../shapes/GBounds';
import { TreeConfig } from './TreeConfig';
import { IUnitConfig } from '../../IUnitConfig';
import { Environment } from '../../../environment/Environment';
import { Unit } from '../../Unit';
import { Container, extras } from 'pixi.js';
export class Tree extends Unit implements IGroundableUnit {

    public config: TreeConfig;
    private sprite: extras.AnimatedSprite;
    private containerBounds: GBounds;

    constructor(env: Environment, config: TreeConfig) {
        super(env, config);
        this.config = config;
        this.initGraphics();
    }

    private initGraphics(): void {
        this.sprite = new PIXI.extras.AnimatedSprite(this.config.spriteConfig.body);
        this.sprite.animationSpeed = 1;

        this.containerBounds = new GBounds();
        this.containerBounds.width = this.config.spriteConfig.outerWidth;
        this.containerBounds.height = this.config.spriteConfig.outerHeight;
        this.env.world.addUnit(this);
    }

    public updateLogic(delta: number): void {
        // do nothing
    }

    public getContainer(): Container {
        return this.sprite;
    }

    public destroy(): void {
        this.env.world.removeUnit(this);
    }

    public getGroundBounds(): GBounds {
        return GBounds.from(this.containerBounds.center.x - 25, this.containerBounds.bottom - 40, 38, 30);
    }

    public moveBy(vector: GVector): void {
        throw new Error('cannot move a tree.');
    }

    public moveTo(point: GPoint): void {
        this.containerBounds.x = point.x;
        this.containerBounds.y = point.y;
        this.sprite.x = this.containerBounds.x;
        this.sprite.y = this.containerBounds.y;
    }

    public getAngle(): GAngle {
        throw new Error('no angle for a tree.');
    }
}