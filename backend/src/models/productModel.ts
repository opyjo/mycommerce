import { modelOptions, prop, getModelForClass } from "@typegoose/typegoose";

//modelOptions: It is used to define options for a class-based model. This decorator allows you to specify various options like specifying the schema options, enabling timestamps, and more.
//prop: It is used to define properties (fields) within a class-based model. This decorator helps you define the schema properties and their types.
//getModelForClass: It is a utility function provided by Typegoose that generates a mongoose model from a class with decorated properties and options.

@modelOptions({ schemaOptions: { timestamps: true } })
export class Product {
  public _id?: string;
  @prop({ required: true })
  public name!: string;
  @prop({ required: true, unique: true })
  public slug!: string;
  @prop({ required: true })
  public image!: string;
  @prop()
  public brand!: string;
  @prop({ required: true })
  public category!: string;
  @prop({ required: true })
  public description!: string;
  @prop({ required: true, default: 0 })
  public price!: number;
  @prop({ required: true, default: 0 })
  public countInStock!: number;
  @prop({ required: true, default: 0 })
  public rating!: number;
  @prop({ required: true, default: 0 })
  public numReviews!: number;
  @prop()
  public banner?: string;
}

export const ProductModel = getModelForClass(Product);
