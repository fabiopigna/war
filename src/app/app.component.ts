import { SoldierConfig } from './units/soldier/SoldierConfig';
import { NewQuadTree } from './NewQuadTree';
import { GBounds, GSize } from './shapes/Geometry';
import { Unit } from './units/Unit';
import { TextureLibrary } from './graphics/TextureLibrary';
import { Army } from './units/army/Army';
import { RectangleShape } from './shapes/RectangleShape';
import { autoDetectRenderer } from 'pixi.js';
import { SystemRenderer, Container, Graphics, Application, Point, particles, Sprite, Texture, extras, loaders } from 'pixi.js';
import { Component, ElementRef, OnInit } from '@angular/core';
import { Environment } from "app/environment/Environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  public fps: string;

  public width: number = 1024
  public height: number = 400;
  public app: Application;
  public stage: Container;

  public redArmy: Army;
  public blackArmy: Army;
  public map: Map<string, Unit>;
  public env: Environment;
  public textureLibrary: TextureLibrary;
  constructor(private elementRef: ElementRef) {
    this.textureLibrary = new TextureLibrary();

  }


  ngOnInit(): void {
    this.app = new Application(this.width, this.height, { antialias: true });
    this.map = new Map<string, Unit>();


    this.stage = this.app.stage;
    this.app.renderer.backgroundColor = 0x447711;

    this.elementRef.nativeElement.appendChild(this.app.view);
    this.textureLibrary.load().onComplete.add(() => {
      this.env = new Environment(this.map, this.textureLibrary);
      this.env.worldBounds = GBounds.from(0, 0, this.width, this.height);
      this.env.stage = this.stage;
      let blackConfig: SoldierConfig = new SoldierConfig();
      blackConfig.textures = this.textureLibrary.soldierTexture;
      blackConfig.armyKey = 'black';
      blackConfig.isHuman = true;

      this.blackArmy = new Army(this.env, blackConfig);
      this.blackArmy.createSoldiers(10, GBounds.from(0, 0, this.env.worldBounds.width * 0.5, this.env.worldBounds.height));

      let redConfig: SoldierConfig = new SoldierConfig();
      redConfig.textures = this.textureLibrary.soldierRedTexture;
      redConfig.armyKey = 'red';

      this.redArmy = new Army(this.env, redConfig);
      this.redArmy.createSoldiers(10, GBounds.from(this.env.worldBounds.width * 0.5, 0, this.env.worldBounds.width * 0.5, this.env.worldBounds.height));
      console.log(this.redArmy.soldiers)
      this.app.ticker.add((delta) => this.gameLoop(delta));
    });
  }




  public gameLoop(delta: number): void {
    this.fps = this.app.ticker.FPS.toFixed(0);
    this.env.quadTree = new NewQuadTree<Unit>({ x: 0, y: 0, width: this.width, height: this.height }, 10);
    this.env.quadTree.insert(Array.from<Unit>(this.map.values()).filter(unit => unit.canBeHit));
    this.map.forEach((unit: Unit) => {
      unit.updateLogic(delta);
    })
  }
}
