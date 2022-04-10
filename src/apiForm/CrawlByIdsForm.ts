import {Field, Form} from "../services/form";
import * as Yup from "yup";

@Form
export class CrawlByIdsForm {
  @Field({
    value: "",
    validation: Yup.string().required("Ids is required"),
    required: true,
    label: "List ids",
  })
  ids: string;
}
