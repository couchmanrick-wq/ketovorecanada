import type { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Link from "next/link";
import { cache } from "react";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import LinkSuggestionForm from "@/components/LinkSuggestionForm";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import {
  KETOVORE_LINKS_KV_KEY,
  ketovoreLinkFields,
  sanitizeKetovoreLinks,
  toExternalHref,
  type KetovoreLink,
} from "@/lib/ketovoreLinks";

export const dynamic = "force-dynamic";

const PAGE_URL = `${SITE_URL}/ketovore-links`;
const DIRECTORY_UPDATED = "2026-08-05";
const DIRECTORY_UPDATED_LABEL = "August 5, 2026";

const faqItems = [
  {
    question: "What is ketovore?",
    answer: "Ketovore is an informal term for an animal-food-focused way of eating that generally combines carnivore-style meals with selected low-carbohydrate foods. It does not have one standard clinical definition.",
  },
  {
    question: "Who is included in this directory?",
    answer: "The directory includes people, organizations, communities and media resources that publish about carnivore, ketovore, ketogenic, low-carbohydrate or metabolic health topics.",
  },
  {
    question: "Does a listing mean Ketovore Canada endorses the source?",
    answer: "No. Listings are provided for discovery and research, not as endorsements. Readers should assess each source's credentials, evidence, commercial interests and advice for themselves.",
  },
  {
    question: "How can I suggest a new account or correct a link?",
    answer: "Use the suggestion form at the bottom of this page. Include the resource name, any official platform links and a note explaining the addition or correction.",
  },
];

const getKetovoreLinks = cache(async (): Promise<KetovoreLink[]> => {
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;
  const raw = await kv.get(KETOVORE_LINKS_KV_KEY);

  try {
    return sanitizeKetovoreLinks(raw ? JSON.parse(raw) : []);
  } catch {
    return [];
  }
});

export async function generateMetadata(): Promise<Metadata> {
  const count = (await getKetovoreLinks()).filter((row) => row.resource).length;
  const title = `${count || "Curated"} Carnivore & Keto Influencers and Experts`;
  const description = `Explore ${count || "dozens of"} carnivore, ketovore, keto and metabolic health experts, creators, websites, social accounts, YouTube channels and podcasts.`;

  return {
    ...pageMetadata({ title, description, path: "/ketovore-links" }),
    keywords: [
      "carnivore influencers",
      "ketovore experts",
      "keto influencers",
      "carnivore YouTube channels",
      "metabolic health experts",
      "low carb podcasts",
      "carnivore accounts to follow",
    ],
  };
}

export default async function KetovoreLinksPage() {
  const rows = (await getKetovoreLinks())
    .filter((row) => row.resource)
    .sort((a, b) => a.resource.localeCompare(b.resource, "en-CA", { sensitivity: "base", numeric: true }));
  const platformFields = ketovoreLinkFields.filter((field) => field.key !== "resource");
  const availableLinks = rows.reduce(
    (total, row) => total + platformFields.filter((field) => toExternalHref(row[field.key])).length,
    0,
  );

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Influencers/Authorities Accts to Follow" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": `${PAGE_URL}#webpage`,
              url: PAGE_URL,
              name: "Carnivore, Ketovore and Keto Influencers and Experts",
              description: "An alphabetical Canadian directory of carnivore, ketovore, keto, low-carbohydrate and metabolic health people, organizations, communities and media resources.",
              inLanguage: "en-CA",
              dateModified: DIRECTORY_UPDATED,
              isPartOf: { "@id": `${SITE_URL}/#website` },
              publisher: { "@id": `${SITE_URL}/#organization` },
              breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
              mainEntity: { "@id": `${PAGE_URL}#directory` },
              about: [
                { "@type": "Thing", name: "Carnivore diet" },
                { "@type": "Thing", name: "Ketogenic diet" },
                { "@type": "Thing", name: "Low-carbohydrate diet" },
                { "@type": "Thing", name: "Metabolic health" },
              ],
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${PAGE_URL}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Ketovore Canada", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Influencers and Authorities", item: PAGE_URL },
              ],
            },
            {
              "@type": "ItemList",
              "@id": `${PAGE_URL}#directory`,
              name: "Carnivore, Ketovore and Keto Influencers and Authorities",
              url: PAGE_URL,
              numberOfItems: rows.length,
              itemListOrder: "https://schema.org/ItemListOrderAscending",
              itemListElement: rows.map((row, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Thing",
                  name: row.resource,
                  sameAs: platformFields
                    .map((field) => toExternalHref(row[field.key]))
                    .filter(Boolean),
                },
              })),
            },
            {
              "@type": "FAQPage",
              "@id": `${PAGE_URL}#faq`,
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ],
        }}
      />
      <Hero />

      <section className="w-full border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-bold uppercase tracking-[0.14em] text-black/55">
            <Link href="/" className="transition hover:text-[#ba0a07]">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">Influencers and Authorities</span>
          </nav>

          <header className="border-b border-black/20 pb-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Ketovore/Carnivore Links to Follow</p>
            <h1 className="mt-2 w-full font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase tracking-[0.03em] sm:text-[42px]">
              Your Exhaustive Guide to Carnivore, Ketovore &amp; Keto Influencers and Authorities
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-7 text-black/70">
              Discover people, experts, creators, communities and media covering carnivore, ketovore, ketogenic, low-carbohydrate and metabolic health topics. This alphabetical directory brings their official websites, social accounts, video channels and podcasts together in one place.
            </p>
            <p className="mt-4 text-sm font-bold">
              Have a suggestion or an edit?{" "}
              <a href="#suggest-a-link" className="font-extrabold text-[#ba0a07]">
                Share it with us!
              </a>
            </p>
          </header>

          <dl className="mt-8 grid border-y-2 border-black bg-white sm:grid-cols-3">
            <div className="border-b border-black/15 p-5 sm:border-b-0 sm:border-r">
              <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-black/50">Listed resources</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold">{rows.length}</dd>
            </div>
            <div className="border-b border-black/15 p-5 sm:border-b-0 sm:border-r">
              <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-black/50">Official links collected</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-3xl font-extrabold">{availableLinks}</dd>
            </div>
            <div className="p-5">
              <dt className="text-xs font-extrabold uppercase tracking-[0.16em] text-black/50">Directory updated</dt>
              <dd className="mt-2 text-sm font-extrabold"><time dateTime={DIRECTORY_UPDATED}>{DIRECTORY_UPDATED_LABEL}</time></dd>
            </div>
          </dl>

          <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-extrabold">
            <a href="#directory">Browse the directory</a>
            <a href="#editorial-method">How listings are selected</a>
            <a href="#directory-faq">Frequently asked questions</a>
            <a href="#suggest-a-link">Suggest a change</a>
          </nav>

          <section id="editorial-method" aria-labelledby="editorial-heading" className="mt-12 grid gap-8 border-t border-black/20 pt-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#ba0a07]">About this directory</p>
              <h2 id="editorial-heading" className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase sm:text-3xl">
                A starting point for better research
              </h2>
              <p className="mt-4 leading-7 text-black/70">
                Use the directory to find a source by name, then open the platform that suits you. Website links usually lead to the source&apos;s main home online; social, video and podcast links connect directly to the listed account or show.
              </p>
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-extrabold uppercase">How listings are selected</h3>
              <p className="mt-3 leading-7 text-black/70">
                Listings focus on sources publishing about carnivore, ketovore, keto, low-carbohydrate eating or metabolic health. We aim to use direct official links and correct outdated destinations when they are reported. The list is alphabetical, not a ranking.
              </p>
              <p className="mt-3 text-sm leading-6 text-black/60">
                Inclusion is not an endorsement or medical recommendation. Review credentials, evidence, commercial interests and claims before acting on health information.
              </p>
            </div>
          </section>

          {rows.length === 0 ? (
            <div className="mt-10 border border-dashed border-black/20 bg-white p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-black/45">Link directory coming soon</p>
            </div>
          ) : (
            <section id="directory" aria-labelledby="directory-heading" className="mt-14 scroll-mt-8">
              <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#ba0a07]">Alphabetical A–Z list</p>
                  <h2 id="directory-heading" className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase">Browse the directory</h2>
                </div>
                <p id="directory-description" className="max-w-xl text-sm leading-6 text-black/60">
                  On phones, each resource appears as a card showing only its available links. On larger screens, use the table to compare every platform. A dash means that a link has not yet been added.
                </p>
              </div>
              <div className="border-t-2 border-black md:overflow-x-auto">
              <table className="block w-full border-collapse text-sm md:table md:min-w-[1100px]" aria-describedby="directory-description">
                <caption className="sr-only">Carnivore, ketovore, keto and metabolic health resources with links to their official websites, social accounts, video channels and podcasts.</caption>
                <thead className="hidden md:table-header-group">
                  <tr className="border-b-2 border-black bg-black text-white">
                    {ketovoreLinkFields.map((field) => (
                      <th key={field.key} scope="col" className={`${field.key === "resource" ? "w-[28%] text-left" : "text-center"} px-3 py-4 text-xs font-extrabold uppercase tracking-[0.1em]`}>
                        {field.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="grid gap-3 py-3 md:table-row-group md:p-0">
                  {rows.map((row) => (
                    <tr key={row.id} className="block border border-black/15 bg-white p-4 align-middle transition hover:bg-[#fff3f3] md:table-row md:border-x-0 md:border-t-0 md:p-0">
                      {ketovoreLinkFields.map((field) => {
                        const value = row[field.key];
                        if (field.key === "resource") {
                          return (
                            <th key={field.key} scope="row" className="block border-b border-black/15 px-0 pb-3 text-left font-[family-name:var(--font-display)] text-lg font-extrabold md:table-cell md:w-[28%] md:border-b-0 md:px-4 md:py-5 md:text-base">
                              {value}
                            </th>
                          );
                        }

                        const href = toExternalHref(value);
                        return (
                          <td key={field.key} className={href ? "mr-2 mt-3 inline-block text-center md:table-cell md:px-3 md:py-5" : "hidden px-3 py-5 text-center md:table-cell"}>
                            {href ? (
                              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${row.resource} — ${field.label}`} className="inline-flex min-h-10 items-center border border-black/25 bg-[#f7f7f7] px-3 py-2 font-bold transition hover:border-[#ba0a07] hover:bg-[#ba0a07] hover:text-white md:min-h-0 md:border-0 md:bg-transparent md:p-0 md:hover:bg-transparent md:hover:text-[#ba0a07]">
                                {field.label}
                              </a>
                            ) : (
                              <span className="text-black/25" aria-label={`${field.label} unavailable`}>—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </section>
          )}

          <section id="directory-faq" aria-labelledby="faq-heading" className="mt-16 scroll-mt-8 border-t-2 border-black pt-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-[#ba0a07]">Quick answers</p>
            <h2 id="faq-heading" className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase">Frequently asked questions</h2>
            <dl className="mt-7 grid gap-5 md:grid-cols-2">
              {faqItems.map((item) => (
                <div key={item.question} className="border border-black/15 bg-white p-6">
                  <dt className="font-[family-name:var(--font-display)] text-lg font-extrabold">{item.question}</dt>
                  <dd className="mt-3 text-sm leading-6 text-black/65">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="suggest-a-link" className="mt-16 scroll-mt-8 border-t-2 border-black bg-white p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Help improve this directory</p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase tracking-[0.03em] sm:text-4xl">
              Have a Suggestion or Edit?
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-black/65">
              Know an account we should include, or spotted something that needs updating? Send us the details below.
            </p>
            <LinkSuggestionForm />
          </section>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
