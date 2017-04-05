import { Health } from './Health';
import { Rifle } from '../shots/Rifle';
import { Bullet } from '../shots/Bullet';
import { GBounds, GPoint, GSize } from '../../shapes/Geometry';
import { Environment } from '../../Environment';
import { Unit } from '../Unit';
import { getRandomid } from '../RandomId';
import { TextureLibrary } from '../../graphics/TextureLibrary';
import { extras, Texture, Sprite, Container } from 'pixi.js';
export class Soldier extends Unit {

    public container: Container;
    public sprite: extras.AnimatedSprite;
    private weapon: Rifle;
    private direction: GPoint;
    private health: Health;

    constructor(env: Environment) {
        super(env, 'soldier');
        this.container = new Container();
        this.sprite = new PIXI.extras.AnimatedSprite(env.textureLibrary.soldierTexture);
        this.sprite.animationSpeed = 0.1;
        this.sprite.interactive = true;
        this.width = 16;
        this.height = 16;
        this.weapon = new Rifle(env, this);
        this.direction = new GPoint(1 - 2 * Math.random(), 1 - 2 * Math.random());
        this.health = new Health(env, this);
        this.container.addChild(this.sprite);
        // this.container.pivot.set(this.width * 0.5, this.height);
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
            this.env.quadTree.remove(this);
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


        if (this.weapon.needToReload()) {
            this.weapon.reload();
        } else if (this.weapon.canFire(delta)) {
            this.weapon.fireShot();
        }
    }

    public takeHit() {
        this.health.decrease(1);
    }

    public destroy(): void {
        this.env.removeUnit(this);
    }

}