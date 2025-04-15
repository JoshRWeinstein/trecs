'use client';

export default function MyRecsPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">My Recommendations</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for recommendations */}
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">No recommendations yet</h2>
            <p className="text-gray-600">Start adding your favorite places!</p>
          </div>
        </div>
      </div>
    </main>
  );
} 