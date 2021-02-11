/*
 * @format
 */

import {
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { ObjectUtils } from "typeorm/util/ObjectUtils";

export interface IAttributes {
  [name: string]: any;
}

export abstract class Base extends BaseEntity {
  constructor(attributes?: IAttributes) {
    super();
    if (attributes) {
      ObjectUtils.assign(this, attributes);
    }
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
