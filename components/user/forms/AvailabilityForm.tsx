import { Switch } from "@/components/ui/switch";
import { usePostModel } from "@/hooks/usePostModel";
import {  User } from "@/utils/types";
import { useRouter } from "next/router";

type FormProps = {
  editData: User;
};

function AvailabilityForm({ editData }: FormProps) {
  const router = useRouter()
  const name = router.pathname === "/dashboard/users" ? "users" : "salespersons"
  const updateType = usePostModel(
    "staff/users/" + editData?.id,
    name,
    "PUT"
  );
  const handleSwitch = async (editData: User) => {
    let data: Partial<User> = { ...editData };
    data.is_archived = +!editData?.is_archived;
    await updateType.mutateAsync(data);
  };
  return (
    <>
      <Switch
        checked={!!editData?.is_archived}
        className="bg-gray-400"
        onCheckedChange={() => handleSwitch(editData)}
      />
    </>
  );
}

export default AvailabilityForm;
