import { useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not on the menu · Behind the Bar";
  }, []);

  return (
    <div className="page">
      <h1>Not on the menu</h1>
      <p className="lede">That page is not part of the bar.</p>
      <Link className="back" to="/">
        Behind the bar
      </Link>
    </div>
  );
};

export default NotFound;
