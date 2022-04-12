import {Field, Form} from "../services/form";
import * as Yup from "yup";

@Form
export class CrawlByIdForm {
  @Field({
    value: "",
    validation: Yup.string().required("Id is required"),
    required: true,
    label: "Question id",
  })
  id: string;
}
