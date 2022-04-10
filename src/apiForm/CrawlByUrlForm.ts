import {Field, Form} from "../services/form";
import * as Yup from "yup";

@Form
export class CrawlByUrlForm {
  @Field({
    value: "",
    validation: Yup.string().required("Url is required"),
    required: true,
    label: "Url",
  })
  url: string;
}
