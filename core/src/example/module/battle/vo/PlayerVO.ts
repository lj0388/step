class PlayerVO 
{
	public uid:string;
    public name:string;
    public icon:string;
   
    public updateData(data:any):void
    {
        this.uid = data.uid;
        this.name = data.name;
        this.icon = data.icon;
    }
}