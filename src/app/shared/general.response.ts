export interface GeneralResponse<T>{
    value:T | null,
    status:number,
    isSuccess:boolean,
    successMessage:string,
    correlationId:string,
    errors:string[],
    validationErrors:string[]
}

// export class classGeneral implements GeneralResponse{
//     value: any;
//     status!: number;
//     successMessage!: string;
//     correlationId!: string;
//     errors!: string[];
//     validationErrors!: string[];
// }