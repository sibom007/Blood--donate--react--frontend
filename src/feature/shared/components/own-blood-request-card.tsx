import React, { useState } from "react";

import {
  Calendar,
  MapPin,
  Phone,
  User,
  Droplet,
  Check,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import type { bloodRequest, RequestStatus } from "@/types";
import { useOwnDeleteBloodRequest } from "../hooks/use-own-delete-blood-request";
import { ConfirmDeleteModal } from "@/components/confirm-delete-modal";

const statusStyles: Record<RequestStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  APPROVED: "bg-blue-50 text-blue-700 border-blue-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-slate-50 text-slate-700 border-slate-200",
  REJECTED: "bg-red-50 text-red-700 border-red-200",
};

export const BloodRequestCard: React.FC<{ request: bloodRequest }> = ({
  request,
}) => {
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteRequest, isPending: isDeleting } =
    useOwnDeleteBloodRequest();

  const handleExecuteDelete = () => {
    deleteRequest(request.id, {
      onSuccess: () => {
        setIsModalOpen(false); // Close modal sheet window automatically upon success
      },
    });
  };

  const handleCopy = async () => {
    if (!request.contactPhone) return;

    try {
      await navigator.clipboard.writeText(request.contactPhone);
      setCopied(true);

      // Reset the icon back to the phone icon after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const isDisabled =
    request.status === "COMPLETED" ||
    request.status === "CANCELLED" ||
    request.status === "REJECTED";
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 relative overflow-hidden h-full">
      {/* Top Section */}
      <div>
        <div className="flex justify-end items-center gap-1.5 mb-2">
          <span
            className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-lg border ${statusStyles[request.status]}`}>
            {request.status}
          </span>
          <div className="flex items-center gap-1 bg-red-50 text-red-600 px-1.5 py-0.5 rounded-lg font-bold text-[9px]">
            <Droplet className="w-3 h-3 fill-current" />
            <span>{request.bloodGroup}</span>
          </div>
        </div>

        <h3 className="font-semibold text-slate-800 text-lg leading-snug mb-1">
          {request.patientName}
        </h3>
        {request.patientAge && (
          <p className="text-xs text-slate-400 mb-3">
            Age: {request.patientAge} years old
          </p>
        )}

        <div className="space-y-2.5 text-sm text-slate-600 mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-slate-700 text-xs">
                {request.hospitalName}
              </p>
              <p className="text-xs text-slate-400 line-clamp-1">
                {request.hospitalAddress}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Need by:{" "}
              <span className="font-medium text-slate-700">
                {new Date(request.requiredDate).toLocaleDateString()}
              </span>
            </span>
          </div>

          {request.reason && (
            <p className="text-xs bg-slate-50 text-slate-500 rounded-lg p-1.5 italic line-clamp-2 ">
              {request.reason}
            </p>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="pt-3 border-t border-slate-100 mt-auto flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <User className="w-3.5 h-3.5" />
          <span className="truncate max-w-25">{request.contactPerson}</span>
        </div>

        <Button
          type="button"
          disabled={isDisabled}
          variant="outline"
          onClick={handleCopy}
          icon={
            copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Phone className="w-3.5 h-3.5" />
            )
          }>
          <span>{copied ? "copied!" : "copy"}</span>
        </Button>
        <Button
          variant="destructive"
          size="sm"
          disabled={isDisabled}
          onClick={() => setIsModalOpen(true)} // Open modal dialog UI
          icon={<Trash2 className="size-3.5" />}>
          <span>Delete</span>
        </Button>

        <ConfirmDeleteModal
          isOpen={isModalOpen}
          isLoading={isDeleting}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleExecuteDelete}
          title="Delete Blood Request"
          description={`Are you sure you want to remove the urgent blood request for "${request.patientName}"? This information will be wiped off the dashboard instantly.`}
        />
      </div>

      {/* Unit Badge Indicator */}
      <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-end justify-end p-2 text-[10px] font-bold text-slate-400 shadow-inner">
        {request.unitsRequired}U
      </div>
    </div>
  );
};
