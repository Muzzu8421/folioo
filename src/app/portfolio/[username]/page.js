import connectDb from "../../../../db/connectdb";
import Portfolio from "@/models/Portfolio";
import Modern from "@/components/Modern";
import Editorial from "@/components/Editorial";
import Terminal from "@/components/Terminal";

export default async function PortfolioPage({ params }) {
  const { username } = await params;

  await connectDb();
  const portfolios = await Portfolio.find({ username }).lean();

  //check if the portfolio is active
  const data = portfolios.find((p) => p.isActive === true);

  if (!data)
    return (
      <div className="min-w-screen min-h-screen flex items-center justify-center bg-black text-white text-3xl">
        404 | Portfolio not found
      </div>
    );

  const portfolio = JSON.parse(JSON.stringify(data));

  //load templates
  const Templates = {
    modern: Modern,
    editorial: Editorial,
    terminal: Terminal,
  };

  const Template = Templates[portfolio.selectedTemplate];
  if (Template) {
    return <Template details={portfolio.details} />;
  }

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center bg-black text-white text-3xl">
      404 | Portfolio not found
    </div>
  );
}
