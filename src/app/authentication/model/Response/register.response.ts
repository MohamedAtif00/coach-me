export interface StudentRegisterResponse{
    value:{
        userId:string,
        role:string,
        username:string,
        jwtToken:string,
        tourismType:number
    }
}

export interface DonorRegisterResponse{
    value:{
        userId:string,
        role:string,
        username:string,
        jwtToken:string
    }
}