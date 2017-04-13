import { WeaponConfig } from './WeaponConfig';
import { Soldier } from '../soldier/Soldier';
import { GBounds, GPoint } from '../../shapes/Geometry';
import { Environment } from '../../Environment';
import { Unit } from '../Unit';
import { extras, Sprite, Container } from 'pixi.js';
export class Bullet extends Unit {


    public sprite: Sprite;
    private rotation: number;
    private velocity: GPoint;
    private timeStart: number;

    private shooter: Soldier;
    private weaponConfig: WeaponConfig;

    constructor(env: Environment, shooter: Soldier, weaponConfig: WeaponConfig) {
        super(env, 'bullet');
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
        this.env.addUnit(this);
        this.timeStart = performance.now();
    }

    public updateLogic(delta: number): void {
        const collisions: Unit[] = this.checkCollision();
        if (collisions.length > 0) {
            collisions[0].takeHit();
            this.destroy();
        } else if (this.insideWorldBounds()) {
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.sprite.x = this.x;
            this.sprite.y = this.y;

        } else {
            this.destroy();
        }
    }

    public checkCollision(): Unit[] {
        const bulletTrace: GBounds = GBounds.fromPoints(this.topLeft, this.topLeft.plus(this.velocity));
        return this.env.quadTree.colliding(bulletTrace.keepInside(this.env.worldBounds))
            .filter(target => target.id !== this.id && target.id !== this.shooter.id);
    }

    public insideWorldBounds(): boolean {
        return this.moveByCopy(this.velocity).isInside(this.env.worldBounds);
    }

    public getContainer(): Container {
        return this.sprite;
    }

    public destroy(): void {
        this.env.removeUnit(this);
    }

    public takeHit(): void {
        // do nothing
    }

    public canBeTargetOf(soldier: Soldier): boolean {
        return false;
    }

}