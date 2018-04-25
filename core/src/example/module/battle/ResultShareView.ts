class ResultShareView extends eui.Component
{
	public imgIcon1:IconImg;
	public imgIcon2:IconImg;

	public lblName1:eui.Label;
	public lblName2:eui.Label;

	public lblScore1:eui.Label;
	public lblScore2:eui.Label;

	public constructor() 
	{
		super();
		
		this.skinName = "resource/skins/ResultShareSkin.exml";
	}
}