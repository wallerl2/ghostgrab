using UnityEngine;
using System.Collections;

public class Ghost {

    public string name;
    public string flavorText;
    public Sprite pic;
    int scoreVal;
    int idNum;
    string uniqueIdentifier;

    public Ghost(string nam, string ft, Sprite p, int s, int idN)
    {
        name = nam;
        flavorText = ft;
        pic = p;
        scoreVal = s;
        idNum = idN;
    }
}
