using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;
using System.Collections;
using System;


public class DoesScoreUpdateWork : MonoBehaviour {
	public Text txt;
	// Use this for initialization
	void Start () {

	}

	// Update is called once per frame
	void Update () {

	}

	public void go()
	{
		Hashtable data = new Hashtable();

		data.Add("name", "Brent");
		data.Add ("ghostName", "Dreaded Wheat");

		HTTP.Request someRequest2 = new HTTP.Request("post", "http://ghostgrab.ddns.net:5001/catchghost", data);
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
		NameManager.userName = txt.text;
		SceneManager.LoadScene("ForTesting");
	}

}