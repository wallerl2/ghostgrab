using UnityEngine;
using System.Collections;
using System;

public class GetUpdatedGhostLocations : MonoBehaviour {

	// Use this for initialization
	void Start () {
        //get
        HTTP.Request someRequest = new HTTP.Request("get", "http://ghostgrab.ddns.net:5001/getupdatedghostlocations");
        someRequest.Send((request) => {
            // parse some JSON, for example:
            JSONObject thing = new JSONObject(request.response.Text);
            String str = request.response.Text;
            UnityEngine.Debug.Log("Get Updated Ghost Locations");
            UnityEngine.Debug.Log(str);
            
            UnityEngine.Debug.Log(JSON.JsonDecode(request.response.Text));
            
        });
    }
	
	// Update is called once per frame
	void Update () {
	
	}
}
