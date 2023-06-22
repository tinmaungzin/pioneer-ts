import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().required("Name field is required"),
    set_id: yup.string().required("Set field is required"),
    walk_in_price: yup.string().required("Walk in price field is required"),
    photo: yup
      .mixed()
      .optional(),
    layout_photo: yup
      .mixed()
      .optional(),
  })
  .required();
