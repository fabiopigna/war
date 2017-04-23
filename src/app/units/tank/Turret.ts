import { GBounds } from '../../shapes/GBounds';
import { TurretConfig } from './TurretConfig';
import { Tank } from './Tank';
import { Environment } from '../../environment/Environment';
import { Container, extras } from "pixi.js";
export class Turret {
    private relativeBounds: GBounds;
    private config: TurretConfig;
    private tank: Tank;
    private env: Environment;

    private container: Container;
    private sprite: extras.AnimatedSprite;

    constructor(env: Environment, config: TurretConfig, tank: Tank) {
        this.env = env;
        this.config = config;
        this.tank = tank;
        this.relativeBounds = GBounds.from(0, 0, 64, 64);
        this.init();
    }

    private init(): void {
        this.sprite = new PIXI.extras.AnimatedSprite(this.config.textures);
        this.sprite.anchor.set(0.5);
        this.sprite.position.set(this.relativeBounds.center.x, this.relativeBounds.center.y);
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
        this.tank.getContainer().addChild(this.sprite);
    }



}