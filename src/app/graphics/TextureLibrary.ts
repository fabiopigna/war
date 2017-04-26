import { SpriteConfig } from './SpriteConfig';
import { loaders, Texture, utils } from 'pixi.js';



export class TextureLibrary {

    public angles: string[] = [
        '-0', '-15', '-30', '-45', '-60', '-75', '-90', '-105', '-120', '-135', '-150', '-165',
        '+180', '+165', '+150', '+135', '+120', '+105', '+90', '+75', '+60', '+45', '+30', '+15'
    ]

    public soldierBlack: SpriteConfig;
    public soldierRed: SpriteConfig;

    public shotTexture: { rifle: Texture, gunner: Texture };
    public tank: { body: Texture[], turret: Texture[] };
    public world: { oak: SpriteConfig };

    public load(): loaders.Loader {
        return PIXI.loader
            .add('soldier', 'assets/sprites/provaMulti.json')
            .add('shot', 'assets/sprites/shotMulti.json')
            .load((l, r) => this.setupSprites(l, r))
    }

    public setupSprites(loaded: loaders.Loader, resources: any): void {
        this.soldierBlack = new SpriteConfig(96, 96, 36, 64);
        this.soldierRed = new SpriteConfig(32, 32, 32, 32);

        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.soldierBlack.body.push(resources['soldier'].textures['soldier/black_soldier-0' + this.angles[i] + '.png']);
        }

        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.soldierRed.body.push(resources['soldier'].textures['soldier_red_' + val + '.png']);
        }

        this.tank = { body: [], turret: [] };
        for (let i = 0; i < 1; i++) {
            this.tank.body.push(resources['soldier'].textures['tank/black_tank_0' + this.angles[i] + '.png']);
        }

        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.tank.turret.push(resources['soldier'].textures['turret/black_turret_0' + this.angles[i] + '.png']);
        }

        this.shotTexture = {
            rifle: resources['shot'].textures['shot00.png'],
            gunner: resources['shot'].textures['gunner00.png']
        }

        this.world = {
            oak: new SpriteConfig(128, 128, 128, 128)
        };
        this.world.oak.body.push(resources['soldier'].textures['tree-45.png']);
        this.world.oak.body.push(resources['soldier'].textures['tree+45.png']);
        this.world.oak.body.push(resources['soldier'].textures['tree-135.png']);
        this.world.oak.body.push(resources['soldier'].textures['tree+135.png']);
    }
}