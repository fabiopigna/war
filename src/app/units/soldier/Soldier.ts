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
    public container: Container;
    public sprite: extras.AnimatedSprite;

    private health: Health;
    private weapon: Rifle;

    private direction: GPoint;
    private angle: GAngle;
    private bounds: GBounds;
    private moveTarget: GPoint;
    private moveLogic: IMoveLogic;

    constructor(env: Environment, config: SoldierConfig) {
        super(env, config);
        this.config = config;
        this.container = new Container();
        this.sprite = new PIXI.extras.AnimatedSprite(config.textures);
        this.sprite.animationSpeed = 1;
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', (event: interaction.InteractionEvent) => this.onClick(event));
        this.bounds = new GBounds();
        this.bounds.width = 48;
        this.bounds.height = 58;
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
    }

    public moveBy(vector: GVector): void {
        this.bounds.sum(vector);
        this.container.x = this.bounds.x;
        this.container.y = this.bounds.y;
    }

    public moveTo(point: GPoint): void {
        this.bounds.x = point.x;
        this.bounds.y = point.y;
        this.container.x = this.bounds.x;
        this.container.y = this.bounds.y;
    }

    public start(): void {
        this.env.world.addUnit(this);
    }

    public getContainer(): Container {
        return this.container;
    }

    public updateLogic(delta: number): void {
        if (this.health.isDead()) {
            this.container.pivot.set(this.bounds.width * 0.5, this.bounds.height);
            this.container.position.set(this.bounds.x + this.bounds.width * 0.5, this.bounds.y + this.bounds.height);
            if (this.container.rotation >= -Math.PI * 0.5) {
                this.container.rotation -= 0.1;
            } else {
                this.destroy();
            }
            return;
        }
        this.moveLogic.updateLogic(delta);
        this.container.position.set(this.bounds.x, this.bounds.y);
   
        let target: ITargetableUnit = this.weapon.getTargets()
            .filter(target => target.canBeTargetOf(this))
            .first();
        if (target) {
            let targetAngle: GAngle = this.weapon.getRotationToTarget(target);
            if (targetAngle) {
                this.angle = targetAngle.flipFlop(this.angle);
                this.angle.rotateTo(targetAngle, this.config.rotationSpeed);
                this.sprite.gotoAndStop(this.angle.normalizeTo(this.config.frameNumber));
            }
            if (this.weapon.needToReload()) {
                this.weapon.reload();
            } else if (this.weapon.canFire(delta) && this.angle.isClose(targetAngle, this.config.rotationTollerance)) {
                this.weapon.fireShot(this.angle);
            }
        }
    }

    public getTargetableBounds(): GBounds {
        return this.bounds;
    }

    public getGroundBounds(): GBounds {
        return GBounds.from(this.bounds.center.x - 4, this.bounds.bottom - 4, 8, 8);
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





}