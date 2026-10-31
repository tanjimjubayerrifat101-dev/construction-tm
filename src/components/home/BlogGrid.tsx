import { useTranslations } from "next-intl";
import SlideHeadingLeft from "@/utils/SlideHeading";
import SlideHeadingRight from "@/utils/SlideHeadingRight";
import BlogCard from "./BlogCard";
import { BLOG_POSTS } from "@/data/blog";
import RollingButton from "@/utils/RollingButton";

interface BlogGridProps {
  limit?: number;
  showSectionHeader?: boolean;
}


export default function BlogGrid({
  limit,
  showSectionHeader = false,
}: BlogGridProps) {
  const t = useTranslations("Blog");
  const posts = limit ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
  const featuredPost = posts[posts.length - 1];

  return (
    <section className="py-20 md:py-24 lg:py-28 w-full relative overflow-hidden bg-background">
      <div className="container">
        {showSectionHeader && (
          <div className="flex justify-center items-center flex-col w-full mb-16 lg:mb-20">
            <div className="text-center w-full xl:w-[80%] 2xl:w-[60%]">
              <SlideHeadingLeft className="text-4xl lg:text-5xl text-primary font-regular uppercase mb-3">
                {t("heading")}
              </SlideHeadingLeft>
              <SlideHeadingRight className="text-lg lg:text-xl">
                {t("subheading")}
              </SlideHeadingRight>
            </div>
          </div>
        )}

        {featuredPost && <BlogCard post={featuredPost} featured />}

        <div
          className="mt-7 grid gap-7"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          }}
        >
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* "View all" CTA — links to Media Center */}
        {showSectionHeader && (
          <div className="flex justify-center mt-14">
            <RollingButton
              text={t("mediaCenter")}
              href="/media"
              variant="outline"
            />
          </div>
        )}
      </div>
    </section>
  );
}
