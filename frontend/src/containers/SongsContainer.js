import Songs from "../components/Songs.js";
import { connect } from "react-redux";
import { getAllSongs } from "../actions/SongsActions.js";
import { getAllFavoritesForOneUser } from "../actions/FavoritesActions.js";

const mapStateToProps = state => {
  return {
    allSongs: state.songs.allSongs,
    allFavoritesForUser: state.favorites.allFavoritesForUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAllSongs: () => dispatch(getAllSongs()),
    getAllFavoritesForOneUser: () => dispatch(getAllFavoritesForOneUser())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Songs);
