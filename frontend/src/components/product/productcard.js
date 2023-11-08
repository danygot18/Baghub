import React from 'react';

function ProductCard() {
  return (
    <div className="container mt-4 custom-font">
      <div className="row justify-content-center">
        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
            <img className="card-img-top" src="Images/Guccibag.png" alt="..." />
            <div className="card-body p-2">
              <h5 className="fw-bolder text-center">GUCCI BAG</h5>
              <div className="d-flex justify-content-center small text-warning mb-2">
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
              </div>
              <div className="text-center">
                <span className="text-muted text-decoration-line-through">$80.00</span> $25.00
              </div>
            </div>
            <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-center">
              <button type="button" className="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#PocoModal">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
            <img className="card-img-top" src="Images/Guccibag.png" alt="..." />
            <div className="card-body p-2">
              <h5 className="fw-bolder text-center">DIOR Bag</h5>
              <div className="d-flex justify-content-center small text-warning mb-2">
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
              </div>
              <div className="text-center">
                <span className="text-muted text-decoration-line-through">$80.00</span> $25.00
              </div>
            </div>
            <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-center">
              <button type="button" className="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#PocoModal">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
            <img className="card-img-top" src="Images/Guccibag.png" alt="..." />
            <div className="card-body p-2">
              <h5 className="fw-bolder text-center">DIOR Bag</h5>
              <div className="d-flex justify-content-center small text-warning mb-2">
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
              </div>
              <div className="text-center">
                <span className="text-muted text-decoration-line-through">$80.00</span> $25.00
              </div>
            </div>
            <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-center">
              <button type="button" className="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#PocoModal">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card h-100">
            <div className="badge bg-dark text-white position-absolute" style={{ top: '0.5rem', right: '0.5rem' }}>Sale</div>
            <img className="card-img-top" src="Images/Guccibag.png" alt="..." />
            <div className="card-body p-2">
              <h5 className="fw-bolder text-center">DIOR Bag</h5>
              <div className="d-flex justify-content-center small text-warning mb-2">
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
                <div className="bi-star-fill"></div>
              </div>
              <div className="text-center">
                <span className="text-muted text-decoration-line-through">$80.00</span> $25.00
              </div>
            </div>
            <div className="card-footer p-2 pt-0 border-top-0 bg-transparent text-center">
              <button type="button" className="btn btn-outline-dark mt-auto" data-toggle="modal" data-target="#PocoModal">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        

        {/* Add one more product card with the same structure */}
      </div>
    </div>
  );
}

export default ProductCard;
