import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="relative bg-secondary p-10 text-white">
      <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto w-full">
        <div>
          <h4 className="font-semibold mb-4">Products</h4>
          <ul className="space-y-2">
            <li className="hover:text-accent cursor-pointer">Skincare</li>
            <li className="hover:text-accent cursor-pointer">Makeup</li>
            <li className="hover:text-accent cursor-pointer">Fragrance</li>
            <li
              className="hover:text-accent cursor-pointer"
              onClick={() => navigate("/products")}
            >
              All Products
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li className="hover:text-accent cursor-pointer">
              <a onClick={() => navigate("/about")}>About</a>
            </li>
            <li className="hover:text-accent cursor-pointer">
              <a onClick={() => navigate("/terms")}>Terms & Conditions</a>
            </li>
            <li className="hover:text-accent cursor-pointer">
              <a onClick={() => navigate("/privacy")}>Privacy Policy</a>
            </li>
            <li className="hover:text-accent cursor-pointer">
              <a onClick={() => navigate("/contact")}>Contact</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a className="hover:text-accent cursor-pointer">Facebook</a>
            <a className="hover:text-accent cursor-pointer">Twitter</a>
            <a className="hover:text-accent cursor-pointer">Instagram</a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary/20 mt-10 pt-6 text-center text-primary text-sm">
        © {new Date().getFullYear()} Beauty Shop. All rights reserved.
      </div>
    </footer>
  );
}
