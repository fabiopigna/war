import { Soldier } from '../soldier/Soldier';
import { Bullet } from './Bullet';
import { GBounds, GPoint } from '../../shapes/Geometry';
import { Unit } from '../Unit';
import { Environment } from '../../Environment';
export class Rifle {

    public shotArea = 150;
    public WEAPON_RECOIL_TIME = 200;
    public WEAPON_RELOAD_TIME = 3000;
    public WEAPON_AMMO = 3;
    private lastShotTime: number;
    private startReloadingTime: number;
    private currentAmmo: number = this.WEAPON_AMMO;

    constructor(private env: Environment, private soldier: Soldier) {
        this.lastShotTime = performance.now();
    }

    public fireShot(): void {
        const collision: Unit[] = this.env.quadTree
            .colliding(this.getShotArea().keepInside(this.env.worldBounds))
            .filter(target => target.id !== this.soldier.id);
        const target: Unit = collision.length > 0 ? collision[0] : null;
        if (target) {
            const targetCenter: GPoint = target.center;
            const rotation = Math.atan2(targetCenter.y - this.soldier.center.y, targetCenter.x - this.soldier.center.x);
            const bullet = new Bullet(this.env, this.soldier);
            bullet.setPosition(this.soldier.center.x, this.soldier.center.y);
            bullet.setRotation(rotation);
            bullet.start();
            this.currentAmmo--;
            this.lastShotTime = performance.now();

        }

    }

    public getShotArea(): GBounds {
        return GBounds.fromCenter(this.soldier.center, this.shotArea);
    }


    public canFire(delta: number): boolean {
        if ((performance.now() - this.lastShotTime) > this.WEAPON_RECOIL_TIME) {
            return true;
        }
        return false;
    }

    public needToReload(): boolean {
        return this.currentAmmo === 0;
    }

    public reload(): void {
        if (!this.startReloadingTime) {
            this.startReloadingTime = performance.now();
        } else if ((performance.now() - this.startReloadingTime) > this.WEAPON_RELOAD_TIME) {
            this.currentAmmo = this.WEAPON_AMMO;
            this.startReloadingTime = null;
        }
    }
}