import { GetStaticPaths, GetStaticProps } from "next";

import { ParsedUrlQuery } from "querystring";
import { supabase } from "./../../lib/supabaseClient";

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const properties = {
  Tg: "Glass Transition Temperature",
  gas_diffusivity: "Glass Diffusivity",
  gas_solubility: "Gas Solubility",
  solvent_diffusivity: "Solvent Diffusivity",
};

function Page(props: {
  property: {
    smiles: string;
    value: number;
    gas?: string; // for gas diffusivity and solubility
    solvent_smiles?: string; // for solvent diffusivity
    ratio?: number; // for solvent diffusivity
  }[];
}) {
  return (
    <ul>
      {props.property.map((entry) => (
        <li key={entry.smiles}>
          {entry.smiles}
          {entry.value}
          {entry.gas ? entry.gas : ""}
          {entry.solvent_smiles ? entry.solvent_smiles : ""}
          {entry.ratio ? entry.ratio : ""}
        </li>
      ))}
    </ul>
  );
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on cities and times
  const paths = Object.keys(properties).map((slug) => ({
    params: { slug },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
};

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as Params;
  let { data } = await supabase.from(slug).select();

  return {
    props: {
      property: data,
    },
  };
};

export default Page;
