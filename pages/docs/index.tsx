import type { NextPage } from "next";
import { RedocStandalone } from "redoc";

export async function getServerSideProps() {
  return {
    props: {
      spec: "./doc.yaml",
    },
  };
}

const Docs: NextPage<{ spec: string }> = ({ spec }) => {
  return (
    <div>
      <RedocStandalone specUrl={spec} />
    </div>
  );
};

export default Docs;
