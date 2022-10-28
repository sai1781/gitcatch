


const FollowingList = ({data, details}) =>{


    return(
        <div className="followingList same">
            {details.following === 0 ? <h3>No followersList is Available</h3> : (
                <>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th colSpan={2}>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, idx) =>{

                        return(
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>
                                    <img src={element.avatar_url} alt="profile" />
                                </td>
                                <td>
                                    <a href={element.html_url} rel="noreferrer" target="_blank" >{element.login}</a>
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

export default FollowingList;

