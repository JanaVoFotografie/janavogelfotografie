import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import "./not-found.css";

export const metadata: Metadata = {
  title: { absolute: "Seite wurde nicht gefunden. - Jana Vogel Fotografie" },
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <main className="flo_page_wrap">
        <div className="flo_page">
          <SiteHeader page="notfound" current="" />
          <div className="flo-block flo-block--not-found error-404 not-found">
            <article className="flo-wp-content flo-section__content center-text flo-post" style={{ textAlign: "center" }}>
              <h1>Nicht gefunden.</h1>
              <br />
              <h3>Diese Seite gibt es leider nicht (mehr).</h3>
              <br />
              <Link prefetch={false} href="/">Zur Startseite</Link>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
