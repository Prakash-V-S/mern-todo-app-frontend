function Card({ card, cardUpdate, cardDelete, cardDetails })
 {
  return (
    <>
      <div className="col-12 col-md-6 col-lg-4 mb-4">
        <div className="card p-2  h-100 card border-info mb-3">
          <div className="card-body bg-light">
            <div className="card-header text-primary  mb-2">
              <h6 className="bg-light">
                <b className="bg-light">{card.title}</b>
              </h6>
            </div>
            <div className="card-body bg-light">
              <p className="bg-light">{card.description}</p>
            </div>
          </div>
          <div className="card-footer bg-transparent border-top-0 d-flex justify-content-end">
            <button
              className="btn btn-warning px-4 me-3"
              onClick={() => cardUpdate(card.title, card.description, card._id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger px-3 me-2"
              onClick={() => cardDelete(card._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
