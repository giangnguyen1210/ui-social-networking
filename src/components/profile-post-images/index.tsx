import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import css
import styled from '@emotion/styled';
import CommentListModal from '../modals/comments-modal';
import useAppModal from '../modals/app-modal/store';

const ImageContainer = styled.div`
  width: 100%;
  max-height: 300px;
  margin: 0 auto;
  overflow: hidden;
  object-fit: cover;
`;

const StyledImage = styled.img<{ maxWidth: number }>`
   width: 100%;
  object-fit: cover; /* Đảm bảo hình ảnh được cắt và điều chỉnh để phù hợp */
`;

interface Post {
  id: number
  filePost: Array<{ id: string, dataFile: string }>;
}

interface ImagesProfileSliderProps {
  post: Post | null;
  maxHeight?: number;
  maxWidth?: number;
}

const ImagesProfileSlider: React.FC<ImagesProfileSliderProps> = ({ post, maxHeight, maxWidth }) => {
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
    <ImageContainer className='cursor-pointer' onClick={() => handleOpenCommentModal(Number(post?.id))}>
      {post?.filePost?.length === 1 ? (
        <>
          <StyledImage
            src={`data:image/png;base64, ${post.filePost[0].dataFile}`}
            alt="post photo"
            maxWidth={300}
          />
        </>
      ) : (
        <Carousel showThumbs={false}>
          {post?.filePost?.map((photo: any) => (
            <div key={photo?.id}>
              <StyledImage
                src={`data:image/png;base64, ${photo?.dataFile}`}
                alt="post photo"
                maxWidth={300}
              // height={"100%"}
              />
            </div>
          ))}
        </Carousel>
      )}
    </ImageContainer>
  );
};

export default ImagesProfileSlider;
