
import { Suspense } from "react"
import CreateNewPasswordForm from "@/components/auth/create-new-password-form"

const ResetNewPasswordPage = () => {
  return (
    <Suspense>
        <CreateNewPasswordForm />
    </Suspense>
  
  )
}

export default ResetNewPasswordPage