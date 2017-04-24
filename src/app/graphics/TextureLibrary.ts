import { loaders, Texture, utils } from 'pixi.js';

export class TextureLibrary {

    public angles: string[] = [
        '-0', '-15', '-30', '-45', '-60', '-75', '-90', '-105', '-120', '-135', '-150', '-165',
        '+180', '+165', '+150', '+135', '+120', '+105', '+90', '+75', '+60', '+45', '+30', '+15'
    ]

    public soldierTexture: Texture[];
    public soldierRedTexture: Texture[];
    public shotTexture: { rifle: Texture, gunner: Texture };
    public tank: { body: Texture[], turret: Texture[] };

    public load(): loaders.Loader {

        return PIXI.loader
            .add('soldier', 'assets/sprites/provaMulti.json')
            .add('shot', 'assets/sprites/shotMulti.json')
            .load((l, r) => this.setupSprites(l, r))

    }

    public setupSprites(loaded: loaders.Loader, resources: any): void {
        this.soldierTexture = [];
        this.soldierRedTexture = [];
        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.soldierTexture.push(resources['soldier'].textures['soldier/black_soldier-0' + this.angles[i] + '.png']);
        }
      
        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.soldierRedTexture.push(resources['soldier'].textures['soldier_red_' + val + '.png']);
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
    }
}