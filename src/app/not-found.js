import Link from "next/link";

// app/not-found.js
const NotFound = () => {
    return (
      <div className="bg-red-500 h-screen" style={{ textAlign: 'center', padding: '50px' }}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Home</Link>
      </div>
    );
  };
  
  export default NotFound;
  