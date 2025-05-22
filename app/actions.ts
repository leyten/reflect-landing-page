"use server"

import { revalidatePath } from "next/cache"

export async function subscribeToWaitlist(formData: FormData) {
  const email = formData.get("email") as string

  if (!email || !email.includes("@")) {
    return { success: false, message: "Please provide a valid email address" }
  }

  try {
    // In a real implementation, you would:
    // 1. Store this email in your database
    // 2. Add it to your email marketing platform (e.g., Mailchimp, ConvertKit)
    // 3. Handle duplicate emails appropriately

    console.log("Email submitted to waitlist:", email)

    // Simulate a successful API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Revalidate the path to update UI
    revalidatePath("/")

    return {
      success: true,
      message: "You have been added to the waitlist!",
    }
  } catch (error) {
    console.error("Error subscribing to waitlist:", error)
    return {
      success: false,
      message: "Failed to join waitlist. Please try again.",
    }
  }
}
