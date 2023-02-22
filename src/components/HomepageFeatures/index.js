import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "前端處理",
    Svg: require("@site/static/img/undraw_code_review_re_woeb.svg").default,
    description: <>前端技術的探索、應用</>,
  },
  {
    title: "後端學習",
    Svg: require("@site/static/img/undraw_server_cluster_jwwq.svg").default,
    description: <>後端技術的學習、輸出</>,
  },
  {
    title: "日常隨筆",
    Svg: require("@site/static/img/undraw_inspiration_re_ivlv.svg").default,
    description: <>日常生活觀察、點子發想</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
