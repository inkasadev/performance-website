import { gql } from "@apollo/client";

export const GET_BLOG_POST = gql`
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
