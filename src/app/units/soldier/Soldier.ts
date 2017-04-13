import { Army } from '../army/Army';
import { SoldierConfig } from './SoldierConfig';
import { Environment } from '../../Environment';
import { GPoint } from '../../shapes/Geometry';
import { Rifle } from '../shots/Rifle';
import { Unit } from '../Unit';
import { Health } from './Health';
import { Container, extras } from 'pixi.js';
export class Soldier extends Unit {


    public config: SoldierConfig;
    public container: Container;
    public sprite: extras.AnimatedSprite;
    private weapon: Rifle;
    private direction: GPoint;
    private health: Health;
    private rotation;

    private previousAngle;

    constructor(env: Environment, config: SoldierConfig) {
        super(env, 'soldier');
        this.config = config;
        this.container = new Container();
        this.sprite = new PIXI.extras.AnimatedSprite(config.textures);
        this.sprite.animationSpeed = 1;
        this.sprite.interactive = true;

        this.width = 32;
        this.height = 32;
        this.weapon = new Rifle(env, this);
        this.direction = new GPoint(1 - 2 * Math.random(), 1 - 2 * Math.random());
        this.health = new Health(env, this);
        this.container.addChild(this.sprite);
        this.rotation = 0.5;
    }

    public setPosition(x: number, y: number): void {
        super.setPosition(x, y);
        this.container.x = x;
        this.container.y = y;
    }

    public start(): void {
        this.env.addUnit(this);
    }


    public getContainer(): Container {
        return this.container;
    }

    public updateLogic(delta: number): void {
        if (this.health.isDead()) {
            this.canBeHit = false;
            this.container.pivot.set(this.width * 0.5, this.height);
            this.container.position.set(this.x + this.width * 0.5, this.y + this.height);
            if (this.container.rotation >= -Math.PI * 0.5) {
                this.container.rotation -= 0.1;
            }
            return;
        }
        while (!this.moveByCopy(this.direction).isInside(this.env.worldBounds)) {
            this.direction = new GPoint(1 - 2 * Math.random(), 1 - 2 * Math.random());
        }
        this.x += this.direction.x;
        this.y += this.direction.y;
        this.container.x = this.x;
        this.container.y = this.y;


        // 0.1 0.9  0.8  = -.1 -.1   -.2    
        // 0.1 0.2  0.1 = -.1  -.2   -.3

        let target: Unit = this.weapon.getTargets()
            .filter(target => target.canBeTargetOf(this))
            .first();
        if (target) {
            let rotationTarget: number = this.weapon.getRotationToTarget(target);
            if (rotationTarget) {
                let angle = rotationTarget;
                if (rotationTarget - this.previousAngle > Math.PI) {
                    this.rotation += 2 * Math.PI
                } else if (this.previousAngle - rotationTarget > Math.PI) {
                    this.rotation -= 2 * Math.PI
                }

                this.previousAngle = rotationTarget
                this.rotation = rotationTarget * this.config.rotationSpeed + this.rotation * (1 - this.config.rotationSpeed)
                let frameIndex: number = (this.normRotation(this.rotation) * 24) % 24;
                this.sprite.gotoAndStop(frameIndex);
            }

            if (this.weapon.needToReload()) {
                this.weapon.reload();
            } else if (this.weapon.canFire(delta)) {
                this.weapon.fireShot(this.rotation);
            }
        }

        // if (Math.abs(nRotationTarget - nRotation) > this.config.rotationSpeed) {
        //     this.rotation += Math.sign(nRotationTarget - nRotation) * this.config.rotationSpeed;
        // }

    }

    public normRotation(rotation: number): number {
        return (rotation + Math.PI) / (2 * Math.PI);
    }

    public getArmy(): string {
        return this.config.armyKey;
    }

    public takeHit() {
        this.health.decrease(1);
    }
    public canBeTargetOf(soldier: Soldier): boolean {
        return soldier.getArmy() !== this.getArmy();
    }

    public destroy(): void {
        this.env.removeUnit(this);
    }

}