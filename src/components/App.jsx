import styled from 'styled-components';
import { ColorRing } from 'react-loader-spinner';

import Loader from './Loader/Loader';
import { Sesrchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { LoadMoreBtn } from './Button/Button';
import { Modal } from './Modal/Modal';
import { useState } from 'react';
import { useEffect } from 'react';

const statusList = {
  loading: 'loading',
  success: 'success',
  error: 'error',
  reject: 'reject',
  idle: 'idle',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [status, setStatus] = useState(statusList.idle);
  const [isOpen, setIsOpen] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  const handlChangePage = () => setPage(page + 1);

  const getlargeImg = largeImg => setLargeImg(largeImg);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleSubmit = str => {
    if (str !== searchQuery) {
      setSearchQuery(str);
      setImages([]);
      setPage(1);
    }
  };

  useEffect(() => {
    setStatus(statusList.loading);
    Loader(searchQuery, page)
      .then(res => {
        setImages([...images, ...res.data.hits]);
        setPages(Math.ceil(res.data.total / 12));
        setStatus(statusList.success);
      })
      .catch(error => {
        setError(error);
        setStatus(statusList.error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, page]);

  if (status === statusList.loading) {
    return (
      <div>
        <Sesrchbar onSubmit={handleSubmit} />
        <Preloader>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#ff3300', '#f8b26a', '#b3ff00', '#849b87']}
          />
          <h1>Loading....</h1>
        </Preloader>
      </div>
    );
  }
  if (status === statusList.success || status === statusList.idle) {
    return (
      <>
        <Sesrchbar onSubmit={handleSubmit} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              id={image.id}
              onClickImage={getlargeImg}
              key={image.id}
              imageURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              toggleModal={toggleModal}
            />
          ))}
        </ImageGallery>
        <LoadMoreBtn
          handlChangePage={handlChangePage}
          page={page}
          pages={pages}
        />
        {isOpen && (
          <div>
            <Modal onModalClose={toggleModal}>
              <img src={largeImg} alt=""></img>
            </Modal>
          </div>
        )}
      </>
    );
  }
  if (status === statusList.error && status !== statusList.loading) {
    return (
      <div>
        <Sesrchbar onSubmit={handleSubmit} />
        <h1>No image found, please make another request</h1>
      </div>
    );
  }
};

const ImageGallery = styled.div`
  display: grid;
  padding: 20px 15px;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;
const Preloader = styled.div`
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
