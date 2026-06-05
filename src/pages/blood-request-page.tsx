import { AvailableBlood } from "@/feature/blood-request/components/available-blood";
import { AvailableDonor } from "@/feature/blood-request/components/available-donor";
import BloodRequestForm from "@/feature/blood-request/components/request-form";

export default function BloodRequestPage() {
  return (
    <div className="min-h-screen bg-muted/20 px-4 py-8 mt-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="space-y-6 rounded-xl border bg-card p-4 shadow-lg">
            <AvailableBlood />
            <AvailableDonor />
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-lg">
            <BloodRequestForm />
          </div>
        </div>
      </div>
    </div>
  );
}
