import React from "react";
import Script from "next/script";

export interface SchemaProps {
    as: "website" | "article" | "blogPosting" | "techArticle" | "webPage" | "organization";
    title: string;
    description: string;
    baseURL: string;
    path: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
    sameAs?: string[];
    author?: {
        name: string;
        url?: string;
        image?: string;
    };

    // New: Organization-specific fields
    logo?: string;
    email?: string;
    telephone?: string;
    faxNumber?: string;
    foundingDate?: string;
    founder?: string;
    address?: {
        streetAddress?: string;
        addressLocality?: string;
        addressRegion?: string;
        postalCode?: string;
        addressCountry?: string;
    };
}

const schemaTypeMap = {
    website: "WebSite",
    article: "Article",
    blogPosting: "BlogPosting",
    techArticle: "TechArticle",
    webPage: "WebPage",
    organization: "Organization",
};

export function Schema({
    as,
    title,
    description,
    baseURL,
    path,
    datePublished,
    dateModified,
    image,
    sameAs = [],
    author,
    logo,
    email,
    telephone,
    faxNumber,
    foundingDate,
    founder,
    address,
}: SchemaProps) {
    const normalizedBaseURL = baseURL?.endsWith("/") ? baseURL.slice(0, -1) : baseURL;
    const normalizedPath = path?.startsWith("/") ? path : `/${path}`;

    const imageUrl = image
        ? `${normalizedBaseURL}${image?.startsWith("/") ? image : `/${image}`}`
        : `${normalizedBaseURL}/og?title=${encodeURIComponent(title)}`;

    const url = `${normalizedBaseURL}${normalizedPath}`;

    const schemaType = schemaTypeMap[as];

    // biome-ignore lint/suspicious/noExplicitAny: <cause why not, we love any in typescript..>
    const schema: Record<string, any> = {
        "@context": "https://schema.org",
        "@type": schemaType,
        url,
    };

    schema.sameAs = sameAs.filter(Boolean);

    if (as === "website") {
        schema.name = title;
        schema.description = description;
        schema.image = imageUrl;
    } else if (as === "organization") {
        schema.name = title;
        schema.description = description;
        schema.image = imageUrl;

        if (logo) {
            schema.logo = {
                "@type": "ImageObject",
                url: logo.startsWith("http") ? logo : `${normalizedBaseURL}${logo}`,
            };
        }

        if (email) schema.email = email;
        if (telephone) schema.telephone = telephone;
        if (faxNumber) schema.faxNumber = faxNumber;
        if (foundingDate) schema.foundingDate = foundingDate;
        if (founder) {
            schema.founder = {
                "@type": "Person",
                name: founder,
            };
        }
        if (address) {
            schema.address = {
                "@type": "PostalAddress",
                ...address,
            };
        }
    }
    else {
        schema.headline = title;
        schema.description = description;
        schema.image = imageUrl;

        if (datePublished) {
            schema.datePublished = datePublished;
            schema.dateModified = dateModified || datePublished;
        }
    }

    if (author) {
        schema.author = {
            "@type": "Person",
            name: author.name,
            ...(author.url && { url: author.url }),
            ...(author.image && {
                image: {
                    "@type": "ImageObject",
                    url: author.image,
                },
            }),
        };
    }

    return (
        <Script
            id={`schema-${as}-${path}`}
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: <It's not dynamic nor a security issue.>
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
}

export default Schema;