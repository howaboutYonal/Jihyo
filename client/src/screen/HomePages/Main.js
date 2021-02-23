import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const Main = ({location}) => {
    const myName = location.name;
    const myEmail = location.email;
    const myImg = location.image;
    const [myProjects, setMyProjects] = useState([]);

    axios.post('http://localhost:5000/v1/get/myProject', {
        email: myEmail
    }).then(function(res){
        // [{"projectId":1},{"projectId":413153}]
        setMyProjects(res.data.projectId);
    });

    return (
        <div>
            <div><img className='profile' src={myImg}/></div>
            <div className='logoText'>내 프로젝트</div>
            <div>
                {myProjects}
            </div>
            <Link to='./totalcal'>
                <button className = 'indexBtn' projectId="1">아직미완</button>
            </Link>
            <Link to='./create'>
                <button className = 'indexBtn'>프로젝트 만들기</button>
            </Link>
        </div>

    );
}

export default Main;