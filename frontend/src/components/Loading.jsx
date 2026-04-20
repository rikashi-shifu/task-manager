export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-gray-800 border-t-accent rounded-full animate-spin mx-auto"></div>
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>
  );
}
