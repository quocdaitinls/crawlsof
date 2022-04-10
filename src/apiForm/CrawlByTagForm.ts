import {Field, Form} from "../services/form";
import * as Yup from "yup";

@Form
export class CrawlByTagForm {
  @Field({
    value: "",
    validation: Yup.string().required("Tag is required"),
    required: true,
    label: "Tag",
  })
  tag: string;
}
