import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { DialogTitle } from "@/components/ui/dialog";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { Set, Type } from "@/utils/types";
import { string, object, number } from "yup";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

interface IField {
  name: string;
  type: any;
}

type FormProps = {
  setOpen: (value: boolean) => void;
};

function Form({ setOpen }: FormProps) {
  const { models: sets } = useFetchAllModel<Set[]>("admin/all_sets", "sets", "all_sets");
  const { models: types } = useFetchAllModel<Type[]>("all_types", "types", "all_types");

  const fields: IField[] = [
    {
      name: "type_id",
      type: string().required("Type field is required"),
    },
    {
      name: "table_count",
      type: string().required("Table count field is required"),
    },
  ];

  sets?.map((set, index) => {
    fields.push({
      name: `set_${set.id}_price`,
      type: number()
        .typeError(`Price for ${set.name} is required`)
        .required(`Price for ${set.name} is required`),
    });
  });

  const SchemaObject = Object.fromEntries(
    fields.map((field) => [field.name, field.type])
  );
  const schema = object().shape(SchemaObject);
  type FormData = yup.InferType<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver<FormData>(schema),
  });
  const { toast } = useToast();

  const createTableSet = usePostModel("admin/set_types", "set_types", "POST");

  const handleLogin = (data: FormData) => {
    const setPrices = Object.entries(data).reduce<
      { price: number; set_id: number }[]
    >((acc, [key, value]) => {
      if (key && key.startsWith("set") && key.endsWith("_price")) {
        const matches = key.match(/\d+/);
        if (matches) {
          const set_id = parseInt(matches[0]);
          acc.push({ price: value, set_id });
        }
      }
      return acc;
    }, []);

    const result = {
      set_price: JSON.stringify(setPrices),
      type_id: data.type_id,
      table_count: data.table_count,
    };
    createTableSet.mutate(result, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Add new table set
      </DialogTitle>

      <div className="mt-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label>Type</label>
                <select
                  id="type_id"
                  className="input-box"
                  {...register("type_id")}
                >
                  <option value="">Select a type</option>
                  {types?.map((type, index) => {
                    return (
                      <option key={index} value={type.id}>
                        {type.name}
                      </option>
                    );
                  })}
                </select>
                {errors.type_id && (
                  <span className="text-red-500 text-xs">
                    {String(errors.type_id.message)}
                  </span>
                )}
              </div>
              <div>
                <label>Table Count</label>
                <input
                  type="number"
                  id="name"
                  className="input-box"
                  autoComplete="off"
                  defaultValue=""
                  {...register("table_count")}
                />
                {errors.table_count && (
                  <span className="text-red-500 text-xs">
                    {String(errors.table_count.message)}
                  </span>
                )}
              </div>
              {sets?.map((set, index) => {
                return (
                  <div key={index}>
                    <label>Price for {set.name}</label>
                    <input
                      type="number"
                      id="name"
                      className="input-box"
                      autoComplete="off"
                      defaultValue=""
                      {...register(`set_${set.id}_price`)}
                    />
                    {errors[`set_${set.id}_price`] && (
                      <span className="text-red-500 text-xs">
                        {String(errors[`set_${set.id}_price`]?.message)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="py-1 px-4 text-center text-white bg-black border border-black rounded-md hover:bg-transparent hover:text-black transition font-medium"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;

// let data = {
//   set_1_price: 111,
//   set_2_price: 222,
//   set_4_price: 333,
//   set_5_price: 444,
//   table_count: "111",
//   type_id: "1",
// };
// result = {
//   set_price = [
//     111,
//   ]
// }
