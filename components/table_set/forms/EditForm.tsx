import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { DialogTitle } from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { usePostModel } from "@/hooks/usePostModel";
import { Set, TableSet } from "@/utils/types";
import { useFetchAllModel } from "@/hooks/useFetchAllModel";
import { string, object, number } from "yup";
import { useToast } from "@/components/ui/use-toast";
import { handleError, handleSuccess } from "@/utils/helpers/mutationHandlers";

interface IField {
  name: string;
  type: any;
}

type FormProps = {
  setOpen: (value: boolean) => void;
  editData: TableSet;
};

function EditForm({ setOpen, editData }: FormProps) {
  const { models: sets } = useFetchAllModel<Set[]>("admin/all_sets", "sets", "all_sets");

  const fields: IField[] = [];

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
  const updatePrice = usePostModel("admin/set_types", "set_types", "POST");

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
      type_id: editData.type_id,
    };
    updatePrice.mutate(result, {
      onSuccess: (message) => handleSuccess(message, setOpen, toast),
      onError: (error) => handleError(error, toast),
    });
  };

  return (
    <>
      <DialogTitle className="text-center my-4 text-xl">
        Edit prices for {editData.type_name}
      </DialogTitle>

      <div className="mt-8">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {sets?.map((set, index) => {
                // let currentValue: number = 0;
                // editData.set_prices.map((set_price) => {
                //   if (set_price.set_id === set.id)
                //     currentValue = set_price.price;
                // });
                const currentValue =
                  editData.set_prices.find(
                    (set_price) => set_price.set_id === set.id
                  )?.price || 0;

                return (
                  <div key={index}>
                    <label>Price for {set.name}</label>
                    <input
                      type="number"
                      id="name"
                      className="input-box"
                      autoComplete="off"
                      defaultValue={currentValue}
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

export default EditForm;
