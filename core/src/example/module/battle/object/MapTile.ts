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

class MapTile extends egret.DisplayObjectContainer
{
	public index:number;
    public col: number;
    public row: number;
	public type:number;
    public face:number;
    public sign:boolean = false;

    private tileBitmap:egret.Bitmap;
    private signBitmap:egret.Bitmap;

    public constructor() 
	{
        super();
        
        this.tileBitmap = new egret.Bitmap();
        this.addChild(this.tileBitmap);
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
            this.tileBitmap.texture = RES.getRes("tile_narmal");
        }
        else if(this.type == TileType.Trap)
        {
            this.tileBitmap.texture = RES.getRes("tile_trap");
            
            if (this.index == 114)
                this.alpha = 0;

            if (this.sign)
            {
                this.signBitmap = new egret.Bitmap();
                this.signBitmap.texture = RES.getRes("tile_twosign");
                this.signBitmap.x -= 15;
                this.signBitmap.y = -70;
                this.addChild(this.signBitmap);
            }
        }
        else if(this.type == TileType.End)
        {
            this.tileBitmap.texture = RES.getRes("tile_end");
            this.y -= 70;
        }
	}

    public up()
    {
        if (this.type == TileType.Trap)
            return;

        this.tileBitmap.texture = RES.getRes("tile_narmal");
    }

    public down()
    {
        if (this.type == TileType.Trap)
            return;

        this.tileBitmap.texture = RES.getRes("tile_down");
    }

    public show():void
    {
        this.visible = true;
    }

    public hide():void
    {
        this.visible = false;
    }
}