import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import {Link} from 'react-router-dom'
import 'react-calendar/dist/Calendar.css';
import '../calendar.css';
import axios from 'axios';
import { ListItemSecondaryAction } from '@material-ui/core';

/*  참여한 모든 유저의 date데이터를 api로 불러온다.
    이렇게 불러온 데이터를 종합하여 캘린더에 출력한다. */

// props를 통해 projectID를 전달받은 후 해당 프로젝트 반환

function getUUID() { // UUID v4 generator in JavaScript (RFC4122 compliant)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 3 | 8);
      return v.toString(16);
    });
}

const Result = (projectId) => {
    const [value, ] = useState(new Date());
    const [apiData, setApiData] = useState([
        {
           votedata:""
        }
    ]);
    const [shareLink,] = useState('http://localhost:3000/invite/'+getUUID());

    function parse(str) {
        var y = str.substr(0,4);
        var m = str.substr(4,2);
        var d = str.substr(6,2);
        var r = new Date(y,m-1,d);
        return  r;
    };

    function jointpars(apiData){
        var voteData = JSON.parse(apiData.votedata);
        voteData = voteData[0].filter(function (element){
            if (element) return element.date;
        });

        var joint = [];
        for( var i= 0;i<voteData.length;i++){
            joint = [
                ...joint,
                {
                    votedata:voteData[i].date
                }
            ]
        }
        return joint;
    }
    
    useEffect(async () =>{
        await fetchApi().then(res => jointpars(res)).then(res => setApiData(res));
    },[]);

    function fetchApi(){
        var url = 'http://localhost:5000/v1/get/project-result';
        return axios.post(url, {projectId:projectId}).then(function (res) {
            return res.data;
        })
    }
    function fetchApi2(){
        var url = 'http://localhost:5000/v1/save/shareLink';
        return axios.post(url, {projectId:projectId, shareLink:shareLink}).then(function (res) {
            return res.data;
        })
    }


    function tileClassName(params){
        if(params.view === 'month' && !(apiData.length ===0))
        if(apiData.some(x => parse(x.votedata.replaceAll('-','')).valueOf() === params.date.valueOf()))
            return 'selected_day';
    }

    return (
        <div>
            <h1>종합된 날짜</h1>
            <div>
            {apiData ?<div>
            <Calendar className="calendar"
                value = {value}
                minDate = {value}
                tileClassName = {tileClassName} 
            /> </div>
            :  "Loading"
            }
            </div>
            <Link to={{pathname: './copylink', value: shareLink}}>
                <button className = 'indexBtn' onClick={fetchApi2} disabled={false}>결과 공유하기</button>
            </Link>
        </div>
    );

}

export default Result;