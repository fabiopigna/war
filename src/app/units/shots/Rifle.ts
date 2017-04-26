import { GVector } from '../../shapes/GVector';
import { GAngle } from '../../shapes/GAngle';
import { ITargetableUnit } from '../ITargetableUnit';
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
        this.weaponConfig.bulletSpeed = new GVector(15, 15);
        this.weaponConfig.bulletTexture = this.env.textureLibrary.shotTexture.gunner;
    }

    public fireShot(angle: GAngle): void {
        const bullet = new Bullet(this.env, this.soldier, this.weaponConfig);
        bullet.setPosition(this.soldier.getTargetableBounds().center);
        bullet.setAngle(angle);
        bullet.start();
        this.currentAmmo--;
        this.lastShotTime = performance.now();
    }

    public getRotationToTarget(target: ITargetableUnit): GAngle {
        const targetBounds: GBounds = target.getTargetableBounds();
        const sourceBounds: GBounds = this.soldier.getTargetableBounds();
        return GAngle.from(sourceBounds.center, targetBounds.center);
    }

    public getTargets(): ITargetableUnit[] {
        return this.env.targetableQuadTree.colliding(this.getShotArea().keepInside(this.env.world.getBounds()), this.soldier)
    }

    public getShotArea(): GBounds {
        return GBounds.fromCenter(this.soldier.getTargetableBounds().center, this.shotArea);
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