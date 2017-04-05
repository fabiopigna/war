import { loaders, Texture, utils } from 'pixi.js';

export class TextureLibrary {

    public soldierTexture: Texture[];
    public shotTexture: Texture;

    public load(): loaders.Loader {

        return PIXI.loader
            .add('soldier', 'assets/sprites/provaMulti.json')
            .add('shot', 'assets/sprites/shotMulti.json')
            .load((l, r) => this.setupSprites(l, r))

    }

    public setupSprites(loaded: loaders.Loader, resources: any): void {
        this.soldierTexture = [];
        for (let i = 0; i < 4; i++) {
            const val: string = i < 10 ? '0' + i : '' + i;
            this.soldierTexture.push(resources['soldier'].textures['prova' + val + '.png']);
        }
        this.shotTexture = resources['shot'].textures['shot00.png'];

    }
}