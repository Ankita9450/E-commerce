import { Skeleton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import "./Product.css"

 const Product = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let componentMounted = true; 
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const jsonData = await response.json();
      if (componentMounted) {
        setData(jsonData);
        setFilter(jsonData);
        setLoading(false);
      }
    };
    getProducts();
    return () => {
      componentMounted = false;
    }; 
  }, []);

  const filterProduct = (cat) => {
    const updateList = data.filter((x) => x.category === cat);
    setFilter(updateList);
  };

  const Loading = () => {
    return (
      <>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
        <div className='col-md-3'>
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    const [showMore, setShowMore] = useState(false);
    return (
      <div>
        <div className='buttons d-flex justify-content-center mb-5 pb-5'>
          <button className='btn btn-dark' onClick={() => setFilter(data)}>
            All
          </button>
          <button className='btn btn-dark' onClick={() => filterProduct("men's clothing")}>
            Men's Clothing
          </button>
          <button className='btn btn-dark' onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className='btn btn-dark' onClick={() => filterProduct('jewelery')}>
            Jewelery
          </button>
          <button className='btn btn-dark' onClick={() => filterProduct('electronics')}>
            Electronic
          </button>
        </div>
        <div className="card__body row" style={{marginLeft:"5%"}}>
        <div className='row'>
          {filter.map((product) => {
            return (<>
              <div class="card shadow-lg p-3 mb-5 bg-white rounded" style={{width:"30rem",margin:"1%"}} >
              <div className='col-md-3 mb-4' key={product.id} >
                {/* <div className="w-full flex justify-center items-center"> */}
                  <img src={product.image} className='card__img' alt='' />
                  </div>
                  <div class="card-body">
                  <div>
                  <h4 className="font-bodyFont my-3 line-clamp-1"> {product.title}</h4>
                 
              
                <p>
                  <small>$</small>
                  <b>{product.rating.rate}</b>
                 
                </p>
                
                <p className="card-text my-2 font-bodyFont line-clamp-2" onClick={() => setShowMore(!showMore)}>  {showMore ? product.description : `${product.description.substring(0, 100)}`}</p>
                 
               {/* </div> */}
              </div>
              </div>
          </div>
              </>);
          })}
          </div>
        </div>
      </div>
    );
  };

  return <div>{loading ? <Loading /> : <ShowProduct />}</div>; 
};

export default Product
