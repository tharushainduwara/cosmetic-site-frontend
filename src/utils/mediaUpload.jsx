import { createClient } from "@supabase/supabase-js";

const anonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpenJhZWVtd3Vrd21qem1xcHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0OTIwNDMsImV4cCI6MjA4NTA2ODA0M30.xzC2vzS6ZTtw0D7rMm9ECK5kyA4URzctchWf4_5FCpw";
const supabaseUrl = "https://gizraeemwukwmjzmqpvx.supabase.co";

const supabase = createClient(supabaseUrl, anonKey);

export default function mediaUpload(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("No file selected");
    } else {
      const timestamp = new Date().getTime();
      const fileName = timestamp + file.name

      supabase.storage
        .from("Images")
        .upload(fileName, file, {
          upsert: false,
          cacheControl: "3600",
        })
        .then(() => {
          const publicUrl = supabase.storage
            .from("Images")
            .getPublicUrl(fileName).data.publicUrl;

          resolve(publicUrl);
        }).catch(
            ()=>{
                reject("An error occured")
            }
        )
    }
  });
}
 