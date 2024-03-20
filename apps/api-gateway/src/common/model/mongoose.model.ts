import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { paginationResponseMeta } from '../response/response';

export enum MongooseOrderEnum{
    DESC = "desc",
    ASC = "asc"
}

export interface MongoosePagination{
    limit: number
    page: number
    order:Map<string, MongooseOrderEnum>
}

export abstract class IMongooseModel{
    abstract pagination(
        meta:MongoosePagination
    );
    // abstract insert();
    // abstract delete();
}

export abstract class MongooseModel<T extends Object> implements IMongooseModel{
    private readonly model:Model<T>
    constructor(
        mo:Model<T>
    ){
        this.model = mo
    }

    /**
     * @param meta 
     * @param select 
     * @returns 
     */
    async pagination(meta: MongoosePagination, select?:Record<any, boolean>):Promise<{
        data: any|any[],
        meta:paginationResponseMeta
    }> {
        try{
            const total = await this.model.find()
            const pag = this.model.find()
                                    .select(select)
                                    .skip( (meta.page - 1) * meta.limit )
                                    .limit( meta.limit )
                                    .sort( [ ...meta.order ] )
                                    .exec()
            const reponseMeta:paginationResponseMeta = {
                currentPage: meta.page,
                limit: meta.limit,
                totalPage: ( Math.floor( total.length / meta.limit ) ),
                nextPage: meta.page < ( Math.floor( total.length / meta.limit ) ),
                previousePage: meta.page > 1
            }
            return {
                meta: reponseMeta,
                data: pag
            }
        }catch(e){
            throw new BadRequestException( e?.message || "error" )
        }
    }

    async filter(
        fil:Record<any, Array<string>>,
        meta: MongoosePagination,
        select?:Record<any, boolean>
    ):Promise<{
        data: any|any[],
        meta:paginationResponseMeta
    }>{
        try{
            const total = await this.model.find()
            const pag = this.model.find()
                                    .select(select)
                                    .skip( (meta.page - 1) * meta.limit )
                                    .limit( meta.limit )
                                    .sort( [ ...meta.order ] )
                                    .where(
                                        Object.keys(fil).reduce((acc, key) => {
                                            acc[key] = { $regex: new RegExp(fil[key].join('|'), 'i') };
                                            return acc;
                                        }, {})
                                    )
                                    .exec()
                                    
            const reponseMeta:paginationResponseMeta = {
                currentPage: meta.page,
                limit: meta.limit,
                totalPage: ( Math.floor( total.length / meta.limit ) ),
                nextPage: meta.page < ( Math.floor( total.length / meta.limit ) ),
                previousePage: meta.page > 1
            }
            return {
                meta: reponseMeta,
                data: pag
            } 
        }
        catch(e){
            throw new BadRequestException( e?.message || "error" )
        }
    }

}