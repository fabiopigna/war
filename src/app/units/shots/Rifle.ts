import { GBounds } from '../../shapes/GBounds';
import { GPoint } from '../../shapes/GPoint';
import { Environment } from '../../environment/Environment';
import { WeaponConfig } from './WeaponConfig';
import { Soldier } from '../soldier/Soldier';
import { Bullet } from './Bullet';
import { Unit } from '../Unit';
export class Rifle {

    public shotArea = 200;
    public WEAPON_RECOIL_TIME = 200;
    public WEAPON_RELOAD_TIME = 5000;
    public WEAPON_AMMO = 5;
    private weaponConfig: WeaponConfig;
    private lastShotTime: number;
    private startReloadingTime: number;
    private currentAmmo: number = this.WEAPON_AMMO;

    constructor(private env: Environment, private soldier: Soldier) {
        this.lastShotTime = performance.now();
        this.weaponConfig = new WeaponConfig();
        this.weaponConfig.bulletSpeed = 10;
        this.weaponConfig.bulletTexture = this.env.textureLibrary.shotTexture.gunner;
    }

    public fireShot(rotation: number): void {
        const bullet = new Bullet(this.env, this.soldier, this.weaponConfig);
        bullet.setPosition(this.soldier.center.x, this.soldier.center.y);
        bullet.setRotation(rotation);
        bullet.start();
        this.currentAmmo--;
        this.lastShotTime = performance.now();
    }

    public getRotationToTarget(target: Unit): number {
        const targetCenter: GPoint = target.center;
        const rotation = Math.atan2(targetCenter.y - this.soldier.center.y, targetCenter.x - this.soldier.center.x);
        return rotation;
    }

    public getTargets(): Unit[] {
        return this.env.quadTree.colliding(this.getShotArea().keepInside(this.env.world), this.soldier)
    }

    public getShotArea(): GBounds {
        return GBounds.fromCenter(this.soldier.center, this.shotArea);
    }

    public canFire(delta: number): boolean {
        return !this.needToReload() && ((performance.now() - this.lastShotTime) > this.WEAPON_RECOIL_TIME);
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