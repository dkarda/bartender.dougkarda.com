import '../styles/Card.scss';

function Card(props) {

    return(
        <div className="card">
            {props.img && (
                <img className="card-img"
                src={props.img} alt="alt tag" />
            )}
            {props.title && (
                <h2>{props.title}</h2>
            )}
            {props.score>0 && (
                <h4>{props.score.toString()}/{props.maxScore}</h4>
            )}
            {props.refined && (
                <p>(refined: {props.refined})</p>
            )}
            <div className="card-content">
                {props.titleDialog && (
                    <h1>{props.titleDialog}</h1>
                )}
                {props.subtitle && (
                    <p>{props.subtitle}</p>
                )}
                {props.year && (
                    <p>{props.year}</p>
                )}
                {props.producer && (
                    <p>{props.producer}</p>
                )}
                {props.brand && (
                    <p>{props.brand}</p>
                )}
                {props.scoreDialog>0 && (
                    <h4>{props.scoreDialog.toString()}/{props.maxScore}</h4>
                )}
                {props.size && (
                    <p>{props.size}</p>
                )}
                {props.locale && (
                    <p>{props.locale}</p>
                )}
                {props.type && (
                    <p>{props.type}</p>
                )}
                {props.abv && (
                    <p>{props.abv}</p>
                )}
                {props.equipment && (
                    <>
                    <div className="subheader">Equipment</div>
                    <ul>
                        {props.equipment.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </>
                )}
                {props.ingredients && (
                    <>
                    <div className="subheader">Ingredients</div>
                    <ul>
                        {props.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </>
                )}
                {props.rules && (
                    <>
                    <div className="subheader">Rules</div>
                    <ul>
                        {props.rules.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </>
                )}
                {props.directions && (
                    <>
                    <div className="subheader">Directions</div>
                    <ul>
                        {props.directions.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </>
                )}
                {props.notes && (
                    <>
                    <div className="subheader">Notes</div>
                    <ul>
                        {props.notes.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                    </>
                )}
                {props.category && (
                    <p>Category: {props.category}</p>
                )}
                {props.count && (
                    <p>Quantity: {props.count}</p>
                )}
            </div>
        </div>
    );
}

export default Card;