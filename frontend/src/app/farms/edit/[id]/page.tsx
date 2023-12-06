"use client";
import FarmForm from "@/components/farm-form";

const Page = ({ params }: { params: { id: string } }) => {
  return <FarmForm id={params.id} />;
};

export default Page;
