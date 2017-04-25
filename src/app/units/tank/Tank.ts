import { Turret } from './Turret';
import { Soldier } from '../soldier/Soldier';
import { HumanMoveLogic } from '../soldier/movement/HumanMoveLogic';
import { RandomMoveLogic } from '../soldier/movement/RandomMoveLogic';
import { IMoveLogic } from '../soldier/movement/IMoveLogic';
import { Health } from '../soldier/Health';
import { Environment } from '../../environment/Environment';
import { GAngle } from '../../shapes/GAngle';
import { GBounds } from '../../shapes/GBounds';
import { GPoint } from '../../shapes/GPoint';
import { GVector } from '../../shapes/GVector';
import { IGroundableUnit } from '../IGroundableUnit';
import { IInteractiveUnit } from '../IInteractiveUnit';
import { ITargetableUnit } from '../ITargetableUnit';
import { Rifle } from '../shots/Rifle';
import { Unit } from '../Unit';
import { TankConfig } from './TankConfig';
import { Container, extras, interaction } from 'pixi.js';



export class Tank extends Unit implements IInteractiveUnit, IGroundableUnit, ITargetableUnit {

    public config: TankConfig;
    private health: Health;
    private turret: Turret;

    public container: Container;
    public sprite: extras.AnimatedSprite;

    private direction: GPoint;
    private angle: GAngle;
    private bounds: GBounds;
    private moveTarget: GPoint;
    private moveLogic: IMoveLogic;

    constructor(env: Environment, config: TankConfig) {
        super(env, config);
        this.config = config;
        this.container = new Container();
        this.sprite = new PIXI.extras.AnimatedSprite(config.textures);
        this.sprite.animationSpeed = 1;
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', (event: interaction.InteractionEvent) => this.onClick(event));
        this.container.addChild(this.sprite);
        this.bounds = new GBounds();
        this.bounds.width = 64;
        this.bounds.height = 64;
        this.health = new Health(env, this);
        this.turret = new Turret(env, config.turretConfig, this);
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
        this.sprite.gotoAndStop(this.angle.normalizeTo(this.config.frameNumber));
        this.container.position.set(this.bounds.x, this.bounds.y);
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

    public getAngle(): GAngle {
        return this.angle;
    }





}