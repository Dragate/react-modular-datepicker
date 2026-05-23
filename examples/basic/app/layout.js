import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased p-8 bg-gray-50 min-h-screen">
        <nav className="mb-8 flex gap-4 border-b pb-4 overflow-x-auto whitespace-nowrap">
          <a href="/basic" className="hover:underline">Basic</a>
          <a href="/range" className="hover:underline">Range</a>
          <a href="/multiple" className="hover:underline">Multiple</a>
          <a href="/headless" className="hover:underline">Headless</a>
          <a href="/styling" className="hover:underline">Custom Styling</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
