import { ContentTransformer } from "@crystallize/reactjs-components";
import Image from "next/image";
import React from "react";

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
              console.log("image => ", image);
              return (
                paragraphId !== 0 && (
                  <Image
                    key={contentId}
                    src={image.url}
                    width={image.variants[image.variants.length - 1].width}
                    height={image.variants[image.variants.length - 1].height}
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
