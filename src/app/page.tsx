import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Vercel Test Site</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-500 to-blue-700 text-white py-20">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Test Website</h2>
          <p className="text-xl mb-8">This is a simple website built for deployment on Vercel</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
            Get Started
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">About This Site</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Built with Next.js</h3>
              <p className="text-gray-600">
                This website was created using Next.js, a React framework that enables functionality
                such as server-side rendering and static site generation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Deployed on Vercel</h3>
              <p className="text-gray-600">
                Vercel is a platform for frontend frameworks and static sites, built to integrate with
                your headless content, commerce, or database.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions about this test site? Want to learn more about deploying to Vercel?
            Feel free to reach out!
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">
            Contact Us
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} My Vercel Test Site. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Image src="/vercel.svg" alt="Vercel Logo" width={20} height={20} className="invert" />
            </a>
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Image src="/next.svg" alt="Next.js Logo" width={40} height={20} className="invert" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
