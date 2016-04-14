using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class GoToUserScreen : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    public void go()
    {
        SceneManager.LoadScene("UserScreen");
    }

    public void go2()
    {
        SceneManager.LoadScene("test1");
    }

    public void goGhost()
    {
        SceneManager.LoadScene("GhostDex");
    }

    public void goLead()
    {
        SceneManager.LoadScene("Leaderboard");
    }
}
