import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex-1 min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-6">
          <p className="text-6xl font-bold text-neutral-600 mb-4">404</p>
          <h1 className="text-3xl font-bold text-neutral-50 mb-2">
            Page Not Found
          </h1>
          <p className="text-neutral-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist
          </p>
        </div>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
