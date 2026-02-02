import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { BLOG_IMAGE_FALLBACK } from "@/data/blog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedOn: string;
  image: string;
};

type BlogPageProps = {
  params: Promise<{ locale: "ar" | "en" }>;
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const title = t("metaBlogTitle");
  const description = t("metaBlogDescription");
  return {
    title,
    description,
    alternates: buildAlternates(locale, "/blog"),
    openGraph: buildOpenGraph(locale, "/blog", title, description),
    twitter: buildTwitter(title, description),
  };
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale });
  const posts = t.raw("blogPosts") as BlogPost[];

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold">{t("blogTitle")}</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const imageSrc = post.image?.trim() ? post.image : BLOG_IMAGE_FALLBACK;
            return (
              <Card key={post.slug} className="overflow-hidden gap-0 py-0">
                <Link href={`/${locale}/blog/${post.slug}`} className="block">
                  <div className="relative h-44 w-full bg-zinc-100">
                    <Image
                      src={imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                </Link>
                <CardHeader className="px-5 pb-2 pt-5">
                  <CardTitle className="text-base leading-tight">
                    <Link href={`/${locale}/blog/${post.slug}`} className="hover:text-emerald-700">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-4 pt-0">
                  <p className="line-clamp-3 text-sm text-zinc-600">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-stretch gap-3 border-t border-zinc-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xs text-zinc-400">{post.publishedOn}</span>
                  <Button asChild variant="secondary" className="w-fit rounded-full">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {t("blogReadMore")}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
