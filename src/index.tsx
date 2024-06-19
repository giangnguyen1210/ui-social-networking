import Head from 'next/head'
import Link from 'next/link'

function HomePage(props: any) {
   return (
      <>
           <Head>
            <title>Welcome to Next.j dnkandka!</title>
         </Head>
         <div> {props.stars}</div>
         <Link href="/posts/first">First Post</Link>
      </>	    
   )
}

export async function getServerSideProps() {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return {
       props: { stars: json.stargazers_count }
    }
 }

export default HomePage