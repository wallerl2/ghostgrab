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

			// remove all brackets
			response = response.Replace("[", "");
			response = response.Replace("]", "");

			// split on commas
			char[] comma = {','};
			splitResponse = response.Split(comma);

			// update leaderboard
			int editsToMake = splitResponse.Length;
			int counter = 0;
			foreach(Transform t in transform) {
				Text[] texts = t.GetComponentsInChildren<Text>();

				if (counter < editsToMake) {
					texts[0].text = "#" + (counter/2 + 1).ToString();
					texts[1].text = splitResponse[counter].Substring(1,splitResponse[counter].Length - 2);
					texts[2].text = "Score: " + splitResponse [counter + 1];
				} else {
					texts[0].text = "#" + (counter/2 + 1).ToString();
					texts[1].text = "No User";
					texts[2].text = "Score: N/A";
				}
				counter += 2;
			}
        });
       
    }
	
	// Update is called once per frame
	void Update () {
	
	}
}
