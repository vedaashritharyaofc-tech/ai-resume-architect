import Home from './pages/Home'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white shadow-sm border-b border-gray-200 py-4 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-indigo-600">AI Resume Intelligence Platform</h1>
        </div>
      </header>
      <main>
        <Home />
      </main>
    </div>
  )
}

export default App