

export interface RegisterRequest{
    email:string,
    firstName:string,
    lastName:string,
    password:string,
    birthdate:Date,
    nationalId:string,
    city:string,
    phone:string,
    gender:string,
    image:File |null,
    coachId:string,
    TennisExp:string,
    timeSession:SelectedTime,
    startTime:string,
    tennisCourt:string,
    period:string,
    hasHealthCondtion:boolean,
    details:string | null
}

export interface SelectedTime{
    Hours:number,
    Minutes:number,
    AmPm:string
}