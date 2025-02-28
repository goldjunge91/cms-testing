// import { buttonVariants } from '@/components/ui/button';
// import { cn } from '@/lib/utils';
// import { getAllArticleBySlug } from '@/utils/actions/articles/get-article-slug';
// import { readArticleSlug } from '@/utils/actions/sites/articles/read-article-slug';
// import { ChevronLeft } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import ReactHtmlParser from 'react-html-parser';

// export async function generateMetadata({ params }: { params: { slug: string } }) {
//   try {
//     const { response } = await getAllArticleBySlug(params?.slug);

//     if (response?.length === 0) {
//       return {
//         title: 'Not Found',
//         description: 'The page you are looking for does not exist',
//       };
//     }

//     return {
//       openGraph: {
//         title: response?.[0]?.title,
//         description: response?.[0]?.subtitle,
//         images: [response?.[0]?.image],
//       },
//       keywords: [...response?.[0]?.keywords],
//     };
//   } catch (error) {
//     console.error(error);
//     return {
//       title: 'Not Found',
//       description: 'The page you are looking for does not exist',
//     };
//   }
// }

// export async function generateStaticParams() {
//   try {
//     const response: any = await fetch(
// 	  `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/blog/slugs`,
// 	  {
//         headers: {
// 		  'X-Auth-Key': process.env.CMS_API_KEY!,
//         },
// 	  }
//     );

//     const result = await response.json();
//     if (result?.error) {
//       throw new Error(`Failed to fetch articles: ${response.statusText}`);
//     }

//     if (result?.response?.length === 0) return [];

//     return result?.response?.map((post: any) => ({
//       slug: post?.slug,
//     }));

//   } catch (error) {
//     console.error('Error fetching articles:', error);
//     return [];
//   }
// }

// export default async function BlogPostPage({ params }: { params: { slug: string } }) {
//   const response = await readArticleSlug(params?.slug);

//   return (
//     <>
//       <article className="container relative max-w-3xl py-6 lg:py-10">
//         <Link
//           href="/"
//           className={cn(
//             buttonVariants({ variant: 'ghost' }),
//             'absolute left-[-200px] top-14 hidden xl:inline-flex'
//           )}
//         >
//           <ChevronLeft className="mr-2 h-4 w-4" />
//           See all posts
//         </Link>
//         <div>
//           <p
//             className="block text-sm text-muted-foreground"
//           >
//             Published on {new Date(response?.[0]?.created_at).toLocaleDateString()}
//           </p>
//           <h1 className="scroll-m-20 text-3xl font-bold pt-4 tracking-tight lg:text-3xl">
//             {response?.[0]?.title}
//           </h1>
//           <div className="mt-4 flex items-center space-x-3">
//             {response?.[0]?.author?.author_profile_img && <Image
//               src={response?.[0]?.author?.author_profile_img}
//               alt={''}
//               width={42}
//               height={42}
//               className="rounded-full bg-white"
//             />}
//             <div className="flex flex-col text-left leading-tight">
//               <p className="font-medium">
//                 {response?.[0]?.author?.author_name}
//               </p>
//               <Link href={`https://www.x.com/${response?.[0]?.author?.author_twitter}`} target="_blank">
//                 <p className="text-xs text-gray-800 dark:text-gray-300 font-semibold hover:underline hover:cursor-pointer">@{response?.[0]?.author?.author_twitter}</p>
//               </Link>
//             </div>
//           </div>
//         </div>
//         {response?.[0]?.image && <Image
//           src={response?.[0]?.image}
//           alt={''}
//           width={720}
//           height={405}
//           className="my-8 rounded-md border bg-muted transition-colors"
//           priority
//         />}
//         {ReactHtmlParser(response?.[0]?.blog_html, {
//           transform: transformNode,
//         })}
//         <hr className="mt-12" />
//         <div className="flex justify-center py-6 lg:py-10">
//           <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }))}>
//             <ChevronLeft className="mr-2 h-4 w-4" />
//             See all posts
//           </Link>
//         </div>
//       </article>
//     </>
//   );
// }


// const transformNode = (node: any) => {
//   // Applying classes to paragraph tags
//   if (node.type === 'tag' && node.name === 'p') {
//     let className = 'leading-7 mt-6';
//     if (node.attribs.class) {
//       className = `${node.attribs.class} ${className}`;
//     }
//     node.attribs.class = className;
//   }

//   // Example for adding classes to anchor tags
//   if (node.type === 'tag' && node.name === 'a') {
//     node.attribs.class =
//       'font-medium text-primary underline underline-offset-4';
//   }

//   // Add more conditions for other tags as needed
//   // Example for adding classes to anchor tags
//   if (node.type === 'tag' && node.name === 'h1') {
//     node.attribs.class =
//       'scroll-m-20 text-2xl font-extrabold pt-4 tracking-tight lg:text-3xl';
//   }

//   if (node.type === 'tag' && node.name === 'h2') {
//     node.attribs.class =
//       'mt-10 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0';
//   }

//   if (node.type === 'tag' && node.name === 'h3') {
//     node.attribs.class =
//       'mt-8 scroll-m-20 text-lg font-semibold tracking-tight';
//   }
// };

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAllArticleBySlug } from '@/utils/actions/articles/get-article-slug';
import { readArticleSlug } from '@/utils/actions/sites/articles/read-article-slug';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ReactHtmlParser from 'react-html-parser';
import { readAllArticles } from '@/utils/actions/sites/articles/read-articles';

