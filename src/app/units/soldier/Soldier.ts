import { DeathLogic } from './logics/DeathLogic';
import { GAngle } from '../../shapes/GAngle';
import { GVector } from '../../shapes/GVector';
import { GBounds } from '../../shapes/GBounds';
import { ITargetableUnit } from '../ITargetableUnit';
import { IGroundableUnit } from '../IGroundableUnit';
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
export class Soldier extends Unit implements IInteractiveUnit, IGroundableUnit, ITargetableUnit {

    public config: SoldierConfig;
    private container: Container;
    private sprite: extras.AnimatedSprite;

    private health: Health;
    private weapon: Rifle;

    private direction: GPoint;
    private angle: GAngle;

    private targetableBounds: GBounds;
    private containerBounds: GBounds;

    private moveTarget: GPoint;
    private moveLogic: IMoveLogic;
    private deathLogic: DeathLogic;

    constructor(env: Environment, config: SoldierConfig) {
        super(env, config);
        this.config = config;
        this.container = new Container();
        this.sprite = new PIXI.extras.AnimatedSprite(config.spriteConfig.body);
        this.sprite.animationSpeed = 1;
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', (event: interaction.InteractionEvent) => this.onClick(event));

        this.containerBounds = new GBounds();
        this.containerBounds.width = this.config.spriteConfig.outerWidth;
        this.containerBounds.height = this.config.spriteConfig.outerHeight;

        this.targetableBounds = new GBounds();
        this.targetableBounds.width = this.config.spriteConfig.innerWidth;
        this.targetableBounds.height = this.config.spriteConfig.innerHeight;

        this.moveTo(new GPoint(0, 0));

        this.weapon = new Rifle(env, this);

        this.health = new Health(env, this);
        this.container.addChild(this.sprite);
        this.angle = new GAngle(0.5);
        this.sprite.gotoAndStop(this.angle.normalizeTo(this.config.frameNumber));
        if (!this.config.isHuman) {
            this.moveLogic = new RandomMoveLogic(this.env, this, config);
        } else {
            this.moveLogic = new HumanMoveLogic(this.env, this, config);
        }
        this.deathLogic = new DeathLogic(this);
        this.env.world.addUnit(this);
    }

    public moveBy(vector: GVector): void {
        this.containerBounds.sum(vector);
        this.targetableBounds.sum(vector);
        this.container.x = this.containerBounds.x;
        this.container.y = this.containerBounds.y;
    }

    public moveTo(point: GPoint): void {
        this.containerBounds.x = point.x;
        this.containerBounds.y = point.y;
        this.targetableBounds.x = point.x + 0.5 * (this.config.spriteConfig.outerWidth - this.config.spriteConfig.innerWidth);
        this.targetableBounds.y = point.y + 0.5 * (this.config.spriteConfig.outerHeight - this.config.spriteConfig.innerHeight);
        this.container.x = this.containerBounds.x;
        this.container.y = this.containerBounds.y;
    }

    public getContainer(): Container {
        return this.container;
    }

    public updateLogic(delta: number): void {
        if (this.health.isDead()) {
            this.deathLogic.updateLogic(delta);
        }


        let target: ITargetableUnit = this.weapon.getTargets()
            .filter(maybeTarget => maybeTarget.canBeTargetOf(this))
            .first();
        if (target) {
            let targetAngle: GAngle = this.weapon.getRotationToTarget(target);
            if (targetAngle) {
                this.angle = targetAngle.flipFlop(this.angle);
                this.angle.rotateTo(targetAngle, this.config.rotationSpeed);

            }
            if (this.weapon.needToReload()) {
                this.weapon.reload();
            } else if (this.weapon.canFire(delta) && this.angle.isClose(targetAngle, this.config.rotationTollerance)) {
                this.weapon.fireShot(this.angle);
            }
        } else {
            this.moveLogic.updateLogic(delta);
            this.container.position.set(this.containerBounds.x, this.containerBounds.y);
        }
        this.sprite.gotoAndStop(this.angle.normalizeTo(this.config.frameNumber));
    }

    public getTargetableBounds(): GBounds {
        return this.targetableBounds;
    }

    public getGroundBounds(): GBounds {
        return GBounds.from(this.containerBounds.center.x - 20, this.containerBounds.bottom - 20, 20, 20);
    }

    public getArmy(): string {
        return this.config.armyKey;
    }

    public takeHit() {
        this.health.decrease(1);
    }

    public canBeHit(): boolean {
        return !this.health.isDead;
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

    public getAngle(): GAngle {
        return this.angle;
    }




}