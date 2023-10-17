(function(h,_){typeof exports=="object"&&typeof module<"u"?_(exports):typeof define=="function"&&define.amd?define(["exports"],_):(h=typeof globalThis<"u"?globalThis:h||self,_(h.Game={}))})(this,function(h){"use strict";class _ extends vm.PIXI.Container{constructor(e){super(),this._style=e.style,this._size=e.size;const t=new vm.PIXI.Sprite(e.style.backgroundTexture),i=e.style.marginSize*2+e.style.separatorSize*(e.size-1);t.width=i+e.style.tileSize*e.size,t.height=t.width,this.addChild(t),this._tiles=new Array;for(let r=0;r<this._size;r++){let l=this._tiles[r]=[];for(let n=0;n<this._size;n++){l.push(null);const o=this.tilePosition({i:r,j:n}),c=new vm.PIXI.Sprite(e.style.emptyTileTexture);c.anchor.set(.5),c.position.set(o.x,o.y),this.addChild(c)}}}get size(){return this._size}eachTile(e){for(var t=0;t<this._size;t++)for(var i=0;i<this._size;i++)e(t,i,this._tiles[t][i])}availableTiles(){let e=[];return this.eachTile((t,i,r)=>{r||e.push({i:t,j:i})}),e}randomAvailableTile(){var e=this.availableTiles();if(e.length!==0)return e[Math.floor(Math.random()*e.length)]}get tilesAvailable(){return this.availableTiles().length!==0}get movesAvailable(){return this.tilesAvailable||this.blockMatchesAvailable}getVector(e){var t={0:{i:0,j:-1},1:{i:1,j:0},2:{i:0,j:1},3:{i:-1,j:0}};return t[e]}get blockMatchesAvailable(){for(var e,t=0;t<this._size;t++)for(var i=0;i<this._size;i++)if(e=this.tileContent({i:t,j:i}),e)for(var r=0;r<4;r++){var l=this.getVector(r),n={i:t+l.i,j:i+l.j},o=this.tileContent(n);if(o&&o.value===e.value)return!0}return!1}withinBounds(e){return e.i>=0&&e.i<this._size&&e.j>=0&&e.j<this._size}tileContent(e){return this.withinBounds(e)?this._tiles[e.i][e.j]:null}tileOccupied(e){return this.tileContent(e)!==null}tileAvailable(e){return!this.tileOccupied(e)}setBlock(e,t){this._tiles[e.i][e.j]=t}tilePosition(e){return{x:this._style.marginSize+(this._style.tileSize+this._style.separatorSize)*e.i+this._style.tileSize/2,y:this._style.marginSize+(this._style.tileSize+this._style.separatorSize)*e.j+this._style.tileSize/2}}findFarthestPosition(e,t){let i;do i=e,e={i:i.i+t.x,j:i.j+t.y};while(this.withinBounds(e)&&this.tileAvailable(e));return{farthest:i,next:e}}buildTraversals(e){for(var t={x:[],y:[]},i=0;i<this._size;i++)t.x.push(i),t.y.push(i);return e.x===1&&(t.x=t.x.reverse()),e.y===1&&(t.y=t.y.reverse()),t}saveState(){return this._tiles.map(e=>e.map(t=>t!==null?t.value:0))}}class w extends vm.PIXI.Container{constructor(e){super();const t=new vm.PIXI.Sprite(e.style.backgroundTexture);t.width=e.width,t.height=e.height,this.addChild(t),this._text=new vm.PIXI.BitmapText("",{fontName:e.style.fontName,fontSize:e.style.fontSize}),this._text.anchor=new vm.PIXI.Point(.5,1),this._text.position.set(t.width/2,t.height),this.addChild(this._text)}set score(e){this._text.text=e.toString()}reset(){this.score=0}}var u=(s=>(s[s.UP=0]="UP",s[s.RIGHT=1]="RIGHT",s[s.DOWN=2]="DOWN",s[s.LEFT=3]="LEFT",s))(u||{});function I(s){var e={0:{x:0,y:-1},1:{x:1,y:0},2:{x:0,y:1},3:{x:-1,y:0}};return e[s]}var d=(s=>(s[s.IDLE=0]="IDLE",s[s.MOVE=1]="MOVE",s[s.MOVE_AND_MERGE=2]="MOVE_AND_MERGE",s[s.MERGE=3]="MERGE",s))(d||{});class y extends vm.PIXI.Sprite{constructor(e){super(),this.mode=0,this._style=e.style,this.width=e.size,this.height=e.size,this.anchor.set(.5,.5),this.texture=e.style.backgroundTexture,this._text=new vm.PIXI.BitmapText("",{fontName:e.style.smallFontName}),this._text.anchor=new vm.PIXI.Point(.5,.5),this._text.position.set(0,0),this.addChild(this._text),this.value=2}get value(){return this._value}set value(e){this._value=e;const t=e.toString(),i=t.length;this._text.text=t,this._style.colors[e].textColor===void 0&&console.log("undef ",e),this._text.tint=this._style.colors[e].textColor,this.tint=this._style.colors[e].backgroundColor,i<2?(this._text.fontName=this._style.smallFontName,this._text.fontSize=this._style.smallFontSize):i<3?(this._text.fontName=this._style.mediumFontName,this._text.fontSize=this._style.mediumFontSize):i<4?(this._text.fontName=this._style.largeFontName,this._text.fontSize=this._style.largeFontSize):i<5?(this._text.fontName=this._style.xLargeFontName,this._text.fontSize=this._style.xLargeFontSize):(this._text.fontName=this._style.xxLargeFontName,this._text.fontSize=this._style.xxLargeFontSize)}}class k{constructor(){this._done=!1}get done(){return this._done}tick(e){throw new Error("Method not implemented.")}then(e){this._then=e}complete(){this._done=!0,this._then!==void 0&&this._then()}}class T extends k{constructor(e,t,i){super(),this._block=e,this._target=t,this._speed=i}tick(e){this.done||(this._block.position.set(this._block.position.x+(this._target.x-this._block.position.x)*e*this._speed,this._block.position.y+(this._target.y-this._block.position.y)*e*this._speed),Math.abs(this._block.position.x-this._target.x)<.01&&Math.abs(this._block.position.y-this._target.y)<.01&&(this._block.position.set(this._target.x,this._target.y),this.complete()))}}class p extends k{constructor(e,t,i){super(),this._grow=!0,this._maxScale=1.25,this._block=e,e.value=t,this._speed=i}tick(e){if(!this.done)if(this._grow){let t=this._block.scale.x+e*this._speed;t>=this._maxScale&&(t=this._maxScale,this._grow=!1),this._block.scale.set(t,t)}else{let t=this._block.scale.x-e*this._speed;t<=1&&(t=1,this.complete()),this._block.scale.set(t,t)}}}const P=4,B=2,E=16+6,b={backgroundTexture:x,fontName:"2048Big",fontSize:14},f={backgroundTexture:x,smallFontName:"2048Big",smallFontSize:14,mediumFontName:"2048Small",mediumFontSize:10,largeFontName:"2048Big",largeFontSize:7,xLargeFontName:"2048Small",xLargeFontSize:5,xxLargeFontName:"2048Small",xxLargeFontSize:5,colors:Object.assign({},...[[2,0,16777215],[4,0,16777215],[8,0,16777215],[16,0,16777215],[32,0,16777215],[64,0,16777215],[128,0,16777215],[256,0,16777215],[512,0,16777215],[1024,0,16777215],[2048,0,16777215],[4096,0,16777215],[8192,0,16777215],[16384,0,16777215],[32768,0,16777215]].map(s=>({[s[0]]:{textColor:s[1],backgroundColor:s[2]}})))},m={backgroundTexture:x,emptyTileTexture:C,marginSize:6,separatorSize:4,tileSize:26};var x,C,a;class N extends vm.PIXI.Container{constructor(){super(),this._blockPool=[],this._tweens=[],this.header=new w({width:vm.width,height:E,style:b}),this.addChild(this.header),this.grid=new _({size:P,style:m}),this.grid.position.set(0,this.header.height),this.grid.sortableChildren=!0,this.addChild(this.grid),this._startTiles=B;const e=new y({size:m.tileSize,style:f});this._blockPool.push(e),this.reset()}get score(){return this._score}set score(e){this._score=e,this.header.score=e}reset(){this.header.reset(),this.clear(),this.addStartBlocks(),this.mode=0,this.moveDirection=u.UP,this.score=0}clear(){for(let e=0;e<this.grid.size;++e)for(let t=0;t<this.grid.size;++t)this.removeBlock({i:e,j:t})}acquireBlock(){const e=this._blockPool.pop();return e!==void 0?e:new y({size:m.tileSize,style:f})}releaseBlock(e){this.grid.removeChild(e),this._blockPool.push(e)}addDebugBlocks(){let e=2;for(let t=0;t<this.grid.size;++t)for(let i=0;i<this.grid.size;++i)if(this.insertBlock({i:t,j:i},e),e*=2,e>32768)return}addStartBlocks(){for(let e=0;e<this._startTiles;++e)this.addRandomBlock()}addRandomBlock(){this.grid.tilesAvailable&&this.insertBlock(this.grid.randomAvailableTile(),Math.random()<.9?2:4)}insertBlock(e,t){const i=this.grid.tilePosition(e),r=this.acquireBlock();r.mode=d.IDLE,r.value=t,r.position.set(i.x,i.y),this.grid.addChild(r),this.grid.setBlock(e,r)}removeBlock(e){const t=this.grid.tileContent(e);t!==null&&(this.grid.setBlock(e,null),this.releaseBlock(t))}moveBlock(e,t){const i=this.grid.tileContent(e);if(i===null)return;i.zIndex=0,this.grid.setBlock(e,null);const r=new T(i,this.grid.tilePosition(t),.25);r.then(()=>{i.mode=d.IDLE}),this._tweens.push(r);const l=this.grid.tileContent(t);if(l!==null){l.mode=d.MERGE,l.zIndex=1,i.mode=d.MOVE_AND_MERGE;const n=l.value*2,o=new p(l,n,.1);return o.then(()=>{l.mode=d.IDLE}),this._tweens.push(o),r.then(()=>{this.releaseBlock(i)}),this.score+=n,n}else{this.grid.setBlock(t,i),i.mode=d.MOVE;return}}move(e){if(this.mode!==0||this._tweens.length>0)return;let t=!1;const i=I(e),r=this.grid.buildTraversals(i);r.x.forEach(l=>{r.y.forEach(n=>{let o={i:l,j:n},c=this.grid.tileContent(o);if(c===null)return;const v=this.grid.findFarthestPosition(o,i),g=this.grid.tileContent(v.next);let S;g!==null&&g!==c&&g.mode!==d.MOVE_AND_MERGE&&g.mode!==d.MERGE&&g.value===c.value?(S=this.moveBlock(o,v.next),t=!0):v.farthest!==o&&(S=this.moveBlock(o,v.farthest),t=!0),S===2048&&this.win()})}),t&&(this.addRandomBlock(),this.grid.movesAvailable||this.gameOver())}win(){this.gameOver()}gameOver(){this.mode=1}tick(e){for(let t=0;t<this._tweens.length;++t)this._tweens[t].tick(e),this._tweens[t].done&&(this._tweens.splice(t,1),--t)}loadState(e){if(e===void 0){this.reset();return}this.mode=e.mode,this.score=e.score,this.moveDirection=e.moveDirection,this.clear(),e.grid.map((t,i)=>t.map((r,l)=>{r!==0&&this.insertBlock({i,j:l},r)}))}saveState(){return{isGameOver:this.mode===1,mode:this.mode,score:this.score,grid:this.grid.saveState(),moveDirection:this.moveDirection}}}function F(){return console.log("load called"),new Promise(async s=>{console.log("load assets");const e=new vm.PIXI.Loader;e.add(vm.gameServer.href("assets/MoroboxAIRetro.fnt")),e.add(vm.gameServer.href("assets/2048Small.fnt")),e.add(vm.gameServer.href("assets/2048Big.fnt")),e.add("tileset",vm.gameServer.href("assets/tileset.png")),e.onComplete.add(()=>{console.log("assets loaded");const t=e.resources.tileset.texture;b.backgroundTexture=new vm.PIXI.Texture(t.baseTexture,new vm.PIXI.Rectangle(0,0,16,16)),m.backgroundTexture=new vm.PIXI.Texture(t.baseTexture,new vm.PIXI.Rectangle(0,0,16,16));const i=m.tileSize;m.emptyTileTexture=new vm.PIXI.Texture(t.baseTexture,new vm.PIXI.Rectangle(19,3,i,i)),f.backgroundTexture=new vm.PIXI.Texture(t.baseTexture,new vm.PIXI.Rectangle(51,3,i,i)),a=new N,a.reset(),vm.stage.addChild(a),s()}),e.load()})}function R(s,e){const t=s[0].inputs;t.left?a.move(u.LEFT):t.right?a.move(u.RIGHT):t.up?a.move(u.UP):t.down&&a.move(u.DOWN),a.tick(e)}function A(s){a.loadState(s)}function z(){return a.saveState()}function M(){return z()}h.getStateForAgent=M,h.load=F,h.loadState=A,h.saveState=z,h.tick=R,Object.defineProperty(h,Symbol.toStringTag,{value:"Module"})});
