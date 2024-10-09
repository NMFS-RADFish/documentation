import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

function RADFishHero() {
  return (
    <section className={clsx(styles.hero, "text--center")}>
      <div className="container">
        <div className="row">
          <div className={clsx("col col--12 padding-horiz--md")}>
            <Heading as="h3" className={styles.heroTitle}>
              Introducing the React Application Development Framework for
              Fisheries (RADFish)
            </Heading>
            <p className={styles.heroSubtitle}>
              RADFish, developed by NOAA Fisheries and its partners, is a
              React.js framework designed to streamline the creation and
              improvement of web applications for NOAA and its collaborators.
              This open-source framework, hosted on GitHub, offers standardized
              components such as a progressive web application (PWA) API for
              offline data collection, accessibility standards, and styling
              based on the U.S. Web Design System. By enabling developers to
              quickly build mobile-first, offline-capable web applications,
              RADFish reduces development time, ensures organizational
              consistency, and supports the modernization of our data
              systems—leading to better coordination and more efficient data
              collection.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const FeatureList = [
  {
    title: "Powered by React",
    description: (
      <>
        RADFish is built on React.js, enabling developers to leverage reusable
        components and follow modern web development best practices. This
        ensures flexibility, scalability, and efficiency in building
        feature-rich, dynamic web applications.
      </>
    ),
  },
  {
    title: "Progressive Web Application (PWA) Ready",
    description: (
      <>
        RADFish supports Progressive Web Application (PWA) development, allowing
        apps to function offline and provide a seamless user experience even in
        low-connectivity environments. Ideal for at-sea data collection and
        other fieldwork scenarios.
      </>
    ),
  },
  {
    title: "Consistent and Accessible Styling",
    description: (
      <>
        RADFish incorporates styling based on the U.S. Web Design System
        (USWDS), ensuring a consistent, accessible, and user-friendly interface
        across all NOAA applications. This promotes compliance with federal
        design standards and enhances usability for all users.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx("col col--4")}>
      {/* Card container */}
      <div className={styles.card}>
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      <RADFishHero />
      <section className={styles.features}>
        <div className="container">
          <div className={clsx("row", styles.cardContainerRow)}>
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
