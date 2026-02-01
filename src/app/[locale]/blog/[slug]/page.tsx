import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedOn: string;
};

type BlogPageProps = {
  params: Promise<{ locale: "ar" | "en"; slug: string }>;
};

export async function generateStaticParams() {
  const messages = (await import("../../../../../messages/en.json")).default as {
    blogPosts: BlogPost[];
  };

  return messages.blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale });
  const posts = t.raw("blogPosts") as BlogPost[];
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: buildAlternates(locale, `/blog/${slug}`),
    openGraph: buildOpenGraph(locale, `/blog/${slug}`, post.title, post.excerpt),
    twitter: buildTwitter(post.title, post.excerpt),
  };
}

export default async function BlogPostPage(props: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await props.params;
  const t = await getTranslations({ locale });
  const posts = t.raw("blogPosts") as BlogPost[];
  const post = posts.find((entry) => entry.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="mt-2 text-xs text-zinc-400">{post.publishedOn}</p>
        <div className="mt-8 space-y-4 text-sm text-zinc-600">
          {post.content.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
