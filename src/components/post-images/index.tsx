// import React, { useState, useEffect } from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // import css
// import styled from '@emotion/styled';
// import CommentListModal from '../modals/comments-modal';
// import useAppModal from '../modals/app-modal/store';

// interface ImageContainerProps {
//   minHeight?: number;
//   maxHeight?: number;
// }

// const ImageContainer = styled.div<ImageContainerProps>`
//   width: 100%;
//   margin: 0 auto;
//   overflow: hidden;
//   height: 600px;
//   object-fit: cover;
// `;

// const StyledImage = styled.img<{ maxWidth: number }>`
//   width: 100%;
//   min-height: 600px;
//   object-fit: cover; 
// `;

// const StyledVideo = styled.video<{ maxWidth: number }>`
//   width: 100%;
//   min-height: 600px;
//   object-fit: cover; 
// `;



// interface IPost {
//   id: string;
//   createdAt: string;
//   title: string;
//   filePost: { id: string; dataFile: string; mimeType: string }[];
// }


// interface ImageSliderProps {
//   post: IPost;
//   maxHeight: number;
//   maxWidth: number;
// }

// const ImageSlider: React.FC<ImageSliderProps> = ({ post, maxHeight, maxWidth }) => {
//   const [minHeight, setMinHeight] = useState(0);
//   return (
//     <ImageContainer minHeight={minHeight} maxHeight={maxHeight}>
//       {post?.filePost?.length === 1 ? (
//         <>
//           {post?.filePost[0]?.mimeType?.startsWith('image/') && (
//             <StyledImage
//               src={`${post.filePost[0].dataFile}`}
//               alt="post photo"
//               maxWidth={maxWidth}
//             />
//           )}

//           {post?.filePost[0]?.mimeType?.startsWith('video/') && (
//             <StyledVideo
//               src={`${post.filePost[0].dataFile}`}
//               controls
//               maxWidth={maxWidth}
//             >
//               Your browser does not support the video tag.
//             </StyledVideo>
//           )}
//         </>
//       ) : (
//         <Carousel showThumbs={false}>
//           {post?.filePost?.map((photo: any) => (
//             <div key={photo?.id}>
//               <StyledImage
//                 src={`${photo?.dataFile}`}
//                 alt="post photo"
//                 maxWidth={maxWidth}
//               // height={"100%"}
//               />
//             </div>
//           ))}
//         </Carousel>
//       )}
//     </ImageContainer>
//   );
// };

// export default ImageSlider;
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // import css
import styled from '@emotion/styled';

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

const StyledVideo = styled.video<{ maxWidth: number }>`
  width: 100%;
  min-height: 600px;
  object-fit: cover; 
`;

interface IPost {
  id: string;
  createdAt: string;
  title: string;
  filePost: { id: string; dataFile: string; mimeType: string }[];
}

interface ImageSliderProps {
  post: IPost;
  maxHeight: number;
  maxWidth: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ post, maxHeight, maxWidth }) => {
  const [minHeight, setMinHeight] = useState(0);
  console.log(post?.filePost[0]);
  return (
    <ImageContainer minHeight={minHeight} maxHeight={maxHeight}>
      {post?.filePost?.length === 1 ? (
        <>
          {post?.filePost[0]?.mimeType?.startsWith('image/') && (
            <StyledImage
              src={post.filePost[0].dataFile}
              alt="post photo"
              maxWidth={maxWidth}
            />
          )}

          {post?.filePost[0]?.mimeType?.startsWith('video/') && (
            <StyledVideo
              src={post.filePost[0].dataFile}
              controls
              maxWidth={maxWidth}
            >
              Your browser does not support the video tag.
            </StyledVideo>
          )}
        </>
      ) : (
        <Carousel showThumbs={false}>
          {post?.filePost?.map((file: any) => (
            <div key={file?.id}>
              {file?.mimeType?.startsWith('image/') ? (
                <StyledImage
                  src={file?.dataFile}
                  alt="post photo"
                  maxWidth={maxWidth}
                />
              ) : (
                <StyledVideo
                  src={file?.dataFile}
                  controls
                  maxWidth={maxWidth}
                >
                  Your browser does not support the video tag.
                </StyledVideo>
              )}
            </div>
          ))}
        </Carousel>
      )}
    </ImageContainer>
  );
};

export default ImageSlider;
