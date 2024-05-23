export interface PlanModel{
    id:{value:string},
    trainerId: {value:string};
    name:string,
    duration: number;
    focus: string;
    sessions: number;
    price: number;
}