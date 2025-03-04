"use server";

import createSupabaseServerClient from "./server";

export async function uploadImage(file: File, folder: string) {
  const supabase = await createSupabaseServerClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from("images") // Sesuaikan dengan nama bucket di Supabase
    .upload(filePath, file, { contentType: file.type });

  if (error) {
    console.error("Error uploading image:", error);
    throw new Error("Gagal mengunggah gambar");
  }

  console.log("Image uploaded successfully:", filePath);

  // Dapatkan URL publik gambar
  const { data: urlData } = supabase.storage.from("images").getPublicUrl(filePath);
  if (!urlData) {
    console.error("Error getting public URL: No URL returned");
    throw new Error("Gagal mendapatkan URL gambar");
  }

  console.log("Generated Image URL:", urlData.publicUrl);
  return urlData.publicUrl;
}