import IPPage from "../IPPage";

export default function Page({ params }) {
  return <IPPage params={params && params.params && params.params[0]} />;
}
