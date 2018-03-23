class BattleView extends BaseSpriteView 
{
    private controller:BaseController;

    private bg:egret.Bitmap;
    private background: egret.Bitmap;
    public gameObjcetLayer: egret.DisplayObjectContainer;
    private gameEffectLayer: egret.DisplayObjectContainer;
    private blocksData: number[][];
    //public  player: Player;
    private enemys: RpgMonster[];
   
    public players:Object = {};

    public constructor($controller:BaseController, $parent:egret.DisplayObjectContainer) 
	{
        super($controller, $parent);
        this.controller = $controller;
    }


    public initUI(): void 
    {
        super.initUI();

        this.background = new egret.Bitmap();
        this.background.texture = RES.getRes("battle_bg_jpg");
        this.addChild(this.background);

        var maskLayer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        maskLayer.mask = new egret.Rectangle(0,0,700,900);
        this.addChild(maskLayer);

        this.gameObjcetLayer = new egret.DisplayObjectContainer();       
        maskLayer.addChild(this.gameObjcetLayer);

        this.gameEffectLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameEffectLayer);
    }


    public initData(): void
    {
        super.initData();
        this.initMap();
        this.initPlayers();
        //this.createPlayer();
        //this.createBeginMc();
        //this.monsters = [];
    }

    /**
     * 面板开启执行函数，用于子类继承
     * @param param 参数
     */
    public open(...param: any[]): void
    {
        super.open(param);

        
        //var gameModel:BattleModel = param[0];

        // this.initBackground(gameModel.mapId);
        // this.initBlocks(gameModel.mapId);
       // this.createPlayer(gameModel.playerData);
        // this.createMonsters(gameModel.monsterNum);
    }

    
    private oldTile:MapTile = null;
   
    public cells:Object = {};

    private initMap():void
    {
        var seed:number = 5;   
        function aaa (max, min) {   
        max = max || 1;  
        min = min || 0;   
        seed = (seed * 9301 + 49297) % 233280;   
        var rnd = seed / 233280.0;  
        return min + rnd * (max - min);   
        };  


        var arr:any[] = BattleData.mapData;
        var len = arr.length;
        for (var i:number = 0; i < len; i++)
        {
            var cellData:any = arr[i];
            cellData.type = TileType.Normal;

            var tile:MapTile = new MapTile();
            
            if (this.oldTile != null && this.oldTile.type != TileType.Trap)
            {
               
                //if (Math.random() > 0.6)
                if (aaa(10,1) >= 5)
                {
                    cellData.type = TileType.Trap;
                }
            }
            
            if (i == len -1)
                cellData.type = TileType.End;

            // if (i == 3)
            //     cellData.type = TileType.End;
                
            tile.initData(cellData);
            this.gameObjcetLayer.addChild(tile);
            this.oldTile = tile;
            this.cells[tile.index] = tile;
        }            
        
        this.gameObjcetLayer.x =  40;
        this.gameObjcetLayer.y = App.StageUtils.getHeight() - 350;

        // var bit:egret.Bitmap = new egret.Bitmap();  
        // bit.texture = RES.getRes("tile_narmal");
        // this.gameObjcetLayer.addChild(bit);
    }

  
    private getRandom (max, min):number
    {   
        var seed:number = 5;   
        max = max || 1;  
        min = min || 0;   
        seed = (seed * 9301 + 49297) % 233280;   
        var rnd = seed / 233280.0;  
        return min + rnd * (max - min);   
    };  

    private initPlayers():void
    {
        var data:PlayerVO[] = GlobalData.battleModel.players;
        for (var i:number = 0; i < data.length; i++)
        {
            var d = data[i];
            var player:Player = new Player();
            player.view = this;
            player.initData(d);
            player.initPosition(this.cells[1]);
            this.gameObjcetLayer.addChild(player);
            this.players[d.uid] = player;
        }       
    }

    public getPlayer(uid:string):Player
    {
        if (this.players.hasOwnProperty(uid))
        {
            return this.players[uid];
        }

        return null;
    }

    // private createPlayer():void
    // {
    //     this.player = new Player();
    //     this.player.view = this;
    //     this.player.initData({});   //test
    //     this.player.initPosition(this.cells[1]);
    //     this.gameObjcetLayer.addChild(this.player);
    // }

    private createBeginMc():void
    {
        App.SoundManager.playEffect("sound_readygo");
        //this.player.isStart = true;
    }
    // private createPlayer(data:any)
    // {
    //      //创建主角
    //     // this.hero = ObjectPool.pop("Hero", this.controller);
    //     // this.hero.init();
    //     // this.hero.x = App.StageUtils.getWidth() * 0.3;
    //     // this.hero.y = App.StageUtils.getHeight() * 0.7;
    //     // this.objectContainer.addChild(this.hero);
    // }

    //  private createPlayer(playData: any): void 
    //  {
    //     var col: number = App.RandomUtils.limitInteger(1, this.blocksData[0].length - 2);
    //     var row: number = App.RandomUtils.limitInteger(1, this.blocksData.length - 2);

    //     this.player = ObjectPool.pop("RpgPlayer");
    //     this.player.init({
    //         col: col,
    //         row: row,
    //         mcName: playData.mcName,
    //         mcPath: "resource/assets/rpgGame/player/",
    //         skillPath: "resource/assets/rpgGame/skill/",
    //         gameView: this,
    //         propertyData: playData.propertyData
    //     });
    // }
}