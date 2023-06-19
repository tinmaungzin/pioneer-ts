import * as yup from "yup";

export const schema = yup
  .object({
    name: yup.string().required("Name field is required"),
    // date: yup
    //   .date()
    //   .typeError("Date field is required")
    //   .required("Date field is required"),
    set_id: yup.string().required("Set field is required"),
    walk_in_price: yup.string().required("Walk in price field is required"),
    // is_available: yup.boolean().optional(),
    // tables: yup
    //   .array()
    //   .test("array", "Please select tables", (value: any) => {
    //     if (value?.length > 0) {
    //       return true;
    //     }
    //     return false;
    //   })
    //   .required("Please select tables"),
    photo: yup
      .mixed()
      .test("file", "Event photo field is required", (value: any) => {
        if (value?.length > 0) {
          return true;
        }
        return false;
      })
      .required("Event photo field is required"),
    layout_photo: yup
      .mixed()
      .test("file", "Layout photo field is required", (value: any) => {
        if (value?.length > 0) {
          return true;
        }
        return false;
      })
      .required("Layout photo field is required"),
  })
  .required();