import { Video } from "@crystallize/reactjs-components";

interface IBlogPostHeaderProps {
  data: any;
}

export const BlogPostHeader = ({ data }: IBlogPostHeaderProps) => {
  const { title } = data;
  const videoFromCrystallize = {
    playlists: [data.heroVideo.content.text],
    thumbnails: [data.heroVideoThumbnail.content.firstImage],
  };

  return (
    <>
      {data && <h1>{title.content.text}</h1>}
      <Video {...videoFromCrystallize} />
    </>
  );
};
