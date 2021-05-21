const Activity = ({activityInfo}) =>{ 
    return(
        <div className="activityBanner" style={{backgroundImage: `url('${activityInfo.activityImage}')`}}>
            <h3 className="activityName">{activityInfo.activityName}</h3>
        </div>  
    )
}


export default Activity
