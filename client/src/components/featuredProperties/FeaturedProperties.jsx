import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "guesthouses?featured=true"
  );
  console.log(data);
  return (
    <div className="fp">
      {loading ? (
        "Loading please wait...."
      ) : (
        <>

          {data.map((item)=>(
            <div className="fpItem" key={item?._id}>
            <img
              src={item?.photo[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item?.name}</span>
            <span className="fpCity">{item?.city}</span>
            <span className="fpPrice">Starting from Rs. {item?.cheapestPrice}</span>
            {item.rating && <div className="fpRating">
              <button>{item.rating}</button>
              <span>Excellent</span>
            </div>}
          </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
