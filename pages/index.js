import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';
import useSWR from 'swr';
import Link from 'next/link';
import Date from '../components/date';

function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>Hello i'm COGD.Thien. I'm a web developer</p>
				<p>
					(This is a nextJS website - you’ll be building a site like
					this on{' '}
					<a href='https://nextjs.org/learn'> Next.js tutorial</a>
					.)
				</p>
			</section>

			<section
				className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog12</h2>
				<ul className={utilStyles.list}>
					{allPostsData?.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							<Link href={`posts/${id}`}>
								<a>{title}</a>
							</Link>
							<br />
							{id}
							<br />
							{date}
						</li>
					))}
					<li className={utilStyles.listItem} key={'id'}>
						<Link href={`posts/xxxx`}>
							<a>{'incorrect path'}</a>
						</Link>
						<br />
						{'id'}
						<br />
						{'date'}
					</li>
				</ul>
			</section>
		</Layout>
	);
}

export async function getServerSideProps(context) {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

// export function getStaticProps () {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData
//     }
//   }
// }

// Home.getInitialProps = async (ctx) => {
//   const response = await fetch(
//     'https://jsonplaceholder.typicode.com/posts?_page=1'
//   )
//   const postList = await response.json()
//   return { allPostsData: postList }
// }

export default Home;
