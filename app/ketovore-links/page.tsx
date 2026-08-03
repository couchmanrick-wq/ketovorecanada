import type { Metadata } from "next";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
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

export const metadata: Metadata = pageMetadata({
  title: "Ketovore and Carnivore Influencers and Authorities",
  description: "Browse an alphabetical directory of ketovore, carnivore, keto, and metabolic health influencers, authorities, websites, social accounts, videos, and podcasts.",
  path: "/ketovore-links",
});

async function getKetovoreLinks(): Promise<KetovoreLink[]> {
  const { env } = getCloudflareContext();
  const kv = (env as unknown as Env).DAILY_LOG_KV;
  const raw = await kv.get(KETOVORE_LINKS_KV_KEY);

  try {
    return sanitizeKetovoreLinks(raw ? JSON.parse(raw) : []);
  } catch {
    return [];
  }
}

export default async function KetovoreLinksPage() {
  const rows = (await getKetovoreLinks())
    .filter((row) => row.resource)
    .sort((a, b) => a.resource.localeCompare(b.resource, "en-CA", { sensitivity: "base", numeric: true }));

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-black">
      <SiteHeader active="Influencers/Authorities Accts to Follow" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "@id": `${SITE_URL}/ketovore-links#directory`,
          name: "Ketovore and Carnivore Influencers and Authorities",
          url: `${SITE_URL}/ketovore-links`,
          numberOfItems: rows.length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: rows.map((row, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Thing",
              name: row.resource,
              sameAs: ketovoreLinkFields
                .filter((field) => field.key !== "resource")
                .map((field) => toExternalHref(row[field.key]))
                .filter(Boolean),
            },
          })),
        }}
      />
      <Hero />

      <section className="w-full border-t border-black/10">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="border-b border-black/20 pb-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#ba0a07]">Ketovore/Carnivore Links to Follow</p>
            <h1 className="mt-2 w-full font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase tracking-[0.03em] sm:text-[42px]">
              Your Exhaustive Guide to Influencers and Authorities
            </h1>
          </div>
          {rows.length === 0 ? (
            <div className="mt-10 border border-dashed border-black/20 bg-white p-8">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-black/45">Link directory coming soon</p>
            </div>
          ) : (
            <div className="mt-10 overflow-x-auto border-t-2 border-black">
              <table className="w-full min-w-[980px] border-collapse text-sm">
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-black/15 bg-white align-middle transition hover:bg-[#fff3f3]">
                      {ketovoreLinkFields.map((field) => {
                        const value = row[field.key];
                        if (field.key === "resource") {
                          return (
                            <td key={field.key} className="w-[28%] px-4 py-5 font-[family-name:var(--font-display)] text-base font-extrabold">
                              {value}
                            </td>
                          );
                        }

                        const href = toExternalHref(value);
                        return (
                          <td key={field.key} className="px-3 py-5 text-center">
                            {href ? (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold transition hover:text-[#ba0a07]">
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
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
