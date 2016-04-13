using UnityEngine;
using System.Collections;
using System;
using UnityEngine.Experimental.Networking;

public class sendname : MonoBehaviour {

	// Use this for initialization
	void Start () {
        var postScoreURL = "ghostgrab.ddns.net:5001/addUser";
        var jsonString = "{ 'name' : 'test' }";


        // StartCoroutine(GetText());
        //Hashtable data = new Hashtable();
        WWWForm data = new WWWForm();

        data.AddField("name", "Test");

       HTTP.Request someRequest = new HTTP.Request("post", "http://ghostgrab.ddns.net:5001/addUser", data);
       someRequest.Send((request) => {
           // parse some JSON, for example:
           bool result = false;
           Hashtable thing = (Hashtable)JSON.JsonDecode(request.response.Text, ref result);
           String str = request.response.Text;
           UnityEngine.Debug.Log("POST2");
           UnityEngine.Debug.Log(str);
           if (!result)
           {
               UnityEngine.Debug.Log("Could not parse JSON response!");
               return;
           }
       });
    }
	
	// Update is called once per frame
	void Update () {
	
	}
IEnumerator GetText()
{
    var bodyData = "{ 'name': 'Test' }";
    var postData = System.Text.Encoding.UTF8.GetBytes(bodyData);
    using (UnityWebRequest req = UnityWebRequest.Post("ghostgrab.ddns.net:5001/addUser", bodyData))
    {
        yield return req.Send();
        // ...
    }

}
}
