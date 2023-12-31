import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import img1 from "../../images/cv.jpg"
import img2 from "../../images/bose.jpg"
const PropertyList = () => {
  const { data, loading, error } = useFetch("guesthouses/countByType");
  console.log(data);
  const image = [    
    img1,
    img2,
  ];
  return (
    <div className="pList">
      {loading ? (
        "Loadig"
      ) : (
        <>
          {data && image.map((img,i)=>(
            <div className="pListItem" key={i}>
            <img src={image[i]} alt="" className="pListImg" />
            <div className="pListTitles">
              <h1>{data[i]?.type}</h1>
              <h2>
                Total {data[i]?.count} {data[i]?.type} guesthouses
              </h2>
            </div>
          </div>
          ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
