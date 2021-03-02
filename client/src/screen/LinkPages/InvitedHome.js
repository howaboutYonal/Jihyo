import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import BoxDescription from '../../component/BoxDescription'
import icon_plan from '../../image/yonal_icon_plan.png'
import icon_people from '../../image/yonal_icon_people.png'
import icon_calendar from '../../image/yonal_icon_calendar.png'
import axios from 'axios';


const InvitedHome = ({location, history}) => {
    const inviteLink = document.location.href;
    console.log("링크:", inviteLink);

    const [projectId, setProjectId] = useState('');
    const [projectTitle, setProjectTitle] = useState('');
    const [memberNum, setMemberNum] = useState('');
    const [projectDate, setProjectDate] = useState('');


    axios.post('http://localhost:5000/v1/get/link-data', {
        inviteLink: inviteLink
    }).then(function(res){
        setProjectId(res.data.projectId);
        setProjectTitle(res.data.projectName);
        setMemberNum(res.data.number);
        setProjectDate(res.data.startDate+' - '+res.data.endDate);
    });

    
    return (
        <div className='App'>
            <div className='gray-background'>
                <BoxDescription icon={icon_plan} title="프로젝트 이름" content={projectTitle}/>
                <BoxDescription icon={icon_people} title="현재 참여 인원" content={`${memberNum} 명`}/>
                <BoxDescription icon={icon_calendar} title="매칭 일정" content={projectDate}/>
            </div>

            <div >
                {/* <Link to={{pathname: '/guest', projectId: projectId, projectTitle: projectTitle}}>
                    <button className = 'btn'>입장하기</button>
                </Link> */}

                <button className = 'btn' onClick={() => { 
                    history.push({pathname: "/guest", projectId: projectId, projectTitle: projectTitle});
                }}>입장하기</button>
                
            </div>
        </div>
    );
}

export default withRouter(InvitedHome);