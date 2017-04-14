import { loaders, Texture, utils } from 'pixi.js';

export class TextureLibrary {

    public soldierTexture: Texture[];
    public soldierRedTexture: Texture[];
    public shotTexture: { rifle: Texture, gunner: Texture };

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
            this.soldierTexture.push(resources['soldier'].textures['soldier_black_' + val + '.png']);
        }
        for (let i = 0; i < 24; i++) {
            const val: string = i < 10 ? '00' + i : i < 100 ? '0' + i : '' + i;
            this.soldierRedTexture.push(resources['soldier'].textures['soldier_red_' + val + '.png']);
        }

        this.shotTexture = {
            rifle: resources['shot'].textures['shot00.png'],
            gunner: resources['shot'].textures['gunner00.png']
        }
    }
}