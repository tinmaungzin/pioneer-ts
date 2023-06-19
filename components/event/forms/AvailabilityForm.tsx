import { Switch } from "@/components/ui/switch";
import { usePostModel } from "@/hooks/usePostModel";
import { Event } from "@/utils/types";

type FormProps = {
  editData: Event;
};

function AvailabilityForm({ editData }: FormProps) {
  const updateType = usePostModel(
    "admin/events/" + editData?.id,
    "events",
    "PUT"
  );
  const handleSwitch = async (editData: Event) => {
    let data: Partial<Event> = { ...editData };
    delete data.photo;
    delete data.layout_photo;
    delete data.tables;
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
