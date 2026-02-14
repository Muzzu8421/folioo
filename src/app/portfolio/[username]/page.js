import connectDb from "../../../../db/connectdb";
import Portfolio from "@/models/Portfolio";
import Modern from "@/components/Modern";

export default async function PortfolioPage({ params }) {
  const { username } = await params;

  await connectDb();
  const data = await Portfolio.findOne({ username }).lean();

  if (!data)
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center bg-black text-white text-3xl">404 | Portfolio not found</div>
    );

  const portfolio = JSON.parse(JSON.stringify(data));

  return <Modern details={portfolio.details} />;
}
