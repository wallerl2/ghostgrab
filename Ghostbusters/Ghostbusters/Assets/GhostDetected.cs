using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class GhostDetected : MonoBehaviour {
    Text txt;
	// Use this for initialization
	void Start () {
        txt = GetComponent<Text>();
	}
	
	// Update is called once per frame
	void Update () {
        if (Input.location.lastData.latitude >= 35 && Input.location.lastData.latitude <= 36)
        {
            txt.text = "GHOST DETECTED!";
            GetComponentInChildren<Image>().enabled = true;
            GetComponentsInChildren<Text>()[1].enabled = true;
        }
        else
        {
            txt.text = "NO GHOSTS DETECTED!";
            GetComponentInChildren<Image>().enabled = false;
            GetComponentsInChildren<Text>()[1].enabled = false;
        }
    }
}
