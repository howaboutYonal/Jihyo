import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const Guest = () => {
    const [nickname, setNickname] = useState('');
    const onSubmit = () => {
        alert({nickname});
    }
    const getObject = () => {
        return `{{pathname: '/vote', nickname: ${nickname}}}`;
    } 
    console.log(nickname);

    return (
        <div>
            <h3 className='nicknameGuide'>별명을 입력해주세요.</h3>
                <label>
                    <input className= "inputField" type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder = "별명" />
                </label>
                <Link to={{pathname: '/vote', nickname: nickname}}>
                    <input type="submit" value="확인" className="btn" onSubmit={onSubmit}/>
                </Link>
        </div>
    );
}

export default Guest;