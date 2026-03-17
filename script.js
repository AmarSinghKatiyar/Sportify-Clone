console.log("lets write javascript");
let currentsong=new Audio();


async function getSongs(){   
    let a= await fetch("/Songs/")
    let response = await a.text();
    console.log(response)
    let div =document.createElement("div")
    div.innerHTML=response;
    let as =div.getElementsByTagName("a")

    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")){
            songs.push(element.href.split("/Songs/")[1])
        }
        
    }
    return songs
}

const playMusic = (track)=>{
    // let audio = new Audio("/Songs/"+track)
    currentsong.src = "/Songs/"+track
    currentsong.play()
    play.src="pause.svg"
    document.querySelector(".songinfo").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"

}


async function main(){

    //get the list of all the songs
    let songs = await getSongs()

    //show all the sonng in the playist
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    // songul.innerHTML=""; // if apply this then music.svg not work
    for (const song of songs) {
        songul.innerHTML=songul.innerHTML + `<li><img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")} </div>
                                <div>Amar</div>
                            </div>
                            <div class="playnow">
                                <span>Play Now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div></li>`; 
    }

    //play the first song
    // var audio = new Audio(songs[0]);
    // audio.play();
    // audio.addEventListener("loadeddata",()=>{
    //     console.log(audio.duration,audio.currentSrc,audio.currentTime)
    //     //duration variable holds the duration of song in seconds of the audio clip
    // });

    //attach event listener to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click",element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)   
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
        })
    })
    //attach an event listener to play, next and previous
    play.addEventListener("click",()=>{
        if (currentsong.paused){
            currentsong.play()
            play.src="pause.svg"
        }
        else{
            currentsong.pause()
            play.src="play.svg"
        }
    })

    //listen for time update event
    currentsong.addEventListener("timeupdate",()=>{
        console.log(currentsong.currentTime,currentsong.duration);
    })

}

main()