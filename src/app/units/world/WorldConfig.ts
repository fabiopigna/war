import { IUnitConfig } from '../IUnitConfig';
export class WorldConfig implements IUnitConfig {

    public width: number = 1024
    public height: number = 400;
    public isGroundable: boolean = false;
    public isTargetable: boolean = false;
    public type: string = 'world';
}