import React, {useState} from 'react';
import backDrop from "../../image/jALOpRgEjKLWn5ZD01pGecHdCNt.jpg";
import Poster from "../../image/zOGINv5sJxEZQWw2dGuO8JUzvyK.jpg";
import Carousel from "../Carousel";
import PhotosBlock from "../PhotosBlock";


const imageBackDrop = {
    title:"Задний фон",
    countImage:4,
    Image:[backDrop,backDrop,backDrop,backDrop,backDrop]
}

const imagePoster = {
    title:"Плакаты",
    countImage:47,
    Image:[Poster,Poster,Poster,Poster,Poster,Poster,Poster],
}

//TODO  нужно сделать вывод изображений в модальное окно, сделать запрос на получение
// изображений/постеров и по type сортировать их и добавлять в массив activePhoto
const InfoPhotos = () => {

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalStartAt, setModalStartAt] = useState<number>(0);

    const openModel = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, indexVideo: number) => {
        event.preventDefault();
        setModalStartAt(indexVideo);
        setModalVisible(true);
    }

    const closeModel = () => {
        setModalStartAt(0);
        setModalVisible(false);
    }

    // const filterPhotos = () => {
    //     // let zxc = videoItem.filter(video => event.currentTarget.value === 'all'
    //     //     ? true : video.movieType === event.currentTarget.value)
    //     // setActiveVideos(zxc);
    // }

    return (
        <>
            <PhotosBlock title={imageBackDrop.title}
                         countImage={imageBackDrop.countImage}
                         Image={imageBackDrop.Image}
                         openModal={openModel}/>
            <PhotosBlock title={imagePoster.title}
                         countImage={imagePoster.countImage}
                         Image={imagePoster.Image}
                         openModal={openModel}/>
            {/*<Carousel/>*/}
            {/*{modalVisible && <InfoModal*/}
            {/*    data={imagePoster.Image}*/}
            {/*    selectIndex={modalStartAt}*/}
            {/*    closeModal={closeModel}*/}
            {/*    changeSelectIndex={changeSelectIndex}*/}
            {/*/>}*/}
        </>
    );
};

export default InfoPhotos;