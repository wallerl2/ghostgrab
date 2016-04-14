using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class LocationTest : MonoBehaviour {
    Text txt;
	// Use this for initialization
	void Start () {
        txt = GetComponent<Text>();
        Input.location.Start(.5f, .5f);

    }
	
	// Update is called once per frame
	void Update () {
        txt.text = "Location: " + Input.location.lastData.latitude + " " + Input.location.lastData.longitude + " " + Input.location.lastData.altitude + " " + Input.location.lastData.horizontalAccuracy + " " + Input.location.lastData.timestamp;
	}

}
