"use client";

import { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";
import { BeatLoader } from "react-spinners";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Invalid token");
      return;
    }

    newVerification(token)
      .then((data) => {
        if (data.success) {
          setSuccess(data.success);
        }
        if (data.error) {
          setError(data.error);
        }
      })
      .catch(() => {
        setError("An error occurred");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit, success, error]);

  return (
    <CardWrapper
      headerLabel="Confirming your email address"
      title="Confirming now..."
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
