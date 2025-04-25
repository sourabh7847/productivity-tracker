import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import Layout from "~/components/shared/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    {
      name: "description",
      content: "Welcome to React Router!",
    },
  ];
}

export default function Home() {
  return (
    <>
      {/* <Welcome /> */}

      <Layout>
        <p
          style={{
            display: "flex",
            flex: "1",
          }}
        >
          Middle body
        </p>
      </Layout>
    </>
  );
}
