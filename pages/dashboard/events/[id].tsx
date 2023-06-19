import EditForm from "@/components/event/forms/EditForm";
import Layout from "@/components/layout/dashboard/Layout";
import { useRouter } from "next/router";

function EditEvent() {
  const router = useRouter();
  const { query } = router;
  const { id } = query;
  return (
    <>
      <Layout>
        <EditForm id={id} />
      </Layout>
    </>
  );
}

export default EditEvent;
