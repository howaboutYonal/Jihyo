import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

/*  사용자가 참여 가능한 날짜를 선택할 수 있는 달력 컴포넌트
    사용자가 날짜를 선택하면 해당 날짜가 days에 date형식으로 저장된다.
    이어서 버튼을 누르면, days에 저장된 데이터가 db로 업로드된다. */

const CalendarComponent = () => {
    const [days, setDays] = useState([]);
    const [value, ] = useState(new Date());

    function check_selected_days(nextValue){
        var flag = -1;
        if(nextValue.valueOf() === value.valueOf()) return;
        for(var day in days){
            if(days[day].valueOf() === nextValue.valueOf()){
                flag = day;
                break;
            }
        }
        if(flag===-1){
            setDays(days.concat(nextValue));
        }else{
            var fore = days.splice(0, flag);
            var back = days.splice(1, days.length);
            var tmp = fore.concat(back);
            setDays(tmp);
        }
    }
    const fetchApi = async() =>{
        //        const res = await axios.post('http://localhost:5000/v1/save/project-userId-date',{
        //            projectId : 0,// for test
        //            userId :2,// for test
        //            date:[new Date()]// for test
        //        });
        //        console.log(res);
            }

    function tileClassName(params){
        if(params.view === 'month' && !(days.length ===0))
            if(days.some(x => x.valueOf() === params.date.valueOf()))
                return 'selected_day'
    }
    
    return (
        <div>
            <h1>가능한 날짜</h1>
            <Calendar
                className="calendar"
                onChange={check_selected_days} 
                value={value}
                minDate={value}
                tileClassName={tileClassName}
            />
            <p>{days.map(x=> x.valueOf())}</p>
            <Link to='/totalcal'>
            <button className = 'btn' onClick={fetchApi}>YONAL</button>
            </Link>
        </div>
    );
}

export default CalendarComponent;