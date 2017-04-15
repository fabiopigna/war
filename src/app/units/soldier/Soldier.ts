import { GPoint } from '../../shapes/GPoint';
import { HumanMoveLogic } from './movement/HumanMoveLogic';
import { RandomMoveLogic } from './movement/RandomMoveLogic';
import { IMoveLogic } from './movement/IMoveLogic';
import { IInteractiveUnit } from '../IInteractiveUnit';
import { Environment } from '../../environment/Environment';
import { Army } from '../army/Army';
import { SoldierConfig } from './SoldierConfig';
import { Rifle } from '../shots/Rifle';
import { Unit } from '../Unit';
import { Health } from './Health';
import { Container, extras, interaction, Point } from 'pixi.js';
export class Soldier extends Unit implements IInteractiveUnit {

    public config: SoldierConfig;
    public container: Container;
    public sprite: extras.AnimatedSprite;
    private weapon: Rifle;
    private direction: GPoint;
    private health: Health;
    private angle: number;
    private moveTarget: GPoint;
    private moveLogic: IMoveLogic;

    constructor(env: Environment, config: SoldierConfig) {
        super(env, 'soldier');
        this.config = config;
        this.container = new Container();
        this.sprite = new PIXI.extras.AnimatedSprite(config.textures);
        this.sprite.animationSpeed = 1;
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', (event: interaction.InteractionEvent) => this.onClick(event));

        this.width = 32;
        this.height = 32;
        this.weapon = new Rifle(env, this);

        this.health = new Health(env, this);
        this.container.addChild(this.sprite);
        this.angle = 0.5;
        if (!this.config.isHuman) {
            this.moveLogic = new RandomMoveLogic(this.env, this, config);
        } else {
            this.moveLogic = new HumanMoveLogic(this.env, this, config);
        }
    }

    public setPosition(x: number, y: number): void {
        super.setPosition(x, y);
        this.container.x = x;
        this.container.y = y;
    }

    public start(): void {
        this.env.world.addUnit(this);
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
        this.moveLogic.updateLogic(delta);
        this.container.position.set(this.x, this.y);

        let target: Unit = this.weapon.getTargets()
            .filter(target => target.canBeTargetOf(this))
            .first();
        if (target) {
            let targetAngle: number = this.weapon.getRotationToTarget(target);
            if (targetAngle) {
                if (targetAngle - this.angle > Math.PI) {
                    this.angle += 2 * Math.PI
                } else if (this.angle - targetAngle > Math.PI) {
                    this.angle -= 2 * Math.PI
                }
                this.angle = targetAngle * this.config.rotationSpeed + this.angle * (1 - this.config.rotationSpeed)
                let frameIndex: number = (this.normRotation(this.angle) * 24) % 24;
                this.sprite.gotoAndStop(frameIndex);
            }

            if (this.weapon.needToReload()) {
                this.weapon.reload();
            } else if (this.weapon.canFire(delta)) {
                this.weapon.fireShot(this.angle);
            }
        }

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
        this.env.world.removeUnit(this);
    }

    public onClick(event: interaction.InteractionEvent): void {
        this.env.selection.setSelected(this);
        event.stopPropagation();
    }

    public handleClickOnWorld(event: interaction.InteractionEvent): void {
        this.moveLogic.setTarget(GPoint.from(event.data.global));
    }
}