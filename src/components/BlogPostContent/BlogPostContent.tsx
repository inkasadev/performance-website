import { ContentTransformer, Image } from "@crystallize/reactjs-components";

interface IBlogPostContentProps {
  data: any;
}

export const BlogPostContent = ({ data }: IBlogPostContentProps) => {
  const { body } = data;

  return (
    <>
      {body.content.paragraphs.map((paragraph: any, paragraphId: number) => {
        return (
          <div key={paragraphId}>
            <h2>{paragraph.title?.text}</h2>
            {paragraph.images?.map((image: any, contentId: number) => {
              return (
                paragraphId !== 0 && (
                  <Image
                    key={contentId}
                    {...image}
                    alt={`${paragraph.title?.text || "blog post"} image`}
                    loading="lazy"
                  />
                )
              );
            })}
            <ContentTransformer json={paragraph.body.json} />
          </div>
        );
      })}
    </>
  );
};
