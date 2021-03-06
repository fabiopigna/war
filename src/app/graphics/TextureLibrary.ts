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
            .add('soldier', 'src/assets/sprites/provaMulti.json')
            .load((l, r) => this.setupSprites(l, r))
    }

    private loadMoves(spriteConfig: SpriteConfig, i: number, textures: any): void {
        for (let step = 0; step < spriteConfig.moveFrames; step++) {
            let path = spriteConfig.moveFramesPath + this.angles[i] + '/step_' + step + '.png';
            spriteConfig.body.push(textures[path]);
        }
    }

    private loadRotationsFrames(spriteConfig: SpriteConfig, textures: any): void {
        for (let i = 0; i < spriteConfig.rotationFrames; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            // let path = spriteConfig.rotationFramesPath + this.angles[i] + '.png';
            // spriteConfig.body.push(textures[path]);
            this.loadMoves(spriteConfig, i, textures);
        }
    }

    public setupSprites(loaded: loaders.Loader, resources: any): void {
        this.soldierBlack = new SpriteConfig(96, 96, 36, 64);
        this.soldierBlack.rotationFrames = 24;
        this.soldierBlack.moveFrames = 5;
        this.soldierBlack.rotationFrames = 24;
        this.soldierBlack.rotationFramesPath = 'black/soldier/black_soldier-0'
        this.soldierBlack.moveFramesPath = 'black/soldier/move/'

        this.soldierRed = new SpriteConfig(32, 32, 32, 32);


        this.loadRotationsFrames(this.soldierBlack, resources['soldier'].textures)


        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.soldierRed.body.push(resources['soldier'].textures['red/soldier_red_' + val + '.png']);
        }

        this.tank = { body: [], turret: [] };
        for (let i = 0; i < 1; i++) {
            this.tank.body.push(resources['soldier'].textures['black/tank/black_tank_0' + this.angles[i] + '.png']);
        }

        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.tank.turret.push(resources['soldier'].textures['black/turret/black_turret_0' + this.angles[i] + '.png']);
        }

        this.shotTexture = {
            rifle: resources['soldier'].textures['bullet/gunner00.png'],
            gunner: resources['soldier'].textures['bullet/gunner00.png']
        }

        this.world = {
            oak: new SpriteConfig(156, 156, 156, 156)
        };
        this.world.oak.body.push(resources['soldier'].textures['tree/tree-45.png']);
        this.world.oak.body.push(resources['soldier'].textures['tree/tree+45.png']);
        this.world.oak.body.push(resources['soldier'].textures['tree/tree-135.png']);
        this.world.oak.body.push(resources['soldier'].textures['tree/tree+135.png']);
    }
}