import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'; 

function App() {

// array of images
  const [imageArray, setImageArray] = useState(["retrorating/50 Cent.jpeg",
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
]);


// save images and image name 
const [currentImage, setCurrentImage] = useState('');
const [currentImageName, setCurrentImageName] = useState('');

// array to keep track of images for prev button 
const [imageHistory, setImageHistory] = useState([]); 
//save first image displayed so when user presses prev 
// we have the first image that was displayed (and name)
const [firstImage, setFirstImage] = useState('');
const [firstImageName, setFirstImageName] = useState('');
//array that saves the random index generated 
//so that when we generate a random index we can check if its been 
//used before
const [checkForDuplicates, setCheckForDuplicates] = useState([]);


//when page initially loads we need to set an image 
useEffect(() => {
  const randomIndex = Math.floor(Math.random() * imageArray.length); //generate random index 
  setCheckForDuplicates((prevDuplicates) => [...prevDuplicates, randomIndex]); // add it to array to check for duplicates 

  //sets image and image name 
  setCurrentImage(imageArray[randomIndex]);
  const imageName = getImageName(imageArray[randomIndex]);
  setCurrentImageName(imageName);

  // saves first image that was generated to use for later 
  setFirstImage(imageArray[randomIndex]);
  setFirstImageName(imageName);


}, [imageArray]);


//function that loads image
const loadRandomImage = () => {
  var randomIndex = Math.floor(Math.random() * imageArray.length);  //generate random index  
  for(var i = 0; i < checkForDuplicates.length-1; i++)
  {
      if(checkForDuplicates[i] == randomIndex) // check if index has been used before 
      {
        var randomIndex = Math.floor(Math.random() * imageArray.length); // if its been used generate another 
        i = 0;
      }
  }
  setCheckForDuplicates((prevDuplicates) => [...prevDuplicates, randomIndex]); //append random index 
  if(checkForDuplicates.length == imageArray.length)
  {
    setCheckForDuplicates([]);              // once lengths are the same we have gone through every image 
  }

  // random image selected
  const selectedImage = imageArray[randomIndex];
  
  // push previous image to keep track of previous images 
  setImageHistory((prevHistory) => [...prevHistory, currentImage]);

    //sets image and iamge name 
  setCurrentImage(selectedImage);
  const imageName = getImageName(selectedImage);
  setCurrentImageName(imageName);

  // debug  console.log(imageName);
};

// function that seperates gets Image name from file name 
const getImageName = (imageName) => {
  const parts = imageName.split('/');
  const fileNameWithExtension = parts[parts.length - 1];
  const fileName = fileNameWithExtension.split('.')[0];
  return fileName;
};





//function sets the color to the star when user hovers aswell as setting color for stars to the left 
const handleStarHover = (e, hoveredStar) => {
  const stars = e.currentTarget.parentElement.querySelectorAll('.star');
  stars.forEach((star) => {
    const starNumber = parseInt(star.getAttribute('data-star'));
    if (starNumber <= hoveredStar) {
      star.style.color = 'yellow';
    }
  });
};

// when user stops hovering remove color from stars 
const handleStarLeave = (e) => {
  const stars = e.currentTarget.parentElement.querySelectorAll('.star');
  stars.forEach((star) => {
    star.style.color = '';
  });
};

// when image is rated by the stars load next random image
const handleStarClick = (e, starNumber) => {
  e.preventDefault(); // Prevent the default behavior of the link
  loadRandomImage();
  
};





//prev button function 
const handlePreviousClick = () => {

  if (imageHistory.length > 0) {
    const previousImage = imageHistory.pop();
    setCurrentImage(previousImage);
    const imageName = getImageName(previousImage);
    setCurrentImageName(imageName);
  }
  // when history is 0 we need the image from loadup 
  if(imageHistory.length == 0)
  {
    setCurrentImageName(firstImageName);
    setCurrentImage(firstImage);
  }
};

  return (
    <div>
    <header>
        <h1>Retro Image Gallery</h1>
    </header>
     <div className="container">
        <div className="imgcontainer">
        <img className ="image" src ={currentImage} alt = ""/>
    </div>
    <div className="pCenter">
    <p>Do you remember:  &nbsp;</p> <p className ="imageNamePlaceHolder">{currentImageName}</p>
    </div>
   

    </div>
   <div className ="Rate-system">
   <div className="star-rating">
  {[1, 2, 3, 4, 5].map((starNumber) => (
    <span
      key={starNumber}
      className="star"
      data-star={starNumber}
      onMouseEnter={(e) => handleStarHover(e, starNumber)}
      onMouseLeave={handleStarLeave}
      onClick={(e) => handleStarClick(e, starNumber)}
    >
      &#9733;
    </span>
  ))}
</div>

    <div className="nxtBtn">
    <button className="next-button" onClick={handlePreviousClick}>
          Prev &rarr;
        </button>
</div>
</div>


    
    <footer>
        &copy; 2023 Retro Image Gallery
    </footer>
</div>
  );
}

export default App;
