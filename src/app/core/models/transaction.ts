import { Wallet } from "./wallet";


export class Transaction {
    _id : string;
    levioCoin: number;
    receiver : Wallet;
    sender : Wallet;
    date: Date;
}


