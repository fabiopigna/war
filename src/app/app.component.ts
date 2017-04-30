import { World } from './units/world/World';
import { Environment } from './environment/Environment';
import { ITargetableUnitTyper } from './units/ITargetableUnit';
import { IGroundableUnitTyper } from './units/IGroundableUnit';
import { TreeBuilder } from './units/world/trees/TreeBuilder';
import { TurretConfig } from './units/tank/TurretConfig';
import { TankConfig } from './units/tank/TankConfig';
import { IUnit } from './units/IUnit';
import { GBounds } from './shapes/GBounds';
import { WorldConfig } from './units/world/WorldConfig';
import { EnvironmentConfig } from './environment/EnvironmentConfig';
import { SoldierConfig } from './units/soldier/SoldierConfig';
import { NewQuadTree } from './NewQuadTree';
import { Unit } from './units/Unit';
import { TextureLibrary } from './graphics/TextureLibrary';
import { Army } from './units/army/Army';
import { autoDetectRenderer } from 'pixi.js';
import { SystemRenderer, Container, Graphics, Application, Point, particles, Sprite, Texture, extras, loaders } from 'pixi.js';
// import { Component, ElementRef, OnInit } from '@angular/core';



// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
export class AppComponent {
  title = 'app works!';

  public fps: any;
  public app: Application;

  public redArmy: Army;
  public blackArmy: Army;
  public map: Map<string, IUnit>;
  public env: Environment;
  public textureLibrary: TextureLibrary;


  constructor() {
    this.textureLibrary = new TextureLibrary();
    this.ngOnInit();
  }

  public requestFullscreen(): void {
    document.documentElement.webkitRequestFullscreen();
  }

  ngOnInit(): void {

    let envConfig: EnvironmentConfig = new EnvironmentConfig();
    let worldConfig: WorldConfig = new WorldConfig();
    let resolution = window.devicePixelRatio;
    worldConfig.width = resolution * window.screen.availWidth;
    worldConfig.height = resolution * window.screen.availHeight;
    // document.write('<meta name="viewport" content="initial-scale=' + (1 / window.devicePixelRatio) + ' user-scalable=no">');
    this.app = new Application(worldConfig.width, worldConfig.height, { antialias: true, resolution: 1 });
    this.map = new Map<string, IUnit>();
    this.app.renderer.backgroundColor = 0x447711;
    this.app.renderer.view.style.top = '0px';
    this.app.renderer.view.style.left = '0px';


    document.body.appendChild(this.app.view);
    this.textureLibrary.load().onComplete.add(() => {

      this.env = new Environment(this.map, this.textureLibrary);

      this.env.debug = { map: new Map(), container: null };
      this.env.world = new World(this.env, worldConfig, this.app.stage);
      this.env.debug.container = this.env.world.getContainer();

      let treeBuilder = new TreeBuilder(this.env, this.env.world);
      treeBuilder.build();

      let tankConfig: TankConfig = new TankConfig();
      tankConfig.armyKey = 'black';
      tankConfig.textures = this.textureLibrary.tank.body;
      tankConfig.turretConfig = new TurretConfig();
      tankConfig.turretConfig.textures = this.textureLibrary.tank.turret;

      let blackSoldierConfig: SoldierConfig = new SoldierConfig();
      blackSoldierConfig.spriteConfig = this.textureLibrary.soldierBlack;
      blackSoldierConfig.armyKey = 'black';
      blackSoldierConfig.isHuman = true;
      let blackBounds: GBounds = GBounds.from(0, 0, this.env.world.getBounds().width * 0.5, this.env.world.getBounds().height);

      this.blackArmy = new Army(this.env);
      this.blackArmy.createSoldiers(50, blackBounds, blackSoldierConfig);
      this.blackArmy.createTanks(1, blackBounds, tankConfig);

      let redConfig: SoldierConfig = new SoldierConfig();
      redConfig.spriteConfig = this.textureLibrary.soldierRed;
      redConfig.armyKey = 'red';
      let redBounds: GBounds = GBounds.from(this.env.world.getBounds().width * 0.5, 0, this.env.world.getBounds().width * 0.5, this.env.world.getBounds().height);

      this.redArmy = new Army(this.env);
      this.redArmy.createSoldiers(50, redBounds, redConfig);

      this.app.ticker.add((delta) => this.gameLoop(delta));
    });
  }


  public gameLoop(delta: number): void {
    this.fps = this.app.ticker.FPS.toFixed(0);
    this.env.updateQuadTree();
    this.map.forEach((unit: IUnit) => {
      unit.updateLogic(delta);
    });

    this.env.debug.map.forEach(unit => unit.updateLogic());
  }
}

