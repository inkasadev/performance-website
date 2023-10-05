import { BlogPostContent } from "@/components/BlogPostContent/BlogPostContent";
import { BlogPostHeader } from "@/components/BlogPostHeader/BlogPostHeader";
import { GET_BLOG_POST } from "@/graphql/getBlogPost";
import { client } from "@/lib/apollo";
import { ApolloQueryResult } from "@apollo/client";
import "@crystallize/reactjs-components/assets/video/styles.css";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export default function Home({
  blogPost,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{blogPost.title.content.text}</title>
        <meta
          name="description"
          content={`${blogPost.title.content.text} blog post`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main>
        <BlogPostHeader data={blogPost} />
        <BlogPostContent data={blogPost} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const { data }: ApolloQueryResult<any> = await client.query({
    query: GET_BLOG_POST,
  });

  return {
    props: {
      blogPost: data.catalogue,
    },
  };
}
