console.log("Welcome to Spotify");
// initialize the variables
let songIndex = 0;
let audioElement = new Audio ('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


let songs = [
     {songName:"Oorum Blood (Dude)- Sai Ab", filePath:"songs/1.mp3", coverPath:"covers/1.jpg"},
     {songName:"Kalyani(Remix)", filePath:"songs/2.mp3", coverPath:"covers/2.jpg"},
     {songName:"Yeh Fitoor Mera - Arjit Singh", filePath:"songs/3.mp3", coverPath:"covers/3.jpg"},
     {songName:"Hasi - Ami Mishra, Kunaal Vermaa", filePath:"songs/4.mp3", coverPath:"covers/4.jpg"},
     {songName:"Banjaara - Mithoon, Mohammed Irfan", filePath:"songs/5.mp3", coverPath:"covers/5.jpg"},
     {songName:"Boom Shaka - KR$NA", filePath:"songs/6.mp3", coverPath:"covers/6.jpg"},
     {songName:"Payal - Yo-Yo Honey Singh", filePath:"songs/7.mp3", coverPath:"covers/7.jpg"},
     {songName:"Chahun Main Ya na  - Arijit Singh,Palak Muchhal", filePath:"songs/8.mp3", coverPath:"covers/8.jpg"},
     {songName:"Boyfriend - Karan Aujala", filePath:"songs/9.mp3", coverPath:"covers/9.jpg"},
     {songName:"Milne Hai Mujhse Aayi - Arjit Singh", filePath:"songs/10.mp3", coverPath:"covers/10.jpg"},


     {songName:"Sitare - Arjit Singh", filePath:"songs/11.mp3", coverPath:"covers/11.jpg"},
     {songName:"Arz Kiya Hai | Coke Studio Bharat", filePath:"songs/12.mp3", coverPath:"covers/12.jpg"},
     {songName:"Dooron Dooron - PARESH PAHUJA", filePath:"songs/13.mp3", coverPath:"covers/13.jpg"},
     {songName:"Tere Liye - Atif Asalm", filePath:"songs/14.mp3", coverPath:"covers/14.jpg"},
     {songName:"Afsos - Anuv jain , AP Dillion" , filePath:"songs/15.mp3", coverPath:"covers/15.jpg"},
     {songName:"Ae Dil hai Mushkil - Arijit Singh, Pritam", filePath:"songs/16.mp3", coverPath:"covers/16.jpg"},
     {songName:"Thinking of You - AP Dillion", filePath:"songs/17.mp3", coverPath:"covers/17.jpg"},
     {songName:"Triple OG - Divine", filePath:"songs/18.mp3", coverPath:"covers/18.jpg"},
     {songName:"Meri Ashiqui - Arijit Singh, Palak Muchhal", filePath:"songs/19.mp3", coverPath:"covers/19.jpg"},
     {songName:"STFU OKAY - AP Dillion", filePath:"songs/20.mp3", coverPath:"covers/20.jpg"},
     {songName:"Khat -Navjot Ahuja", filePath:"songs/21.mp3", coverPath:"covers/21.jpg"},
     {songName:"knock knock - KR$NA", filePath:"songs/22.mp3", coverPath:"covers/22.jpg"}
]

// Preload all songs at startup
songs.forEach(song => {
  const audio = new Audio();
  audio.src = song.filePath;
  audio.preload = "auto";  // load audio data in advance
});



function setPlayIcon(svgEl) {
  svgEl.querySelector("path").setAttribute("d", "M5 3v18l15-9-15-9z"); // Play
}
function setPauseIcon(svgEl) {
  svgEl.querySelector("path").setAttribute("d", "M6 19h4V5H6v14zm8-14v14h4V5h-4z"); // Pause
}




// Focus search bar when clicking the icon
document.querySelector('.search-icon').addEventListener('click', () => {
  document.getElementById('searchBar').focus();
});



songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;   // cover image
  element.getElementsByClassName("song")[0].innerText = songs[i].songName; // song title
});

// Reset all play icons to "play"
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songlistplay')).forEach((el) => {
    el.querySelector("svg path").setAttribute("d",
      "M5 3v18l15-9-15-9z"
    ); // Play icon
  });
};






