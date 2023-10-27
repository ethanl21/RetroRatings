function CurrentItem({ image, name, id, setSelectedImageId }) {

    const handleClickNext = (id) => {
        if(id<=1) //
        {
            setSelectedImageId(id+1);
        } else {//Currently Stays at the 3rd image if already as far forward as can go
            setSelectedImageId(id)
        }
    }

    //This is the Prev Click Handler
    const handleClickPrev = (id) => {
        if(id>0)
        {
            setSelectedImageId(id-1);
        } else {//Currently Stays at the first image if already as far back as can go
            setSelectedImageId(id)
        }
    }
    
    return (
        <body>
            {/*This is the image*/}
            <div className='current-item'>
                <img src={image} alt={name} />
            </div>

            {/**This is the image text below*/}
            <div className='image-text'>
                <p>{name}</p>
            </div>


            {/**Buttons went into one flexbox container to align them*/}
            <div className='button-components'>
                <li className='button-prev'>
                    <button onClick={() => handleClickPrev(id)}>
                        prev
                    </button>
                </li>
                <li className='button-next'>
                    <button onClick={() => handleClickNext(id)}>
                        next
                    </button>
                </li>
            </div>
            
        </body>
    )
}

export default CurrentItem;