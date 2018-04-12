class BattleModel extends BaseModel 
{
    public mapId: number;
    public playerData: any;
    public monsterNum: number;

    public players:PlayerVO[] = [];

    public own:PlayerVO;
    public enemy:PlayerVO;

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
            if (vo.uid == GlobalData.userModel.uid)
            {
                this.own = vo;
            }
            else
            {
                this.enemy = vo;
            }

            this.players.push(vo);
        }      
    }
}