// place files you want to import through the `$lib` alias in this folder.
export const BASE_URL = 'http://localhost:5000/api/v1'

export interface USERS {
    _id: string,
    name: string,
    email: string,
    phone: string,
    isVerified: boolean,
    verificationToken: string,
    role: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number,
    verified: Date
}

export interface CUSTOMERS {
    _id: string,

    firstname: string,

    othername: string | '',

    lastname: string,

    maritalStatus: string,

    idcard: string,

    phone: string,

    employer: string,

    dob: Date,

    address: string,

    createdBy: string,

    createdAt: Date,

    updatedAt: Date,

    __v: number
}


export interface LOANS{
    _id: string,

    customerName: string,

    loanamount: number,

    loanperiod: number,

    amountPayable: number,

    interest: number,

    createdBy: string,

    createdAt: Date,

    updatedAt: Date,

    __v: number
}

