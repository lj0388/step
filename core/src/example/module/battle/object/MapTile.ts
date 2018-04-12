enum TileType
{
    /**
     * tile类型
     * @type {number}
     */
    Normal = 1,     //正常 
    Trap = 2,       //陷阱
    End = 3         //终点
}

class MapTile extends egret.Bitmap 
{
	public index:number;
    public col: number;
    public row: number;
	public type:number;
    public face:number;

    private tileResKey: string;

    public constructor() 
	{
        super();
    }

	public initData(cellData:any):void
	{
		this.index = cellData.id;
		this.row = cellData.x;
		this.col = cellData.y;
        this.type = cellData.type;
        this.face = cellData.f;

		this.x = (this.col - 1) * BattleData.tileWidth;
        this.y = -(this.row - 1) * BattleData.tileHeight;
        
        
        if (this.type == TileType.Normal)
        {
            this.texture = RES.getRes("tile_narmal");
        }
        else if(this.type == TileType.Trap)
        {
            this.texture = RES.getRes("tile_trap");
        }
        else if(this.type == TileType.End)
        {
            this.texture = RES.getRes("tile_end");
        }
	}

    public up()
    {
        if (this.type == TileType.Trap)
            return;

        this.texture = RES.getRes("tile_narmal");
    }

    public down()
    {
        if (this.type == TileType.Trap)
            return;

        this.texture = RES.getRes("tile_down");
    }

    public show():void
    {
        this.visible = true;
    }

    public hide():void
    {
        this.visible = false;
    }
    // public init(mapId: number, col: number, row: number) 
	// {
    //     this.col = col;
    //     this.row = row;
    //     this.x = this.col * RpgGameData.GameTileWidth;
    //     this.y = this.row * RpgGameData.GameTileHeight;

    //     var tileResName: string = row + "_" + col + ".jpg";
    //     var tileResPath: string = "resource/assets/rpgGame/map/" + mapId + "/" + tileResName;
    //     this.tileResKey = "map_" + mapId + "_" + tileResName;

    //     //异步加载
    //     App.ResourceUtils.createResource(this.tileResKey, "image", tileResPath);
    //     RES.getResAsync(this.tileResKey, function (img: egret.Texture) 
	// 	{
    //         this.texture = img;
    //     }, this);
    // }

    // public destory(): void 
	// {
    //     App.DisplayUtils.removeFromParent(this);
    //     RES.destroyRes(this.tileResKey);
    //     this.texture = null;
    // }
}