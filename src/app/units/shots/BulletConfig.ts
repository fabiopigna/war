import { IUnitConfig } from '../IUnitConfig';
export class BulletConfig implements IUnitConfig {
    public isGroundable: boolean = false;
    public isTargetable: boolean = false;
    public type: string = 'bullet';
}