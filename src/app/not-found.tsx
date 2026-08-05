import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 pt-32">
      <div className="text-center">
        <h1 className="font-serif text-5xl text-text">404</h1>
        <p className="mt-4 text-subtext">This page could not be found.</p>
        <Link
          href="/"
          className="inline-block mt-8 text-accent-dark hover:underline tracking-wide text-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
