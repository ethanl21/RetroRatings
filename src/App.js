import { useState } from 'react';
import './App.css';

//COMPONENTS IMPORTED
import Header from './components/Header.js';
import CurrentItem from './components/CurrentItem';


//IMAGES IMPORTED
import AOL from './gallery/AOL.png';
import Tamagotchi from './gallery/Tamagotchi.jpeg';
import YuGiOh from './gallery/YuGiOh.jpg';

//IMAGE ARRAY
const imageArray=[
  { image: AOL, name: 'AOL', id: 0},
  { image: Tamagotchi, name: 'Tamagotchi', id: 1},
  { image: YuGiOh, name: 'YuGiOh', id: 2}
];


function App() {
  const[selectedImageId, setSelectedImageId] = useState(0);
  const selectedImage = imageArray.find(gallery => gallery.id === selectedImageId);

  return (
    <div class='container'>
      
      <Header />

      <CurrentItem 
      image={selectedImage.image}
      name={selectedImage.name}
      id={selectedImage.id}
      setSelectedImageId={setSelectedImageId}
      />

    </div>

  );
}

export default App;
