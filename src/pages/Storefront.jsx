import { useEffect, useState, useRef } from "react";
import CardAmazon from "../components/CardAmazon";
import "../styles/Storefront.scss";

const Storefront = () => {
  document.title = "DEF Amazon Storefront";

  const [sortedData, setSortedData] = useState([]);
  const [search, setSearch] = useState("");
  const dataUrl = import.meta.env.VITE_DATA_BASE_URL + "amazon-affiliate.json";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(dataUrl);
        const jsonData = await response.json();
        const barData = jsonData.filter(function (data) {
          return data.category === "bar";
        });
        const sortedDataKey = barData.filter((item) => item.product);
        const sortedData = [...sortedDataKey].sort((a, b) =>
          a.product.localeCompare(b.product)
        );
        setSortedData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredData = sortedData.filter((item) => {
    return item.product.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className="storefront-wrapper">
        <div className="header">
          <h1 className="header">DEF Amazon Storefront</h1>
          <p>
            There are many resources and products that can help one get started
            or elevate their home bartending knowledge and experience. Here I
            will share product links via the Amazon affiliate program for things
            I have found, used and suggest to those interested.
          </p>
          <p>
            The program helps me earn a few pennies for promoting items I deem
            of quality, but come at no added cost to you. Any support is greatly
            appreciated.
          </p>
        </div>
        <div className="body">
          {filteredData.map((item, index) => (
            <CardAmazon
              key={index}
              img={item.img}
              product={item.product}
              caption={item.caption}
              affiliateLink={item.affiliateLink}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Storefront;
