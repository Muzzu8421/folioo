"use client";
import { useEffect } from "react";
import Modern from "@/components/Modern";
import Editorial from "@/components/Editorial";
import Terminal from "@/components/Terminal";

const UserPortfolio = ({ portfolio }) => {
  // send analytics
  useEffect(() => {
    const track = async () => {
      if (!portfolio._id) return;
      try {
        // check if the portfolio has already been viewed
        const viewedKey = `viewed-${portfolio._id}`;
        const alreadyViewed = localStorage.getItem(viewedKey);

        // if the portfolio has already been viewed, do nothing
        if (alreadyViewed) {
          return;
        }
        const res = await fetch("/api/analytics/view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            portfolioId: portfolio._id,
          }),
        });
        if (res.ok) {
          localStorage.setItem(viewedKey, "true");
          console.log("Viewed portfolio");
        }
      } catch (error) {
        console.error(error);
      }
    };
    track();
  }, [portfolio._id]);

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
};

export default UserPortfolio;
