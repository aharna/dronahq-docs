import React from 'react';
import OriginalDocItem from '@theme-original/DocItem';
import Head from '@docusaurus/Head';
import { useLocation } from '@docusaurus/router';
import seoData from '@site/src/data/seo-data.json';

export default function DocItem(props) {
    const location = useLocation();
    const currentPath = location.pathname.replace(/\/$/, '');

    const seo = seoData.find(
        (item) => item.slug.replace(/\/$/, '') === currentPath
    );

    // console.log("SEO PATH:", currentPath);
    // console.log("SEO DATA:", seo);

    return (
        <>
            {/* ✅ Render ORIGINAL page FIRST */}
            <OriginalDocItem {...props} />

            {/* ✅ Then OVERRIDE SEO */}
            {seo && (
                <Head>
                    {/* Title */}
                    <title key="title">
                        {seo.title ? seo.title.trim() : document.title}
                    </title>

                    {/* Description */}
                    {seo.description && (
                        <meta
                            key="description"
                            name="description"
                            content={seo.description}
                        />
                    )}

                    {/* Keywords */}
                    {seo.keywords && (
                        <meta key="keywords" name="keywords" content={seo.keywords} />
                    )}

                    {/* Canonical */}
                    {seo.canonical && (
                        <link key="canonical" rel="canonical" href={seo.canonical} />
                    )}

                    {/* OG */}
                    {seo.title && (
                        <meta key="og:title" property="og:title" content={seo.title} />
                    )}
                    {seo.description && (
                        <meta
                            key="og:description"
                            property="og:description"
                            content={seo.description}
                        />
                    )}

                    {/* Schema */}
                    {seo.faq_schema && (
                        <script key="faq" type="application/ld+json">
                            {JSON.stringify(seo.faq_schema)}
                        </script>
                    )}

                    {seo.howto_schema && (
                        <script key="howto" type="application/ld+json">
                            {JSON.stringify(seo.howto_schema)}
                        </script>
                    )}

                    {seo.article_schema && (
                        <script key="article" type="application/ld+json">
                            {JSON.stringify(seo.article_schema)}
                        </script>
                    )}

                    {seo.product_schema && (
                        <script key="product" type="application/ld+json">
                            {JSON.stringify(seo.product_schema)}
                        </script>
                    )}

                    {seo.search_schema && (
                        <script key="search" type="application/ld+json">
                            {JSON.stringify(seo.search_schema)}
                        </script>
                    )}

                    {seo.dataset_schema && (
                        <script key="dataset" type="application/ld+json">
                            {JSON.stringify(seo.dataset_schema)}
                        </script>
                    )}
                </Head>
            )}
        </>
    );
}