// Die statische metadata-Deklaration entfernen und nur generateMetadata behalten
import { defaultMetadata } from '@/app/metadata';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    // Artikel anhand des Slugs abrufen
    const { response } = await getAllArticleBySlug(params?.slug);

    if (response?.length === 0) {
      // Fallback für nicht gefundene Artikel
      return {
        ...defaultMetadata,
        title: 'Not Found',
        description: 'The page you are looking for does not exist',
      };
    }

    // Metadaten für gefundenen Artikel erstellen
    return {
      ...defaultMetadata,
      title: response?.[0]?.title,
      description: response?.[0]?.subtitle,
      openGraph: {
        title: response?.[0]?.title,
        description: response?.[0]?.subtitle,
        images: [response?.[0]?.image],
      },
      keywords: [...response?.[0]?.keywords],
    };
  } catch (error) {
    // Fehlerbehandlung und Logging
    console.error('Fehler beim Generieren der Metadaten:', error);
    
    // Fallback-Metadaten bei Fehlern
    return {
      ...defaultMetadata,
      title: 'Not Found',
      description: 'The page you are looking for does not exist',
    };
  }
}

export async function generateStaticParams() {
  try {
    // Lokale Fallback-Strategie für Builds
    if (process.env.NODE_ENV === 'production') {
      try {
        // Direkter API-Aufruf mit absoluter URL statt relativer URL
        const baseUrl = process.env.NEXT_PUBLIC_BASE_DOMAIN || 
			(process.env.BASE_DOMAIN ? `https://${process.env.BASE_DOMAIN }` : 'http://localhost:3000');
        
        const response = await fetch(
          `${baseUrl}/api/blog/slugs`,
          {
            headers: {
              'X-Auth-Key': process.env.CMS_API_KEY || '',
            },
            cache: 'no-store'
          }
        );
        
        if (!response.ok) {
          throw new Error(`API-Anfrage fehlgeschlagen: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (result?.error) {
          throw new Error(`Failed to fetch articles: ${result.error}`);
        }

        if (!result?.response || result.response.length === 0) {
          console.log('Keine Artikel gefunden für statische Generierung');
          return [];
        }
        
        console.log(`${result.response.length} Artikel für statische Generierung gefunden`);
        
        return result.response.map((post: any) => ({
          site_id: post.site_id || 'default',
          slug: post.slug,
        }));
      } catch (error) {
        console.error('API-Fehler in generateStaticParams:', error);
        // Leeres Array zurückgeben, damit der Build nicht fehlschlägt
        return [];
      }
    } else {
      // Für Entwicklungsumgebung: Dummy-Daten als Fallback
      console.log('Verwende Dummy-Daten für statische Generierung in Entwicklungsumgebung');
      return [
        { site_id: 'default', slug: 'beispiel-artikel' }
      ];
    }
  } catch (error) {
    console.error('Allgemeiner Fehler in generateStaticParams:', error);
    return [];
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string, site_id: string } }) {
  const response = await readArticleSlug(params?.slug);

  return (
    <>
      <article className="container relative max-w-3xl py-6 lg:py-10">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute left-[-200px] top-14 hidden xl:inline-flex'
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
        <div>
          <p
            className="block text-sm text-muted-foreground"
          >
            Published on {new Date(response?.[0]?.created_at).toLocaleDateString()}
          </p>
          <h1 className="scroll-m-20 text-3xl font-bold pt-4 tracking-tight lg:text-3xl">
            {response?.[0]?.title}
          </h1>
          <div className="mt-4 flex items-center space-x-3">
            {response?.[0]?.author?.author_profile_img && <Image
              src={response?.[0]?.author?.author_profile_img}
              alt={'Autor Profilbild'}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />}
            <div className="flex flex-col text-left leading-tight">
              <p className="font-medium">
                {response?.[0]?.author?.author_name}
              </p>
              <Link href={`https://www.x.com/${response?.[0]?.author?.author_twitter}`} target="_blank">
                <p className="text-xs text-gray-800 dark:text-gray-300 font-semibold hover:underline hover:cursor-pointer">@{response?.[0]?.author?.author_twitter}</p>
              </Link>
            </div>
          </div>
        </div>
        {response?.[0]?.image && <Image
          src={response?.[0]?.image}
          alt={response?.[0]?.title || 'Artikelbild'}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />}
        {ReactHtmlParser(response?.[0]?.blog_html, {
          transform: transformNode,
        })}
        <hr className="mt-12" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }))}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            See all posts
          </Link>
        </div>
      </article>
    </>
  );
}

const transformNode = (node: any) => {
  // Applying classes to paragraph tags
  if (node.type === 'tag' && node.name === 'p') {
    let className = 'leading-7 mt-6';
    if (node.attribs.class) {
      className = `${node.attribs.class} ${className}`;
    }
    node.attribs.class = className;
  }

  // Example for adding classes to anchor tags
  if (node.type === 'tag' && node.name === 'a') {
    node.attribs.class =
      'font-medium text-primary underline underline-offset-4';
  }

  // Add more conditions for other tags as needed
  if (node.type === 'tag' && node.name === 'h1') {
    node.attribs.class =
      'scroll-m-20 text-2xl font-extrabold pt-4 tracking-tight lg:text-3xl';
  }

  if (node.type === 'tag' && node.name === 'h2') {
    node.attribs.class =
      'mt-10 scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0';
  }

  if (node.type === 'tag' && node.name === 'h3') {
    node.attribs.class =
      'mt-8 scroll-m-20 text-lg font-semibold tracking-tight';
  }
};
