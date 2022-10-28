const RepoList = ({ repolist, details }) => {

  return (
    <div className="repolist same">
      <h2>Repo List</h2>
      {details.public_repos === undefined ? <p>No RepoList available</p> : (
        <>
          <table >
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th> 
              </tr>
            </thead>
            <tbody>
              {repolist.map((singlerepo, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <a style={{fontSize:20}} href={singlerepo.html_url} target="_blank" rel="noreferrer" >{singlerepo.name}</a>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RepoList;
