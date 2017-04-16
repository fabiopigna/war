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
import { Component, ElementRef, OnInit } from '@angular/core';
import { Environment } from "app/environment/Environment";
import { World } from "app/units/world/World";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public fps: string;
  public app: Application;

  public redArmy: Army;
  public blackArmy: Army;
  public map: Map<string, IUnit>;
  public env: Environment;
  public textureLibrary: TextureLibrary;
  constructor(private elementRef: ElementRef) {
    this.textureLibrary = new TextureLibrary();

  }


  ngOnInit(): void {

    let envConfig: EnvironmentConfig = new EnvironmentConfig();
    let worldConfig: WorldConfig = new WorldConfig();
    this.app = new Application(worldConfig.width, worldConfig.height, { antialias: true });
    this.map = new Map<string, IUnit>();

    this.app.renderer.backgroundColor = 0x447711;

    this.elementRef.nativeElement.appendChild(this.app.view);
    this.textureLibrary.load().onComplete.add(() => {
      this.env = new Environment(this.map, this.textureLibrary);
      this.env.world = new World(this.env, worldConfig, this.app.stage);

      let blackConfig: SoldierConfig = new SoldierConfig();
      blackConfig.textures = this.textureLibrary.soldierTexture;
      blackConfig.armyKey = 'black';
      blackConfig.isHuman = true;

      this.blackArmy = new Army(this.env, blackConfig);
      this.blackArmy.createSoldiers(100, GBounds.from(0, 0, this.env.world.getBounds().width * 0.5, this.env.world.getBounds().height));

      let redConfig: SoldierConfig = new SoldierConfig();
      redConfig.textures = this.textureLibrary.soldierRedTexture;
      redConfig.armyKey = 'red';

      this.redArmy = new Army(this.env, redConfig);
      this.redArmy.createSoldiers(100, GBounds.from(this.env.world.getBounds().width * 0.5, 0, this.env.world.getBounds().width * 0.5, this.env.world.getBounds().height));
      console.log(this.redArmy.soldiers)
      this.app.ticker.add((delta) => this.gameLoop(delta));
    });
  }


  public gameLoop(delta: number): void {
    this.fps = this.app.ticker.FPS.toFixed(0);
    this.env.updateQuadTree();
    this.map.forEach((unit: IUnit) => {
      unit.updateLogic(delta);
    })
  }
}
