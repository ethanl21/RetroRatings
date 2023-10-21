var imageArray=["retrorating/50 Cent.jpeg",
"retrorating/AOL.png",
"retrorating/Avatar.jpeg",
"retrorating/backstreetBoys.jpeg",
"retrorating/Beyblades.jpeg",
"retrorating/Beyonce.jpeg",
"retrorating/Bop It.jpeg",
"retrorating/Bratz .jpeg",
"retrorating/Britney Spears.jpeg",
"retrorating/Call of Duty.jpeg",
"retrorating/Coldplay.jpeg",
"retrorating/Drake & Josh.jpeg",
"retrorating/DVD Player.jpeg",
"retrorating/Eminem.jpeg",
"retrorating/Family Guy.jpeg",
"retrorating/Final Fantasy.jpeg",
"retrorating/Flip Phone.jpeg",
"retrorating/Friends.png",
"retrorating/GTA.jpeg",
"retrorating/Halo.jpeg",
"retrorating/Hannah Montana.jpeg",
"retrorating/Harry Potter.jpeg",
"retrorating/Heelys.jpeg",
"retrorating/iPod.png",
"retrorating/Justin Timberlake.jpeg",
"retrorating/Kingdom Hearts.jpg",
"retrorating/Kodak Camera.jpeg",
"retrorating/Linkin Park.jpeg",
"retrorating/Lord of the Rings.jpeg",
"retrorating/Lost.jpeg",
"retrorating/Mean Girls.jpeg",
"retrorating/myspace.png",
"retrorating/Outkast.jpeg",
"retrorating/Pirates of the Caribbean.jpg",
"retrorating/Playstation 2.jpeg",
"retrorating/Pokemon.jpeg",
"retrorating/Prison Break.jpeg",
"retrorating/Runescape.png",
"retrorating/Seinfeld.jpeg",
"retrorating/Shrek.jpeg",
"retrorating/Spiderman.jpeg",
"retrorating/Tamagotchi.jpeg",
"retrorating/The Dark Knight.jpeg",
"retrorating/The Office.jpeg",
"retrorating/The Simpsons.jpeg",
"retrorating/The Sims.jpg",
"retrorating/Tony Hawk.jpeg",
"retrorating/Twilight.jpeg",
"retrorating/Windows XP.png",
"retrorating/World Of Warcraft.jpeg",
"retrorating/WWE Wrestlers.jpeg",
"retrorating/Xbox 360.png",
"retrorating/YuGiOh.jpg"
]

var imageCheck = [];
var imgElement = document.querySelector(".image"); 
var pTag = document.querySelector(".imageNamePlaceHolder");

document.addEventListener("DOMContentLoaded",function(){    //when page is loaded put random image on screen
    var randomIndex = Math.floor(Math.random() * imageArray.length);
    imgElement.src = imageArray[randomIndex];
    imageName = getImageName(imgElement.getAttribute("src")); 
    pTag.textContent = imageName;

})

function getImageName(imageName){
    var counter =0;
    var condition = true;
    var startAppending = false;
    var correctImageName ="";
    
while(condition){
if(imageName[counter] == "/") // once string hits ' / ' we start appending the name 
{
    counter++;  //so we dont add ' / ' to the name 
    startAppending = true;
}
if(imageName[counter] == ".")   // once string hits ' . ' we have reached the end of the name 
{
        startAppending = false; // stop appending
        condition = false;
        break;
}
if(startAppending){
    correctImageName+=imageName[counter];
}
counter++;

}
return correctImageName;
}


function setRandomImage() {
   
    var randomIndex = Math.floor(Math.random() * imageArray.length); 

    for(var i =0; i<imageCheck.length-1; i++) // check to see if duplicate array index
    {
        if(imageCheck[i] == randomIndex)      // if the index is the same it will display same image
        {                                     // so we set a new number to the randomIndex and restart the loop to check again
            var randomIndex = Math.floor(Math.random() * imageArray.length);
            i =0;
        }
    }
    imageCheck.push(randomIndex); // push the index value into check array
    imgElement.src = imageArray[randomIndex];   //set image to screen
    imageName = getImageName(imgElement.getAttribute("src")); // get image name
    

    // this was just a test open to new implementation
    pTag.textContent = imageName;   //set image name
   
    if(imageCheck.length == imageArray.length) // if the lengths are the same we have looked at every iamge so 
    {
        imageCheck = [];                      //  imageCheck array to zero to start again 
    }
}




