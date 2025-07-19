const Footer = () => {
  return (
    <footer className="py-4 text-center text-sm text-gray-600 bg-white border-t border-blue-100">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <span>
          © {new Date().getFullYear()} Joshua Singarayer. Built with Next.js
          and Sanity.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
