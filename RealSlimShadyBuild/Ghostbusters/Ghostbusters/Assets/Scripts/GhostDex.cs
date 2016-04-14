using UnityEngine;
using System.Collections;

public class GhostDex : MonoBehaviour {
    public static Ghost[] dex;
    public string[] names;
    public Sprite[] pics;
    public string[] flavorText;
	// Use this for initialization
	void Start () {
        int curId = 1;
        dex = new Ghost[names.Length];
	    foreach(string name in names)
        {
            dex[curId - 1] = new Ghost(name, flavorText[curId - 1], pics[curId - 1], 100, curId);
            curId++;
        }
        
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
