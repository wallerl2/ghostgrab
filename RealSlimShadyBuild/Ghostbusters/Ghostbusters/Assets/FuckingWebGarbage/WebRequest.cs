using UnityEngine;
using System.Collections;
using UnityEngine.Experimental.Networking;
using System;
using System.Diagnostics;

public class WebRequest : MonoBehaviour {

	// Use this for initialization
	void Start () {
        //get
        HTTP.Request someRequest = new HTTP.Request("get", "http://ghostgrab.ddns.net:5001/reset");
        someRequest.Send((request) => {
            // parse some JSON, for example:
            JSONObject thing = new JSONObject(request.response.Text);
            String str = request.response.Text;
            UnityEngine.Debug.Log("HELLO");
            UnityEngine.Debug.Log(str);
            UnityEngine.Debug.Log(thing);
        });

        Hashtable data = new Hashtable();

        data.Add("name", "Test");

        HTTP.Request someRequest2 = new HTTP.Request("post", "http://ghostgrab.ddns.net:5001/addUser", data);
        someRequest2.Send((request) => {
            // parse some JSON, for example:
            bool result = false;
            Hashtable thing = (Hashtable)JSON.JsonDecode(request.response.Text, ref result);
            String str = request.response.Text;
            UnityEngine.Debug.Log("POST");
            UnityEngine.Debug.Log(str);
            if (!result)
            {
                UnityEngine.Debug.Log("Could not parse JSON response!");
                return;
            }
        });

    }

    // Update is called once per frame
    void Update()
    {
    }
}
