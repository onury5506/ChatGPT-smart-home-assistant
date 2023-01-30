import "./device.css"

export default function Device({name,value,image}){

    return(
        <div className="device">
            <div>{name}</div>
            <img src={"/images/"+image} className={value=="off"?"off":"on"} />
            <div>{value}</div>
        </div>
    )
}