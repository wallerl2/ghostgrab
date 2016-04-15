using UnityEngine;
using System.Collections;
using System;
using UnityEngine.UI;

public class GetLeaderboard : MonoBehaviour {

    // Use this for initialization
    void Start() {
        Hashtable data = new Hashtable();
		string[] splitResponse = { };

        data.Add("name", NameManager.userName);
        data.Add("score:", NameManager.score);

        HTTP.Request someRequest2 = new HTTP.Request("post", "http://ghostgrab.ddns.net:5001/updateleaderboard", data);
        someRequest2.Send((request) => {
            // parse some JSON, for example:
            String response = request.response.Text;

            UnityEngine.Debug.Log("POST");
            UnityEngine.Debug.Log(response);

			// remove all brackets
			response = response.Replace("[", "");
			response = response.Replace("]", "");
			UnityEngine.Debug.Log(response);

			// split on commas
			char[] comma = {','};
			splitResponse = response.Split(comma);

			// update leaderboard
			int editsToMake = splitResponse.Length;
			int counter = 0;
			int location = 0;
			foreach(Transform t in transform) {
				Text[] texts = t.GetComponentsInChildren<Text>();

				if (counter < editsToMake) {
					texts[0].text = "#" + counter;
					texts[1].text = splitResponse[location];
					texts[2].text = "Score: " + splitResponse [location + 1];
				} else {
					texts[0].text = "#" + counter;
					texts[1].text = "No User";
					texts[2].text = "Score: N/A";
				}
				counter += 1;
				location += 2;
			}
        });
       
    }
	
	// Update is called once per frame
	void Update () {
	
	}
}
