import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center p-8 glass rounded-2xl glow-soft">
        <h1 className="heading-script text-6xl">Oops! 404</h1>
        <p className="mt-2 text-foreground/70">This page drifted away like a balloon 🎈</p>
        <Link to="/" className="inline-block mt-4 px-4 py-2 rounded-full bg-brand-lavender text-white shadow">
          Back to Celebration
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
