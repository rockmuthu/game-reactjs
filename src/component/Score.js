import React from 'react';
import { useEffect, useState } from 'react';

function Score(){

    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/game/getAll')
        .then(res => res.json())
        .then(res => setUser(res))
    });




    return(
        <>
            <h1 className='p-3'>Score Page</h1>

            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>User Score</th>
                        <th>Computer Score</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((u, index ) => (
                        <tr key={index}>
                            <th scope="row">{ index+1 }</th>
                            <td>{ u.name }</td>
                            <td>{ u.userScore }</td>
                            <td>{ u.compScore }</td>
                            <td>{ u.status }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </>
    )
}

export default Score;