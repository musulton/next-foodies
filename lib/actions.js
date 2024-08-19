"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isInvalidValue(value) {
  return !value || value.trim() === "";
}

function isInvalidEmail(value) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return !value || !value.match(emailPattern);
}

function isInvalidFile(file) {
  return !file || file.size === 0;
}

export async function shareMeal(prevData, formData) {
  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("meal-image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };

  if (
    isInvalidValue(meal.title) ||
    isInvalidValue(meal.summary) ||
    isInvalidValue(meal.instructions) ||
    isInvalidValue(meal.creator) ||
    isInvalidEmail(meal.creator_email) ||
    isInvalidFile(meal.image)
  ) {
    return {
      message: "Invalid Input!",
    };
  }

  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
