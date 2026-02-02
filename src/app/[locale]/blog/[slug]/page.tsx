import type { Metadata } from "next";
import Image from "next/image";
import type React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { buildAlternates, buildOpenGraph, buildTwitter } from "@/lib/seo";
import { BLOG_IMAGE_FALLBACK } from "@/data/blog";
import {
  AirplaneTakeoff,
  Briefcase,
  Bus,
  Car,
  CheckCircle,
  Crown,
  Heart,
  MapPin,
  MapTrifold,
} from "@phosphor-icons/react/dist/ssr";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedOn: string;
  image: string;
};

const BLOG_SLUG_ICONS: Record<string, React.ElementType> = {
  "airport-limo-tips": AirplaneTakeoff,
  "business-travel-comfort": Briefcase,
  "wedding-limo-guide": Heart,
  "private-shuttle-egypt": Car,
  "group-transfer-guide": Bus,
  "airport-transfer-egypt": MapPin,
  "cairo-alexandria-transfer": MapTrifold,
  "vip-limousine-egypt": Crown,
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

  const imageSrc = post.image?.trim() ? post.image : BLOG_IMAGE_FALLBACK;
  const PostIcon = BLOG_SLUG_ICONS[post.slug] ?? MapTrifold;

  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-3xl px-6 py-12">
        <article>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100">
            <Image
              src={imageSrc}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <header className="mt-8 flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <PostIcon size={22} weight="duotone" />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
              <p className="mt-2 text-sm text-zinc-500">{post.publishedOn}</p>
            </div>
          </header>
          <div className="prose prose-zinc mt-8 max-w-none">
            <p className="text-base font-medium text-zinc-600">{post.excerpt}</p>
            <ul className="mt-8 list-none space-y-3 p-0">
              {post.content.map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-zinc-600">
                  <CheckCircle
                    size={20}
                    weight="duotone"
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
