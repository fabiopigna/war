import { GAngle } from '../../shapes/GAngle';
import { GVector } from '../../shapes/GVector';
import { Environment } from '../../environment/Environment';
import { GBounds } from '../../shapes/GBounds';
import { GPoint } from '../../shapes/GPoint';
import { ITargetableUnit } from '../ITargetableUnit';
import { Soldier } from '../soldier/Soldier';
import { Unit } from '../Unit';
import { BulletConfig } from './BulletConfig';
import { WeaponConfig } from './WeaponConfig';
import { Container, Sprite } from 'pixi.js';
export class Bullet extends Unit {


    public sprite: Sprite;
    private angle: GAngle;
    private velocity: GVector;
    private timeStart: number;
    private bounds: GBounds;

    private shooter: Soldier;
    private weaponConfig: WeaponConfig;

    constructor(env: Environment, shooter: Soldier, weaponConfig: WeaponConfig) {
        super(env, new BulletConfig());
        this.bounds = new GBounds();
        this.weaponConfig = weaponConfig;
        this.shooter = shooter;
        this.sprite = new Sprite(weaponConfig.bulletTexture);
    }

    public setPosition(point: GPoint): void {
        this.bounds.x = point.x;
        this.bounds.y = point.y;
    }

    public moveBy(vector: GVector): void {
        this.bounds.sum(vector);
        this.sprite.x = this.bounds.x;
        this.sprite.y = this.bounds.y;
    }

    public setAngle(angle: GAngle): void {
        this.angle = angle;
        this.sprite.rotation = angle.getValue();
        this.velocity = angle.mul(this.weaponConfig.bulletSpeed);
    }

    public start(): void {
        this.env.world.addUnit(this);
        this.timeStart = performance.now();
    }

    public updateLogic(delta: number): void {
        const collisions: ITargetableUnit[] = this.checkCollision();
        if (collisions.length > 0) {
            collisions[0].takeHit();
            this.destroy();
        } else if (this.insideWorldBounds()) {
            this.moveBy(this.velocity);
        } else {
            this.destroy();
        }
    }

    public checkCollision(): ITargetableUnit[] {
        const bulletTrace: GBounds = GBounds.fromPoints(this.bounds.topLeft, this.bounds.topLeft.plus(this.velocity));
        return this.env.targetableQuadTree.colliding(bulletTrace, this.shooter);
    }

    public insideWorldBounds(): boolean {
        return this.bounds.copy().sum(this.velocity).isInside(this.env.world.getBounds());
    }

    public getContainer(): Container {
        return this.sprite;
    }

    public destroy(): void {
        this.env.world.removeUnit(this);
    }

}