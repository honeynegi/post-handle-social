export default function AuthCodeError() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-6">
          There was an error during authentication. Please try again.
        </p>
        <a
          href="/login"
          className="inline-block bg-custom-secondary text-white px-4 py-2 rounded-lg hover:bg-custom-secondary/90 transition-colors"
        >
          Back to Login
        </a>
      </div>
    </div>
  )
}