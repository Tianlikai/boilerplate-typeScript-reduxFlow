import { IntlShape } from "react-intl";
import { Response } from "../../../api/interface";

export interface LocalesDataResponse extends Response {
  data: IntlShape["messages"];
}
