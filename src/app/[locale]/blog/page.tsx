import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  publishedOn: string;
};

type BlogPageProps = {
  params: { locale: "ar" | "en" };
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return {
    title: t("metaBlogTitle"),
    description: t("metaBlogDescription"),
  };
}

export default async function BlogPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const t = await getTranslations({ locale });
  const posts = t.raw("blogPosts") as BlogPost[];

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Header locale={locale} />
      <main className="mx-auto w-full max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-bold">{t("blogTitle")}</h1>
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-3 text-sm text-zinc-600">{post.excerpt}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-zinc-400">
                <span>{post.publishedOn}</span>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="font-semibold text-emerald-700 hover:text-emerald-800"
                >
                  {t("blogReadMore")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
