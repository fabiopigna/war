import { SpriteConfig } from '../../../graphics/SpriteConfig';
import { IUnitConfig } from '../../IUnitConfig';
export class TreeConfig implements IUnitConfig {
    public isGroundable: boolean = true;
    public isTargetable: boolean = false;
    public type: string = 'tree';
    public spriteConfig: SpriteConfig;
}