// Add click event listeners to each song's play button
Array.from(document.getElementsByClassName('songlistplay')).forEach((element, i) => {
  element.addEventListener('click', () => {
    if (audioElement.src.includes(songs[i].filePath) && !audioElement.paused) {
      // Pause current song
      audioElement.pause();

      // Reset clicked icon to Play
      element.querySelector("svg path").setAttribute("d",
        "M5 3v18l15-9-15-9z"
      );

      // Reset master play button
      masterPlay.querySelector("svg path").setAttribute("d",
        "M5 3v18l15-9-15-9z"
      );

      gif.style.opacity = 0;

    } else {
      // Play new song
      makeAllPlays(); // reset all icons
      songIndex = i;
      audioElement.src = songs[i].filePath;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();

      // Change clicked icon to Pause
      element.querySelector("svg path").setAttribute("d",
        "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
      );

      // Update master play button too
      masterPlay.querySelector("svg path").setAttribute("d",
        "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
      );

      gif.style.opacity = 1;
    }
  });
});



 
  // Handle master play/pause button
  masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();

    // Change to Pause icon
    masterPlay.querySelector("path").setAttribute("d",
      "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
    );

    gif.style.opacity = 1;

    Array.from(document.getElementsByClassName('songlistplay')).forEach((el, i) => {
      if (audioElement.src.includes(songs[i].filePath)) {
        el.querySelector("svg path").setAttribute("d",
          "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
        ); // Pause
      }
    });

  } else {
    audioElement.pause();

    // Change back to Play icon
    masterPlay.querySelector("path").setAttribute("d",
      "M5 3v18l15-9-15-9z"
    );

    gif.style.opacity = 0;

    Array.from(document.getElementsByClassName('songlistplay')).forEach((el, i) => {
      el.querySelector("svg path").setAttribute("d",
        "M5 3v18l15-9-15-9z"
      ); // Play
    });
  }
});



//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
//update seekbar
 let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
myProgressBar.value= progress;
});

myProgressBar.addEventListener('input',() =>{
  audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
} );   


// Next button
document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0; // loop back to first song
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  // 👉 Sync icons after next
  makeAllPlays(); // reset all to Play
  Array.from(document.getElementsByClassName('songlistplay')).forEach((el, i) => {
    if (i === songIndex) {
      el.querySelector("svg path").setAttribute("d",
        "M6 19h4V5H6v14zm8-14v14h4V5h-4z" // Pause icon
      );
    }
  });

  masterPlay.querySelector("svg path").setAttribute("d",
    "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
  );
  gif.style.opacity = 1;
});

// Previous button
document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1; // loop back to last song
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  // 👉 Sync icons after previous
  makeAllPlays(); // reset all to Play
  Array.from(document.getElementsByClassName('songlistplay')).forEach((el, i) => {
    if (i === songIndex) {
      el.querySelector("svg path").setAttribute("d",
        "M6 19h4V5H6v14zm8-14v14h4V5h-4z" // Pause icon
      );
    }
  });

  masterPlay.querySelector("svg path").setAttribute("d",
    "M6 19h4V5H6v14zm8-14v14h4V5h-4z"
  );
  gif.style.opacity = 1;
});


audioElement.addEventListener('ended', () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0; // go back to first song if last one ended
  } else {
    songIndex += 1; // move to next song
  }

  // load and play next song
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();

  // update song name near GIF
  masterSongName.innerText = songs[songIndex].songName;

  // update play/pause button state if you have one
  playPauseBtn.classList.remove("fa-play-circle");
  playPauseBtn.classList.add("fa-pause-circle");
});

// Utility function to format time mm:ss
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) secs = "0" + secs;
  return `${minutes}:${secs}`;
}

let currentTimeEl = document.getElementById('currentTime');
let totalDurationEl = document.getElementById('totalDuration');

// Update total duration when metadata loads
audioElement.addEventListener('loadedmetadata', () => {
  totalDurationEl.innerText = formatTime(audioElement.duration);
});

// Update current time as song plays
audioElement.addEventListener('timeupdate', () => {
  currentTimeEl.innerText = formatTime(audioElement.currentTime);
});





// Make controls respond to touch as well
['masterPlay','next','previous'].forEach(id => {
  let btn = document.getElementById(id);
  btn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // prevent double firing
    btn.click();        // trigger the same click logic
  });
});


// Search functionality
let searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', () => {
  let query = searchBar.value.toLowerCase();
  Array.from(songItems).forEach(item => {
    let songName = item.querySelector('.song').innerText.toLowerCase();
    if (songName.includes(query)) {
      item.style.display = "flex";  // show matching song
    } else {
      item.style.display = "none";  // hide non-matching song
    }
  });
});
