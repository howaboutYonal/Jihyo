import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../calendar.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles'
import { ListItemSecondaryAction } from '@material-ui/core';

/*  참여한 모든 유저의 date데이터를 api로 불러온다.
    이렇게 불러온 데이터를 종합하여 캘린더에 출력한다. */

// projectId는 링크를 통해 유추한다.

const useStyles = makeStyles((thems) =>{

});

const ResultForGuest = () => {
    const [value, ] = useState(new Date());
    const [apiData, setApiData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(async () =>{
        setIsLoading(false);
        await fetchApi().then(res => setApiData(res)).then(setIsLoading(true));    
    },[]);

    function parse(str) {
        var y = str.substr(0,4);
        var m = str.substr(4,2);
        var d = str.substr(6,2);
        var r = new Date(y,m-1,d);
        return  r;
    };
    
    function jointpars(apiData){
        var voteData = JSON.parse(apiData.votedata);

        var totaljoint = [];
        for(var j=0; j<voteData.length;j++){
            var joint = [];
            for( var i= 0;i<voteData[j].length;i++){
                joint = [
                    ...joint,
                    {
                        votedata:voteData[j][i].date
                    }
                ]
            }
            totaljoint=[
                ...totaljoint,
                {
                    votedata:joint
                }
            ]
        }
        console.log(totaljoint);

        return totaljoint;
    }
    
    async function fetchApi(){
        return axios.post('http://localhost:5000/v1/get/project-result-from-link', {shareLink:document.location.href}).then(function (res) {
            return jointpars(res.data);
        })
    }    
    
    function tileClassName(params){
        if(!(apiData.length===0))
            for(var i=0;i<apiData.length;i++)
                return comparFerUser(params,i);
    }

    function comparFerUser(params,idx){
        if(params.view === 'month' && !(apiData[idx].length ===0))
            if(apiData[idx].votedata.some(x => parse(x.votedata.replaceAll('-','')).valueOf() === params.date.valueOf())){
                console.log(params,'finish');
                return 'selected_day';
            }
    }
 
    return (
        <div>
            <h1>종합된 날짜</h1>
            <div>
            {isLoading ?
            <Calendar className="calendar"
                value = {value}
                minDate = {value}
                tileClassName = {tileClassName } 
            />
            : "Loading"
            }
            </div>
        </div>
    );

}

export default ResultForGuest;