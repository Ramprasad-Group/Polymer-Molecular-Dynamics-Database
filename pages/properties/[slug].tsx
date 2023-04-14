import { GetStaticPaths, GetStaticProps } from "next";

import { ParsedUrlQuery } from "querystring";
import { supabase } from "./../../lib/supabaseClient";
import { useRouter } from 'next/router'

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const properties = {
  Tg: {name: "Glass Transition Temperature", unit: "(K)"},
  gas_diffusivity: {name: "Gas Diffusivity", unit: "(cm2/s)"},
  gas_solubility: {name: "Gas Solubility", unit: "(cc(STP)/cc*cmHg)"},
  solvent_diffusivity: {name: "Solvent Diffusivity", unit: "(cm2/s)"},
};

function Page(props: {
  data: {
    smiles: string;
    value: number;
    gas?: string; // for gas diffusivity and solubility
    solvent_smiles?: string; // for solvent diffusivity
    ratio?: number; // for solvent diffusivity
  }[];
}) {
  const router = useRouter()
  const { slug } = router.query
  const property = (properties as any)[slug as string];

  return (
    <div className="relative overflow-x-auto">
      <h1 className="text-3xl font-bold my-6 text-center">{property.name} </h1>
      <table className="w-full text-sm text-left text-gray-500">
        <tbody>
          <tr className="text-xs text-gray-700 bg-gray-50">
            <th scope="col" className="px-6 py-3">
              SMILES
            </th>
            {props.data[0].solvent_smiles ? (
              <th scope="col" className="px-6 py-3">
                Solvent SMILES
              </th>
            ) : null}
            {props.data[0].gas ? (
              <th scope="col" className="px-6 py-3">
                Gas
              </th>
            ) : null}
            {props.data[0].ratio ? (
              <th scope="col" className="px-6 py-3">
                Ratio
              </th>
            ) : null}
            <th scope="col" className="px-6 py-3">
              Value {property.unit}
            </th>
          </tr>
          {props.data.map((entry, i) => (
            <tr key={i} className="bg-white border-b">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 max-w-[10rem] break-words"
              >
                {entry.smiles}
              </td>
              {entry.solvent_smiles ? (
                <td className="px-6 py-4 font-medium max-w-[1rem] break-words">
                  {entry.solvent_smiles}
                </td>
              ) : null}
              {entry.gas ? (
                <td className="px-6 py-4 font-medium max-w-[1rem] break-words">
                  {entry.gas}
                </td>
              ) : null}
              {entry.ratio ? (
                <td className="px-6 py-4 max-w-[1rem] overflow-hidden">
                  {entry.ratio.toFixed(4)}
                </td>
              ) : null}
              <td className="px-6 py-4 max-w-[1rem] overflow-hidden">
                {slug == 'gas_diffusivity' ? entry.value.toExponential(): entry.value.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
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
    props: { data },
  };
};

export default Page;
