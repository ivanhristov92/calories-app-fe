import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


import ReportCaloriesPerUser from './ReportCaloriesPerUser';
import ReportNumberOfWeeklyEntries from './ReportNumberOfWeeklyEntries';

export default ()=>{
    return (
        <div style={{padding: 20}}>
            <h3 style={{margin:0, padding: 20}}>Reports</h3>

            <div className="report1">
                <ReportCaloriesPerUser />
                <ReportNumberOfWeeklyEntries />
            </div>
        </div>
    );
}