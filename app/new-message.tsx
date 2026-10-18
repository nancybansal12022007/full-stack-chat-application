import { createServerActionClient, User } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache"; // 1. Import revalidatePath
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function NewMessage({ user }: { user: User }) {
  const addMessage = async (formData: FormData) => {
    "use server";
    
    // Get the input text from form data
    const text = String(formData.get("title"));
    
    if (!text || text.trim() === "") return;

    const supabase = createServerActionClient<Database>({ cookies });

    // 2. Insert into 'text' (matching your database column)
    
    await supabase.from("messages").insert({ text, user_id: user?.id } as any);

    // 3. Force Next.js to re-render page.tsx with the newly inserted message
    revalidatePath("/");
  };

  return (
    <form className="border border-gray-800 border-t-0" action={addMessage}>
      <div className="flex py-8 px-4">
        <div className="h-12 w-12">
          {user?.user_metadata?.avatar_url && (
            <Image
              src={user.user_metadata.avatar_url}
              alt="user avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </div>
        <input
          name="title"
          className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2"
          placeholder="What is Happening?!"
        />
      </div>
    </form>
  );
}