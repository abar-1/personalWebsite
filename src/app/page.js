import Portfolio from "@/components/Portfolio";
import { loadData } from "@/lib/load";

export const revalidate = 3600;

export default async function Home() {
  return <Portfolio data={await loadData()} />;
}
