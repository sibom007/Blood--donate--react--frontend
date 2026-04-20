import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, DropletIcon, MapPin, Phone } from "lucide-react";
import { AvailableDonners } from "../types";
import { bloodGroupLabels, getBloodGroupLabel } from "../../types";
import { generateAvatar } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { PersonalRequestForm } from "./personal-request-form";

interface IProps {
  donner: AvailableDonners;
}

export const AvailableBloodsCard = ({ donner }: IProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Card className="w-full transition-all hover:shadow-md flex flex-col h-full">
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-4">
        <div className="flex gap-3 items-center">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage
              src={donner.photo || generateAvatar(donner.name)}
              alt={donner.name}
            />
            <AvatarFallback className="bg-muted text-muted-foreground text-xs">
              CN
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col overflow-hidden">
            <h3 className="font-semibold leading-none truncate py-1">
              {donner.name}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {donner.email}
            </p>
          </div>
        </div>

        <Badge
          variant={donner.isAvailable ? "default" : "secondary"}
          className={
            donner.isAvailable
              ? "bg-green-600 hover:bg-green-600 text-white shrink-0"
              : "shrink-0"
          }>
          {donner.isAvailable ? "Active" : "Away"}
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col flex-1 gap-4">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{donner.city}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>Age: {donner.age}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground ">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{donner.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <DropletIcon className="h-4 w-4 shrink-0 text-red-500" />
            <span>
              Type :{" "}
              {bloodGroupLabels[
                donner.bloodType as keyof typeof bloodGroupLabels
              ] || donner.bloodType}
            </span>
          </div>
        </div>

        {/* Bio Section - This expands to fill space */}
        <div className="flex-1 flex flex-col justify-center min-h-15">
          {donner.bio ? (
            <p className="text-sm text-muted-foreground line-clamp-2 italic bg-muted/50 p-3 rounded-md border border-border/50">
              {donner.bio}
            </p>
          ) : (
            <div className="text-sm text-muted-foreground line-clamp-2 italic bg-muted/50 p-3 rounded-md border border-border/50">
              <p>No Bio available</p>
            </div> /* Spacer to keep height consistent if no bio */
          )}
        </div>

        {/* Action Buttons - Always at the bottom */}
        <div className="">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="w-full" size="sm">
                Request For Blood
              </Button>
            </DialogTrigger>
            <DialogTitle></DialogTitle>
            <DialogContent className="sm:max-w-106.25">
              <PersonalRequestForm
                donorId={donner.id}
                bloodType={donner.bloodType}
                onSuccess={() => setOpen(false)}
              />
            </DialogContent>
            <DialogDescription></DialogDescription>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
