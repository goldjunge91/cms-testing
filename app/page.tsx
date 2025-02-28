import PageWrapper from "@/components/Container/PageWrapper";
import HeroSection from "@/components/LandingPage/HeroSection";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
    </PageWrapper>
  );
}


// import { auth } from "@clerk/nextjs";
// import Link from "next/link";

// export default async function Home() {
//   const { userId } = auth();

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <h1 className="text-4xl font-bold mb-8">CMS Testing</h1>
      
//       {userId ? (
//         <div className="flex flex-col items-center gap-4">
//           <p className="text-lg">Logged in as {userId}</p>
//           <Link 
//             href="/dashboard" 
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
//           >
//             Go to Dashboard
//           </Link>
//         </div>
//       ) : (
//         <div className="flex gap-4">
//           <Link 
//             href="/sign-in"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md"
//           >
//             Sign In
//           </Link>
//           <Link 
//             href="/sign-up"
//             className="bg-gray-200 hover:bg-gray-300 text-black px-6 py-3 rounded-md"
//           >
//             Sign Up
//           </Link>
//         </div>
//       )}
//     </main>
//   );
// }
