

export interface Trainee{
    email:string,
    firstName:string,
    secondName:string,
    password:string,
    birthdate:Date,
    nationalId:string,
    city:string,
    phone:string,
    gender:string,
    image:File |null,
    coachId:string,
    tennisExp:string,
    timeSession:{hour:number,minute:number,amPm:string},
    startTime:string,
    tennisCourt:string,
    period:string,
    hasHealthCondtion:boolean,
    details:string | null
}