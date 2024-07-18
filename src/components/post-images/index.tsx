import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import css
import styled from '@emotion/styled';
import CommentListModal from '../modals/comments-modal';
import useAppModal from '../modals/app-modal/store';

interface ImageContainerProps {
  minHeight?: number;
  maxHeight?: number;
}

const ImageContainer = styled.div<ImageContainerProps>`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  height: 600px;
  object-fit: cover;
`;

const StyledImage = styled.img<{ maxWidth: number }>`
  width: 100%;
  min-height: 600px;
  object-fit: cover; 
`;

interface IPost {
  id: string;
  createdAt: string;
  title: string;
  filePost: { id: string; dataFile: string }[];
}


interface ImageSliderProps {
  post: IPost;
  maxHeight: number;
  maxWidth: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ post, maxHeight, maxWidth }) => {
  const [minHeight, setMinHeight] = useState(0);
  const { open, close, setModalOptions, isOpen } = useAppModal()

  useEffect(() => {
    if (post?.filePost) {
      let minImageHeight = Number.MAX_VALUE;
      post.filePost.forEach((photo) => {
        const img = new Image();
        img.src = `data:image/png;base64, ${photo.dataFile}`;
        img.onload = () => {
          if (img.height < minImageHeight) {
            minImageHeight = img.height;
            setMinHeight(minImageHeight);
          }
        };
      });
    }
  }, [post]);
  const handleOpenCommentModal = (id: number) => {
    // CommentListModal
    setModalOptions({
      showCloseIcon: false,
      content: <CommentListModal postId={id} onClose={close} show={false} />,
    })
    open()
  };
  return (
    <ImageContainer minHeight={minHeight} maxHeight={maxHeight}>
      {post?.filePost?.length === 1 ? (
        <>
          <StyledImage
            src={`data:image/png;base64, ${post.filePost[0].dataFile}`}
            alt="post photo"
            maxWidth={maxWidth}
          />
        </>
      ) : (
        <Carousel showThumbs={false}>
          {post?.filePost?.map((photo: any) => (
            <div key={photo?.id}>
              <StyledImage
                src={`data:image/png;base64, ${photo?.dataFile}`}
                alt="post photo"
                maxWidth={maxWidth}
                // height={"100%"}
              />
            </div>
          ))}
        </Carousel>
      )}
    </ImageContainer>
  );
};

export default ImageSlider;
