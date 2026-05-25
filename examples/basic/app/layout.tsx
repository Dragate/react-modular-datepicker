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
          <a href="/events" className="hover:underline font-bold text-blue-600">Events (GCal style)</a>
          <a href="/styling" className="hover:underline">Custom Styling</a>
          <a href="/form" className="hover:underline">Form</a>
          <a href="/custom-header-footer" className="hover:underline">Header/Footer</a>
          <a href="/min-max-disabled" className="hover:underline">Min/Max/Disabled</a>
          <a href="/yearly" className="hover:underline">Yearly</a>
          <a href="/availability" className="hover:underline">Availability</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
