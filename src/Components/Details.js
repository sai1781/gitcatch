import moment from 'moment';

const Details = ({ details, changeVisibleComponent, visibleComponent }) => {
  return (
    <div className="details same detiails-left">
      <img src={details.avatar_url} alt="no_image"></img>

      <div className="details-right">
        <h2>{details.name}</h2>
        <h3>
          <a href={details.url} target="blank" rel="noreferrer">
            @{details.login}
          </a>
        </h3>
        <p>Member Since {moment(details.created_at).fromNow()}.</p>
      </div>
      <div className="details-buttons">
      <button onClick={_ => changeVisibleComponent(1)} className={visibleComponent === 1 ? "active" : ""} >
          {details.followers} <span>Followers</span>
        </button>
        <button onClick={_ => changeVisibleComponent(2)} className={visibleComponent === 2 ? "active" : ""} >
          {details.public_repos} <span>Repos</span>
        </button>
        
        <button onClick={_ => changeVisibleComponent(3)} className={visibleComponent === 3 ? "active" : ""} >
          {details.following}
          <span>Following</span>
        </button>
      </div>
    </div>
  );
};

export default Details;
