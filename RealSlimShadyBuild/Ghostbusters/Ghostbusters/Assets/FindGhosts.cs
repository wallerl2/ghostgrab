using UnityEngine;
using System.Collections;
using System;

public class FindGhosts : MonoBehaviour {

	// Use this for initialization
	void Start () {
        getUpdatedGhosts();
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public static void getUpdatedGhosts()
    {
        String temp;

        HTTP.Request someRequest2 = new HTTP.Request("get", "http://ghostgrab.ddns.net:5001/getupdatedghostlocations");
        someRequest2.Send((request) => {
            // parse some JSON, for example:
            String str = request.response.Text;
            UnityEngine.Debug.Log("GET");
            UnityEngine.Debug.Log(str);

        });
    }
}
