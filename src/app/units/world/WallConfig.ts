import { IUnitConfig } from '../IUnitConfig';
export class WallConfig implements IUnitConfig{
    public isGroundable: boolean = true;
    public isTargetable: boolean = false;
    public type: string = 'wall';
    
}
