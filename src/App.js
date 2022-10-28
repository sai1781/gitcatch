import Footer from "./Components/Footer";
import RepoList from "./Components/RepoList";
import Search from "./Components/Search";
import Details from "./Components/Details";
import { github } from "./utils";
import { useEffect, useState } from "react";
import FollowersList from "./Components/FollowersList";
import FollowingList from "./Components/FollowingList";

function App() {
  const [Data, setData] = useState({});
  const [repoList, setRepoList] = useState([]);
  const [followerList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);
  const [username, setusername] = useState("");
  const [isSuccessful, setSuccessful] = useState(true);
  const [visibleComponent, setVisibleComponent] = useState(2);
  //1-> Follower List | 2. -> Repo List | 3 -> Following List

  useEffect(
    (_) => {
      setData({})
      setSuccessful(true);
      if(username === ""){
        return;
      }

      (async (_) => {
        try {
          const full_data = await github.get(`/${username}`);
          setData(full_data.data);
        } catch (e) {
          setSuccessful(false)
        }
      })();
    },
    [username]
  );

  useEffect(
    (_) => {
      setRepoList([]);
      if(username === ""){
        return;
      }

      (async (_) => {
        const data_repos = await github.get(`/${username}/repos`);
        setRepoList(data_repos.data);
      })();
    },
    [username]
  );
  useEffect(
    (_) => {
      setFollowersList([]);
      if(username === ""){
        return;
      }
      (async (_) => {
        const data_followers = await github.get(`/${username}/followers`);
        setFollowersList(data_followers.data);
      })();
    },
    [username]
  );
  useEffect(_ => {
    setFollowingList([]);
    if(username === "") {
      return;
    }
    (async _ => {
      const response = await github.get(`/${username}/following`);
      setFollowingList(response.data);
    })();
  }, [username])

  const searchedusername = (keyword) => {
    setusername(keyword);
  };
  const showLoadMore = _ => {
    if(visibleComponent === 1) {
      if(followerList.length === Data.followers) {
        return false;
      } else {
        return true;
      }
    } else if(visibleComponent === 2) {
      if(repoList.length === Data.public_repos) {
        return false;
      } else {
        return true;
      }
    } else {
      if(followingList.length === Data.following) {
        return false;
      } else {
        return true;
      }
    }
  }

  const loadMoreData = async _ => {
    if(visibleComponent === 1) {
      const currentPages = Math.ceil(followerList.length / 30);
      const nextPage = currentPages + 1;
      const response = await github.get(`/${username}/followers?page=${nextPage}`);
      const list = response.data;

      setFollowersList(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //Fetch more from follower list
    } else if(visibleComponent === 2) {
      const currentPages = Math.ceil(repoList.length / 30);
      const nextPage = currentPages + 1;

      const response = await github.get(`/${username}/repos?page=${nextPage}`);
      const list = response.data;

      setRepoList(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //Fetch more from repo list
    } else {
      const currentPages = Math.ceil(followingList.length / 30);
      const nextPage = currentPages + 1;

      const response = await github.get(`/${username}/following?page=${nextPage}`);
      const list = response.data;

      setFollowingList(currentList => {
        const newList = [...currentList, ...list];
        return newList;
      });
      //Fetch more from followng list
    }
  }

  return (
    <main className="main search">
      <Search searchedusername={searchedusername} isSuccessful={isSuccessful} />
      {Data.id === undefined ? (
        false
      ) : (
        <>
          <Details details={Data} changeVisibleComponent={setVisibleComponent} visibleComponent={visibleComponent}/>
          {visibleComponent === 1 ? (
            <FollowersList data={followerList}  details={Data} />
          ): (
            visibleComponent === 2 ? (
              <RepoList repolist={repoList} details={Data}  />
            ) : (
              <FollowingList  data={followingList} details={Data}  />
            )
          )}
          {showLoadMore() === true ? (
            <div className="same load-more">
              <button onClick={loadMoreData}>Load More</button>
            </div>
          ) : (false)}
        </>
      )}
      <Footer />
    </main>
  );
}

export default App;
