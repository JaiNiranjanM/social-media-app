import { useState, useEffect } from "react";
import "./App.css";
import { connect } from "react-redux";
import {
  setInitialSiteData,
  setSiteData,
} from "./state/actions/socialmediadata";

const App = (props) => {
  const [popup, showPopup] = useState(false);
  const [popupImg, setPopupImg] = useState("");
  const [error, setError] = useState("");
  const [siteData, setStateSiteData] = useState({});
  const [liked, setLiked] = useState([]);
  const [postDesc, setPostDesc] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const styles = {
    overflowStyle: {
      height: "108px",
      overflowX: "auto",
    },
  };

  console.log("props", props);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          props.actions.setSiteData(result);
          props.actions.setInitialSiteData(result);
          setLiked(result && result.pics && result.pics.map(() => true));
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  const handleImgClick = (event) => {
    const image = event.target.getAttribute("src");

    setPopupImg(image);
    showPopup(true);
  };

  const handleOverlayClick = () => {
    showPopup(false);
  };

  const handleInputPostOnChange = (event) => {
    console.log("event.current.value", event.target.value);
    setPostDesc(event.target.value);
  };

  const handlePost = (index) => {
    const initialData = Object.assign({}, props.siteData);
    const postDetails = initialData.pics.map((item, idx) => {
      const comments =
        index === idx ? item.comments.unshift(postDesc) : item.comments;
      return {
        ...item,
      };
    });
    console.log("postDetails", postDetails);
    props.actions.setSiteData({
      metadata: {},
      pics: [...postDetails],
    });
  };

  const handleLikeButton = (index) => {
    if (liked && liked.length > 0) {
      liked[index] = !liked[index];
      setLiked([...liked]);
    }

    const initialData = Object.assign({}, props.siteData);
    const likesDetails = initialData.pics.map((item, idx) => {
      let likes = item.likes;
      if (index === idx) {
        likes =
          liked && liked.length > 0 && liked[idx] !== true
            ? item.likes++
            : item.likes--;
      }

      return {
        ...item,
      };
    });

    props.actions.setSiteData({
      metadata: {},
      pics: [...likesDetails],
    });
    console.log("likesDetails", likesDetails);
  };

  const handleMostLiked = () => {
    const initialData = Object.assign({}, props.siteData);
    const mostLikedSort = initialData.pics.sort((a, b) => {
      return b.likes - a.likes;
    });
    props.actions.setSiteData({
      metadata: {},
      pics: [...mostLikedSort],
    });
    console.log("mostLikedSort", mostLikedSort);
  };

  const handleMostCommented = () => {
    const initialData = Object.assign({}, props.siteData);
    const mostLikedSort = initialData.pics.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    props.actions.setSiteData({
      metadata: {},
      pics: [...mostLikedSort],
    });
    console.log("mostLikedSort", mostLikedSort);
  };

  const handleSearch = (event) => {
    let timerId;
    clearTimeout(timerId);
    setSearchInput(event.target.value);
    timerId = setTimeout(() => {
      console.log("sdds", event.target.value);
      const initialData = Object.assign({}, props.siteData);
      const searchedData = initialData.pics.filter((item) => {
        return (
          item.category
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) === 0
        );
      });
      props.actions.setSiteData({
        metadata: {},
        pics:
          event.target.value === ""
            ? [...props.initialSiteData.pics]
            : [...searchedData],
      });
    }, 1000);

    if (event.target && event.target.value.length === 0) {
      clearInputSearch();
    }
  };

  const clearInputSearch = () => {
    props.actions.setSiteData(props.initialSiteData);
    setSearchInput("");
  };

  const loadRender = () => {};

  return (
    <div className="app">
      <header className="app-header"></header>
      <div
        id="overlay"
        onClick={handleOverlayClick}
        style={{ display: popup ? "" : "none" }}
      >
        <div id="pop-up">
          <img className="overlay-image" alt="overlay image" src={popupImg} />
        </div>
      </div>
      <div className="main-container">
        <div className="header-container">
          <div>Imaginary</div>
        </div>
        <div className="search-sort-container">
          <div className="sort-container">
            <div
              className="sort-container-liked-label"
              onClick={handleMostLiked}
            >
              Most liked
            </div>
            <div className="sort-container-divider"></div>
            <div
              className="sort-container-commented-label"
              onClick={handleMostCommented}
            >
              Most commented
            </div>
          </div>
          <div className="search-container">
            <div className="search-input-container">
              <input
                className="search-input"
                onChange={handleSearch}
                placeholder="Search images..."
                value={searchInput}
              />
              {searchInput && searchInput.length > 0 ? (
                <span className="clear-search-input" onClick={clearInputSearch}>
                  CLEAR
                </span>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="product-main-container">
          {props.siteData &&
            props.siteData.pics &&
            props.siteData.pics.map((item, index) => {
              return (
                <div className="product-container">
                  <div className="product-img-container">
                    <img
                      onClick={handleImgClick}
                      src={item.url}
                      alt={item.category}
                    />
                  </div>
                  <div className="product-body-container">
                    <div className="product-desc-container">
                      <div className="product-desc-like-count">
                        {item.likes}
                      </div>
                      <div
                        className="product-desc-like"
                        onClick={() => handleLikeButton(index)}
                      >
                        {liked && liked.length > 0 && liked[index]
                          ? "Like"
                          : "Unlike"}
                      </div>
                      <div className="product-desc-label">{item.category}</div>
                    </div>
                    <div className="product-post-container">
                      <input
                        className="post-input"
                        placeholder="Type your comments here..."
                        onChange={handleInputPostOnChange}
                      />
                      <button
                        onClick={() => handlePost(index)}
                        className="post-button"
                      >
                        POST
                      </button>
                    </div>
                    <div
                      className="product-post-list-container"
                      style={
                        item.comments && item.comments.length >= 5
                          ? styles.overflowStyle
                          : {}
                      }
                    >
                      {item.comments &&
                        item.comments.map((comment) => {
                          return comment ? (
                            <div className="product-posts-label">{comment}</div>
                          ) : (
                            <></>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = function (state) {
  const initialSiteData =
    state && state.socialmediaData && state.socialmediaData.initialSiteData;
  const siteData =
    state && state.socialmediaData && state.socialmediaData.siteData;

  return {
    initialSiteData,
    siteData,
  };
};

const mapDispatchToProps = function (dispatch) {
  const dispatchActions = {
    setSiteData: function (value) {
      dispatch(setSiteData(value));
    },
    setInitialSiteData: function (value) {
      dispatch(setInitialSiteData(value));
    },
  };

  return {
    actions: dispatchActions,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
