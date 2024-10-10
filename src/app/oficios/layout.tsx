import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Footer, Header, Sidebar } from "../components";

export default async function OficiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex h-screen oficios-layout overflow-auto dark:bg-gray-900 dark:text-white bg-white text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <Header />
        <div className="flex-1 flex overflow-auto ml-0 mt-16">
          <main className="flex-grow overflow-auto">
            <div className="w-full h-full px-6 py-8">{children}</div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}

