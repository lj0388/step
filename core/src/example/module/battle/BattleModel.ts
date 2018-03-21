class BattleModel extends BaseModel 
{
    public mapId: number;
    public playerData: any;
    public monsterNum: number;

    public players:PlayerVO[] = [];

    public constructor($controller: BaseController) 
    {
        super($controller)
    }

    
    public updateData(data:any):void
    {
        for (var i:number = 0; i < data.length; i++)
        {
            var d = data[i];
            var vo:PlayerVO = new PlayerVO();
            vo.updateData(d);
            this.players.push(vo);
        }       
        
    }
}