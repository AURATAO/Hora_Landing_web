import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-accent flex flex-col items-center justify-center px-4 text-center">
      <p className="text-8xl font-bold text-secondary mb-4">404</p>
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
        Page not found
      </h1>
      <p className="text-primary/60 font-secondary mb-10 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-8 py-4 bg-primary text-accent font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg"
      >
        Back to Home
      </Link>
    </div>
  );
}
