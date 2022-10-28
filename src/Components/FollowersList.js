

const FollowersList = ({ data, details }) => {
  
    return (

        <div className="followersList same" >
            {details.followers === 0 ? <h3>No followersList is Available</h3> : (
                <>
                    <h2>Followers List</h2>
                    <table  >
                        <thead>
                            <tr>
                                <th>#</th>
                                <th colSpan={2}>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((element, idx) => {
                                return (
                                    <tr>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <img src={element.avatar_url} alt="Profile" />
                                        </td>
                                        <td>
                                            <a href={element.html_url} rel="no-referrer" target="blank" >{element.login}</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            )}


        </div>

    )

}

export default FollowersList;
