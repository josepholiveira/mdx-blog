import React from 'react';
import dynamic from 'next/dynamic';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { BLOG_TITLE } from '@/constants';
import CodeSnippet from '@/components/CodeSnippet';
import Spinner from '@/components/Spinner';

const DivisionGroupsDemo = 
dynamic(() => import('@/components/DivisionGroupsDemo'), {
  loading: Spinner
})

const CircularColorsDemo = 
dynamic(() => import('@/components/CircularColorsDemo'), {
  loading: Spinner
})

export async function generateMetadata({ params }) {
  const { postSlug } = params;

  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract
  }
}

async function BlogPost({ params }) {
  const { postSlug } = params

  const { frontmatter, content } =
    await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={new Date(frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote components={{
          pre: CodeSnippet,
          DivisionGroupsDemo,
          CircularColorsDemo
        }} source={content} />
      </div>
    </article>
  );
}

export default BlogPost;
