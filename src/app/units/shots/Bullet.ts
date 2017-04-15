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
    private rotation: number;
    private velocity: GPoint;
    private timeStart: number;

    private shooter: Soldier;
    private weaponConfig: WeaponConfig;

    constructor(env: Environment, shooter: Soldier, weaponConfig: WeaponConfig) {
        super(env, new BulletConfig());
        this.bounds = new GBounds();
        this.weaponConfig = weaponConfig;
        this.shooter = shooter;
        this.sprite = new Sprite(weaponConfig.bulletTexture);
        this.canBeHit = false;
    }


    public setPosition(x: number, y: number): void {
        super.setPosition(x, y);
        this.sprite.x = x;
        this.sprite.y = y;
    }

    public setRotation(rotation: number): void {
        this.rotation = rotation;
        this.sprite.rotation = rotation;
        this.velocity = new GPoint(Math.cos(rotation) * this.weaponConfig.bulletSpeed, Math.sin(rotation) * this.weaponConfig.bulletSpeed);
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
            this.bounds.x += this.velocity.x;
            this.bounds.y += this.velocity.y;
            this.sprite.x = this.bounds.x;
            this.sprite.y = this.bounds.y;
        } else {
            this.destroy();
        }
    }

    public checkCollision(): ITargetableUnit[] {
        const bulletTrace: GBounds = GBounds.fromPoints(this.bounds.topLeft, this.bounds.topLeft.plus(this.velocity));
        return this.env.targetableQuadTree.colliding(bulletTrace.keepInside(this.env.world.getBounds()), this)
            .filter(target => target.id !== this.shooter.id);
    }

    public insideWorldBounds(): boolean {
        return this.bounds.moveByCopy(this.velocity).isInside(this.env.world.getBounds());
    }

    public getContainer(): Container {
        return this.sprite;
    }

    public destroy(): void {
        this.env.world.removeUnit(this);
    }

    public takeHit(): void {
        // do nothing
    }

    public canBeTargetOf(soldier: Soldier): boolean {
        return false;
    }

}