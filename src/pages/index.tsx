import Head from "next/head";
// import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { gql, ApolloQueryResult } from "@apollo/client";
import { useEffect, useState } from "react";
import { client } from "@/lib/apollo";
import {
  ContentTransformer,
  Image,
  Video,
} from "@crystallize/reactjs-components";
import { InferGetStaticPropsType } from "next";
import "@crystallize/reactjs-components/assets/video/styles.css";

const EXAMPLE_QUERY = gql`
  {
    catalogue(path: "/frontend-performance") {
      title: component(id: "title") {
        content {
          ... on SingleLineContent {
            text
          }
        }
      }
      heroVideo: component(id: "hero-video") {
        content {
          ... on SingleLineContent {
            text
          }
        }
      }
      heroVideoThumbnail: component(id: "hero-video-thumbnail") {
        content {
          ... on ImageContent {
            firstImage {
              ...img
            }
          }
        }
      }
      body: component(id: "body") {
        content {
          ... on ParagraphCollectionContent {
            paragraphs {
              title {
                text
              }
              images {
                ...img
              }
              body {
                json
              }
            }
          }
        }
      }
    }
  }
  fragment img on Image {
    url
    altText
    variants {
      url
      width
      height
      size
    }
  }
`;

export default function Home({
  blogPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log("blogPost => ", blogPost);

  const videoFromCrystallize = {
    playlists: [blogPost.heroVideo.content.text],
    thumbnails: [blogPost.heroVideoThumbnail.content.firstImage],
  };

  return (
    <>
      <Head>
        <title>{blogPost.title.content.text}</title>
        <meta
          name="description"
          content={`${blogPost.title.content.text} blog post`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {blogPost && <h1>{blogPost.title.content.text}</h1>}
      <Video {...videoFromCrystallize} />
      {blogPost && (
        <ContentTransformer json={blogPost.heroVideo.content.text} />
      )}
      {blogPost &&
        blogPost.body.content.paragraphs.map((paragraph: any, id: number) => {
          return (
            <div key={id}>
              <h1>{paragraph.title?.text}</h1>
              {paragraph.images?.map((image: any, id: number) => {
                return (
                  <Image
                    key={id}
                    {...image}
                    alt={`${paragraph.title?.text} image`}
                  />
                );
              })}
              <ContentTransformer json={paragraph.body.json} />
            </div>
          );
        })}
    </>
  );
}

export async function getStaticProps() {
  const { data }: ApolloQueryResult<any> = await client.query({
    query: EXAMPLE_QUERY,
  });

  return {
    props: {
      blogPost: data.catalogue,
    },
  };
}
