using UnityEngine;
using System.Collections;
using System;
using UnityEngine.UI;

public class GetLeaderboard : MonoBehaviour {

    // Use this for initialization
    void Start() {
        Hashtable data = new Hashtable();
        String temp;

        data.Add("name", NameManager.userName);
        data.Add("score:", NameManager.score);

        HTTP.Request someRequest2 = new HTTP.Request("post", "http://ghostgrab.ddns.net:5001/updateleaderboard", data);
        someRequest2.Send((request) => {
            // parse some JSON, for example:
            String str = request.response.Text;
            UnityEngine.Debug.Log("POST");
            UnityEngine.Debug.Log(str);
            
        });

        int counter = 1;
        foreach(Transform t in transform)
        {
            Text[] texts = t.GetComponentsInChildren<Text>();
            texts[0].text = "#" + counter;
            texts[1].text = "USERzzz";
            texts[2].text = "Score:" + "wtf";
            counter++;
        }
    }
	
	// Update is called once per frame
	void Update () {
	
	}
}
