class MovieClipFactory extends BaseClass 
{
	public constructor() 
	{
		super();
	}

	public createMC(name:string, mcName:string):egret.MovieClip
	{
		var jsonName = name + "_json";
		var textureName = name + "_png";

		var data = RES.getRes(jsonName);
		var texture = RES.getRes(textureName); 
		var mcDataFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, texture);
		var mc:egret.MovieClip = new egret.MovieClip(mcDataFactory.generateMovieClipData(mcName));
		return mc;
	}
}