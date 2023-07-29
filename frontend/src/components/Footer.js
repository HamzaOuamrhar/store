import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <ul>
        <li className="list-title">HELP & INFORMATION</li>
        <Link>
          <li className="list">Help</li>
        </Link>
        <Link>
          <li className="list">Track order</li>
        </Link>
        <Link>
          <li className="list">Delivery & returns</li>
        </Link>
        <Link>
          <li className="list">Sitemap</li>
        </Link>
      </ul>
      <ul>
        <li className="list-title">ABOUT SOSA</li>
        <Link>
          <li className="list">About us</li>
        </Link>
        <Link>
          <li className="list">Careers at SOSA</li>
        </Link>
        <Link>
          <li className="list">Corporate responsibility</li>
        </Link>
        <Link>
          <li className="list">Investors' site</li>
        </Link>
      </ul>
      <ul>
        <li className="list-title">MORE FROM SOSA</li>
        <Link>
          <li className="list">Mobile apps</li>
        </Link>
        <Link>
          <li className="list">SOSA Marketplace</li>
        </Link>
        <Link>
          <li className="list">Gift vouchers</li>
        </Link>
        <Link>
          <li className="list">Black Friday</li>
        </Link>
      </ul>
      <ul>
        <li className="list-title">NEED HELP ?</li>
        <Link>
          <li className="list">Means of payment</li>
        </Link>
        <Link>
          <li className="list">Delivery methods</li>
        </Link>
        <Link>
          <li className="list">Loyalty program</li>
        </Link>
        <Link>
          <li className="list">A question ?</li>
        </Link>
      </ul>
    </footer>
  );
}

export default Footer;
