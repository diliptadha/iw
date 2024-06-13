import React, { useEffect, useState } from "react";

import Head from "next/head";

interface DynamicTitleProps {
  category?: string;
  usage?: string;
  color?: string;
  brand?: string;
  searchTerm?: string;
  description?: string;
}

const DynamicTitle: React.FC<DynamicTitleProps> = ({
  category,
  usage,
  color,
  brand,
  searchTerm,
  description,
}) => {
  const [title, setTitle] = useState<string>("iksana Opticals");
  const [canonicalUrl, setCanonicalUrl] = useState<string>(
    "https://localhost:3000"
  );
  const [keywords, setKeywords] = useState<string>("");

  useEffect(() => {
    if (color) {
      setTitle(
        `Buy ${color.replace(
          /-lens/,
          ""
        )} Lenses Online at Best Price | iksana Opticals`
      );
    } else {
      setTitle("iksana Opticals");
    }
  }, [color]);

  useEffect(() => {
    if (usage) {
      const formattedUsage = usage.replace(/-/g, " ");
      const formattedCategory = category?.replace(/-/g, " ");

      let usageReplacement = formattedUsage
        .replace(/lens/, "")
        .replace(/contact lenses/, "");
      if (category === "contact-lenses") {
        usageReplacement = usageReplacement.replace(/es/g, "");
      }

      setTitle(
        `Buy ${usageReplacement} ${formattedCategory?.replace(
          /contact lenses/,
          ""
        )} Lenses Online | iksana Opticals`
      );
    } else if (brand) {
      setTitle(`Buy ${brand} Lenses Online  | iksana Opticals`);
    }
  }, [category, usage, brand]);

  // useEffect(() => {
  //   const updateTitle = () => {
  //     const pathName = window.location.pathname.split("/").pop();
  //     document.title = `iksana Opticals / ${pathName}`;
  //   };

  //   updateTitle();

  //   window.addEventListener("popstate", updateTitle);

  //   return () => {
  //     window.removeEventListener("popstate", updateTitle);
  //   };
  // }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const formattedPath = currentPath.replace(/\//g, " ").trim();
    setTitle(`iksana Opticals | ${formattedPath}`);
    setCanonicalUrl(`${canonicalUrl}${currentPath}`);
  }, []);

  useEffect(() => {
    const keywordsArray = [];
    if (usage) keywordsArray.push(usage.replace(/-/g, " "));
    if (brand) keywordsArray.push(brand);
    if (color) keywordsArray.push(color.replace(/-lens/, ""));
    setKeywords(keywordsArray.join(", "));
  }, [usage, brand, color]);

  useEffect(() => {
    if (searchTerm) {
      setTitle(`Buy ${searchTerm} Online at Best Price | iksana Opticals`);
    }
  }, [searchTerm]);

  const finalTitle = (() => {
    if (category !== "contact-lenses" && !searchTerm) {
      return title.replace(/Lenses/g, "");
    } else {
      return title;
    }
  })();

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="robots" content="index" />
      <meta name="description" content="description" />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="John Doe" />
      <link rel="canonical" href={canonicalUrl} />
    </Head>
  );
};

export default DynamicTitle;
