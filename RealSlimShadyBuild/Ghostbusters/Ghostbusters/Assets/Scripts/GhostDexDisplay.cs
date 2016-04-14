using UnityEngine;
using UnityEngine.UI;
using System.Collections;

public class GhostDexDisplay : MonoBehaviour {
    
    public Button forwardButton;
    public Button backButton;
    int curPage = 0;
	// Use this for initialization
	void Start () {
        loadPageInstance(curPage);
	}
	
	// Update is called once per frame
	void Update () {
	
	}

    void loadPageInstance(int page)
    {
        backButton.gameObject.SetActive(true);
        forwardButton.gameObject.SetActive(true);
        if (curPage == 0)
        {
            backButton.gameObject.SetActive(false);
        }
        if ((curPage * 10)+10 >= GhostDex.dex.Length)
        {
            forwardButton.gameObject.SetActive(false);
        }
        int counter = 1;
        foreach(Transform t in this.transform){
            if ((counter + curPage*10) > GhostDex.dex.Length)
            {
                t.gameObject.SetActive(false);
            }
            else
            {

                t.gameObject.SetActive(true);
                Text[] texts = t.GetComponentsInChildren<Text>();
                texts[0].text = "#" + (curPage * 10 + counter);
                texts[1].text = GhostDex.dex[(curPage * 10) - 1 + counter].name;
                texts[2].text = GhostDex.dex[(curPage * 10) - 1 + counter].flavorText;
                Image[] img = t.GetComponentsInChildren<Image>();
                img[1].sprite = GhostDex.dex[(curPage * 10) - 1 + counter].pic;
                counter++;
            }
        }
    }

    public void nextPage()
    {
        curPage++;
        loadPageInstance(curPage);
    }

    public void prevPage()
    {
        curPage--;
        loadPageInstance(curPage);
    }
}
