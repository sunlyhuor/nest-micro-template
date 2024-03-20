import { envEnum } from "@common/enum/env.enum";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as _Admin from "firebase-admin"
import { Bucket } from '@google-cloud/storage';

export interface IFirebaseService{
    uploadFIle(fileName:string, file:Express.Multer.File);
    deleteFile( fileName:string );
    register( type:string, infor:any );
    renderFile( fileName:string, bucket?:string );
}

@Injectable()
export class FirebaseService{
    admin:any = _Admin
    storage:Storage = null
    bucket:Bucket = null
    private bucketName = ""
    constructor( config:ConfigService ){

        this.admin.initializeApp({
            credential: this.admin.credential.cert(config.get<string>(envEnum.FIREBASE_JSON_PATH)),
            storageBucket: 'gs://storage-363ce.appspot.com', // Your Firebase Storage bucket URL
        });

        this.storage = this.admin.storage()
        this.bucket = this.storage.bucket()

    }

    setBucketName(name:string){
        this.bucketName = name
    }



}