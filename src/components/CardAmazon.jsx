import "../styles/CardAmazon.scss";

function CardAmazon(props) {
  return (
    <div className="card">
      {props.affiliateLink && (
        <a href={props.affiliateLink} target="_blank">
          {props.img != "" && (
            <img
              className="card-img"
              src={
                "https://assets.dougkarda.com/images/affiliate/bar/" +
                props.img +
                ".webp"
              }
              alt="alt tag"
            />
          )}
          <div className="copy">
            {props.product && <h3>{props.product}</h3>}
            {props.caption && <p>{props.caption}</p>}
          </div>
        </a>
      )}
    </div>
  );
}

export default CardAmazon;
