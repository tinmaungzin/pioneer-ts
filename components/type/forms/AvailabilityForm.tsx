import { Switch } from "@/components/ui/switch";
import { usePostModel } from "@/hooks/usePostModel";
import { Type } from "@/utils/types";

type FormProps = {
  editData: Type;
};

function AvailabilityForm({ editData }: FormProps) {
  const updateType = usePostModel(
    "admin/types/" + editData?.id,
    "types",
    "PUT"
  );
  const handleSwitch = async (editData: Type) => {
    let data: Partial<Type> = { ...editData };
    data.is_available = +!editData?.is_available;
    await updateType.mutateAsync(data);
  };
  return (
    <>
      <Switch
        checked={!!editData?.is_available}
        className="bg-gray-400"
        onCheckedChange={() => handleSwitch(editData)}
      />
    </>
  );
}

export default AvailabilityForm;
