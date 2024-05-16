"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editProfile } from "./actions";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { logError } from "@/lib/logger";

const EditProfileForm = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await editProfile(name);
      toast({
        title: "Success",
        description: "Profile name updated successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (error) {
      logError(error as Error);
      toast({
        title: "Error",
        description: "Failed to update profile name.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label
        htmlFor="profileName"
        className="text-sm font-medium text-gray-700"
      >
        New Profile Name:
      </label>
      <Input
        id="profileName"
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="Enter new profile name"
        required
      />
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};

export default EditProfileForm;
