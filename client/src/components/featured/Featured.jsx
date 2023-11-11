import "./featured.css";
import useFetch from "../../hooks/useFetch";
import img1 from "../../images/jc.jpg"
const Featured = () => {
  const { data, loading, error } = useFetch(
    "guesthouses/byAminity?aminity=AC,Wi-Fi,TV"
  );
  console.log(data)
  return (
    <div className="featured">
    {/*check if loading then render*/}
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          {data && data.map((item)=>(<div className="featuredItem">
            <img
              src={img1}
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>{item.name}</h1>
              <h2>{item.description}</h2>
            </div>
          </div>))}
        </>
      )}
    </div>
  );
};

export default Featured;
