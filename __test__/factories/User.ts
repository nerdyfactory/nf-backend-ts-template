/*
 * @format
 */

import { User } from "src/entities";
import { internet, name, phone, random } from "faker";

export default (params: any = {}): User =>
  new User({
    email: `${internet.userName()}${random.number()}@${internet.domainName()}`,
    name: name.findName(),
    phoneNumber: phone.phoneNumber(),
    encryptedPassword: random.word(),
    ...params,
  });
