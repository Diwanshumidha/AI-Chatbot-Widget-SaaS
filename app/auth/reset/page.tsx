import ResetPasswordForm from "@/components/auth/reset-password-form"
import { Suspense } from "react"

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}

export default ResetPasswordPage