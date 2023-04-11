import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import logo from "../public/logo-with-text.png";
import { properties } from "./properties/[slug]";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Polymer Molecular Dynamics Database</title>
        <meta
          name="description"
          content="Polymer Molecular Dynamics Database"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              className="text-lg font-semibold"
              href="https://ramprasad.mse.gatech.edu/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By Ramprasad Group
            </a>
          </div>
        </div>

        <div className="flex items-center flex-col">
          <Image className="w-96" src={logo} alt="PMD Logo" />

          <h1 className="text-3xl font-bold underline mt-0 text-center">
            Polymer Molecular Dynamics Database
          </h1>
        </div>

        <div className={styles.grid}>
          {Object.keys(properties).map((slug) => (
            <Link
              key={slug}
              href={`/properties/${slug}`}
              className={styles.card}
            >
              <h2 className={inter.className}>
                {(properties as any)[slug]} <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Check all the simulation data for this property.
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
