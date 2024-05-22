import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  padding: 20px;
  background-color: ${(props) => (props.theme === "dark" ? "#333" : "#fff")};
  color: ${(props) => (props.theme === "dark" ? "#fff" : "#333")};
`;

const WineCard = styled.div`
  border: 1px solid ${(props) => (props.theme === "dark" ? "#666" : "#ccc")};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background-color: ${(props) => (props.theme === "dark" ? "#444" : "#f9f9f9")};

  &:hover {
    background-color: ${(props) =>
      props.theme === "dark" ? "#555" : "#f0f0f0"};
  }
`;

const WineImage = styled.img`
  max-width: 90%;
  height: auto;
  border-radius: 8px;
`;

const WineGrid = ({ theme }) => {
  const [wines, setWines] = useState([]);
  const [displayedWines, setDisplayedWines] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const winesPerPage = 6;

  //fetching data from API
  useEffect(() => {
    const fetchWines = async () => {
      try {
        const response = await axios.get(
          "https://api.sampleapis.com/beers/ale"
        );

        // filtering with ratings above 4.
        const filteredWines = response.data.filter(
          (wine) => wine.rating.average > 4
        );

        // sorting the filtered wines by price in ascending order.
        const sortedWines = filteredWines.sort((a, b) => a.price - b.price);

        setWines(sortedWines);
        setDisplayedWines(sortedWines.slice(0, winesPerPage));
      } catch (error) {
        console.error("Error fetching wine data:", error);
      }
    };

    fetchWines();
  }, []);

  //paginating data
  const fetchMoreWines = () => {
    if (displayedWines.length >= wines.length) {
      setHasMore(false);
      return;
    }
    const nextWines = wines.slice(
      displayedWines.length,
      displayedWines.length + winesPerPage
    );
    setDisplayedWines([...displayedWines, ...nextWines]);
  };

  return (
    <InfiniteScroll
      dataLength={displayedWines.length}
      next={fetchMoreWines}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      <div className="container">
        <GridContainer theme={theme}>
          {displayedWines.map((wine) => (
            <WineCard key={wine.id} theme={theme}>
              <WineImage src={wine.image} alt={wine.wine} />
              {/* <h3>{wine.wine}</h3> */}
              <p style={{ color: "Blue" }}>{wine.name}</p>
              <p style={{ color: "red" }}>Price: {wine.price}</p>
              <p style={{ color: "Orange" }}>
                Rating: {wine.rating.average.toFixed(2)}
              </p>
            </WineCard>
          ))}
        </GridContainer>
      </div>
    </InfiniteScroll>
  );
};

export default WineGrid;
