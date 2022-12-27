import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Searchbar } from './Searchbar/Searchbar';
import Modal from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from '../services/pixabayAPI';
import { LoaderSkeleton } from './Loader/LoaderSkeleton';
import { Button } from './Button/button';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    async function getImages() {
      try {
        setIsLoaded(true);
        const searchImages = await fetchImages(searchQuery, page);

        if (searchImages.totalPages < 1) {
          toast.error(
            `Sorry, there are no images matching your search query ${searchQuery}. Please try again.`
          );
          return;
        }

        setImages(prevState => [...prevState, ...searchImages.images]);
        setTotalPages(searchImages.totalPages);
      } catch {
        toast.error(
          `Sorry, there are no images matching your search query ${searchQuery}. Please try again.`
        );
      } finally {
        setIsLoaded(false);
      }
    }

    getImages();
  }, [page, searchQuery]);

  const handleSubmit = e => {
    e.preventDefault();
    const inputQuery = e.target.elements.query.value.trim().toLowerCase();

    if (inputQuery === '') {
      toast.error('Enter the search data');
      return;
    }

    setSearchQuery(inputQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreImages = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModal = url => {
    setLargeImageURL(url);
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <Toaster position="bottom-right" />
      {searchQuery && (
        <ImageGallery
          imageItems={images}
          onModal={openModal}
          onHandleModal={handleModal}
        />
      )}

      {searchQuery && isLoaded && <LoaderSkeleton />}
      {searchQuery && totalPages > 1 && totalPages > page && (
        <Button onLoadMore={handleLoadMoreImages}>Load more</Button>
      )}
      {isModalOpen && (
        <Modal onCloseModal={closeModal}>
          <img src={largeImageURL} alt="" width="768" />
        </Modal>
      )}
    </>
  );
};

export default App;
