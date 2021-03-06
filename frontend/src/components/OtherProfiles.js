import React from "react";
import SongDisplay from "./songs/SongDisplay.js";
import "./Profile.css";
import axios from "axios";

class OtherProfiles extends React.Component {
  state = {
    isDisplayPostedView: true,
    newSongTitle: "",
    newSongImgUrl: "",
    selectedGenre: ""
  };

  componentDidMount() {
    this.props.dynamic_getAllSongsPostedByOneUser(+this.props.match.params.id);
    this.props.getAllFavoritesForOneUser(+this.props.match.params.id);
    this.props.getAllUsers();
    this.props.getAllComments();
    this.props.getAllFavoritesAllDetailsForOneUser(+this.props.match.params.id);
    this.props.getAllSongs();
    this.props.getAllGenres();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.dynamic_getAllSongsPostedByOneUser(+this.props.match.params.id);
      this.props.getAllFavoritesForOneUser(+this.props.match.params.id);
      this.props.getAllUsers();
      this.props.getAllComments();
      this.props.getAllFavoritesAllDetailsForOneUser(+this.props.match.params.id);
      this.props.getAllSongs();
      this.props.getAllGenres();
    }
  }

  handleToggle = async val => {
    if (val === "posted") {
      await this.setState({
        isDisplayPostedView: true
      });
      this.props.receiveProfileViewForPosted(true);
    }
    if (val === "favorited") {
      await this.setState({
        isDisplayPostedView: false
      });
      this.props.receiveProfileViewForPosted(false);
    }
  };

  handleNewSongChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleNewSongSubmit = e => {
    if (e) {
      e.preventDefault();
    }

    let { newSongTitle, newSongImgUrl, selectedGenre } = this.state;

    axios
      .post("/api/songs/", {
        title: newSongTitle,
        img_url: newSongImgUrl,
        user_id: +this.props.match.params.id,
        genre_id: selectedGenre
      })
      .then(() => {
        this.setState({
          newSongTitle: "",
          newSongImgUrl: "",
          selectedGenre: ""
        });
      })
      .then(() => {
        this.props.getAllSongs();
        this.props.dynamic_getAllSongsPostedByOneUser(
          +this.props.match.params.id
        );
      });
  };

  render() {
    let { isDisplayPostedView } = this.state;
    //To display sample user 1
    let usernameUser1;
    if (this.props.allSongsPostedByUser) {
      usernameUser1 = Object.values(this.props.allSongsPostedByUser)[0]
        .username;
    }
    //To display body of prof
    let songsMapped;
    if (isDisplayPostedView && this.props.allSongsPostedByUser) {
      if (
        isDisplayPostedView &&
        Object.values(this.props.allSongsPostedByUser).length
      ) {
        songsMapped = Object.values(this.props.allSongsPostedByUser)
          .reverse()
          .map(song => {
            return (
              <SongDisplay
                title={song.title}
                img_url={song.img_url}
                favorited_count={song.favorited_count}
                user_id={song.user_id}
                song_id={song.id}
                allFavoritesForUser={this.props.allFavoritesForUser}
                allComments={this.props.allComments}
                getAllComments={this.props.getAllComments}
                key={song.id}
                allUsers={this.props.allUsers}
              />
            );
          });
      } else if (
        isDisplayPostedView &&
        Object.values(this.props.allSongsPostedByUser).length === 0
      ) {
        songsMapped = (
          <div className="errorMessage">
            <h1>This user has not posted any songs yet.</h1>
          </div>
        );
      }
    } else if (!isDisplayPostedView && this.props.allFavsAllDetailsForUser) {
      if (
        !isDisplayPostedView &&
        Object.values(this.props.allFavsAllDetailsForUser).length
      ) {
        songsMapped = Object.values(this.props.allFavsAllDetailsForUser)
          .reverse()
          .map(song => {
            return (
              <SongDisplay
                title={song.title}
                img_url={song.img_url}
                favorited_count={song.favorited_count}
                user_id={song.user_id}
                song_id={song.id}
                allFavoritesForUser={this.props.allFavsAllDetailsForUser}
                allComments={this.props.allComments}
                getAllComments={this.props.getAllComments}
                key={song.id}
                allUsers={this.props.allUsers}
              />
            );
          });
      } else if (
        !isDisplayPostedView &&
        Object.values(this.props.allFavsAllDetailsForUser).length === 0
      ) {
        songsMapped = (
          <div className="errorMessage">
            <h1>This user has not favorited any songs yet.</h1>
          </div>
        );
      }
    }
    return (
      <div className="profileWrapper topMost">
        <h2 className="otherProfilesUsername username">{usernameUser1}</h2>
        <div className="profileButtonsContainer">
          <button
            className={
              isDisplayPostedView
                ? "postedButtonProfile isSelectedBackgroundRed"
                : "postedButtonProfile"
            }
            onClick={() => this.handleToggle("posted")}
          >
            Posted
          </button>
          <button
            className={
              !isDisplayPostedView
                ? "favoritedButtonProfile isSelectedBackgroundRed"
                : "favoritedButtonProfile"
            }
            onClick={() => this.handleToggle("favorited")}
          >
            Favorited
          </button>
        </div>
        <div className="feed otherProfilesFeed">{songsMapped}</div>
      </div>
    );
  }
}

export default OtherProfiles;
