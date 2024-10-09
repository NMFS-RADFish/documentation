import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";
import styles from "./index.module.css";

import HomepageFeatures from "../components/HomepageFeatures";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className={clsx("container", styles.heroContainer)}>
        <Heading
          as="h1"
          className={clsx(styles.heroHeading, styles.heroTextColor)}
        >
          {siteConfig.title}
        </Heading>
        <Heading
          as="h2"
          className={clsx(styles.heroSubHeading, styles.heroTextColor)}
        >
          {siteConfig.tagline}
        </Heading>
        <div className={clsx("buttons", styles.heroButtons)}>
          <Link
            className={clsx("button button--primary", styles.heroButton)}
            to="/developer-documentation/getting-started"
          >
            Get started
          </Link>
          <Link
            className="button button--secondary"
            to="/about/what-is-radfish"
          >
            About RADFish
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <HomepageFeatures />
    </Layout>
  );
}
